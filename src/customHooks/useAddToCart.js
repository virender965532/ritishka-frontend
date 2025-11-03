import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Features/Cart/cartSlice";
import toast from "react-hot-toast";

const useAddToCart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?.cartData) || [];

  const addToCartHandler = useCallback(
    (product, highlightedColorParam) => {
      if (!product) return;

      const finalColor =
        highlightedColorParam || (product?.colors && product.colors.length > 0 ? product.colors[0] : "");

      const productDetails = { ...product, highlightedColor: finalColor, quantity: 1 };

      const productInCart = (cartData || []).find((item) => item?._id === productDetails?._id);

      if (productInCart && productInCart.quantity >= 500) {
        toast.error("Product limit reached", {
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
        return;
      }

      dispatch(addToCart(productDetails));
      toast.success("Added to cart!", {
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
    [dispatch, cartData]
  );

  return addToCartHandler;
};

export default useAddToCart;
