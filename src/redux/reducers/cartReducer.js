import { v4 as uuid } from "uuid";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  UPDATE_QUANTITY
} from "../actions/cartActions";

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state;
  const product = action.payload;

  if (action.type === ADD_TO_CART) {
    // no variation (your products only have highlightedColor right now)
    const cartItem = cartItems.find(item => item._id === product._id);

    if (!cartItem) {
      // Add new item
      return [
        ...cartItems,
        {
          ...product,
          quantity: product.quantity ? product.quantity : 1,
          cartItemId: uuid()
        }
      ];
    } else {
      // Increase quantity of existing item
      return cartItems.map(item =>
        item.cartItemId === cartItem.cartItemId
          ? {
              ...item,
              quantity: product.quantity
                ? item.quantity + product.quantity
                : item.quantity + 1
            }
          : item
      );
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      return cartItems.filter(
        cartItem => cartItem.cartItemId !== product.cartItemId
      );
    } else {
      return cartItems.map(item =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  if (action.type === UPDATE_QUANTITY) {
    console.log("Updating quantity for product:", product, action);
    if (product.quantity === 0) {
      return cartItems.filter(
        cartItem => cartItem._id !== product._id
      );
    } else {
      return cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: product.quantity }
          : item
      );
    }
  }

  if (action.type === REMOVE_FROM_CART) {
    const cartItemId = product;
    return cartItems.filter(cartItem => cartItem._id !== cartItemId);
  }

  if (action.type === REMOVE_ALL_FROM_CART) {
    return [];
  }

  return state;
};

export default cartReducer;
