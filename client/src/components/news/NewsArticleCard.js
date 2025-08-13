// client/src/components/news/NewsArticleCard.js

import React from 'react';
import { Link } from 'react-router-dom';
// IoArrowForwardOutline is a good icon to indicate a "read more" action,
// replacing any previous lucide-react icons.
import { IoArrowForwardOutline } from 'react-icons/io5';

// The NewsArticleCard component takes an 'article' object as a prop.
const NewsArticleCard = ({ article }) => {
  const { id, title, summary, imageUrl, date } = article;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Link to the news article details page */}
      <Link to={`/news/${id}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      
      <div className="p-4">
        <span className="text-sm text-gray-500">{date}</span>
        
        {/* Article Title */}
        <h3 className="text-lg font-semibold text-gray-800 mt-1">
          <Link to={`/news/${id}`} className="hover:text-indigo-600">
            {title}
          </Link>
        </h3>
        
        {/* Article Summary */}
        <p className="text-sm text-gray-600 mt-2">{summary}</p>
        
        {/* Read More link with icon */}
        <Link
          to={`/news/${id}`}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mt-4"
        >
          <span>Read More</span>
          <IoArrowForwardOutline className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default NewsArticleCard;
