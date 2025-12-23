import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../../slice/channelsSlice';
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'; // Usando Bootstrap como sugiere el entorno

const ChannelsBox = ({ onAdd, onRemove, onRename }) => {
  const dispatch = useDispatch();
  const { items, currentChannelId } = useSelector((state) => state.channels);

  return (
    <div className="d-flex flex-column h-100">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2 pt-5">
        <b>Canales</b>
        {/* Botón para añadir canal (Fase 3) */}
        <Button 
          variant="group-vertical" 
          className="p-0 text-primary" 
          onClick={onAdd}
        >
          <span className="fs-4">+</span>
        </Button>
      </div>

      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {items.map((channel) => {
          const isActive = channel.id === currentChannelId;
          
          return (
            <li key={channel.id} className="nav-item w-100">
              {/* Si el canal es removible, mostramos dropdown; si no, solo el botón (Fase 3) */}
              {channel.removable ? (
                <Dropdown as={ButtonGroup} className="d-flex">
                  <Button
                    variant={isActive ? 'secondary' : ''}
                    className="w-100 text-start text-truncate"
                    onClick={() => dispatch(setCurrentChannel(channel.id))}
                  >
                    <span className="me-1">#</span> {channel.name}
                  </Button>

                  <Dropdown.Toggle 
                    split 
                    variant={isActive ? 'secondary' : ''} 
                    id={`dropdown-split-basic-${channel.id}`} 
                  >
                    <span className="visually-hidden">Gestión de canal</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onRemove(channel)}>Eliminar</Dropdown.Item>
                    <Dropdown.Item onClick={() => onRename(channel)}>Renombrar</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant={isActive ? 'secondary' : ''}
                  className="w-100 text-start"
                  onClick={() => dispatch(setCurrentChannel(channel.id))}
                >
                  <span className="me-1">#</span> {channel.name}
                </Button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChannelsBox;