// client/src/pages/Admin/NewsManagement/NewsManagementPage.js

import React, { useState } from 'react';
// We are importing a selection of icons from react-icons/io5 and react-icons/fa
// to provide clear visual cues for the news management page.
import {
  IoNewspaperOutline,
  IoAddCircleOutline,
  IoPencil,
  IoTrash,
} from 'react-icons/io5';
import { FaSave } from 'react-icons/fa';

// Mock data for demonstration purposes
const mockNewsArticles = [
  { id: 1, title: 'Team Wins Cup!', author: 'John Doe', date: '2024-10-25' },
  { id: 2, title: 'Transfer Window News', author: 'Jane Smith', date: '2024-10-24' },
];

const NewsManagementPage = () => {
  const [articles, setArticles] = useState(mockNewsArticles);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddArticle = () => {
    // In a real app, you would generate a unique ID.
    const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    const newArticle = { ...formData, id: newId };
    setArticles([...articles, newArticle]);
    setFormData({ title: '', author: '', date: '' });
    setIsEditing(false);
  };

  const handleUpdateArticle = () => {
    setArticles(articles.map(a => (a.id === currentArticle.id ? { ...a, ...formData } : a)));
    setFormData({ title: '', author: '', date: '' });
    setIsEditing(false);
    setCurrentArticle(null);
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setFormData({
      title: article.title,
      author: article.author,
      date: article.date,
    });
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentArticle(null);
    setFormData({ title: '', author: '', date: '' });
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <IoNewspaperOutline className="text-indigo-600" />
        <span>News Management</span>
      </h1>

      {/* Add/Edit Article Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
          {isEditing ? <IoPencil /> : <IoAddCircleOutline />}
          <span>{isEditing ? 'Edit Article' : 'Add New Article'}</span>
        </h2>
        <form onSubmit={(e) => { e.preventDefault(); isEditing ? handleUpdateArticle() : handleAddArticle(); }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="title"
              placeholder="Article Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="date"
              name="date"
              placeholder="Publication Date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mt-4 flex space-x-2">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              <FaSave />
              <span>{isEditing ? 'Save Changes' : 'Add Article'}</span>
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                <span>Cancel</span>
              </button>
            )}
          </div>
        </form>
      </div>

      {/* News Article Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles.length > 0 ? (
              articles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {article.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {article.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleEdit(article)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <IoPencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <IoTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No news articles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsManagementPage;
