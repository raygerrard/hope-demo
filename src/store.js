import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './features/members/memberSlice';

export default configureStore({
  reducer: {
    members: memberReducer,
  },
});