// client/src/components/news/NewsFeed.js
import React from 'react';
import NewsArticleCard from './NewsArticleCard';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Displays a feed of news articles using NewsArticleCard components.
 *
 * @param {object} props - Component props.
 * @param {Array<object>} props.articles - An array of news article objects to display.
 * @param {boolean} [props.loading=false] - Indicates if the news data is currently loading.
 * @param {string} [props.error=null] - An error message to display if data fetching fails.
 * @param {string} [props.emptyMessage='No news articles found.'] - Message to display when the articles array is empty.
 */
const NewsFeed = ({ articles, loading = false, error = null, emptyMessage = 'No news articles found.' }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <LoadingSpinner />
        <p className="ml-3 text-lg text-gray-700">Loading news...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-600">
        <p className="text-xl font-semibold">Error loading news:</p>
        <p className="text-md">{error}</p>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p className="text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsArticleCard key={article._id} article={article} />
      ))}
    </div>
  );
};

export default NewsFeed;