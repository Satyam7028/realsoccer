// client/src/tests/integration/cartFlow.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

describe('Shopping Cart Flow', () => {
  it('should allow a user to add a product to the cart and see it in the cart page', async () => {
    render(<App />);

    // 1. Navigate to the shop page
    fireEvent.click(screen.getByRole('link', { name: /Shop/i }));

    // Wait until the shop page loads
    await waitFor(() => {
      expect(screen.getByText(/Shop Page/i)).toBeInTheDocument();
    });

    // 2. Find a product and click "Add" button
    const addButtons = await screen.findAllByRole('button', { name: /Add/i });
    fireEvent.click(addButtons[0]);

    // 3. Navigate to the cart page
    fireEvent.click(screen.getByRole('link', { name: /Cart/i }));

    // 4. Check if the product is in the cart page
    await waitFor(() => {
      expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
      expect(screen.getByText(/Total/i)).toBeInTheDocument();
    });
  });
});
