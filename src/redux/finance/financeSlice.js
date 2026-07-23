import { createSlice } from '@reduxjs/toolkit';
import {
  fetchTransactions,
  fetchCategories,
  addTransaction,
  updateTransaction,
  deleteTransaction,
  fetchStatistics,
  fetchCurrencyRates,
} from './financeOperations';
import { register, logIn, refreshUser, logOut } from '../auth/authOperations';

const initialState = {
  transactions: [],
  categories: [],
  totalBalance: 0,
  statistics: null,
  currencyRates: {},
  selectedCurrency: 'TRY',
};

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
        state.totalBalance = action.payload.balanceAfter;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction.id === action.payload.id,
        );
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        state.totalBalance = action.payload.balanceAfter;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        );
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.currencyRates = action.payload;
      })
      .addCase(logOut.fulfilled, () => initialState)
      .addCase(logOut.rejected, () => initialState)
      .addMatcher(
        (action) =>
          [register.fulfilled.type, logIn.fulfilled.type, refreshUser.fulfilled.type].includes(
            action.type,
          ),
        (state, action) => {
          const balance = action.payload.balance ?? action.payload.user?.balance;
          if (typeof balance === 'number') {
            state.totalBalance = balance;
          }
        },
      );
  },
});

export const { setSelectedCurrency } = financeSlice.actions;
export default financeSlice.reducer;
