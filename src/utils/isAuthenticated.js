// src/utils/isAuthenticated.js
import { useSelector } from 'react-redux';

export const isAuthenticated = () => {
  const token = useSelector((state) => state.auth.token);
  return Boolean(token); 
};
