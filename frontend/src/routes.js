// src/routes.js (ARCHIVO NUEVO)

const API_PATH = '/api/v1';

export default {
  // Ruta para el inicio de sesión
  loginPath: () => [API_PATH, 'login'].join('/'),
  
  // RUTA NUEVA: Ruta para obtener los datos iniciales del chat (canales, mensajes, etc.)
  dataPath: () => [API_PATH, 'data'].join('/'), 
};