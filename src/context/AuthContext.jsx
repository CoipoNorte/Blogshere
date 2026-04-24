// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState(mockUsers);

  const login = (email, password) => {
    const found = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return { success: true };
    }
    return { success: false, message: 'Email o contraseña incorrectos' };
  };

  const register = (name, username, email, password) => {
    // Validar duplicados
    const emailExists = registeredUsers.find((u) => u.email === email);
    if (emailExists) {
      return { success: false, message: 'Este email ya está registrado' };
    }

    const usernameExists = registeredUsers.find((u) => u.username === username);
    if (usernameExists) {
      return { success: false, message: 'Este username ya está en uso' };
    }

    const newUser = {
      id: registeredUsers.length + 1,
      name,
      username,
      email,
      password,
      avatar: `https://i.pravatar.cc/150?img=${registeredUsers.length + 20}`,
      bio: '¡Nuevo en BlogSphere! 🎉',
      followers: 0,
      following: 0,
      posts: 0,
      coverPhoto: 'https://picsum.photos/id/1050/1200/400',
    };

    setRegisteredUsers([...registeredUsers, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    setRegisteredUsers(
      registeredUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateProfile,
        registeredUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};