// server/src/services/orderService.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const logger = require('../config/logger');

/**
 * Creates a new order.
 * This service function handles the creation of an order and updates product stock.
 * @param {string} userId - The ID of the user placing the order.
 * @param {Array<object>} orderItems - An array of product items in the order.
 * @param {object} shippingAddress - The shipping address for the order.
 * @param {string} paymentMethod - The chosen payment method.
 * @param {number} taxPrice - The tax amount for the order.
 * @param {number} shippingPrice - The shipping cost for the order.
 * @param {number} totalPrice - The total price of the order.
 * @returns {object} - The created order object.
 * @throws {Error} If no order items, product not found, or insufficient stock.
 */
const createOrder = async (userId, orderItems, shippingAddress, paymentMethod, taxPrice, shippingPrice, totalPrice) => {
  if (!orderItems || orderItems.length === 0) {
    throw new Error('No order items provided.');
  }

  // Validate products and update stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new Error(`Product not found: ${item.name}`);
    }
    if (product.stock < item.qty) {
      throw new Error(`Not enough stock for product: ${item.name}. Available: ${product.stock}`);
    }
    // Decrease stock
    product.stock -= item.qty;
    await product.save();
  }

  const order = new Order({
    user: userId,
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  const createdOrder = await order.save();
  logger.info(`OrderService: Order created by user ${userId}: ${createdOrder._id}`);
  return createdOrder;
};

/**
 * Retrieves all orders from the database. (Admin access)
 * @returns {Array<object>} - An array of order objects, populated with user details.
 */
const getAllOrders = async () => {
  const orders = await Order.find({}).populate('user', 'id username email');
  logger.info('OrderService: Fetched all orders.');
  return orders;
};

/**
 * Retrieves a single order by its ID.
 * @param {string} orderId - The ID of the order to retrieve.
 * @returns {object} - The order object, populated with user details.
 * @throws {Error} If order not found.
 */
const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId).populate('user', 'username email');
  if (!order) {
    throw new Error('Order not found');
  }
  logger.info(`OrderService: Fetched order by ID: ${orderId}`);
  return order;
};

/**
 * Updates an order to 'paid' status.
 * @param {string} orderId - The ID of the order to update.
 * @param {object} paymentResult - Details from the payment gateway.
 * @returns {object} - The updated order object.
 * @throws {Error} If order not found.
 */
const updateOrderToPaid = async (orderId, paymentResult) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  order.paymentResult = paymentResult;

  const updatedOrder = await order.save();
  logger.info(`OrderService: Order ${updatedOrder._id} marked as paid.`);
  return updatedOrder;
};

/**
 * Updates an order to 'delivered' status. (Admin access)
 * @param {string} orderId - The ID of the order to update.
 * @returns {object} - The updated order object.
 * @throws {Error} If order not found.
 */
const updateOrderToDelivered = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  order.isDelivered = true;
  order.deliveredAt = Date.now();

  const updatedOrder = await order.save();
  logger.info(`OrderService: Order ${updatedOrder._id} marked as delivered.`);
  return updatedOrder;
};

/**
 * Retrieves all orders for a specific user.
 * @param {string} userId - The ID of the user whose orders to retrieve.
 * @returns {Array<object>} - An array of order objects for the specified user.
 */
const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId });
  logger.info(`OrderService: Fetched orders for user: ${userId}`);
  return orders;
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getUserOrders,
};