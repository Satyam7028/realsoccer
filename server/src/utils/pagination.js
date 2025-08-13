// server/src/utils/pagination.js
/**
 * Helper function to generate pagination details for API responses.
 * @param {number} page - The current page number (1-indexed).
 * @param {number} limit - The number of items per page.
 * @param {number} totalCount - The total number of items available.
 * @returns {object} - An object containing pagination metadata.
 */
const getPagination = (page, limit, totalCount) => {
  const currentPage = parseInt(page, 10) || 1;
  const itemsPerPage = parseInt(limit, 10) || 10;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;
  const nextPage = hasNextPage ? currentPage + 1 : null;
  const prevPage = hasPrevPage ? currentPage - 1 : null;

  return {
    totalItems: totalCount,
    itemsPerPage,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage,
    prevPage,
  };
};

module.exports = { getPagination };