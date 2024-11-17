import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Check session storage on mount
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(storedUser).username);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  };

  const login = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUsername(userData.username);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout, checkAuthStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 