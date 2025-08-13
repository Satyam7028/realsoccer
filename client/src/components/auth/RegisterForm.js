// client/src/components/auth/RegisterForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';

const RegisterForm = () => {
  const { register, loading, error } = useAuth();
  const [serverError, setServerError] = useState(null);

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setServerError(null); // Clear previous server errors
      const success = await register(values.username, values.email, values.password);
      if (!success) {
        // Error message is already set by useAuth context
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