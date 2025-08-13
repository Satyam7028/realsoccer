// client/src/pages/News/NewsPage.js

import React, { useState, useEffect } from 'react';
// Corrected import path
import { API_ENDPOINTS } from '../../shared/apiEndpoints';
import { IoNewspaperOutline } from 'react-icons/io5';
import NewsArticleCard from '../../components/news/NewsArticleCard';

// Mock data for demonstration purposes
const mockNewsArticles = [
  {
    id: 1,
    title: 'Team Wins Cup!',
    summary: 'A thrilling victory in the final match of the season...',
    imageUrl: 'https://placehold.co/400x250/22c55e/ffffff?text=News+1',
    date: '2024-10-25',
  },
  {
    id: 2,
    title: 'Transfer Window News',
    summary: 'Top player signs a new contract with the club...',
    imageUrl: 'https://placehold.co/400x250/fde047/ffffff?text=News+2',
    date: '2024-10-24',
  },
  {
    id: 3,
    title: 'New Stadium Unveiled',
    summary: 'The club reveals its new state-of-the-art stadium...',
    imageUrl: 'https://placehold.co/400x250/3b82f6/ffffff?text=News+3',
    date: '2024-10-23',
  },
  {
    id: 4,
    title: 'Match Highlights',
    summary: 'Watch the best moments from yesterday\'s thrilling match...',
    imageUrl: 'https://placehold.co/400x250/1e293b/ffffff?text=Highlights',
    date: '2024-10-22',
  },
];

const NewsPage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    console.log('Fetching news articles from:', API_ENDPOINTS.NEWS);

    setTimeout(() => {
      setNewsArticles(mockNewsArticles);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading news...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <IoNewspaperOutline className="text-indigo-600" />
          <span>Latest News</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsArticles.length > 0 ? (
            newsArticles.map((article) => (
              <NewsArticleCard key={article.id} article={article} />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">No news articles found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
