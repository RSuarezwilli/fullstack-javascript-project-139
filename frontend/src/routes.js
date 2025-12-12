// src/routes.js (ARCHIVO NUEVO)

const API_PATH = '/api/v1';

export default {
  // LOGIN
  loginPath: () => [API_PATH, 'login'].join('/'),

  // SIGNUP (REGISTRO) 🔥 NUEVO
  signupPath: () => [API_PATH, 'signup'].join('/'),

  // DATA DEL CHAT (canales + mensajes)
  dataPath: () => [API_PATH, 'data'].join('/'),
};
