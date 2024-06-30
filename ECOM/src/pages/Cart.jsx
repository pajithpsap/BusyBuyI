import React from 'react'
import { getCartItems } from '../config/firebaseInit'
import CartDetails from '../components/CartDetails'

const Cart = () => {

  return (
    <div>
      <CartDetails />
    </div>
  )
}

export default Cart