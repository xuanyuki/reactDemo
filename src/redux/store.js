import { configureStore } from '@reduxjs/toolkit'
import loginReducers from './reducers/loginSlice'

export default configureStore({
  reducer: {
    login: loginReducers
  },

})