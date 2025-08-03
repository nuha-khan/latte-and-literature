import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Books from './pages/Books';
import Coffee from './pages/Coffee';
import Bundles from './pages/Bundles';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserProfile from './pages/UserProfile';
import InitialLoader from './components/loaders/InitialLoader';
import RouteLoader from './components/loaders/RouteLoader';
import AdminHome from './pages/admin/AdminHome';
import ManageProducts from './pages/admin/ManageProducts';
import ManageUsers from './pages/admin/ManageUsers';
import theme from './theme';
import ViewOrders from './pages/admin/ViewOrders';

function AnimatedRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      {loading && <RouteLoader />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/coffee" element={<Coffee />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin/products" element={<ManageProducts />} />
          <Route path="/admin/users" element={<ManageUsers />} />
          <Route path="/admin/orders" element={<ViewOrders />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) return <InitialLoader />;

  return (
    <div style={{
      backgroundImage: `url(${theme.backgroundPattern})`,
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      minHeight: '100vh'
    }}>
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  );
}

export default App;
