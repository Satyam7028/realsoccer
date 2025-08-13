// client/src/validation/checkoutSchema.js
import * as Yup from 'yup';

/**
 * Validation schema for the checkout process using Yup.
 * This covers shipping address and basic payment method selection.
 */
const checkoutSchema = Yup.object().shape({
  shippingAddress: Yup.object().shape({
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    postalCode: Yup.string().required('Postal Code is required'),
    country: Yup.string().required('Country is required'),
  }),
  paymentMethod: Yup.string()
    .oneOf(['PayPal', 'Stripe'], 'Invalid payment method selected')
    .required('Payment method is required'),
});

export default checkoutSchema;