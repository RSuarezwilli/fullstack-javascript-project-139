import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// Socket.IO
import { io } from "socket.io-client";

// Conexión al backend
export const socket = io("http://localhost:5000", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Logs de conexión
socket.on("connect", () => {
  console.log("Cliente conectado:", socket.id);
});

// Logs de mensajes recibidos
socket.on("message", (msg) => {
  console.log("Mensaje recibido:", msg);
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
