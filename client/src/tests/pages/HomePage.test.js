// client/src/tests/pages/HomePage.test.js
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import HomePage from '../../pages/Home/HomePage';
import { AuthProvider } from '../../context/AuthContext'; // Needed for Header/Navbar
import { CartProvider } from '../../context/CartContext'; // Needed for Header/Navbar

// Mock axios to prevent actual API calls during tests
jest.mock('axios');

describe('HomePage', () => {
  // Mock API responses
  const mockNews = [
    { _id: 'n1', title: 'Test News 1', content: '...', author: 'A', createdAt: '2023-01-01T00:00:00Z', imageUrl: 'url1' },
  ];
  const mockFixtures = [
    { _id: 'f1', homeTeam: 'Team A', awayTeam: 'Team B', league: 'L1', date: '2023-12-01T10:00:00Z', location: 'Stadium' },
  ];
  const mockProducts = [
    { _id: 'p1', name: 'Test Product 1', description: '...', price: 10, category: 'jersey', stock: 5, imageUrl: 'url2' },
  ];

  beforeEach(() => {
    // Reset mocks before each test
    axios.get.mockClear();
    axios.get.mockImplementation((url) => {
      if (url.includes('/api/news')) {
        return Promise.resolve({ data: mockNews });
      }
      if (url.includes('/api/fixtures')) {
        return Promise.resolve({ data: mockFixtures });
      }
      if (url.includes('/api/shop/products')) {
        return Promise.resolve({ data: mockProducts });
      }
      return Promise.reject(new Error('not found'));
    });
  });

  it('renders homepage sections and fetches data', async () => {
    render(
      <Router>
        <AuthProvider>
          <CartProvider>
            <HomePage />
          </CartProvider>
        </AuthProvider>
      </Router>
    );

    // Check for hero section elements
    expect(screen.getByText(/Real Soccer/i)).toBeInTheDocument();
    expect(screen.getByText(/Your ultimate football hub/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View Fixtures/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Shop Merchandise/i })).toBeInTheDocument();

    // Check for section titles
    expect(screen.getByText(/Featured News/i)).toBeInTheDocument();
    expect(screen.getByText(/Upcoming Fixtures/i)).toBeInTheDocument();
    expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();

    // Wait for API calls to resolve and content to appear
    await waitFor(() => {
      expect(screen.getByText('Test News 1')).toBeInTheDocument();
      expect(screen.getByText(/Team A vs Team B/i)).toBeInTheDocument();
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    // Verify API calls were made
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/api/news'), expect.any(Object));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/api/fixtures'), expect.any(Object));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/api/shop/products'), expect.any(Object));
  });

  it('displays loading spinners while fetching data', () => {
    axios.get.mockImplementation(() => new Promise(() => {})); // Never resolve to keep loading

    render(
      <Router>
        <AuthProvider>
          <CartProvider>
            <HomePage />
          </CartProvider>
        </AuthProvider>
      </Router>
    );

    expect(screen.getAllByText(/Loading/i).length).toBeGreaterThanOrEqual(3); // At least one for each section
    expect(screen.getAllByRole('img', { name: /loading/i }).length).toBeGreaterThanOrEqual(3); // Spinners
  });

  it('displays error messages if data fetching fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error')); // Simulate network error for news
    axios.get.mockRejectedValueOnce(new Error('Fixture Error')); // Simulate error for fixtures
    axios.get.mockRejectedValueOnce(new Error('Product Error')); // Simulate error for products

    render(
      <Router>
        <AuthProvider>
          <CartProvider>
            <HomePage />
          </CartProvider>
        </AuthProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/Failed to load featured news/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to load upcoming fixtures/i)).toBeInTheDocument();
      expect(screen.getByText(/Failed to load featured products/i)).toBeInTheDocument();
    });
  });

  it('displays "No items found" messages if data is empty', async () => {
    axios.get.mockResolvedValue({ data: [] }); // Return empty arrays for all

    render(
      <Router>
        <AuthProvider>
          <CartProvider>
            <HomePage />
          </CartProvider>
        </AuthProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/No featured news available/i)).toBeInTheDocument();
      expect(screen.getByText(/No upcoming fixtures scheduled/i)).toBeInTheDocument();
      expect(screen.getByText(/No featured products available/i)).toBeInTheDocument();
    });
  });
});