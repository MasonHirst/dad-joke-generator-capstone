import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
   name: 'isLoading',
   initialState: {
      value: false,
   },
   reducers: {
      setLoadingTrue: (state) => {
         state.value = true
      },

      setLoadingFalse: (state) => {
         state.value = false
      },

      toggleLoading: (state) => {
         state.value = !state.value
      },
   },
})

export const { setLoadingFalse, setLoadingTrue, toggleLoading } =
   loadingSlice.actions

export const selectLoading = (state) => state.isLoading.value

export default loadingSlice.reducer
