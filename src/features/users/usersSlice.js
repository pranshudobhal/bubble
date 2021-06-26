import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { id: '1', name: 'Pranshu Dobhal' },
  { id: '2', name: 'Lavanya Sengar' },
  { id: '3', name: 'Admin' },
];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
