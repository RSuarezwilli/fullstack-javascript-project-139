import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitialData } from '../../slice/thunks';
import { messageReceived } from '../../slice/messagesSlice';
// Importamos las acciones de canales para los sockets
import { addChannel, removeChannel, renameChannel } from '../../slice/channelsSlice';
import socket from '../../socket';
import ChannelsBox from '../../components/Channels/ChannelsBox';
import MessagesBox from '../../components/Messages/MessagesBox';
import MessageForm from '../../components/Messages/MessageForm';

const ChatPage = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      dispatch(fetchInitialData({ Authorization: `Bearer ${token}` }));
    }

    // --- Listeners de Socket (Fase 4) ---
    
    // Mensajes nuevos
    socket.on('newMessage', (payload) => {
      dispatch(messageReceived(payload));
    });

    // Canales nuevos
    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });

    // Eliminar canales
    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload.id)); // El socket suele enviar { id: N }
    });

    // Renombrar canales
    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });

    // Cleanup: Muy importante para evitar el error de "Eventos duplicados"
    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch, token]);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light">
          <ChannelsBox />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessagesBox />
            <div className="mt-auto px-5 py-3">
              <MessageForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;