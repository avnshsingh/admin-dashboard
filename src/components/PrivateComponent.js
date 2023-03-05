import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

// if user exist in local storage then outlet else go back to sign up page
const PrivateComponent = () => {
  const auth = localStorage.getItem('user');
  return auth ? <Outlet /> : <Navigate to='/signup' />;
};

export default PrivateComponent;
