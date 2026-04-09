import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = localStorage.getItem('token');
    
    if (userInfo && token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(userInfo);
        }
      } catch (error) {
        logout();
      }
    }
    setLoading(false);

    // Initial check for expiration and set up an interval every 60 sec
    const intervalId = setInterval(() => {
      const currentToken = localStorage.getItem('token');
      if (currentToken) {
        try {
          const decoded = jwtDecode(currentToken);
          if (decoded.exp * 1000 < Date.now()) {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []); // Empty dependency array is fine since logout only uses state setters

  // Global fetch interceptor to catch 401s anywhere in the app
  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (response.status === 401) {
          logout();
        }
        return response;
      } catch (error) {
        throw error;
      }
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Save the user data (including token)
    setUser(data.data);
    localStorage.setItem('userInfo', JSON.stringify(data.data));
    localStorage.setItem('token', data.data.token);

    return data.data;
  };

  const signup = async (name, email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    // Save the user data (including token)
    setUser(data.data);
    localStorage.setItem('userInfo', JSON.stringify(data.data));
    localStorage.setItem('token', data.data.token);

    return data.data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
