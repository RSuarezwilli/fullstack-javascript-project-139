// src/pages/Home.jsx (CÓDIGO COMPLETO)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useAuth } from '../components/AuthContext'; 
import routes from '../routes'; 
import { initialStateSet } from '../slice/chatSlice'; 

// 🔥 Importar socket global
import socket from "../socket";

import ChannelList from '../components/ChannelList';

const Home = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = auth.getAuthHeader();
        const response = await axios.get(routes.dataPath(), { headers });

        // Guardar en Redux: { channels, messages, currentChannelId }
        dispatch(initialStateSet(response.data));

      } catch (e) {
        console.error("Error al cargar datos del chat:", e);
        setError("Error al cargar los datos del chat.");

        if (e.response?.status === 401) {
          auth.logOut();
        }

      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // === 🔥 SOCKET.IO EVENTOS ===
    socket.on("newMessage", (payload) => {
      dispatch({ type: "chat/addMessage", payload });
    });

    socket.on("newChannel", (payload) => {
      dispatch({ type: "chat/addChannel", payload });
    });

    socket.on("removeChannel", ({ id }) => {
      dispatch({ type: "chat/removeChannel", payload: id });
    });

    socket.on("renameChannel", (payload) => {
      dispatch({ type: "chat/renameChannel", payload });
    });

    // Limpiar listeners al desmontar
    return () => {
      socket.off("newMessage");
      socket.off("newChannel");
      socket.off("removeChannel");
      socket.off("renameChannel");
    };

  }, [auth, dispatch]);

  // === Estados de carga ===
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <h1>Cargando el Chat...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <h1 style={{ color: 'red' }}>{error}</h1>
      </div>
    );
  }

  // === Vista principal del chat ===
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 bg-white">

        {/* Lista de canales */}
        <div className="col-4 col-md-2 border-end pt-5 px-0">
          <div className="d-flex flex-column h-100">
            <p className="m-3 p-0">Canales</p>
            <ChannelList />
          </div>
        </div>

        {/* Área de mensajes */}
        <div className="col p-0 h-100">
          <h2>Área de Mensajes</h2>
          <p>Aquí se mostrarán los mensajes del canal activo.</p>
        </div>

      </div>
    </div>
  );
};

export default Home;
