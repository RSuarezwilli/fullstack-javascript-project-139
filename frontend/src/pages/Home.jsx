// src/pages/Home.jsx (CÓDIGO COMPLETO)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useAuth } from '../components/AuthContext'; // Asegura la ruta correcta
import routes from '../routes'; // Rutas de la API
import { initialStateSet } from '../slice/chatSlice'; // Acción para guardar datos en Redux
import ChannelList from '../components/ChannelList'; // Componente que lee y muestra la lista de canales

const Home = () => {
  // Hooks de Redux y Auth
  const auth = useAuth();
  const dispatch = useDispatch();
  
  // Estados para manejar la UX durante la carga
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 1. OBTENER ENCABEZADOS DE AUTORIZACIÓN (con el token JWT)
        const headers = auth.getAuthHeader(); 
        
        // 2. REALIZAR LA SOLICITUD GET A LA RUTA DE DATOS
        const response = await axios.get(routes.dataPath(), { headers });
        
        // 3. GUARDAR DATOS EN REDUX
        // El servidor debe devolver: { channels, messages, currentChannelId }
        dispatch(initialStateSet(response.data)); 
        
      } catch (e) {
        console.error("Error al cargar datos del chat:", e);
        setError("Error al cargar los datos del chat.");
        
        // Manejo de error: si el token es inválido o expirado (401)
        if (e.response?.status === 401) {
          auth.logOut(); // Fuerza el cierre de sesión y PrivateRoute redirige a /login
        }
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth, dispatch]); 

  // --- Lógica de Renderizado de Estado ---
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

  // --- Interfaz Principal del Chat (Datos listos) ---
  return (
    <div className="container-fluid h-100">
      <div className="row h-100 bg-white">
        
        {/* Lado Izquierdo: Lista de Canales */}
        <div className="col-4 col-md-2 border-end pt-5 px-0">
          <div className="d-flex flex-column h-100">
            <p className="m-3 p-0">Canales</p>
            <ChannelList /> 
          </div>
        </div>
        
        {/* Lado Derecho: Área de Mensajes y Formulario */}
        <div className="col p-0 h-100">
          <h2>Área de Mensajes</h2>
          <p>Aquí se mostrarán los mensajes del canal activo.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;