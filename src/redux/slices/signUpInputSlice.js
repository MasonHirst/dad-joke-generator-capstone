import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
   usernameSlice: '',
   emailSlice: '',
   passwordSlice: '',
}

export const signUpInputSlice = createSlice({
   name: 'signUpInput',
   initialState: {
      value: initialValue
   },
   reducers: {
      setSignUpInput: (state, action) => {
         state.value = action.payload
      },
      clearSignUpInput: (state) => {
         state.value = initialValue
      }
   }
})

export const { setSignUpInput, clearSignUpInput } = signUpInputSlice.actions

export const selectSignUpInput = (state) => state.signUpInput.value

export default signUpInputSlice.reducer