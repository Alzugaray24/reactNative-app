import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrderItem: (state, action) => {
      state.orders.push(action.payload);
    },
  },
});

export const { setOrders, addOrderItem } = orderSlice.actions;
export default orderSlice.reducer;
