import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// --- 🔥 AGREGAR SOCKET.IO CLIENTE ---
import { io } from "socket.io-client";

// Conexión al backend (ajusta el puerto si tu servidor usa otro)
export const socket = io("http://localhost:5000", {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Eventos básicos
socket.on("connect", () => {
  console.log("Cliente conectado:", socket.id);
});

socket.on("message", (msg) => {
  console.log("Mensaje recibido:", msg);
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
