import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  profile: {},
  error: null
}

export const PostSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loading_profile: (state) => {
      state.loading = true
      state.profile = {}
      state.error = null
    },
    all_profile: (state,action) => {
      state.loading = false
      state.profile = action.payload
      state.error = null
    },
    error_profile: (state,action) => {
      state.loading = false
      state.profile = {}
      state.error = action.payload
    },
    
    profilePic_update: (state,action) => {
      state.loading = false
      state.profile = {...state.profile , picture:action.payload}
      state.error = null
    },
    add_profile_post: (state,action) => {
      state.loading = false
      state.profile = {...state.profile, posts:[action.payload, ...state.profile.posts]}
      state.error = null
    },
    delete_profile_post: (state,action) => {
      state.loading = false
        state.profile = {...state.profile, posts:[...state.profile?.posts.filter(p=>p._id !== action.payload)]}
        state.error = null
    },
    
   
  },
})

export const { loading_profile, all_profile, error_profile,profilePic_update,add_profile_post,delete_profile_post} = PostSlice.actions;

export default PostSlice.reducer;