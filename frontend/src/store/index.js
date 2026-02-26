import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../slice/channelsSlice';
import messagesReducer from '../slice/messagesSlice';

export default configureStore({
  reducer: {

    channels: channelsReducer,
    messages: messagesReducer,
  },
});
