import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../socket'; // Tu instancia de socket.js

const MessageForm = () => {
  const [text, setText] = useState('');
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const username = localStorage.getItem('username'); // O desde tu AuthContext

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;

    // Emitimos el evento por WebSocket
    socket.emit('newMessage', {
      body: text,
      channelId: currentChannelId,
      username: username,
    });
    setText(''); // Limpiamos el campo
  };

  return (
    <form onSubmit={handleSubmit} className="py-1 border rounded-2">
      <div className="input-group">
        <input
          name="body"
          className="form-control border-0 p-0 ps-2"
          placeholder="Escribe un mensaje..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-group-vertical">Enviar</button>
      </div>
    </form>
  );
};

export default MessageForm;