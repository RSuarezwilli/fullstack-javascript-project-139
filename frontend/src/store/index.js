src/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../slice/chatSlice'; // <-- ¡Verifica esta línea!

const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
Archivo,Código
src/store/index.js,"javascript\nimport { configureStore } from '@reduxjs/toolkit';\nimport chatReducer from '../slices/chatSlice'; // Asegúrate que esta ruta sea correcta\n\nconst store = configureStore({\n  reducer: {\n    chat: chatReducer,\n  },\n});\n\nexport default store;\n"

