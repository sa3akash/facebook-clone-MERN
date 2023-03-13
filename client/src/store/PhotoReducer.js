import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  photos: {},
  error: null
}

export const PhotoSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    loading_photos: (state) => {
      state.loading = true
      state.photos = {}
      state.error = null
    },
    all_photos: (state,action) => {
      state.loading = false
      state.photos = action.payload
      state.error = null
    },
    error_photos: (state,action) => {
      state.loading = false
      state.photos = {}
      state.error = action.payload
    },
    
   
  },
})

export const { loading_photos, all_photos, error_photos } = PhotoSlice.actions;

export default PhotoSlice.reducer;