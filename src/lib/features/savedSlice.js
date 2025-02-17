import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const savedSlice = createSlice({
  name: 'savedItems',
  initialState,
  reducers: {
   toggleSave:(state,action) => {
      const item = action.payload;
      const index = state.value.findIndex((savedItem) => savedItem._id == item._id)

      if(index === -1){
        state.value.push(item)
      }else{
        state.value.splice(index,1)
      }
   }
  },
})


export const {toggleSave,deleteSavedItem} = savedSlice.actions

export default savedSlice.reducer