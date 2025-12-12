// src/pages/Home.jsx (CÓDIGO COMPLETO)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useAuth } from '../components/AuthContext';
import routes from '../routes';
import { initialStateSet } from '../slice/chatSlice';

// 🔥 Socket global
import socket from "../socket";

// 🔥 Notificaciones
import { toast } from "react-toastify";

// 🔥 Traducciones
import { useTranslation } from "react-i18next";

import ChannelList from '../components/ChannelList';

const Home = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const headers = auth.getAuthHeader();
        const response = await axios.get(routes.dataPath(), { headers });

        dispatch(initialStateSet(response.data));

      } catch (e) {
        console.error("Error al cargar datos del chat:", e);

        // 🔥 Notificación de error (i18n)
        toast.error(t("errors.loadData"));

        if (e.response?.status === 401) {
          auth.logOut();
        }

      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // === 🔥 SOCKET.IO EVENTOS CON NOTIFICACIONES ===
    socket.on("newMessage", (payload) => {
      dispatch({ type: "chat/addMessage", payload });
    });

    socket.on("newChannel", (payload) => {
      dispatch({ type: "chat/addChannel", payload });

      // Notificación de canal creado
      toast.success(t("channels.created"));
    });

    socket.on("removeChannel", ({ id }) => {
      dispatch({ type: "chat/removeChannel", payload: id });

      toast.info(t("channels.removed"));
    });

    socket.on("renameChannel", (payload) => {
      dispatch({ type: "chat/renameChannel", payload });

      toast.success(t("channels.renamed"));
    });

    return () => {
      socket.off("newMessage");
      socket.off("newChannel");
      socket.off("removeChannel");
      socket.off("renameChannel");
    };

  }, [auth, dispatch, t]);

  // === Estado de carga ===
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <h1>{t("loading")}</h1>
      </div>
    );
  }

  // === Chat principal ===
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 bg-white">

        {/* Lista de canales */}
        <div className="col-4 col-md-2 border-end pt-5 px-0">
          <div className="d-flex flex-column h-100">
            <p className="m-3 p-0">{t("channels.title")}</p>
            <ChannelList />
          </div>
        </div>

        {/* Mensajes */}
        <div className="col p-0 h-100">
          <h2>{t("messages.title")}</h2>
          <p>{t("messages.placeholder")}</p>
        </div>

      </div>
    </div>
  );
};

export default Home;

