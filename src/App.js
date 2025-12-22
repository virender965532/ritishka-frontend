import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import Popup from "./Components/PopupBanner/Popup";
import { Toaster } from "react-hot-toast";
import Routing from "./Routing/Routing";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getWishlist } from "./api/api";
import { loginAndSaveData } from "./redux/actions/loginActions";
import { fetchCart } from "./redux/actions/cartActions";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userData.token);

  useEffect(() => {
    const loadUser = async () => {
      if (!token) return;

      try {
        const res = await getProfile();
        dispatch(
          loginAndSaveData({
            user: res.data.user,
            token,
          })
        );
        const wishlistRes = await getWishlist();
        dispatch({
          type: "wishlist/setWishlist",
          payload: wishlistRes.data?.items || [],
        });
        // load cart after successful profile load
        dispatch(fetchCart());
      } catch (err) {
        console.error("Session expired");
        localStorage.removeItem("token");
      }
    };

    loadUser();
  }, [dispatch, token]);
  return (
    <>
      {/* <Popup /> */}
      <ScrollToTop />
      <BrowserRouter>
        <Routing />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
