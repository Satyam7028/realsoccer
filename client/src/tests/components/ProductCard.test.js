import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/shop/ProductCard';

const mockProduct = {
  _id: '1',
  name: 'Test Product',
  price: 29.99,
  imageUrl: 'test.jpg',
};

describe('ProductCard', () => {
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$29.99/)).toBeInTheDocument();
  });

  test('calls onClick handler when Add button is clicked', () => {
    const mockAdd = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAdd} />);
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    expect(mockAdd).toHaveBeenCalled();
  });
});
