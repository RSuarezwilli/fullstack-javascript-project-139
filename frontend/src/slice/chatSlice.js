// src/slices/chatSlice.js (CÓDIGO LIMPIO)

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // Para cargar los datos al inicio (desde la API)
    initialStateSet: (state, action) => {
      const { channels, messages, currentChannelId } = action.payload;
      state.channels = channels;
      state.messages = messages;
      state.currentChannelId = currentChannelId;
    },
    // Para añadir un mensaje en tiempo real (desde Socket.IO)
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    // Para añadir un canal en tiempo real (desde Socket.IO)
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
  },
});

export const { initialStateSet, addMessage, addChannel } = chatSlice.actions;
export default chatSlice.reducer; // <-- ¡Este es el export que index.js necesita!