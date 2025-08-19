// client/src/components/auth/RegisterForm.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import registerSchema from '../../validation/registerSchema';

const RegisterForm = () => {
  // Destructure register, loading, and error from the useAuth hook
  const { register, loading, error } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    // Use the imported validation schema
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      // Pass the username, email, and password to the register function
      await register(values.username, values.email, values.password);
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen-minus-header-footer py-8">
      <Card className="w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <Input
            id="username"
            name="username"
            type="text"
            label="Username"
            placeholder="Choose a username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && formik.errors.username}
            required
            fullWidth
          />
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
            placeholder="Create a password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
            required
            fullWidth
          />
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
            {loading ? <LoadingSpinner type="clip" size={20} color="#fff" /> : 'Register'}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default RegisterForm;