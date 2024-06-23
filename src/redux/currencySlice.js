import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExchangeRates } from '../utils/currencyDataFetcher';

export const fetchRates = createAsyncThunk('currency/fetchRates', async () => {
  const rates = await fetchExchangeRates();
  return rates;
});

const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    rates: {},
    selectedCurrency: 'USD',
  },
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRates.fulfilled, (state, action) => {
      state.rates = action.payload;
    });
  },
});

export const { setCurrency } = currencySlice.actions;

export const selectRates = (state) => state.currency.rates;
export const selectSelectedCurrency = (state) => state.currency.selectedCurrency;

export default currencySlice.reducer;