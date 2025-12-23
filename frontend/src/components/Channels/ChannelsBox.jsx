import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../../slice/channelsSlice';

const ChannelsBox = () => {
  const dispatch = useDispatch();
  // Leemos desde el nuevo slice de canales
  const { items, currentChannelId } = useSelector((state) => state.channels);

  return (
    <div className="p-3">
      <h5>Canales</h5>
      <ul className="nav flex-column nav-pills nav-fill px-2">
        {items.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <button
              type="button"
              className={`nav-link w-100 text-start ${channel.id === currentChannelId ? 'active' : ''}`}
              onClick={() => dispatch(setCurrentChannel(channel.id))}
            >
              # {channel.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;

