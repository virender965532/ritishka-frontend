import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, deleteFromWishlist } from "../redux/actions/wishlistActions";
import toast from "react-hot-toast";

const useWishlist = () => {
  const dispatch = useDispatch();
  const wishlistData = useSelector((state) => state?.wishlistData) || [];
  const userData = useSelector((state) => state?.userData);

  const addToWishlistHandler = useCallback(
    (productDetail, highlightedColorParam = null) => {
      if (!productDetail) return false;

      if (!userData || !userData.token) {
        toast.error("Please login to add to wishlist", {
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

      const finalColor = highlightedColorParam || (productDetail?.colors && productDetail.colors.length > 0 ? productDetail.colors[0] : "") || productDetail?.highlightedColor;
      const {_id} = typeof productDetail === 'string' ? { _id: productDetail } : productDetail;
      const product = { _id: _id, highlightedColor: finalColor };
      const productInWishlist = wishlistData ? (wishlistData || []).find((item) => item?.product_id === product?._id) : null;
      if (productInWishlist) return false;

      dispatch(addToWishlist({product_id: _id, color: finalColor}));
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
    },
    [dispatch, wishlistData, userData]
  );

  const removeFromWishlistHandler = useCallback(
    (product) => {
      if (!product) return false;

      if (!userData || !userData.token) {
        toast.error("Please login to add to wishlist", {
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

      const id = product && product._id ? product._id : product;
      dispatch(deleteFromWishlist(id));
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
      return true;
    },
    [dispatch, userData]
  );

  const toggleWishlistHandler = useCallback(
    (productDetailOrId, highlightedColorParam = null) => {
      if (!productDetailOrId) return null;

      if (!userData || !userData.token) {
        toast.error("Please login to add to wishlist", {
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

        return null;
      }

      const id = typeof productDetailOrId === 'string' ? productDetailOrId : productDetailOrId._id;
      const finalColor = highlightedColorParam || (productDetailOrId?.colors && productDetailOrId.colors.length > 0 ? productDetailOrId.colors[0] : "");
      const productInWishlist = wishlistData ? (wishlistData || []).find((item) => item?.product_id === id) : null;
      if (!productInWishlist) {
        addToWishlistHandler(typeof productDetailOrId === 'string' ? { _id: id } : productDetailOrId, highlightedColorParam);
        return true;
      } else {
        removeFromWishlistHandler(id);
        return false;
      }
    },
    [addToWishlistHandler, removeFromWishlistHandler, wishlistData, userData]
  );

  return {
    addToWishlist: addToWishlistHandler,
    removeFromWishlist: removeFromWishlistHandler,
    toggleWishlist: toggleWishlistHandler,
    wishlistItems: wishlistData
  };
};

export default useWishlist;