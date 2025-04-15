// src/utils/auth.js

export const isAdmin = () => {
    return localStorage.getItem('isAdmin') === 'true';
  };
  