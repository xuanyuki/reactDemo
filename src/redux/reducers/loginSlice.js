import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    activeForm: 'login',
    loginData: {
      username: "",
      password: ""
    },
    forgetData: {
      phoneNum: "",
      password: "",
      code: ""
    },
    registerData: {
      username: "",
      phoneNum: "",
      code: "",
      password: ""
    }
  },
  reducers: {
    updateActive: (state, action) => {
      state.activeForm = action.payload;
    },
    saveLogin: (state, action) => {
      state.loginData = action.payload;
      localStorage.setItem('loginData', JSON.stringify(action.payload));
    },
    saveForget: (state, action) => {
      state.forgetData = action.payload;
      localStorage.setItem('forgetData', JSON.stringify(action.payload));
    },
    saveRegister: (state, action) => {
      state.registerData = action.payload;
      localStorage.setItem('registerData', JSON.stringify(action.payload));
    }
  }
})

export const { updateActive, saveLogin, saveForget, saveRegister } = loginSlice.actions;
export default loginSlice.reducer;