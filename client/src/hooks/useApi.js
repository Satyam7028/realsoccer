// client/src/hooks/useApi.js
import { useState, useCallback } from 'react';
import api from '../services/api'; // Our configured Axios instance

/**
 * Custom hook for making API requests.
 * Provides loading state, error state, and a function to make requests.
 *
 * @returns {object} - An object containing:
 * - data: The response data from the API.
 * - loading: Boolean indicating if a request is in progress.
 * - error: Error object if the request failed.
 * - request: Function to trigger an API request.
 */
const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (method, url, payload = null, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      let response;
      switch (method.toLowerCase()) {
        case 'get':
          response = await api.get(url, config);
          break;
        case 'post':
          response = await api.post(url, payload, config);
          break;
        case 'put':
          response = await api.put(url, payload, config);
          break;
        case 'delete':
          response = await api.delete(url, config);
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }
      setData(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : err.message;
      setError(errorMessage);
      throw err; // Re-throw to allow component to catch specific errors
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, request };
};

export default useApi;