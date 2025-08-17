import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

// Mock axios so App/HomePage doesn't import the real ESM module
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('HomePage', () => {
  test('renders homepage and loads featured data', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/RealSoccer/i)).toBeInTheDocument();
    });
  });
});
