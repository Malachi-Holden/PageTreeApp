import { createSlice } from '@reduxjs/toolkit';

export const LabelSlice = createSlice({
  name: 'label',
  initialState: {
    labelValue: ''
  },
  reducers:{
    rename: (state, action)=>{
      state.labelValue = action.payload
    }
  }
});

export const {rename} = LabelSlice.actions;

export default LabelSlice.reducer;