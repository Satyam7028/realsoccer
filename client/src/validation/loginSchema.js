// client/src/validation/loginSchema.js
import * as Yup from 'yup';

/**
 * Validation schema for user login using Yup.
 */
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default loginSchema;