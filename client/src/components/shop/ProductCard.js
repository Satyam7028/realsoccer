// client/src/components/shop/ProductCard.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { _id, name, price, image, category } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };
  
  const formattedPrice = `$${price.toFixed(2)}`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/shop/${_id}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          <Link to={`/shop/${_id}`} className="hover:text-indigo-600">
            {name}
          </Link>
        </h3>
        
        <p className="text-sm text-gray-500">{category}</p>
        
        <div className="mt-2 flex justify-between items-center">
          <p className="text-xl font-bold text-indigo-600">{formattedPrice}</p>
          
          <button
            onClick={handleAddToCart}
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