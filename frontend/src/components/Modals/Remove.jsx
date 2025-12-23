import React from 'react';
import socket from '../../socket';

const Remove = ({ onHide, modalInfo }) => {
  const handleRemove = () => {
    // Emitimos 'removeChannel' con el ID que recibimos por props
    socket.emit('removeChannel', { id: modalInfo.channel.id }, (response) => {
      if (response.status === 'ok') {
        onHide();
      }
    });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Eliminar canal</h5>
        <button type="button" className="btn-close" onClick={onHide}></button>
      </div>
      <div className="modal-body">
        <p className="lead">¿Seguro que quieres eliminar el canal?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={onHide}>Cancelar</button>
        <button type="button" className="btn btn-danger" onClick={handleRemove}>Eliminar</button>
      </div>
    </div>
  );
};

export default Remove;