// client/src/tests/components/Button.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/common/Button';

describe('Button Component', () => {
  it('renders with default primary variant and medium size', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByText(/Click Me/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-blue-600'); // Primary variant
    expect(button).toHaveClass('px-4 py-2'); // Medium size
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText(/Secondary Button/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-gray-200');
  });

  it('renders with danger variant', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByText(/Delete/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-600');
  });

  it('renders with small size', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByText(/Small Button/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('px-3 py-1.5');
  });

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByText(/Disabled Button/i);
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const button = screen.getByText(/Clickable/i);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Disabled Clickable</Button>);
    const button = screen.getByText(/Disabled Clickable/i);
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders children correctly', () => {
    render(<Button><span>Custom Child</span></Button>);
    expect(screen.getByText(/Custom Child/i)).toBeInTheDocument();
  });

  it('applies additional className prop', () => {
    render(<Button className="custom-class">Styled Button</Button>);
    const button = screen.getByText(/Styled Button/i);
    expect(button).toHaveClass('custom-class');
  });

  it('renders as a submit button', () => {
    render(<Button type="submit">Submit Form</Button>);
    const button = screen.getByText(/Submit Form/i);
    expect(button).toHaveAttribute('type', 'submit');
  });

  it('renders as full width', () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByText(/Full Width Button/i);
    expect(button).toHaveClass('w-full');
  });
});