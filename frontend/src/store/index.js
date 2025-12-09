// src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../slice/chatSlice'; // <-- ¡Verifica esta línea!

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;


