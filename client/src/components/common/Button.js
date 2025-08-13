// client/src/components/common/Button.js
import React from 'react';
import { twMerge } from 'tailwind-merge'; // For merging Tailwind classes safely

/**
 * Reusable Button component with Tailwind CSS styling.
 * Supports different variants, sizes, and disabled states.
 *
 * @param {object} props - Component props.
 * @param {string} [props.variant='primary'] - Button style variant ('primary', 'secondary', 'danger', 'outline', 'ghost').
 * @param {string} [props.size='md'] - Button size ('sm', 'md', 'lg').
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes to apply.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {function} [props.onClick] - Click event handler.
 * @param {string} [props.type='button'] - Button type ('button', 'submit', 'reset').
 * @param {boolean} [props.fullWidth=false] - Whether the button should take full width.
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  children,
  onClick,
  type = 'button',
  fullWidth = false,
  ...rest
}) => {
  // Base styles for all buttons
  const baseStyles = 'font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75';

  // Variant-specific styles
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 border border-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-md',
    outline: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300',
  };

  // Size-specific styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Disabled styles
  const disabledStyles = 'opacity-50 cursor-not-allowed';

  // Full width style
  const fullWidthStyle = fullWidth ? 'w-full' : '';

  // Merge all classes using tailwind-merge for clean output
  const mergedClasses = twMerge(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabled ? disabledStyles : '',
    fullWidthStyle,
    className
  );

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={mergedClasses}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;