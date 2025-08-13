// client/src/pages/Admin/OrderManagement/OrderManagementPage.js

import React, { useState } from 'react';
// Corrected import path for OrderTable.
import OrderTable from '../../../components/admin/OrderTable';
// IoArchiveOutline is a suitable icon for order management.
import { IoArchiveOutline } from 'react-icons/io5';

// Mock data for demonstration purposes. This would be fetched from an API in a real application.
const mockOrders = [
  { id: 'ORD-001', customerName: 'John Doe', total: 125.50, date: '2024-10-25', status: 'Shipped' },
  { id: 'ORD-002', customerName: 'Jane Smith', total: 75.00, date: '2024-10-24', status: 'Processing' },
  { id: 'ORD-003', customerName: 'Peter Jones', total: 200.00, date: '2024-10-23', status: 'Shipped' },
];

const OrderManagementPage = () => {
  const [orders, setOrders] = useState(mockOrders);

  const onViewOrder = (orderId) => {
    // This function would typically navigate to a specific order details page.
    console.log('Viewing order:', orderId);
  };

  const onDeleteOrder = (orderId) => {
    // This function would call an API to delete the order.
    // We'll show a confirmation and then update the state with a filter.
    if (window.confirm(`Are you sure you want to delete order ${orderId}?`)) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
        <IoArchiveOutline className="text-indigo-600" />
        <span>Order Management</span>
      </h1>
      <p className="text-gray-600 mb-8">
        Manage and track all customer orders.
      </p>

      {/* The OrderTable component is correctly imported and used here */}
      <OrderTable orders={orders} onViewOrder={onViewOrder} onDeleteOrder={onDeleteOrder} />
    </div>
  );
};

export default OrderManagementPage;
