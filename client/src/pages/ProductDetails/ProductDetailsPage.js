// client/src/pages/ProductDetails/ProductDetailsPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// We are importing a selection of icons from react-icons/io5 and react-icons/fa
// to provide clear visual cues for product details and actions.
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';

// Mock data for demonstration purposes
const mockProducts = {
  '1': {
    id: 1,
    name: 'Home Jersey',
    price: 79.99,
    imageUrl: 'https://placehold.co/600x600/94a3b8/ffffff?text=Home+Jersey',
    description: 'The official home jersey for the new season. Made from 100% recycled polyester, featuring moisture-wicking technology for ultimate comfort on and off the field.',
    rating: 4.5,
    reviews: 120,
  },
  '2': {
    id: 2,
    name: 'Team Scarf',
    price: 24.99,
    imageUrl: 'https://placehold.co/600x600/6b7280/ffffff?text=Team+Scarf',
    description: 'A classic team scarf to show your support. Made from soft, comfortable material, it\'s perfect for those chilly match days.',
    rating: 4.8,
    reviews: 55,
  },
};

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching product data from an API
  useEffect(() => {
    setLoading(true);
    const fetchProductData = () => {
      // In a real application, you would make an API call here.
      setTimeout(() => {
        setProduct(mockProducts[id]);
        setLoading(false);
      }, 500); // Simulate network delay
    };
    fetchProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        Product not found!
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-6"
        >
          <IoArrowBackOutline className="mr-2" />
          Back to Shop
        </button>
        <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
          {/* Product Image */}
          <div className="md:w-1/2 p-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {/* Rating and Reviews */}
            <div className="flex items-center mb-4 text-gray-600">
              <FaStar className="text-yellow-400 mr-1" />
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <p className="text-4xl font-bold text-indigo-600 mb-6">
              ${product.price.toFixed(2)}
            </p>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            
            {/* Add to Cart button */}
            <button
              className="flex items-center justify-center w-full bg-indigo-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <FaShoppingCart className="h-5 w-5 mr-2" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
