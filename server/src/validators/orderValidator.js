// server/src/validators/orderValidator.js
const { body } = require('express-validator');
const mongoose = require('mongoose');

const orderValidation = [
  // Validate orderItems array
  body('orderItems')
    .notEmpty()
    .withMessage('Order must contain at least one item')
    .isArray()
    .withMessage('Order items must be an array'),
  body('orderItems.*.name')
    .notEmpty()
    .withMessage('Product name is required for each order item'),
  body('orderItems.*.qty')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer for each order item'),
  body('orderItems.*.imageUrl')
    .isURL()
    .withMessage('Image URL must be a valid URL for each order item'),
  body('orderItems.*.price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number for each order item'),
  body('orderItems.*.product')
    .notEmpty()
    .withMessage('Product ID is required for each order item')
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage('Invalid Product ID format for order item'),

  // Validate shippingAddress
  body('shippingAddress.address')
    .notEmpty()
    .withMessage('Shipping address is required'),
  body('shippingAddress.city')
    .notEmpty()
    .withMessage('Shipping city is required'),
  body('shippingAddress.postalCode')
    .notEmpty()
    .withMessage('Shipping postal code is required'),
  body('shippingAddress.country')
    .notEmpty()
    .withMessage('Shipping country is required'),

  // Validate paymentMethod
  body('paymentMethod')
    .notEmpty()
    .withMessage('Payment method is required'),

  // Validate prices
  body('taxPrice')
    .isFloat({ min: 0 })
    .withMessage('Tax price must be a non-negative number'),
  body('shippingPrice')
    .isFloat({ min: 0 })
    .withMessage('Shipping price must be a non-negative number'),
  body('totalPrice')
    .isFloat({ min: 0 })
    .withMessage('Total price must be a non-negative number'),
];

module.exports = {
  orderValidation,
};