import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/imageUtils";

const ShoppingBagResponsive = ({
  cartItems,
  handleQuantityChange,
  removeItem,
  scrollToTop,
}) => {
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <span className="text-gray-600 mb-4 text-lg font-medium">
          Your cart is empty!
        </span>
        <Link to="/shop" onClick={scrollToTop}>
          <button className="px-4 py-2 bg-[#bfa046] text-white rounded-md hover:bg-[#a68d36] transition">
            Shop Now
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="shoppingBagTable w-full text-sm text-left border-collapse">
          <thead className="bg-[#fffbe9] text-[#7c5e10] uppercase text-xs font-semibold border-b border-[#bfa046]">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Discount Price</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr
                key={item?._id}
                className="border-b hover:bg-[#fff7d6] transition duration-150"
              >
                <td className="p-3">
                  <Link to={`/product/${item?.slug}`} onClick={scrollToTop}>
                    <img
                      src={getImageUrl(item?.images[0])}
                      alt={item?.title}
                      className="max-w-[80px] max-h-[80px] rounded-md object-cover"
                    />
                  </Link>
                </td>

                <td className="p-3">
                  <Link
                    to={`/product/${item?.slug}`}
                    onClick={scrollToTop}
                    className="text-[#7c5e10] font-semibold hover:text-[#bfa046]"
                  >
                    {item?.title}
                  </Link>
                </td>

                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-2 border rounded hover:bg-gray-200"
                      onClick={() =>
                        handleQuantityChange(item?._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <p>{item?.quantity}</p>
                    <button
                      className="px-2 border rounded hover:bg-gray-200"
                      onClick={() =>
                        handleQuantityChange(item?._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>

                <td className="p-3">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(item.quantity * item.price || 0)}
                </td>

                <td className="p-3">
                  {item?.discount > 0 ? `${item?.discount}%` : "-"}
                </td>

                <td className="p-3">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(item.quantity * item.discountedPrice || 0)}
                </td>

                <td className="p-3 text-red-500 hover:text-red-600 cursor-pointer">
                  <MdOutlineClose
                    size={18}
                    onClick={() => removeItem(item.productID)}
                    title="Remove Item"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Card View */}
      <div className="block md:hidden space-y-4">
        {cartItems.map((item) => (
          <div
            key={item?._id}
            className="border rounded-lg p-4 flex flex-col bg-white shadow-sm"
          >
            <div className="flex justify-between">
              <Link
                to={`/product/${item?.slug}`}
                onClick={scrollToTop}
                className="flex items-center space-x-4"
              >
                <img
                  src={getImageUrl(item?.images[0])}
                  alt={item?.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h4 className="text-sm font-semibold text-[#7c5e10]">
                    {item?.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {item?.discount > 0
                      ? `${item?.discount}% Off`
                      : "No Discount"}
                  </p>
                </div>
              </Link>

              <MdOutlineClose
                size={20}
                className="text-red-500 hover:text-red-600 cursor-pointer"
                onClick={() => removeItem(item.productID)}
              />
            </div>

            <div className="mt-3 flex justify-between items-center">
              <div className="flex items-center space-x-2 border rounded-md px-2 py-1">
                <button
                  className="text-lg font-semibold"
                  onClick={() =>
                    handleQuantityChange(item?._id, item.quantity - 1)
                  }
                >
                  -
                </button>
                <span>{item?.quantity}</span>
                <button
                  className="text-lg font-semibold"
                  onClick={() =>
                    handleQuantityChange(item?._id, item.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">
                  Price:{" "}
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(item.quantity * item.price || 0)}
                </p>
                <p className="text-sm font-semibold text-[#7c5e10]">
                  Discounted:{" "}
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(item.quantity * item.discountedPrice || 0)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingBagResponsive;
