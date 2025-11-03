import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../Features/Wishlist/wishListSlice";
import toast from "react-hot-toast";

const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state?.wishlistData) || [];

  const addToWishlistHandler = useCallback(
    (product) => {
      if (!product) return;

      const productInWishlist = wishlistData.find((item) => item?._id === product?._id);
      if (productInWishlist) return;

      dispatch(addToWishList(product));
      toast.success("Added to wishlist!", {
        duration: 2000,
        style: {
          backgroundColor: "#07bc0c",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#07bc0c",
        },
      });
    },
    [dispatch, wishlistData]
  );

  const removeFromWishlistHandler = useCallback(
    (product) => {
      if (!product) return;

      dispatch(removeFromWishList(product));
      toast.error("Removed from wishlist!", {
        duration: 2000,
        style: {
          backgroundColor: "#ff4b4b",
          color: "white",
        },
        iconTheme: {
          primary: "#fff",
          secondary: "#ff4b4b",
        },
      });
    },
    [dispatch]
  );

  const toggleWishlistHandler = useCallback(
    (product) => {
      if (!product) return;
      
      const productInWishlist = wishlistData.find((item) => item?._id === product?._id);
      if (!productInWishlist) {
        addToWishlistHandler(product);
        return true;
      } else {
        removeFromWishlistHandler(product);
        return false;
      }
    },
    [addToWishlistHandler, removeFromWishlistHandler, wishlistData]
  );

  return {
    addToWishlist: addToWishlistHandler,
    removeFromWishlist: removeFromWishlistHandler,
    toggleWishlist: toggleWishlistHandler,
    wishlistItems: wishlistData
  };
};

export default useWishlist;