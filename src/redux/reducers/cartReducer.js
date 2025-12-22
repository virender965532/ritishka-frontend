import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  UPDATE_QUANTITY,
  SET_CART
} from "../actions/cartActions";
import { LOGOUT } from "../actions/loginActions";

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state;
  const product = action.payload;

  const getId = item => (item && (item._id || item.product_id || item.id)) || null;

  if (action.type === ADD_TO_CART) {
    // no variation (your products only have highlightedColor right now)
    const cartItem = cartItems.find(item => getId(item) === getId(product));

    if (!cartItem) {
      // Add new item
      return [
        ...cartItems,
        {
          ...product,
          quantity: typeof product.quantity === 'number' ? product.quantity : 1
        }
      ];
    } else {
      // Increase quantity of existing item
      return cartItems.map(item =>
        getId(item) === getId(cartItem)
          ? {
              ...item,
              quantity: typeof product.quantity === 'number'
                ? item.quantity + product.quantity
                : item.quantity + 1
            }
          : item
      );
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    const id = getId(product);
    if (typeof product.quantity === 'number') {
      if (product.quantity <= 0 || product.quantity === 0) {
        return cartItems.filter(cartItem => getId(cartItem) !== id);
      }
      return cartItems.map(item =>
        getId(item) === id ? { ...item, quantity: product.quantity } : item
      );
    }
    // fallback: decrement by 1
    return cartItems.map(item =>
      getId(item) === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
    );
  }

  if (action.type === UPDATE_QUANTITY) {
    const id = getId(product);
    if (typeof product.quantity === 'number') {
      if (product.quantity === 0) {
        return cartItems.filter(cartItem => getId(cartItem) !== id);
      }
      return cartItems.map(item =>
        getId(item) === id ? { ...item, quantity: product.quantity } : item
      );
    }
    return cartItems;
  }

  if (action.type === REMOVE_FROM_CART) {
    const cartItemId = action.payload;
    return cartItems.filter(cartItem => getId(cartItem) !== cartItemId);
  }

  if (action.type === SET_CART) {
    return Array.isArray(action.payload) ? action.payload : cartItems;
  }

  if (action.type === REMOVE_ALL_FROM_CART) {
    return [];
  }

  if (action.type === LOGOUT) {
    return initState;
  }

  return state;
};

export default cartReducer;
