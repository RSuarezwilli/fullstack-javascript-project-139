import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    // Carga inicial (Fase 2)
    initialMessagesLoaded: (state, action) => {
      state.items = action.payload;
    },
    // Nuevo mensaje individual (Fase 2: "messageReceived")
    messageReceived: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { initialMessagesLoaded, messageReceived } = messagesSlice.actions;
export default messagesSlice.reducer;




