import React, { createContext, useState, useCallback } from 'react';
import { CredentialResponse } from '@react-oauth/google';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  accessToken: string | null;
  handleLogin: (response: CredentialResponse) => void;
  handleLogout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const handleLogin = useCallback((response: CredentialResponse) => {
    if (response.credential) {
      setAccessToken(response.credential);
      setIsAuthenticated(true);
      // Decode JWT to get user info
      const decoded = JSON.parse(atob(response.credential.split('.')[1]));
      setUser(decoded);
    }
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    setAccessToken(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        accessToken,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};