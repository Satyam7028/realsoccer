// server/src/models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Order',
      unique: true, // A payment typically corresponds to one order
    },
    paymentGateway: {
      type: String,
      required: [true, 'Please specify the payment gateway (e.g., PayPal, Stripe)'],
      trim: true,
    },
    transactionId: {
      type: String,
      required: [true, 'Please provide the transaction ID from the payment gateway'],
      unique: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Please specify the payment amount'],
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      default: 'USD', // Or your primary currency
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paidAt: {
      type: Date,
      required: true,
    },
    // Add any other relevant payment details (e.g., card type, last 4 digits)
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;