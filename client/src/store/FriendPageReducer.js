import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: {},
  error: null
}

export const FriendSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true
      state.data = {}
      state.error = null
    },
    setData: (state,action) => {
      state.loading = false
      state.data = action.payload
      state.error = null
    },
    setError: (state,action) => {
      state.loading = false
      state.data = {}
      state.error = action.payload
    },
    filterFriendRequent: (state,action) => {
      state.loading = false
      state.data = {...state.data, requests:[...state.data.requests.filter((x)=>x._id !== action.payload)]}
      state.error = action.payload
    },
    addFriends: (state,action) => {
      state.loading = false
      state.data = {...state.data, friends:[action.payload, ...state.data.friends]}
      state.error = action.payload
    },
    filterSend: (state,action) => {
      state.loading = false
      state.data = {...state.data, sendRequests:[...state.data.sendRequests.filter((x)=>x._id !== action.payload)]}
      state.error = action.payload
    },
    filterFriend: (state,action) => {
      state.loading = false
      state.data = {...state.data, friends:[...state.data.friends.filter((x)=>x._id !== action.payload)]}
      state.error = action.payload
    },
  },
})

export const { setLoading, setData, setError,filterFriendRequent,filterSend,filterFriend,addFriends} = FriendSlice.actions;

export default FriendSlice.reducer;