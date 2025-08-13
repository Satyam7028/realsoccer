// client/src/pages/Cart/CartPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// We are importing a selection of icons from react-icons/io5
// and react-icons/fa to provide clear visual cues for the cart page.
import {
  IoArrowBackOutline,
  IoAlertCircleOutline,
} from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';

// Mock components and data for demonstration purposes
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';

const mockCartItems = [
  { id: 1, name: 'Home Jersey', price: 79.99, imageUrl: 'https://placehold.co/100x100/94a3b8/ffffff?text=Jersey', quantity: 1 },
  { id: 2, name: 'Team Scarf', price: 24.99, imageUrl: 'https://placehold.co/100x100/6b7280/ffffff?text=Scarf', quantity: 2 },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching cart data from a state management store or API
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCartItems(mockCartItems);
      setLoading(false);
    }, 500);
  }, []);

  // Calculate total price and item count
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Function to handle removing an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Function to handle quantity changes for an item
  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <FaShoppingCart className="text-indigo-600" />
          <span>Shopping Cart</span>
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="md:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-md">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onRemove={handleRemoveItem}
                    onQuantityChange={handleQuantityChange}
                  />
                ))}
              </div>
            </div>

            {/* Cart Summary */}
            <div className="md:col-span-1">
              <CartSummary total={total} itemCount={itemCount} />
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <IoAlertCircleOutline className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty.</h2>
            <p className="text-gray-600 mb-6">Start shopping to add items to your cart.</p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-indigo-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              <IoArrowBackOutline />
              <span>Continue Shopping</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
