import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseInit";
import { AuthContext } from "../context/AuthContext";

const OrderDetails = () => {
  const { userData } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, `orders`));
        const userOrders = querySnapshot.docs
          .filter(doc => doc.data().userId === userData.uid)
          .map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, [userData]);

  return (
    <div className='order-summary mt-[100px] w-[90%] mx-auto'>
      <h1 className='text-2xl font-bold'>Order Summary</h1>
      <div className="orders mt-[20px]">
        {orders.map(order => (
          <div key={order.id} className='order-item mb-[20px] p-[20px] border rounded'>
            <h2 className='text-xl'>Order ID: {order.id}</h2>
            <p>Date: {new Date(order.timestamp.seconds * 1000).toLocaleString()}</p>
            <div className='order-items mt-[10px]'>
              {order.items.map((item, index) => (
                <div key={index} className='order-item-details flex justify-between'>
                  <p>{item.productName} (x{item.quantity})</p>
                  <p>${item.productPrice}</p>
                </div>
              ))}
            </div>
            <div className='order-total mt-[10px] flex justify-between'>
              <p>Total:</p>
              <p>${order.totalAmount}</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')} className='border-none text-white bg-blue-500 w-[max(15vw,200px)] py-[12px] mx-0 rounded-[4px] cursor-pointer'>Back to Home</button>
    </div>
  );
};

export default OrderDetails;
