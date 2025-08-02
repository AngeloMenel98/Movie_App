"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  isInitialized: boolean; // Nuevo estado para manejar la inicialización
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false); // Nuevo estado

  useEffect(() => {
    // Solo se ejecuta en el cliente
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          const decodedUser: any = jwtDecode(storedToken);
          setUser({
            id: decodedUser.id,
            username: decodedUser.username,
          });
          setTokenState(storedToken);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsInitialized(true); // Marcar que la inicialización ha terminado
      }
    };

    initializeAuth();
  }, []);

  const setToken = (newToken: string | null) => {
    if (!newToken) {
      logout();
      return;
    }

    try {
      const decodedUser: any = jwtDecode(newToken);
      setUser({
        id: decodedUser.id,
        username: decodedUser.username,
      });
      setTokenState(newToken);
      localStorage.setItem('token', newToken);
    } catch (error) {
      console.error('Error setting token:', error);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    setTokenState(null);
    // Solo limpiar localStorage si está disponible (en el cliente)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('rememberedEmail');
    }
  };

  // Proveer el estado de inicialización
  const contextValue = {
    user,
    token,
    setToken,
    logout,
    isInitialized
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};