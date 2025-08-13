// client/src/pages/Checkout/CheckoutPage.js

import React, { useState } from 'react';
// We are importing a selection of icons from react-icons/fa to provide clear
// visual cues for the checkout process, such as credit cards, shipping, and security.
import { FaCreditCard, FaLock, FaShippingFast } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const mockOrderSummary = {
  items: [
    { id: 1, name: 'Home Jersey', price: 79.99, quantity: 1 },
    { id: 2, name: 'Team Scarf', price: 24.99, quantity: 2 },
  ],
  subtotal: 129.97,
  shipping: 5.00,
  tax: 8.00,
  total: 142.97,
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the payment and order submission logic.
    // E.g., make an API call to process the order.
    console.log('Order submitted:', formData);
    // After submission, you might navigate to an order confirmation page.
    navigate('/order-confirmation');
  };

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <FaCreditCard className="text-indigo-600" />
          <span>Checkout</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Shipping & Payment Details
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Shipping Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                  <FaShippingFast className="text-indigo-500" />
                  <span>Shipping Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1" htmlFor="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="zip">ZIP Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center space-x-2">
                  <FaCreditCard className="text-indigo-500" />
                  <span>Payment Information</span>
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1" htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1" htmlFor="expiry">Expiry Date</label>
                      <input
                        type="text"
                        id="expiry"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1" htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex items-center justify-center w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <FaLock className="h-4 w-4 mr-2" />
                <span>Pay ${mockOrderSummary.total.toFixed(2)}</span>
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              {mockOrderSummary.items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-700">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between font-medium text-gray-800">
                <span>Subtotal</span>
                <span>${mockOrderSummary.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-800">
                <span>Shipping</span>
                <span>${mockOrderSummary.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium text-gray-800">
                <span>Tax</span>
                <span>${mockOrderSummary.tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl font-bold text-indigo-600 border-t pt-4 mt-4">
              <span>Total</span>
              <span>${mockOrderSummary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {/* Back button */}
        <div className="mt-8">
            <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            >
            <IoArrowBackOutline className="mr-2" />
            Back to Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
