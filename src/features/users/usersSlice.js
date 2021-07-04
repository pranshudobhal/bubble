import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserService } from '../../services/users/User.services';

const initialState = {
  status: 'idle',
  user: null,
  error: null,
};

export const fetchUserByUsername = createAsyncThunk('users/fetchUserByUsername', async (username) => {
  const response = await fetchUserService(username);
  if (response.data.success === false) {
    throw new Error(response.data.message);
  }
  return response.data.user;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetUser: () => {
      return {
        ...initialState,
      };
    },
  },
  extraReducers: {
    [fetchUserByUsername.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchUserByUsername.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.user = action.payload;
    },
    [fetchUserByUsername.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = 'error';
    },
  },
});

export const { resetUser } = usersSlice.actions;
export default usersSlice.reducer;
