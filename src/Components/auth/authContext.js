import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

// Define actions for the reducer
const SET_AUTHENTICATED = 'SET_AUTHENTICATED';
const SET_UNAUTHENTICATED = 'SET_UNAUTHENTICATED';

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, isAuthenticated: true, userId: action.userId };
    case SET_UNAUTHENTICATED:
      return { ...state, isAuthenticated: false, userId: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false, userId: null });

  useEffect(() => {
    // Check local storage for existing authentication
    const token = localStorage.getItem('token');
    if (token) {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const user = JSON.parse(storedUserData);
        dispatch({ type: SET_AUTHENTICATED, userId: user.userId });
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Make an HTTP request to your login endpoint (adjust the URL)
      const response = await axios.post('https://zipthought-backend.onrender.com/users/login', {
        email,
        password,
      });

      // Store the token and user data in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userData', JSON.stringify(response.data.user));

      dispatch({ type: SET_AUTHENTICATED, userId: response.data.user.userId });
    } catch (error) {
      // Handle login error here
      throw error;
    }
  };

  const logout = () => {
    // Clear the token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userData');

    dispatch({ type: SET_UNAUTHENTICATED });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
