import { configureStore } from '@reduxjs/toolkit';
import LabelReducer from './models/slices/LabelSlice.js';
import treeReducer, { treeSlice } from './models/slices/TreeSlice.js';

export default configureStore({
  reducer: {
    nameLabel: LabelReducer,
    tree: treeReducer,
  },
})