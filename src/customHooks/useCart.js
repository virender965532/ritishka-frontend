import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateQuantity } from "../Features/Cart/cartSlice";
import toast from "react-hot-toast";

const useCart = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.userData);
  const cartData = useSelector((state) => state?.cartData) || [];

  const addToCartHandler = useCallback(
    (product, highlightedColorParam = null) => {
      if (!userData || !userData.token) {
        toast.error("Please login to add to cart", {
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
      if (!product) return;

      const finalColor =
        highlightedColorParam || (product?.colors && product.colors.length > 0 ? product.colors[0] : "");

      const {_id: _id, quantity: quantity} = product;
      const productDetails = { _id, quantity, highlightedColor: finalColor, quantity: 1 };
      const productInCart = cartData.find((item) => item?._id === productDetails?._id);

      if (productInCart) {
        toast.error("Product Already Added", {
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

  const removeFromCartHandler = useCallback(
    (productId) => {
      if (!productId) return;

      dispatch(removeFromCart(productId));
      toast.success("Removed from cart!", {
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
    [dispatch]
  );

  const updateQuantityHandler = useCallback(
    (productId, quantity) => {
      if (!productId || quantity < 1) return;

      dispatch(updateQuantity({ _id: productId, quantity }));
    },
    [dispatch]
  );

  return {
    addToCart: addToCartHandler,
    removeFromCart: removeFromCartHandler,
    updateQuantity: updateQuantityHandler,
    cartItems: cartData
  };
};

export default useCart;