import { configureStore } from '@reduxjs/toolkit'
import fortunesSliceReducer from './slices/fortunesSlice'
import isLoadingReducer from './slices/isLoadingSlice'
import signUpInputSliceReducer from './slices/signUpInputSlice'

export default configureStore({
   reducer: {
      fortunes: fortunesSliceReducer,
      isLoading: isLoadingReducer,
      signUpInput: signUpInputSliceReducer,
   },
})
