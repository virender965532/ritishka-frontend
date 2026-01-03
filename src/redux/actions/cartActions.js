import { addToCart as apiAddToCart, getCart as apiGetCart, updateCartItem as apiUpdateCartItem, deleteFromCart as apiDeleteFromCart } from '../../api/api';

export const ADD_TO_CART = "cart/addToCart";
export const DECREASE_QUANTITY = "cart/decreaseQuantity";
export const UPDATE_QUANTITY = "cart/updateQuantity";
export const REMOVE_FROM_CART = "cart/removeFromCart";
export const REMOVE_ALL_FROM_CART = "cart/removeAllFromCart";
export const SET_CART = "cart/setCart";

//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize
) => {
  return async dispatch => {
    try {
      const data = {
        product_id: item._id || item.product_id || item.id,
        quantity: quantityCount || item.quantity || 1,
        selectedProductColor: selectedProductColor
          ? selectedProductColor
          : item.selectedProductColor
          ? item.selectedProductColor
          : null,
        selectedProductSize: selectedProductSize
          ? selectedProductSize
          : item.selectedProductSize
          ? item.selectedProductSize
          : null
      };
      const res = await apiAddToCart(data);
      const payload = res && res.data && res.data.item ? res.data.item : { ...item, ...data };
      if (addToast) {
        addToast("Added To Cart", { appearance: "success", autoDismiss: true });
      }
      dispatch({ type: ADD_TO_CART, payload });
    } catch (err) {
      if (addToast) {
        addToast("Failed to add to cart", { appearance: "error", autoDismiss: true });
      }
    }
  };
};

//update quantity from cart
export const updateQuantity = (item, addToast) => {
  return async dispatch => {
    try {
      const id = item && (item._id || item.product_id || item.id) ? (item._id || item.product_id || item.id) : item;
      const data = { quantity: item.quantity };
      const res = await apiUpdateCartItem(id, data);
      const payload = res && res.data && res.data.item ? res.data.item : { ...item };
      if (addToast) {
        addToast("Item Quantity Updated", { appearance: "info", autoDismiss: true });
      }
      dispatch({ type: UPDATE_QUANTITY, payload });
    } catch (err) {
      if (addToast) addToast("Failed to update quantity", { appearance: "error", autoDismiss: true });
    }
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return async dispatch => {
    try {
      const id = item?._id ? item?._id : item;
      await apiDeleteFromCart(id);
      if (addToast) {
        addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
      }
      dispatch({ type: REMOVE_FROM_CART, payload: id });
    } catch (err) {
      if (addToast) addToast("Failed to remove from cart", { appearance: "error", autoDismiss: true });
    }
  };
};
//delete all from cart
export const deleteAllFromCart = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: REMOVE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter(single => single.color === color)[0]
      .size.filter(single => single.name === size)[0].stock;
  }
};

export const fetchCart = (addToast) => {
  return async dispatch => {
    try {
      const res = await apiGetCart();
      const payload = res && res.data && Array.isArray(res.data.items) ? res.data.items : (res && res.data && res.data.items ? res.data.items : []);
      dispatch({ type: SET_CART, payload });
    } catch (err) {
      if (addToast) addToast("Failed to load cart", { appearance: "error", autoDismiss: true });
    }
  };
};
