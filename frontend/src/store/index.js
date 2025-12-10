import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../slice/chatSlice';  // ESTA ES LA RUTA CORRECTA

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;

