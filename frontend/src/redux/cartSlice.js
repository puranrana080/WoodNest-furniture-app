import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
         console.log("Payload:", action.payload);
        const {product,qty=1} = action.payload

      const item = state.items.find((i) => i.id === product.id);
      if (item) {
        item.qty += qty;
        if (item.qty < 0) {
      state.items = state.items.filter((i) => i.id !== product.id);
    }
      } else {
        state.items.push({ ...product, qty });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
