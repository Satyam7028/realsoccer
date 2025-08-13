// client/src/context/CartContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

// Export the context for use in other providers
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const fetchCart = () => {
        console.log('Fetching cart for user:', user.id);
        const mockCart = [
          { id: 1, name: 'Home Jersey', price: 79.99, imageUrl: 'https://placehold.co/100x100', quantity: 1 },
          { id: 2, name: 'Team Scarf', price: 24.99, imageUrl: 'https://placehold.co/100x100', quantity: 2 },
        ];
        setCartItems(mockCart);
        setLoading(false);
      };

      setTimeout(fetchCart, 500);
    } else {
      setCartItems([]);
      setLoading(false);
    }
  }, [user]);

  const addItemToCart = (item, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
  };

  const removeItemFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems => prevItems.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    updateQuantity,
    totalItems,
    totalCost,
    loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// This is the default export
export default CartProvider;
