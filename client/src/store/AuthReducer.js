import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

const initialState = {
  user: Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null,
  darkTheme: Cookies.get("dark") ? JSON.parse(Cookies.get("dark")) : false,
  compactMode: Cookies.get("compactMode") ? JSON.parse(Cookies.get("compactMode")) : false,
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state,action) => {
      state.user = action.payload
    },
    login: (state,action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = null
    },
    activateStore: (state) => {
      state.user = {...state.user, verified: true}
    },
    setDarkTheme: (state,action) => {
      state.darkTheme = action.payload
    },
    setCompact: (state,action) => {
      state.compactMode = action.payload
    }
  },
})

export const { register, login, logout,activateStore,setDarkTheme,setCompact } = AuthSlice.actions;

export default AuthSlice.reducer;