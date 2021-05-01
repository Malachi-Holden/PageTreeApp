import { configureStore } from '@reduxjs/toolkit';
import treeReducer from './models/slices/TreeSlice.js';

export default configureStore({
  reducer: {
    tree: treeReducer,
  },
})