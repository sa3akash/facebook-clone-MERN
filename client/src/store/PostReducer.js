import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  posts: [],
  error: null
}

export const PostSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loading_post: (state) => {
      state.loading = true;
      state.posts = []
      state.error = null
    },
    all_post: (state,action) => {
      state.loading = false
      state.posts = action.payload
      state.error = null
    },
    error_post: (state,action) => {
      state.loading = false
      state.posts = []
      state.error = action.payload
    },
    add_post: (state,action) => {
      state.posts = [action.payload, ...state.posts]
    },
    delete_post: (state,action) => {
      state.posts = [...state.posts.filter(p=>p._id !== action.payload)]
    },
   
  },
})

export const { loading_post, all_post, error_post, add_post,delete_post } = PostSlice.actions;

export default PostSlice.reducer;