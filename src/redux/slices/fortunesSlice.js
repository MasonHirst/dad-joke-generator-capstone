import { createSlice } from "@reduxjs/toolkit";

export const fortunesSlice = createSlice({
   name: 'fortunes',
   initialState: {
      value: null
   },
   reducers: {
      setFortunes: (state, action) => {
         state.value = action.payload
      },
      deleteFortunes: (state) => {
         state.value = null
      }
   }
})

export const { setFortunes, deleteFortunes } = fortunesSlice.actions

export const selectFortunes = (state) => state.fortunes.value

export default fortunesSlice.reducer