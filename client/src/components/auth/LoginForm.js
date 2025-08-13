// client/src/components/auth/LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [serverError, setServerError] = useState(null);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setServerError(null); // Clear previous server errors
      const success = await login(values.email, values.password);
      if (!success) {
        // Error message is already set by useAuth context
        // We can just re-read it or rely on the context's error state
        setServerError(error); // Update local state for immediate display if needed
      }
    },
  });

  // Effect to update local server error if context error changes
  React.useEffect(() => {
    setServerError(error);
  }, [error]);

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

          {serverError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative mb-4" role="alert">
              <span className="block sm:inline">{serverError}</span>
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