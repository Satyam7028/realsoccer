// client/src/components/admin/ProductForm.js
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../shared/constants/apiEndpoints';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * Form for administrators to create or edit product information.
 *
 * @param {object} props - Component props.
 * @param {object} [props.productToEdit=null] - Optional product object if in edit mode.
 * @param {function} [props.onSuccess] - Callback function after successful creation/update.
 * @param {function} [props.onCancel] - Callback function when cancel button is clicked.
 */
const ProductForm = ({ productToEdit = null, onSuccess, onCancel }) => {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  const productCategories = [
    'jersey', 'ball', 'boots', 'accessories', 'fan gear', 'training'
  ];

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .required('Product name is required'),
    description: Yup.string()
      .min(10, 'Description must be at least 10 characters')
      .required('Description is required'),
    price: Yup.number()
      .min(0, 'Price cannot be negative')
      .required('Price is required'),
    category: Yup.string()
      .oneOf(productCategories, 'Invalid category')
      .required('Category is required'),
    brand: Yup.string().optional(),
    imageUrl: Yup.string()
      .url('Must be a valid URL')
      .optional(),
    stock: Yup.number()
      .min(0, 'Stock cannot be negative')
      .integer('Stock must be an integer')
      .required('Stock is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: productToEdit?.name || '',
      description: productToEdit?.description || '',
      price: productToEdit?.price || 0,
      category: productToEdit?.category || '',
      brand: productToEdit?.brand || '',
      imageUrl: productToEdit?.imageUrl || '',
      stock: productToEdit?.stock || 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setServerError(null);
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        };

        let response;
        if (productToEdit) {
          // Update existing product
          response = await axios.put(
            `${API_URL}${API_ENDPOINTS.SHOP.PRODUCT_BY_ID(productToEdit._id)}`,
            values,
            config
          );
          alert('Product updated successfully!'); // Replace with custom toast/modal
        } else {
          // Create new product
          response = await axios.post(`${API_URL}${API_ENDPOINTS.SHOP.PRODUCTS}`, values, config);
          alert('Product created successfully!'); // Replace with custom toast/modal
        }

        if (onSuccess) {
          onSuccess(response.data);
        }
      } catch (err) {
        const errorMessage = err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : err.message;
        setServerError(errorMessage);
        console.error('Product form submission failed:', errorMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  // Reset form when productToEdit changes (for switching between edit/create)
  useEffect(() => {
    formik.resetForm({
      values: {
        name: productToEdit?.name || '',
        description: productToEdit?.description || '',
        price: productToEdit?.price || 0,
        category: productToEdit?.category || '',
        brand: productToEdit?.brand || '',
        imageUrl: productToEdit?.imageUrl || '',
        stock: productToEdit?.stock || 0,
      },
    });
    setServerError(null);
  }, [productToEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {productToEdit ? 'Edit Product' : 'Create New Product'}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <Input
          id="name"
          name="name"
          label="Product Name"
          placeholder="Enter product name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && formik.errors.name}
          required
          fullWidth
        />
        <Input
          id="description"
          name="description"
          label="Description"
          placeholder="Enter product description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && formik.errors.description}
          required
          fullWidth
          as="textarea" // Render as textarea for longer text
        />
        <Input
          id="price"
          name="price"
          type="number"
          label="Price ($)"
          placeholder="0.00"
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && formik.errors.price}
          required
          fullWidth
        />

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none transition-all duration-200
              ${formik.touched.category && formik.errors.category ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'}`}
          >
            <option value="">Select Category</option>
            {productCategories.map((cat) => (
              <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
            ))}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="mt-1 text-sm text-red-600">{formik.errors.category}</p>
          )}
        </div>

        <Input
          id="brand"
          name="brand"
          label="Brand"
          placeholder="Enter brand name (optional)"
          value={formik.values.brand}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.brand && formik.errors.brand}
          fullWidth
        />
        <Input
          id="imageUrl"
          name="imageUrl"
          label="Image URL"
          placeholder="Enter image URL (optional)"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.imageUrl && formik.errors.imageUrl}
          fullWidth
        />
        <Input
          id="stock"
          name="stock"
          type="number"
          label="Stock Quantity"
          placeholder="0"
          value={formik.values.stock}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.stock && formik.errors.stock}
          required
          fullWidth
        />

        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
            <span className="block sm:inline">{serverError}</span>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-6">
          {onCancel && (
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            variant="primary"
            disabled={loading || !formik.isValid || (productToEdit ? !formik.dirty : false)}
          >
            {loading ? <LoadingSpinner type="clip" size={16} color="#fff" /> : (productToEdit ? 'Update Product' : 'Create Product')}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ProductForm;