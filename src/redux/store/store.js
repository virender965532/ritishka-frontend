import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../reducers/cartReducer'
import wishlistReducer from '../reducers/wishlistReducer'
import loginReducer from '../reducers/loginReducer'
import { getWishlist } from '../../api/api';

const loadAuthFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("token");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

const loadWishlistFromLocalStorage = async () => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
     const data = await getWishlist();
     console.log("Wishlist data loaded from API:", data);
     return data && data.data && data?.data?.items ? data?.data?.items : []; 
    }
  } catch {
    return [];
  }
}

const loadCartFromLocalStorage = () => {

}

const preloadedState = {
    userData: loadAuthFromLocalStorage(),
    wishlistData: [],
    cartData: [],
}

export default configureStore({
  reducer: {
    userData: loginReducer,
    wishlistData: wishlistReducer,
    cartData: cartReducer,
  },
  preloadedState,
})