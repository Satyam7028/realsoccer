// client/src/components/shop/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
// We are using the FaShoppingCart icon from Font Awesome to represent
// the "Add to Cart" action, a standard and recognizable icon for e-commerce.
import { FaShoppingCart } from 'react-icons/fa';

// The ProductCard component takes a 'product' object as a prop.
const ProductCard = ({ product }) => {
  const { id, name, price, imageUrl, category } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Link to the product details page */}
      <Link to={`/shop/${id}`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          <Link to={`/shop/${id}`} className="hover:text-indigo-600">
            {name}
          </Link>
        </h3>
        
        {/* Product Category (Placeholder) */}
        <p className="text-sm text-gray-500">{category}</p>
        
        {/* Product Price */}
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xl font-bold text-indigo-600">
            ${price.toFixed(2)}
          </p>
          
          {/* Add to Cart button with react-icons icon */}
          <button
            // onClick handler would be implemented here to add the product to the cart
            className="flex items-center space-x-2 bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors duration-200"
          >
            <FaShoppingCart />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
