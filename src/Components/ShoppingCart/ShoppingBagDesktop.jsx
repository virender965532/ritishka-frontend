import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";

const ShoppingBagDesktop = ({
  cartItems,
  handleQuantityChange,
  removeItem = () => {},
  scrollToTop,
}) => {
  const removeProduct = (id) => () => {
    if(typeof id !== 'undefined' && id !== null && id !== '' && typeof removeItem === 'function') {
      removeItem(id);
    }
  };
  return (
    <table className="shoppingBagTable">
      <thead>
        <tr className="relative items-center justify-center justify-self-center">
          <th>Images</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Discount Price</th>
          <th>Delete</th>
        </tr>
      </thead>

      <tbody>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <tr key={item?._id}>
              <td className="">
                <Link to={`/product/${item?.slug}`} onClick={scrollToTop}>
                  <img
                    src={getImageUrl(item?.images[0])}
                    alt=""
                    className="shoppingBagImage max-w-[80px] max-h-[80px] rounded-md object-cover flex flex-row items-center justify-center justify-self-center"
                  />
                </Link>
              </td>
              <td className="no-underline hover:no-underline focus:no-underline active:no-underline">
                <Link
                  to={`/product/${item?.slug}`}
                  onClick={scrollToTop}
                  className="no-underline hover:no-underline focus:no-underline active:no-underline"
                >
                  <h4 className="opacity-100 pl-4 pr-4 max-w-[150px] text-xs text-[#7c5e10] font-semibold no-underline hover:no-underline focus:no-underline active:no-underline">
                    {item?.title || ""}
                  </h4>
                </Link>
              </td>
              <td className="">
                <div className="ShoppingBagTableQuantity">
                  <button
                    onClick={() =>
                      handleQuantityChange(item?._id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <p>{item?.quantity}</p>
                  <button
                    onClick={() =>
                      handleQuantityChange(item?._id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </td>
              <td className="">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.quantity * item.price || 0)}
              </td>
              <td className="">
                {item?.discount > 0 ? `${item?.discount}%` : "-"}
              </td>
              <td className="">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(item.quantity * item.discountedPrice || 0)}
              </td>
              <td className="">
                <div
                  className="flex flex-row items-center justify-self-center mx-auto !w-auto !h-auto cursor-pointer text-[red] hover:text-red-600 transition-colors duration-200 ease-in-out"
                  title="Remove Item"
                >
                  <MdOutlineClose onClick={removeProduct(item?._id)} />
                </div>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              <div className="shoppingCartEmpty">
                <span>Your cart is empty!</span>
                <Link to="/shop" onClick={scrollToTop}>
                  <button>Shop Now</button>
                </Link>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ShoppingBagDesktop;
