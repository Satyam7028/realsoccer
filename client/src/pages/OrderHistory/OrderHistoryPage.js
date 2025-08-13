// client/src/pages/OrderHistory/OrderHistoryPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// We are importing a selection of icons from react-icons/io5
// to provide clear visual cues for the order history page.
import {
  IoArchiveOutline,
  IoEyeOutline,
  IoArrowBackOutline,
  IoCheckmarkCircle,
  IoHourglassOutline,
} from 'react-icons/io5';

// Mock data for demonstration purposes
const mockOrders = [
  {
    id: 'A1B2C3D4',
    date: '2024-10-20',
    total: 129.97,
    status: 'Shipped',
    items: [
      { id: 1, name: 'Home Jersey', quantity: 1, price: 79.99 },
      { id: 2, name: 'Team Scarf', quantity: 2, price: 24.99 },
    ],
  },
  {
    id: 'E5F6G7H8',
    date: '2024-10-15',
    total: 34.99,
    status: 'Processing',
    items: [{ id: 3, name: 'Player T-shirt', quantity: 1, price: 34.99 }],
  },
];

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching order data from an API
  useEffect(() => {
    setLoading(true);
    const fetchOrders = () => {
      // In a real application, you would make an API call here,
      // likely filtered by the current user.
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 500); // Simulate network delay
    };
    fetchOrders();
  }, []);

  // Helper function to get the status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Shipped':
        return <IoCheckmarkCircle className="text-green-500 mr-2" />;
      case 'Processing':
        return <IoHourglassOutline className="text-yellow-500 mr-2" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-600">
        Loading order history...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center space-x-3">
          <IoArchiveOutline className="text-indigo-600" />
          <span>Order History</span>
        </h1>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          {getStatusIcon(order.status)}
                          <span>{order.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {/* We'll link to a hypothetical order details page */}
                        <Link to={`/order/${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                          <IoEyeOutline className="h-5 w-5" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-gray-600">
              <p>You have no past orders.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
