import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import socket from '../../socket';

const Add = ({ onHide }) => {
  const [name, setName] = useState('');
  // El enunciado pide manejar estados de carga o errores si es necesario
  const channels = useSelector((state) => state.channels.items);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Emitimos el evento 'newChannel' según la Fase 4 del enunciado
    socket.emit('newChannel', { name }, (response) => {
      if (response.status === 'ok') {
        onHide(); // Cerramos el modal tras el éxito
      }
    });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Añadir canal</h5>
        <button type="button" className="btn-close" onClick={onHide}></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <input
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onHide}>Cancelar</button>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default Add;