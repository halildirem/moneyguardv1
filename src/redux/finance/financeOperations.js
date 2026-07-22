import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../utils/axiosInstance';

export const fetchTransactions = createAsyncThunk(
  'finance/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/transactions');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);

export const fetchCategories = createAsyncThunk(
  'finance/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/transaction-categories');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);

export const addTransaction = createAsyncThunk(
  'finance/addTransaction',
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post('/transactions', payload);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);

export const updateTransaction = createAsyncThunk(
  'finance/updateTransaction',
  async ({ id, ...payload }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.patch(
        `/transactions/${id}`,
        payload,
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  'finance/deleteTransaction',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);

export const fetchStatistics = createAsyncThunk(
  'finance/fetchStatistics',
  async ({ month, year }, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get('/transactions-summary', {
        params: { month, year },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);

const CURRENCY_CACHE_KEY = 'moneyguard-currency-cache';
const ONE_HOUR = 60 * 60 * 1000;

export const fetchCurrencyRates = createAsyncThunk(
  'finance/fetchCurrencyRates',
  async (_, thunkAPI) => {
    try {
      const cachedRaw = window.localStorage.getItem(CURRENCY_CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw);
        if (Date.now() - cached.timestamp < ONE_HOUR) {
          return cached.rates;
        }
      }

      const { data } = await axios.get('https://api.monobank.ua/bank/currency');
      const rates = data.filter(
        (item) =>
          (item.currencyCodeA === 840 || item.currencyCodeA === 978) &&
          item.currencyCodeB === 980,
      );

      window.localStorage.setItem(
        CURRENCY_CACHE_KEY,
        JSON.stringify({ rates, timestamp: Date.now() }),
      );

      return rates;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? error.message,
      );
    }
  },
);
