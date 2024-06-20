import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    deleteItem(state, action) {
      const { invoiceId, itemId } = action.payload;
      const invoice = state.find(invoice => invoice.id === invoiceId);
      if (invoice) {
        invoice.items = invoice.items.filter(item => item.itemId !== itemId);
      }
    },
    addItemToForm: (state, action) => {
      const { invoiceId, newItem } = action.payload;
      const invoice = state.find(invoice => invoice.id === invoiceId);
      if (invoice) {
        invoice.items.push(newItem);
      }
    }
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  deleteItem,
  addItemToForm
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
