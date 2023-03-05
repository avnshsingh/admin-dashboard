import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');

  const addProduct = async () => {
    console.log(name, price, category, company);
    const userId = JSON.parse(localStorage.getItem('user'))._id;

    let result = await fetch('http://localhost:4500/add-product', {
      method: 'post',
      body: JSON.stringify({ name, price, category, userId, company }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });

    result = await result.json();

    console.log(result);
  };
  return (
    <>
      <div className='product'>
        <h1>Add Product</h1>
        <input
          type='text'
          placeholder='Enter product name'
          className='inputBox'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter product price'
          className='inputBox'
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter product category'
          className='inputBox'
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
        <input
          type='text'
          placeholder='Enter product company'
          className='inputBox'
          value={company}
          onChange={e => setCompany(e.target.value)}
        />

        <button onClick={addProduct} className='appButton'>
          Add Product
        </button>
      </div>
    </>
  );
};

export default AddProduct;
