import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../Features/Wishlist/wishListSlice";
import toast from "react-hot-toast";

const useAddToWishlist = () => {
  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state?.wishlistData) || [];

  const toggleWishlist = useCallback(
    (product) => {
      if (!product) return;
      const productInWishlist = (wishlistData || []).find((item) => item?._id === product?._id);

      if (!productInWishlist) {
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
        return true;
      } else {
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
        return false;
      }
    },
    [dispatch, wishlistData]
  );

  return toggleWishlist;
};

export default useAddToWishlist;
