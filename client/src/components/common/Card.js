// client/src/components/common/Card.js
import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Reusable Card component with Tailwind CSS styling.
 * Provides a consistent visual container for various content.
 *
 * @param {object} props - Component props.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for the card container.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 */
const Card = ({ className = '', children, ...rest }) => {
  // Base styles for the card
  const baseStyles = 'bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200';

  // Merge custom classes with base styles
  const mergedClasses = twMerge(baseStyles, className);

  return (
    <div className={mergedClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;