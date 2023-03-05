import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch('http://localhost:4500/products', {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    result = await result.json();

    setProducts(result);
  };

  console.log(products);

  const deleteProduct = async id => {
    console.log(id);
    let result = await fetch(`http://localhost:4500/product/${id}`, {
      method: 'delete',
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
      },
    });
    result = await result.json();

    if (result) {
      getProducts();
      alert('Record is delete');
    }
  };

  const searchHandle = async e => {
    console.log(e.target.value);
    let key = e.target.value;

    if (key) {
      let result = await fetch(`http://localhost:4500/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });

      result = await result.json();

      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <>
      <div className='product-list'>
        <h3>Product List...</h3>
        <input
          type='text'
          placeholder='Search Product'
          className='search'
          onChange={searchHandle}
        />
        <ul>
          <li>S. No.</li>
          <li>Name</li>
          <li>Price</li>
          <li>Category</li>
          <li>Company</li>
          <li>Operation</li>
        </ul>
        {products.map((item, index) => (
          <ul key={index}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={`/update/${item._id}`}>Update</Link>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default ProductList;
