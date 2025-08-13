// client/src/state/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { CartItem, ShippingAddress } from '../types'; // Import types for better readability

// Helper to get cart items from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : null;

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? localStorage.getItem('paymentMethod')
  : null;

// Calculate initial prices
const calculatePrices = (items) => {
  const itemsPrice = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const taxPrice = 0.15 * itemsPrice; // 15% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    itemsPrice: parseFloat(itemsPrice.toFixed(2)),
    shippingPrice: parseFloat(shippingPrice.toFixed(2)),
    taxPrice: parseFloat(taxPrice.toFixed(2)),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
  };
};

const initialPrices = calculatePrices(cartItemsFromStorage);

const initialState = {
  cartItems: cartItemsFromStorage,
  shippingAddress: shippingAddressFromStorage,
  paymentMethod: paymentMethodFromStorage,
  itemsPrice: initialPrices.itemsPrice,
  shippingPrice: initialPrices.shippingPrice,
  taxPrice: initialPrices.taxPrice,
  totalPrice: initialPrices.totalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload; // This should be a CartItem type
      const existItem = state.cartItems.find((x) => x.product === newItem.product);

      if (existItem) {
        // If item exists, update its quantity and other details
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? newItem : x
        );
      } else {
        // If item does not exist, add it
        state.cartItems.push(newItem);
      }
      // Update prices after adding/updating item
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices(state.cartItems);
      state.itemsPrice = itemsPrice;
      state.shippingPrice = shippingPrice;
      state.taxPrice = taxPrice;
      state.totalPrice = totalPrice;

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x.product !== action.payload);
      // Update prices after removing item
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices(state.cartItems);
      state.itemsPrice = itemsPrice;
      state.shippingPrice = shippingPrice;
      state.taxPrice = taxPrice;
      state.totalPrice = totalPrice;

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateCartItemQty: (state, action) => {
      const { productId, qty } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.product === productId ? { ...item, qty: qty } : item
      );
      // Update prices after updating quantity
      const { itemsPrice, shippingPrice, taxPrice, totalPrice } = calculatePrices(state.cartItems);
      state.itemsPrice = itemsPrice;
      state.shippingPrice = shippingPrice;
      state.taxPrice = taxPrice;
      state.totalPrice = totalPrice;

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(state.shippingAddress));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', state.paymentMethod);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.shippingAddress = null;
      state.paymentMethod = null;
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
      localStorage.removeItem('shippingAddress');
      localStorage.removeItem('paymentMethod');
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQty,
  saveShippingAddress,
  savePaymentMethod,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;