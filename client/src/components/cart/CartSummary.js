// client/src/components/cart/CartSummary.js

import React from 'react';
import { Link } from 'react-router-dom';
// The FaCreditCard icon is used here to represent a payment/checkout action,
// which is a standard icon for e-commerce checkouts.
import { FaCreditCard } from 'react-icons/fa';

const CartSummary = ({ total, itemCount }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
        Cart Summary
      </h2>

      {/* Item count */}
      <div className="flex justify-between items-center text-lg text-gray-600 mb-2">
        <span>Items ({itemCount})</span>
        <span className="font-semibold">{itemCount}</span>
      </div>

      {/* Subtotal */}
      <div className="flex justify-between items-center text-lg text-gray-600 mb-4">
        <span>Subtotal</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>

      {/* Total with Tax/Shipping (placeholder) */}
      <div className="flex justify-between items-center text-2xl font-bold text-gray-800 border-t pt-4">
        <span>Order Total</span>
        <span>${(total).toFixed(2)}</span>
      </div>
      
      {/* Checkout Button */}
      <Link to="/checkout" className="mt-6 block">
        <button className="flex items-center justify-center w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          <FaCreditCard className="h-5 w-5 mr-2" />
          <span>Proceed to Checkout</span>
        </button>
      </Link>
    </div>
  );
};

export default CartSummary;
