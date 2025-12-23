import React, { useState } from 'react';
import socket from '../../socket';

const Rename = ({ onHide, modalInfo }) => {
  const [name, setName] = useState(modalInfo.channel.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('renameChannel', { id: modalInfo.channel.id, name }, (response) => {
      if (response.status === 'ok') {
        onHide();
      }
    });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Renombrar canal</h5>
        <button type="button" className="btn-close" onClick={onHide}></button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="modal-body">
          <input
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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

export default Rename;