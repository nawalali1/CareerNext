
// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function PrivateRoute({ children }) {
  // auth.currentUser will be non-null if signed in
  return auth.currentUser ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}
