import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchInitialData } from '../../slice/thunks';
import { messageReceived } from '../../slice/messagesSlice';
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

    // Oidores (listeners) de Socket
    socket.on('newMessage', (payload) => {
      dispatch(messageReceived(payload));
    });

    return () => {
      socket.off('newMessage');
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