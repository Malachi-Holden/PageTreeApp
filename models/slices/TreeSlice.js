import { createSlice } from '@reduxjs/toolkit';

import {createTree, addChildToRoot, addChildToNodeAtIndexPath, deleteNodeAtIndexPath} from '../LinkedTreeRedux.js';

export const treeSlice = createSlice({
  name: 'tree',
  initialState: {
    tree: createTree('redux root with plain tree')
  },
  reducers:{
    replaceTree: (state, action)=>{
      state.tree = action.payload
    },

    addChild: (state, action)=>{
      addChildToRoot(state.tree, action.payload);
    },

    addChildAtIndexPath: (state, action)=>{
      addChildToNodeAtIndexPath(state.tree, action.payload.indexPath, action.payload.childData);
    },

    deleteNode: (state, action)=>{
      deleteNodeAtIndexPath(state.tree, action.payload);
    }
  }
});

export const {replaceTree, addChild, addChildAtIndexPath, deleteNode} = treeSlice.actions;

export default treeSlice.reducer;