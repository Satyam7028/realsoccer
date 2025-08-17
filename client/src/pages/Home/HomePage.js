// client/src/pages/Home/HomePage.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// We'll use a few icons from react-icons/io5 to add visual flair
// to the homepage sections.
import {
  IoNewspaperOutline,
  IoShirtOutline,
  IoChevronForwardOutline,
} from 'react-icons/io5';

const HomePage = () => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch news articles from the backend API
        const newsRes = await axios.get('/api/news');
        setFeaturedNews(newsRes.data.slice(0, 3)); // Get top 3 news
        
        // Fetch products from the backend API
        const productsRes = await axios.get('/api/shop/products');
        setFeaturedProducts(productsRes.data.slice(0, 3)); // Get top 3 products
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch featured data', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

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