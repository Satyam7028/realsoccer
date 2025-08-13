// client/src/components/shop/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Displays a list of ProductCard components.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.products - An array of product objects to display.
 * @param {boolean} [props.loading=false] - Indicates if the product data is currently loading.
 * @param {string} [props.error=null] - An error message to display if data fetching fails.
 * @param {string} [props.emptyMessage='No products found.'] - Message to display when the products array is empty.
 */
const ProductList = ({ products, loading = false, error = null, emptyMessage = 'No products found.' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
        <p className="ml-3 text-lg text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-xl font-semibold">Error loading products:</p>
        <p className="text-md">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;