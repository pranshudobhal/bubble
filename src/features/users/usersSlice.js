import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await client.get('/fakeApi/users');
    return response.users;
  } catch (error) {
    console.log(error);
  }
});

export const selectAllUsers = (state) => state.users;

export const selectUserByID = (state, userID) => state.users.find((user) => user.id === userID);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export default usersSlice.reducer;
