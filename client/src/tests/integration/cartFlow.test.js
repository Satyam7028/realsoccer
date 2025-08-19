import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

describe('Shopping Cart Flow', () => {
  it('should allow a user to add a product to the cart and see it in the cart page', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    // 1. Navigate to the shop page
    fireEvent.click(screen.getAllByRole('link', { name: /Shop/i })[0]);

    // 2. Wait for the shop page to load
    await waitFor(() => {
      expect(screen.getByText(/All Products/i)).toBeInTheDocument();
    });

    // 3. Add the first product to the cart
    fireEvent.click(screen.getAllByRole('button', { name: /Add/i })[0]);

    // 4. Navigate to the cart
    fireEvent.click(screen.getByRole('link', { name: /Cart/i }));

    // 5. Verify the product is in the cart
    await waitFor(() => {
      expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    });
  });
});
