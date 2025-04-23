import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  gameState: null, 
};

const gameSlice = createSlice({
  name: 'game', 
  initialState, 
  reducers: {
    setGameState: (state, action) => {
      state.gameState = action.payload; 
    },
  },
});

export const { setGameState } = gameSlice.actions;

export default gameSlice.reducer;
