// client/src/components/shop/ProductFilter.js

import React from 'react';
// We're importing the IoFilterOutline icon from react-icons/io5,
// which is a standard icon for filtering controls.
import { IoFilterOutline } from 'react-icons/io5';

// The ProductFilter component takes 'filters' and 'onFilterChange' as props.
const ProductFilter = ({ filters, onFilterChange }) => {
  const categories = ['All', 'Apparel', 'Accessories', 'Footwear'];
  const sortOptions = ['Relevance', 'Price: Low to High', 'Price: High to Low'];

  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category });
  };

  const handleSortChange = (e) => {
    onFilterChange({ ...filters, sortBy: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <IoFilterOutline className="text-indigo-600" />
        <span>Filters</span>
      </h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Category</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleCategoryChange(category)}
                className={`w-full text-left p-2 rounded-md transition-colors duration-200 ${
                  filters.category === category
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sort By Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Sort By</h3>
        <select
          value={filters.sortBy}
          onChange={handleSortChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilter;
