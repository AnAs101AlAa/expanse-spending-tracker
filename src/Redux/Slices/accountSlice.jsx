import { createSlice } from '@reduxjs/toolkit'

export const AccountSlice = createSlice({
  name: 'Account',
  initialState: {
    id: '',
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  },
  reducers: {
    setAccount(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.password = action.payload.password;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    deleteAccount(state) {
      state.id = '';
      state.username = '';
      state.email = '';
      state.first_name = '';
      state.last_name = '';
      state.password = '';
    }
  }
})

// Action creators are generated for each case reducer function
export const { setAccount, setUsername, setPassword, setEmail, deleteAccount } = AccountSlice.actions

export default AccountSlice.reducer