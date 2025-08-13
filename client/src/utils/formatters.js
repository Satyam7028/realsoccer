// client/src/utils/formatters.js

/**
 * Formats a raw date string (e.g., from ISO) into a more readable format.
 * @param {string} dateString - The date string to format.
 * @param {object} [options] - Options for toLocaleDateString and toLocaleTimeString.
 * @returns {string} - Formatted date string.
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const mergedOptions = { ...defaultOptions, ...options };
  return date.toLocaleString('en-US', mergedOptions);
};

/**
 * Formats a number as a currency string.
 * @param {number} amount - The numeric amount to format.
 * @param {string} [currency='USD'] - The currency code (e.g., 'USD', 'EUR').
 * @returns {string} - Formatted currency string.
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (typeof amount !== 'number') return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// You can add more formatters as needed, e.g., for player stats, addresses, etc.