import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { CartProvider } from '../../context/CartContext';
import { Provider } from 'react-redux';
import store from '../../state/store';

describe('Shopping Cart Flow', () => {
  test('should allow a user to add a product to the cart and see it in the cart page', async () => {
    render(
      <Provider store={store}>
        <CartProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CartProvider>
      </Provider>
    );

    // 1. Navigate to the shop page
    fireEvent.click(screen.getAllByRole('link', { name: /Shop/i })[0]);

    // 2. Wait for the shop page to load
    await waitFor(() => {
      // Look for the "All" button in the filter section
      const allButtons = screen.getAllByText(/All/i);
      const filterButton = allButtons.find(button => 
        button.className.includes('bg-indigo-500') || 
        button.className.includes('filter') ||
        button.closest('[class*="filter"]')
      );
      expect(filterButton).toBeInTheDocument();
    });

    // 3. Add the first product to the cart
    fireEvent.click(screen.getAllByRole('button', { name: /Add/i })[0]);

    // 4. Navigate to the cart
    const cartLinks = screen.getAllByRole('link', { href: '/cart' });
    fireEvent.click(cartLinks[0]); // Click the first cart link (header)

    // 5. Verify the product is in the cart
    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });
  });
});
