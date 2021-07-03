import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { fetchUserService } from '../../services/users/User.services';

const initialState = {
  status: 'idle',
  user: null,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await client.get('/fakeApi/users');
    return response.users;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserByUsername = createAsyncThunk('users/fetchUserByUsername', async (username) => {
  const response = await fetchUserService(username);
  console.log({ response });
  return response.data.user;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload;
    },
    [fetchUserByUsername.pending]: (state) => {
      state.status = 'loading';
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

export default usersSlice.reducer;

// export const selectAllUsers = (state) => state.users;

// export const selectUserByUsername = (state, username) => state.users.find((user) => user.username === username);
