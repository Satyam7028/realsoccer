// client/src/components/common/LoadingSpinner.js
import React from 'react';
import { ClipLoader, DotLoader, HashLoader, RingLoader } from 'react-spinners'; // Popular spinner components

/**
 * Reusable Loading Spinner component.
 * Displays a visual loading indicator.
 *
 * @param {object} props - Component props.
 * @param {string} [props.type='clip'] - Type of spinner ('clip', 'dot', 'hash', 'ring').
 * @param {string} [props.color='#3B82F6'] - Color of the spinner (Tailwind blue-500 equivalent).
 * @param {number} [props.size=50] - Size of the spinner in pixels.
 * @param {boolean} [props.loading=true] - Whether the spinner should be visible.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for the container.
 */
const LoadingSpinner = ({
  type = 'clip',
  color = '#3B82F6', // Default to Tailwind blue-600
  size = 50,
  loading = true,
  className = '',
}) => {
  if (!loading) return null;

  const spinnerProps = { color, loading, size };

  let SpinnerComponent;
  switch (type) {
    case 'dot':
      SpinnerComponent = DotLoader;
      break;
    case 'hash':
      SpinnerComponent = HashLoader;
      break;
    case 'ring':
      SpinnerComponent = RingLoader;
      break;
    case 'clip':
    default:
      SpinnerComponent = ClipLoader;
      break;
  }

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <SpinnerComponent {...spinnerProps} />
    </div>
  );
};

export default LoadingSpinner;