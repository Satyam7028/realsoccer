// client/src/components/auth/LoginForm.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import loginSchema from '../../validation/loginSchema'; // Import the schema

const LoginForm = () => {
  const { login, loading, error } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema, // Use the imported schema
    onSubmit: async (values) => {
      await login(values.email, values.password);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen-minus-header-footer py-8">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
            required
            fullWidth
          />
          <Input
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            required
            fullWidth
          />

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={loading || !formik.isValid || !formik.dirty}
            className="mt-4"
          >
            {loading ? <LoadingSpinner type="clip" size={20} color="#fff" /> : 'Login'}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-semibold">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginForm;