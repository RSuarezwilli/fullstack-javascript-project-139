// src/contexts/AuthContext.jsx

import React, { createContext, useContext, useState, useMemo } from 'react';
import axios from 'axios';
import routes from '../routes'; // Asegúrate de que esta ruta sea correcta

// 1. Crear el Contexto
const AuthContext = createContext({});

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

// 2. Componente Proveedor del Contexto
export const AuthProvider = ({ children }) => {
  // Inicialmente, verifica si ya hay un token en localStorage
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  
  // Función para iniciar sesión (recibe credenciales)
  const logIn = async (username, password) => {
    try {
      // 1. Enviar la solicitud POST al servidor
      const response = await axios.post(routes.loginPath(), { username, password });
      
      // 2. Extraer el token de la respuesta
      const { token } = response.data;
      
      // 3. Almacenar el token en localStorage
      localStorage.setItem('token', token);
      
      // 4. Actualizar el estado de la aplicación
      setLoggedIn(true);
      
      // Retorna true para indicar éxito
      return true;
    } catch (error) {
      // Manejar el error de red o de autorización
      // Relanzar el error para que el componente Login lo maneje
      throw error; 
    }
  };

  // Función para cerrar sesión
  const logOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  // Valor del contexto
  const contextValue = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
  }), [loggedIn]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};