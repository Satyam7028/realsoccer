// client/src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/layout/Header';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/layout/AdminLayout';

// Context Providers
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';

// Public Pages
import HomePage from './pages/Home/HomePage';
import PlayersPage from './pages/Players/PlayersPage';
import PlayerDetailsPage from './pages/PlayerDetails/PlayerDetailsPage';
import LeaguesPage from './pages/Leagues/LeaguesPage';
import LeagueDetailsPage from './pages/LeagueDetails/LeagueDetailsPage';
import FixturesPage from './pages/Fixtures/FixturesPage';
import FixtureDetailsPage from './pages/FixtureDetails/FixtureDetailsPage';
import NewsPage from './pages/News/NewsPage';
import NewsArticlePage from './pages/NewsArticle/NewsArticlePage';
import ShopPage from './pages/Shop/ShopPage';
import ProductDetailsPage from './pages/ProductDetails/ProductDetailsPage';
import CartPage from './pages/Cart/CartPage';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import ProfilePage from './pages/Profile/ProfilePage';
import OrderHistoryPage from './pages/OrderHistory/OrderHistoryPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import AboutUsPage from './pages/AboutUs/AboutUsPage';

// Auth Pages
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

// Admin Pages
import AdminDashboard from './components/admin/AdminDashboard';
import PlayerManagementPage from './pages/Admin/PlayerManagement/PlayerManagementPage';
import LeagueManagementPage from './pages/Admin/LeagueManagement/LeagueManagementPage';
import NewsManagementPage from './pages/Admin/NewsManagement/NewsManagementPage';
import ShopManagementPage from './pages/Admin/ShopManagement/ShopManagementPage';
import FixtureManagementPage from './pages/Admin/FixtureManagement/FixtureManagementPage';
import ReportingPage from './pages/Admin/Reporting/ReportingPage';
import OrderManagementPage from './pages/Admin/OrderManagement/OrderManagementPage';
import UserTable from './components/admin/UserTable';

/**
 * The main component of the application.
 * It sets up the routing and provides the global context for authentication and cart.
 */
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/players" element={<PlayersPage />} />
              <Route path="/players/:id" element={<PlayerDetailsPage />} />
              <Route path="/leagues" element={<LeaguesPage />} />
              <Route path="/leagues/:id" element={<LeagueDetailsPage />} />
              <Route path="/fixtures" element={<FixturesPage />} />
              <Route path="/fixtures/:id" element={<FixtureDetailsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsArticlePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/order-history" element={<OrderHistoryPage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />

              {/* Authentication Routes */}
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

              {/* Admin Routes - Nested under AdminLayout */}
              <Route path="/admin" element={<AdminLayout />}>
                {/* The 'index' route renders the AdminDashboard at /admin */}
                <Route index element={<AdminDashboard />} />
                <Route path="players" element={<PlayerManagementPage />} />
                <Route path="leagues" element={<LeagueManagementPage />} />
                <Route path="news" element={<NewsManagementPage />} />
                <Route path="shop" element={<ShopManagementPage />} />
                <Route path="fixtures" element={<FixtureManagementPage />} />
                <Route path="reporting" element={<ReportingPage />} />
                <Route path="orders" element={<OrderManagementPage />} />
                <Route path="users" element={<UserTable users={[]} onEditUser={() => {}} onDeleteUser={() => {}} />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
