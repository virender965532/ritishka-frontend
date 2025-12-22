import { addToWishlist as apiAddToWishlist, getWishlist as apiGetWishlist, deleteFromWishlist as apiDeleteFromWishlist } from '../../api/api';
export const ADD_TO_WISHLIST = "wishlist/addToWishList";
export const DELETE_FROM_WISHLIST = "wishlist/removeFromWishList";
export const DELETE_ALL_FROM_WISHLIST = "wishlist/removeAllFromWishList";
export const SET_WISHLIST = "wishlist/setWishlist";

// add to wishlist
export const addToWishlist = (item, addToast) => {
  return async dispatch => {
    try {
      const res = await apiAddToWishlist(item);
      const payload = res && res.data && res?.data?.item? res?.data?.item : item;
      if (addToast) {
        addToast("Added To Wishlist", { appearance: "success", autoDismiss: true });
      }
      console.log("Dispatching ADD_TO_WISHLIST with payload:", payload);
      dispatch({ type: ADD_TO_WISHLIST, payload });
    } catch (err) {
      if (addToast) {
        addToast("Failed to add to wishlist", { appearance: "error", autoDismiss: true });
      }
    }
  };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return async dispatch => {
    try {
      const id = item && item.product_id ? item.product_id : item;
      await apiDeleteFromWishlist(id);
      if (addToast) {
        addToast("Removed From Wishlist", { appearance: "error", autoDismiss: true });
      }
      dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
    } catch (err) {
      if (addToast) {
        addToast("Failed to remove from wishlist", { appearance: "error", autoDismiss: true });
      }
    }
  };
};

//delete all from wishlist
export const deleteAllFromWishlist = addToast => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Wishlist", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST });
  };
};

export const fetchWishlist = (addToast) => {
  return async dispatch => {
    try {
      const res = await apiGetWishlist();
      const payload = res && res.data ? res.data : [];
      dispatch({ type: SET_WISHLIST, payload });
    } catch (err) {
      if (addToast) {
        addToast("Failed to load wishlist", { appearance: "error", autoDismiss: true });
      }
    }
  };
};
