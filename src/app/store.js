import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import searchReducer from '../features/search/searchSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    posts: postsReducer,
    users: usersReducer,
    search: searchReducer,
  },
});
