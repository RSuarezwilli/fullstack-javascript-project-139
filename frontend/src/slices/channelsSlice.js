import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: { items: [], currentChannelId: 1, loading: false },
  reducers: {
    initialChannelsLoaded: (state, action) => {
      state.items = action.payload;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    addChannel: (state, action) => {
      state.items.push(action.payload);
    },
    removeChannel: (state, action) => {
      state.items = state.items.filter(c => c.id !== action.payload);
      if (state.currentChannelId === action.payload) state.currentChannelId = 1;
    },
    renameChannel: (state, action) => {
      const channel = state.items.find(c => c.id === action.payload.id);
      if (channel) channel.name = action.payload.name;
    },
  },
});

export const { 
  initialChannelsLoaded, setCurrentChannel, addChannel, removeChannel, renameChannel 
} = channelsSlice.actions;
export default channelsSlice.reducer;