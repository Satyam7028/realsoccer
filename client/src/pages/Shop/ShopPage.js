// client/src/pages/Shop/ShopPage.js

import React, { useState, useEffect } from 'react';
// This import path has been corrected to resolve the module not found error.
import { API_ENDPOINTS } from '../../shared/apiEndpoints';
import { IoShirtOutline } from 'react-icons/io5';
import ProductCard from '../../components/shop/ProductCard';
import ProductFilter from '../../components/shop/ProductFilter';

// Mock data for demonstration purposes
const mockProducts = [
  { id: 1, name: 'Home Jersey', price: 79.99, imageUrl: 'https://placehold.co/400x400/94a3b8/ffffff?text=Jersey+1', category: 'Apparel' },
  { id: 2, name: 'Away Jersey', price: 79.99, imageUrl: 'https://placehold.co/400x400/6b7280/ffffff?text=Jersey+2', category: 'Apparel' },
  { id: 3, name: 'Team Scarf', price: 24.99, imageUrl: 'https://placehold.co/400x400/4b5563/ffffff?text=Scarf', category: 'Accessories' },
  { id: 4, name: 'Player T-shirt', price: 34.99, imageUrl: 'https://placehold.co/400x400/e2e8f0/4a5568?text=T-shirt', category: 'Apparel' },
  { id: 5, name: 'Team Cap', price: 19.99, imageUrl: 'https://placehold.co/400x400/cbd5e1/4a5568?text=Cap', category: 'Accessories' },
];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'All',
    sortBy: 'Relevance',
  });

  useEffect(() => {
    setLoading(true);
    console.log('Fetching products from:', API_ENDPOINTS.PRODUCTS);

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 500);
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredProducts = products.filter(product => {
    if (filters.category === 'All') return true;
    return product.category === filters.category;
  }).sort((a, b) => {
    if (filters.sortBy === 'Price: Low to High') {
      return a.price - b.price;
    }
    if (filters.sortBy === 'Price: High to Low') {
      return b.price - a.price;
    }
    return 0; // Default to relevance
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading shop...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <IoShirtOutline className="text-indigo-600" />
          <span>Shop</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <ProductFilter filters={filters} onFilterChange={handleFilterChange} />
          </div>

          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="text-gray-600 text-center col-span-3">No products found for this filter.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  };

export default ShopPage;
