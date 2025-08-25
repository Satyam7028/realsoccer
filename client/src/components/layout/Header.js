// client/src/components/layout/Header.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-800"
        >
          RealSoccer
        </Link>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <Link
            to="/shop"
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            Shop
          </Link>

          {/* Cart Icon with Badge */}
          <Link
            to="/cart"
            data-testid="cart-link"
            className="relative text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            <FaShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
