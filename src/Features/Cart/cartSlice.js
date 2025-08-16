import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const MAX_QUANTITY = 20;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = (state?.items || []).find(
        (item) => item?._id === product?._id
      );
      if (existingItem) {
        if (existingItem.quantity < MAX_QUANTITY) {
          existingItem.quantity += 1;
          state.totalAmount += product.discountedPrice;
        }
      } else {
        state.items.push({ ...product, quantity: 1 });
        state.totalAmount += product.discountedPrice;
      }
    },
    updateQuantity(state, action) {
      const { _id, quantity } = action.payload;
      const itemToUpdate = (state.items || []).find(
        (item) => item?._id === _id
      );
      if (itemToUpdate) {
        const difference = quantity - itemToUpdate.quantity;
        if (quantity <= MAX_QUANTITY) {
          itemToUpdate.quantity = quantity;
          state.totalAmount += difference * itemToUpdate.discountedPrice;
        } else {
          itemToUpdate.quantity = MAX_QUANTITY;
          state.totalAmount +=
            (MAX_QUANTITY - itemToUpdate.quantity) * itemToUpdate.discountedPrice;
        }
      }
    },
    removeFromCart(state, action) {
      const _id = action.payload;
      const itemToRemove = (state.items || []).find(
        (item) => item._id === _id
      );
      if (itemToRemove) {
        state.totalAmount -= itemToRemove.discountedPrice * itemToRemove.quantity;
        state.items = (state.items || []).filter(
          (item) => item?._id !== _id
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export const selectCartItems = (state) => state?.cart?.items;
export const selectCartTotalAmount = (state) => state.cart.totalAmount;

export default cartSlice.reducer;
