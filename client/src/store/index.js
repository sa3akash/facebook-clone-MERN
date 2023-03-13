import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './AuthReducer';
import PhotoReducer from './PhotoReducer';
import PostReducer from './PostReducer';
import ProfileReducer from './ProfileReducer';
import FriendsReducer from './FriendPageReducer';

export const store = configureStore({
  reducer: {
    Auth:AuthReducer,
    Posts:PostReducer,
    Profile: ProfileReducer,
    Photos: PhotoReducer,
    FriendsPage: FriendsReducer
  },
})