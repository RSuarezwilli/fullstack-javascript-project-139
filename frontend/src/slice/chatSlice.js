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
    // Cargar datos iniciales desde la API
    initialStateSet: (state, action) => {
      const { channels, messages, currentChannelId } = action.payload;
      state.channels = channels;
      state.messages = messages;
      state.currentChannelId = currentChannelId;
    },

    // Añadir mensaje en tiempo real
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },

    // Añadir canal en tiempo real
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },

    // Eliminar canal en tiempo real
    removeChannel: (state, action) => {
      const id = action.payload;
      state.channels = state.channels.filter((ch) => ch.id !== id);

      // Cambiar el canal actual si fue eliminado
      if (state.currentChannelId === id) {
        state.currentChannelId = 1; // general
      }
    },

    // Renombrar canal
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.channels.find((ch) => ch.id === id);
      if (channel) {
        channel.name = name;
      }
    },
  },
});

export const {
  initialStateSet,
  addMessage,
  addChannel,
  removeChannel,
  renameChannel,
} = chatSlice.actions;

export default chatSlice.reducer;


