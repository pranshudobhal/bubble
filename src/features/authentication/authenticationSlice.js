import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginService, signUpService } from '../../services/authentication';

/**
 * FIXME:
 * - change token later on
 */

export const loginUser = createAsyncThunk('authentication/loginUser', async (userDetails) => {
  try {
    const response = await loginService(userDetails);
    return response;
  } catch (error) {
    console.log('Error logging in ', error);
  }
});

export const signUpUser = createAsyncThunk('authentication/signUpUser', async (userDetails) => {
  try {
    const response = await signUpService(userDetails);
    return response;
  } catch (error) {
    console.log('Error creating account ', error);
  }
});

const initialState = {
  user: null,
  // token: JSON.parse(localStorage?.getItem('token')) || null,
  token: false,
  status: 'idle',
  error: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logoutUser: (state) => {
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
      state.status = 'fulfilled';
    },
    [loginUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
    [signUpUser.pending]: (state) => {
      state.status = 'loading';
    },
    [signUpUser.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
    },
    [signUpUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
  },
});

export const { resetAuthStateStatus } = authenticationSlice.actions;

export default authenticationSlice.reducer;
