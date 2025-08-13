// client/src/components/admin/OrderTable.js

import React from 'react';
// We're importing icons for order statuses and actions from react-icons/io5.
// These provide clear visual indicators for different states and tasks.
import {
  IoCheckmarkCircle,
  IoAlertCircle,
  IoHourglassOutline,
  IoEye,
  IoTrash,
} from 'react-icons/io5';

const OrderTable = ({ orders, onViewOrder, onDeleteOrder }) => {
  // A helper function to determine the icon and color based on order status
  const getStatusDisplay = (status) => {
    switch (status) {
      case 'Shipped':
        return {
          icon: <IoCheckmarkCircle className="text-green-500 h-5 w-5 mr-1" />,
          text: 'Shipped',
        };
      case 'Processing':
        return {
          icon: <IoHourglassOutline className="text-yellow-500 h-5 w-5 mr-1" />,
          text: 'Processing',
        };
      case 'Cancelled':
        return {
          icon: <IoAlertCircle className="text-red-500 h-5 w-5 mr-1" />,
          text: 'Cancelled',
        };
      default:
        return {
          icon: <IoAlertCircle className="text-gray-500 h-5 w-5 mr-1" />,
          text: status,
        };
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
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
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold leading-4">
                    {getStatusDisplay(order.status).icon}
                    {getStatusDisplay(order.status).text}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onViewOrder(order.id)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <IoEye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDeleteOrder(order.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <IoTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
