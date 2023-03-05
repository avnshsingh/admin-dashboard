import React, { useEffect } from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');

    if (auth) {
      navigate('/');
    }
  }, []);

  // api call function collectData
  const collectData = async () => {
    console.log(name, email, password);

    let result = await fetch('http://localhost:4500/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    }); // calling method through fetch

    result = await result.json();

    console.log(result);

    localStorage.setItem('user', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.auth));
    // we can't directly put data in local storage,
    // we have to stringify it first

    navigate('/');
  };

  return (
    <div className='register'>
      <h1>Register</h1>

      <input
        className='inputBox'
        type='text'
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='Enter Name'
      />

      <input
        className='inputBox'
        type='text'
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder='Enter email'
      />

      <input
        className='inputBox'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Enter Password'
      />

      <button onClick={collectData} className='appButton' type='button'>
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
