import axios from 'axios';
import { initialChannelsLoaded } from './channelsSlice';
import { initialMessagesLoaded } from './messagesSlice';

export const fetchInitialData = (authHeader) => async (dispatch) => {
  try {
    // Peticiones simultáneas con Promise.all como pide la Fase 2
    const [channelsRes, messagesRes] = await Promise.all([
      axios.get('/api/v1/channels', { headers: authHeader }),
      axios.get('/api/v1/messages', { headers: authHeader })
    ]);

    dispatch(initialChannelsLoaded(channelsRes.data));
    dispatch(initialMessagesLoaded(messagesRes.data));
  } catch (error) {
    console.error("Error al cargar datos iniciales:", error);
  }
};