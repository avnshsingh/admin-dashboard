import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';

import './App.css';
import UpdateProduct from './components/UpdateProduct';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateProduct />} />
            <Route path='/logout' element={<h2>Logout component</h2>} />
            <Route
              path='/profile'
              element={<h2>Profile update component</h2>}
            />
          </Route>

          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
