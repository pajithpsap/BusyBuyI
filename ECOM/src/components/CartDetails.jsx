import React, { useContext, useEffect, useState } from "react";
import { getCartItems, removeFromCart, addOrder, clearCart } from "../config/firebaseInit";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const CartDetails = () => {
  const { isLoggedIn, userData } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    if (isLoggedIn && userData) {
      try {
        const items = await getCartItems(userData.uid);
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    }
  };

  const removeItem = async (uid, pid) => {
    try {
      await removeFromCart(uid, pid);
      fetchCartItems(); // Refresh cart items after removal
    } catch (error) {
      alert(error);
    }
  };

  const handleCheckout = async () => {
    try {
      const orderDetails = {
        items: cartItems,
        totalAmount: getTotalCartAmount() + 2, // Assuming $2 is the delivery fee
      };
      await addOrder(userData.uid, orderDetails);
      await clearCart(userData.uid);
      setCartItems([]); // Clear the cart after checkout
      navigate('/orders'); // Navigate to order summary page
    } catch (error) {
      console.error("Error during checkout: ", error);
      alert("Error during checkout. Please try again.");
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [isLoggedIn, userData]);

  const getTotalCartAmount = () => {
    return cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  };

  return (
    <div className='cart mt-[100px] w-[90%] mx-auto'>
      <div className="cart-items">
        <div className="cart-items-title grid grid-cols-12 text-[grey] text-[max(1vw,15px)] items-center">
          <p className='col-span-2'>Items</p>
          <p className='col-span-3'>Title</p>
          <p className='col-span-2'>Price</p>
          <p className='col-span-2'>Quantity</p>
          <p className='col-span-2'>Total</p>
          <p className='col-span-1'>Remove</p>
        </div>
        <br />
        <hr />
        {cartItems.map((item) => (
          <div key={item.id}>
            <div className='cart-items-title cart-items-item text-black grid grid-cols-12 text-[max(1vw,15px)] items-center my-[10px] mx-0'>
              <div className='col-span-2'>
                <img src={item.productImage} alt="" className='w-[50px]' />
              </div>
              <p className='col-span-3'>{item.productName}</p>
              <p className='col-span-2'>${item.productPrice}</p>
              <p className='col-span-2'>{item.quantity}</p>
              <p className='col-span-2'>${item.productPrice * item.quantity}</p>
              <p onClick={() => removeItem(userData.uid, item.id)} className='col-span-1 cursor-pointer'>x</p>
            </div>
            <hr className='h-[1px] bg-[#e2e2e2] border-none' />
          </div>
        ))}
      </div>
      <div className="cart-bottom mt-[80px] flex justify-between gap-[max(12vw,20px)] 
      max-[750px]:flex-col-reverse
      ">
        <div className="cart-total flex-1 flex flex-col gap-[20px]">
          <h2>Cart Totals</h2>
          <div>
            <div className="total-details flex justify-between text-[#555]">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr className='my-[10px] mx-0' />
            <div className="total-details flex justify-between text-[#555]">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr className='my-[10px] mx-0' />
            <div className="total-details flex justify-between text-[#555]">
              <p>Total</p>
              <p>${getTotalCartAmount() === 0 ? 0 : (getTotalCartAmount() + 2).toFixed(2)}</p>
            </div>
          </div>
          <button onClick={handleCheckout} className='border-none text-white bg-blue-500 w-[max(15vw,200px)] py-[12px] mx-0 rounded-[4px] cursor-pointer'>Proceed to checkout</button>
        </div>
        <div className="promo-code flex-1 max-[750px]:justify-start">
          <div>
            <p className='text-[#555] '>If you have a promo code, enter it here</p>
            <div className='promo-ip mt-[10px] flex justify-between items-center bg-[#eaeaea] rounded-[4px]'>
              <input type="text" placeholder='promo code' className='bg-transparent border-none outline-none pl-[10px]' />
              <button className='w-[max(10vw,150px)] py-[12px] px-[5px] bg-black border-none text-white rounded-[4px]'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
