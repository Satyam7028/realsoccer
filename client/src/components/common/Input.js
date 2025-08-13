// client/src/components/common/Input.js
import React from 'react';
import { twMerge } from 'tailwind-merge'; // For merging Tailwind classes safely

/**
 * Reusable Input component with Tailwind CSS styling and optional error display.
 *
 * @param {object} props - Component props.
 * @param {string} props.id - Unique ID for the input and label.
 * @param {string} props.name - Name attribute for the input.
 * @param {string} [props.type='text'] - Input type (e.g., 'text', 'email', 'password', 'number').
 * @param {string} [props.label] - Optional label for the input.
 * @param {string} [props.placeholder] - Placeholder text.
 * @param {string} [props.value] - Current value of the input.
 * @param {function} [props.onChange] - Change event handler.
 * @param {boolean} [props.required=false] - Whether the input is required.
 * @param {boolean} [props.disabled=false] - Whether the input is disabled.
 * @param {string} [props.className=''] - Additional Tailwind CSS classes for the input element.
 * @param {string} [props.labelClassName=''] - Additional Tailwind CSS classes for the label element.
 * @param {string} [props.error] - Error message to display.
 * @param {boolean} [props.fullWidth=false] - Whether the input should take full width.
 * @param {React.Ref} [props.inputRef] - Ref for the input element.
 */
const Input = ({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  labelClassName = '',
  error,
  fullWidth = false,
  inputRef,
  ...rest
}) => {
  // Base styles for the input field
  const baseInputStyles = 'block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none transition-all duration-200';

  // Styles for different states
  const defaultInputStyles = 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
  const errorInputStyles = 'border-red-500 focus:ring-red-500 focus:border-red-500';
  const disabledInputStyles = 'bg-gray-100 text-gray-500 cursor-not-allowed';

  // Merge classes based on state and props
  const mergedInputClasses = twMerge(
    baseInputStyles,
    error ? errorInputStyles : defaultInputStyles,
    disabled ? disabledInputStyles : '',
    fullWidth ? 'w-full' : '',
    className
  );

  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label htmlFor={id} className={twMerge('block text-gray-700 text-sm font-medium mb-1', labelClassName)}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={mergedInputClasses}
        ref={inputRef}
        {...rest}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;