// src/components/PrivateRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Importar el hook de autenticación

// Este componente envuelve la ruta que quieres proteger
const PrivateRoute = () => {
  const auth = useAuth();

  // Verifica la existencia del token (a través del estado loggedIn del contexto)
  // Si está logueado, permite el acceso al componente hijo (Outlet)
  if (auth.loggedIn) {
    return <Outlet />;
  }
  
  // Si no está logueado (no hay token), redirige a la página /login
  // El estado replace: true asegura que el / se reemplace por /login en el historial
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;