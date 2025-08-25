import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/shop/ProductCard';
import { CartContext } from '../../context/CartContext';

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  price: 100,
  image: '/test-image.jpg',
};

describe('ProductCard', () => {
  test('renders product information correctly', () => {
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ addToCart: jest.fn() }}>
          <ProductCard product={mockProduct} />
        </CartContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.jpg');
  });

  test('calls addToCart when Add button is clicked', () => {
    const mockAddToCart = jest.fn();

    render(
      <BrowserRouter>
        <CartContext.Provider value={{ addToCart: mockAddToCart }}>
          <ProductCard product={mockProduct} />
        </CartContext.Provider>
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});