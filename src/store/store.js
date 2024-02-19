import { configureStore } from '@reduxjs/toolkit';
import teaminfoReducer from '../redux/TeaminfoSlice';

const store = configureStore({
  reducer: {
    deatils: teaminfoReducer,
  },
});

export default store;