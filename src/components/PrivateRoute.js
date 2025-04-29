import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ user, element }) => {
  if (user === undefined) return null; // Wait for auth check
  return user ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;

