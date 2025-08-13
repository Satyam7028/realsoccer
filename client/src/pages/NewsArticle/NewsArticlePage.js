// client/src/pages/NewsArticle/NewsArticlePage.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// We are importing a selection of icons from react-icons/io5
// to provide clear visual cues for navigation and article details.
import {
  IoArrowBackOutline,
  IoCalendarOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';

// Mock data for demonstration purposes
const mockArticles = {
  '1': {
    id: 1,
    title: 'Team Wins Cup!',
    author: 'John Doe',
    date: '2024-10-25',
    imageUrl: 'https://placehold.co/800x400/22c55e/ffffff?text=Team+Wins+Cup',
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.

      Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
      adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
      dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
      exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
      consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
      quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
      nulla pariatur?
    `,
  },
  '2': {
    id: 2,
    title: 'Transfer Window News',
    author: 'Jane Smith',
    date: '2024-10-24',
    imageUrl: 'https://placehold.co/800x400/fde047/ffffff?text=Transfer+News',
    content: `
      The transfer market has been buzzing with activity. Several key players have made
      moves, with some surprising deals being finalized in the last few hours. Our sources
      indicate that RealSoccer United is on the verge of signing a new midfielder, a move
      that would bolster their squad for the upcoming season.

      The team's manager has been quoted as saying that the new signing will bring
      creativity and experience to the midfield, and is excited about the potential
      impact on the team's performance. Fans are eagerly awaiting the official
      announcement.
    `,
  },
};

const NewsArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate fetching article data from an API
  useEffect(() => {
    setLoading(true);
    const fetchArticleData = () => {
      // In a real application, you would make an API call here.
      setTimeout(() => {
        setArticle(mockArticles[id]);
        setLoading(false);
      }, 500); // Simulate network delay
    };
    fetchArticleData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading article...
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        Article not found!
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 mb-6"
          >
            <IoArrowBackOutline className="mr-2" />
            Back to News
          </button>

          {/* Article Header */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
          <div className="flex items-center space-x-4 text-gray-500 text-sm mb-6">
            <div className="flex items-center space-x-1">
              <IoPersonCircleOutline />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <IoCalendarOutline />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Article Image */}
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-auto rounded-lg mb-8"
          />

          {/* Article Content */}
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticlePage;
