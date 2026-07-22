import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from '../../utils/axiosInstance';

export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/auth/sign-up', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/auth/sign-in', credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.delete('/auth/sign-out');
  } catch (error) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? error.message,
    );
  } finally {
    clearAuthHeader();
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState();
    // Checked inside the thunk (not via `condition`) so pending/rejected
    // always fire deterministically, flipping isRefreshing to false even
    // when there is no token to check.
    if (!auth.token) {
      return thunkAPI.rejectWithValue('No token found');
    }
    setAuthHeader(auth.token);
    try {
      const { data } = await axiosInstance.get('/users/current');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);
