import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: JSON.parse(localStorage.getItem("orders")) || [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.list.unshift(action.payload); // latest first
      localStorage.setItem("orders", JSON.stringify(state.list));
    },
    clearOrders: (state) => {
      state.list = [];
      localStorage.removeItem("orders");
    },
  },
});

export const { placeOrder, clearOrders } = orderSlice.actions;
export default orderSlice.reducer;
