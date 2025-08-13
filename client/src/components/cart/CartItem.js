// client/src/components/cart/CartItem.js

import React from 'react';
// We use FaTrash from Font Awesome for the remove button,
// providing a familiar and clear icon for deleting items from the cart.
import { FaTrash } from 'react-icons/fa';

// The CartItem component takes a 'item' object and `onRemove` and
// `onQuantityChange` functions as props.
const CartItem = ({ item, onRemove, onQuantityChange }) => {
  const { id, name, price, imageUrl, quantity } = item;

  // Handles quantity change with a simple debounce or direct update
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      onQuantityChange(id, newQuantity);
    }
  };

  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md mb-4">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 object-cover rounded-md"
      />

      <div className="flex-1">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

        {/* Product Price */}
        <p className="text-md text-indigo-600">${price.toFixed(2)}</p>
      </div>

      {/* Quantity Input */}
      <div className="flex items-center space-x-2">
        <label htmlFor={`quantity-${id}`} className="sr-only">Quantity</label>
        <input
          id={`quantity-${id}`}
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          className="w-16 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Total Price for the item */}
      <div className="w-24 text-right">
        <p className="text-lg font-bold text-gray-800">${(price * quantity).toFixed(2)}</p>
      </div>

      {/* Remove Button with react-icons */}
      <button
        onClick={() => onRemove(id)}
        className="text-red-500 hover:text-red-700 transition-colors duration-200 focus:outline-none"
      >
        <FaTrash className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;
