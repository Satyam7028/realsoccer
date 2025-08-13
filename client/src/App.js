// client/src/App.js

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import AdminLayout from './components/layout/AdminLayout';

// Importing providers using the default import syntax
import AuthProvider from './context/AuthContext';
import CartProvider from './context/CartContext';

// Pages
import HomePage from './pages/Home/HomePage';
import PlayersPage from './pages/Players/PlayersPage'; // The missing import has been added here
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

              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
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
