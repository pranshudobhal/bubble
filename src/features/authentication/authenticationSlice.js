import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { loginService, signUpService } from '../../services/authentication';

export const loginUser = createAsyncThunk('authentication/loginUser', async (userDetails) => {
  const response = await loginService(userDetails);
  return { token: response.data.token };
});

export const signUpUser = createAsyncThunk('authentication/signUpUser', async (userDetails) => {
  const response = await signUpService(userDetails);
  return { token: response.data.token };
});

const initialState = {
  user: null,
  token: JSON.parse(localStorage.getItem('token')) || null,
  status: 'idle',
  error: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logoutUser: () => {
      localStorage.removeItem('token');
      return {
        user: null,
        token: null,
        status: 'idle',
        error: 'null',
      };
    },
    resetAuthStateStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.status = 'fulfilled';
      localStorage.setItem('token', JSON.stringify(token));
      axios.defaults.headers.common['Authorization'] = token;
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
    [signUpUser.pending]: (state) => {
      state.status = 'loading';
    },
    [signUpUser.fulfilled]: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.status = 'fulfilled';
      localStorage.setItem('token', JSON.stringify(token));
      axios.defaults.headers.common['Authorization'] = token;
    },
    [signUpUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
  },
});

export const { logoutUser, resetAuthStateStatus } = authenticationSlice.actions;

export default authenticationSlice.reducer;
