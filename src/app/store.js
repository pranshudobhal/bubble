import { combineReducers, configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import authenticationReducer from '../features/authentication/authenticationSlice';
import searchReducer from '../features/search/searchSlice';

const combinedReducer = combineReducers({
  authentication: authenticationReducer,
  posts: postsReducer,
  users: usersReducer,
  search: searchReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'authentication/logoutUser') {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
