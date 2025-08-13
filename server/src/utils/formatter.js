// server/src/utils/formatter.js

/**
 * Formats a date object into a readable string.
 * @param {Date} date - The date object to format.
 * @returns {string} - Formatted date string (e.g., "YYYY-MM-DD HH:MM:SS").
 */
const formatDate = (date) => {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * Formats a price to a currency string.
 * @param {number} price - The price to format.
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR').
 * @returns {string} - Formatted currency string (e.g., "$123.45").
 */
const formatCurrency = (price, currency = 'USD') => {
  if (typeof price !== 'number') return null;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
};

// You can add more formatter functions as needed, e.g., for player stats, names, etc.

module.exports = {
  formatDate,
  formatCurrency,
};