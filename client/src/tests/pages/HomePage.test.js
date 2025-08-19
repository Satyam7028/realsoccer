import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

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
      expect(
        screen.getByRole('heading', { name: /Welcome to RealSoccer/i })
      ).toBeInTheDocument();
    });
  });
});
