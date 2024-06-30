import React, { useContext, useState } from "react";
import {
  addToCart as addToCartFirestore,
  updateCartItemQuantity,
  removeFromCart
} from "../config/firebaseInit";
import { AuthContext } from "../context/AuthContext";

const TruncatedText = ({ text, maxLength }) => {
  const truncatedText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return <span>{truncatedText}</span>;
};

const ProductCard = ({ product }) => {
  const { isLoggedIn, userData } = useContext(AuthContext);
  const [cartBtn, setCartBtn] = useState(false);
  const [quantity, setQuantity] = useState(0); // Initial value of bedrooms

  const handleIncrement = async (product) => {
    if (quantity < 10) {
      setQuantity((prevquantity) => prevquantity + 1);
    }
    const { uid } = userData;
    try {
      await updateCartItemQuantity(uid, product.id, quantity + 1);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handleDecrement = async (product) => {
    if (quantity > 0) {
      setQuantity((prevquantity) => prevquantity - 1);
    }
    const { uid } = userData;
    if (quantity > 1) {
      try {
        await updateCartItemQuantity(uid, product.id, quantity - 1);
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        await removeFromCart(uid, product.id);
      } catch (error) {
        alert(error);
      }
    }
  };
  const addToCartFn = async (product) => {
    if (isLoggedIn && userData) {
      setQuantity((prevquantity) => prevquantity + 1);
      setCartBtn(true);
      const { uid } = userData;
      const { id, title, price, image } = product;
      try {
        await addToCartFirestore(uid, {
          productId: id,
          productName: title,
          productPrice: price,
          quantity: quantity + 1,
          productImage: image,
        });
        // Optionally, show a success message or update UI
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Handle error, show error message, etc.
      }
    } else {
      console.log("User not logged in or missing user data");
      // Optionally, redirect to login or show a message prompting login
    }
  };

  return (
    <div className="w-full h-[400px] max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="p-8 rounded-t-lg h-[65%]"
        src={product.image}
        alt="product image"
      />

      <div className="px-5 pb-5 h-[35%] flex flex-col justify-between">
        <div>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            <TruncatedText text={product.title} maxLength={80} />
          </h5>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>
          {cartBtn === false || quantity === 0 ? (
            <button
              onClick={() => addToCartFn(product)}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add to cart
            </button>
          ) : (
            <form className="max-w-xs mx-auto">
              <div className="relative flex items-center max-w-[11rem]">
                <button
                  onClick={() => handleDecrement(product)}
                  type="button"
                  id="decrement-button"
                  data-input-counter-decrement="bedrooms-input"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-l-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  id="bedrooms-input"
                  data-input-counter
                  data-input-counter-min="0"
                  data-input-counter-max="10"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  required
                />

                <button
                  onClick={() => handleIncrement(product)}
                  type="button"
                  id="increment-button"
                  data-input-counter-increment="bedrooms-input"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-r-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
