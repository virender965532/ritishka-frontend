import { act } from "react";
import {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  DELETE_ALL_FROM_WISHLIST,
  SET_WISHLIST
} from "../actions/wishlistActions";

const initState = [];

const wishlistReducer = (state = initState, action) => {
  const wishlistItems = state,
    product = action.payload;

  if (action.type === ADD_TO_WISHLIST) {
    const wishlistItem = wishlistItems.filter(
      item => item.product_id === product.product_id
    )[0];
    if (wishlistItem === undefined) {
      return [...wishlistItems, product];
    } else {
      return wishlistItems;
    }
  }
  if (action.type === DELETE_FROM_WISHLIST) {
    const remainingItems = (wishlistItems, product) =>
      wishlistItems.filter(wishlistItem => wishlistItem.product_id !== product);
    return remainingItems(wishlistItems, product);
  }

  if (action.type === DELETE_ALL_FROM_WISHLIST) {
    return wishlistItems.filter(item => {
      return false;
    });
  }

  if (action.type === SET_WISHLIST) {
    return Array.isArray(action.payload) ? action.payload : wishlistItems;

  }

  return wishlistItems;
};

export default wishlistReducer;
