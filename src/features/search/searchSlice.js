import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllUsersService } from '../../services';

const initialState = {
  status: 'idle',
  error: null,
  users: [],
};

export const fetchAllUsers = createAsyncThunk('search/fetchAllUsers', async () => {
  const response = await fetchAllUsersService();
  return response.data.allUsers;
});

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchAllUsers.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchAllUsers.fulfilled]: (state, action) => {
      state.status = 'fulfilled';
      state.users = action.payload;
    },
    [fetchAllUsers.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
  },
});

export default searchSlice.reducer;
