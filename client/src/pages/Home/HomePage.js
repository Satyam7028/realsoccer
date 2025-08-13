// client/src/pages/Home/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
// We'll use a few icons from react-icons/io5 to add visual flair
// to the homepage sections.
import {
  IoNewspaperOutline,
  IoShirtOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5';

// Mock data for demonstration
const featuredNews = [
  { id: 1, title: 'Team Wins Cup!', summary: 'A thrilling victory in the final match of the season...', imageUrl: 'https://placehold.co/400x250/22c55e/ffffff?text=News+1' },
  { id: 2, title: 'Transfer Window News', summary: 'Top player signs a new contract with the club...', imageUrl: 'https://placehold.co/400x250/fde047/ffffff?text=News+2' },
  { id: 3, title: 'New Stadium Unveiled', summary: 'The club reveals its new state-of-the-art stadium...', imageUrl: 'https://placehold.co/400x250/3b82f6/ffffff?text=News+3' },
];

const featuredProducts = [
  { id: 1, name: 'Home Jersey', price: 79.99, imageUrl: 'https://placehold.co/400x400/94a3b8/ffffff?text=Jersey+1' },
  { id: 2, name: 'Team Scarf', price: 24.99, imageUrl: 'https://placehold.co/400x400/6b7280/ffffff?text=Scarf' },
  { id: 3, name: 'Player T-shirt', price: 34.99, imageUrl: 'https://placehold.co/400x400/4b5563/ffffff?text=T-shirt' },
];

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center text-white"
        style={{ backgroundImage: 'url(https://placehold.co/1200x500/1e293b/ffffff?text=Hero+Image)' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to RealSoccer
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Your destination for all things football.
          </p>
          <Link
            to="/shop"
            className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured News Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <IoNewspaperOutline className="text-indigo-600" />
            Featured News
          </h2>
          <Link to="/news" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            View All
            <IoChevronForwardOutline className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredNews.map((news) => (
            <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={news.imageUrl} alt={news.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{news.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{news.summary}</p>
                <Link to={`/news/${news.id}`} className="block mt-4 text-indigo-600 hover:underline">
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Shop Items Section */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <IoShirtOutline className="text-indigo-600" />
            Featured Products
          </h2>
          <Link to="/shop" className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
            Shop All
            <IoChevronForwardOutline className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                <p className="text-xl font-bold text-indigo-600 mt-2">${product.price.toFixed(2)}</p>
                <Link to={`/shop/${product.id}`} className="mt-4 inline-block bg-indigo-500 text-white py-2 px-6 rounded-full hover:bg-indigo-600 transition-colors duration-200">
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
