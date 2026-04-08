import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BikeListing from './pages/BikeListing';
import BikeDetails from './pages/BikeDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import OurStory from './pages/OurStory';
import ProtectedRoute from './components/ProtectedRoute';
import Loader from './components/Loader';
import './styles/index.css';

// Helper to handle scroll and anchor navigation globally
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      if (hash === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const id = hash.substring(1);
        const el = document.getElementById(id);
        if (el) {
          // slight timeout ensures DOM has rendered and settled
          setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 10);
        }
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page load / assets readiness
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 800); // 0.8s duration for smooth transition
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <Router>
      <Loader isLoading={isLoading} />
      <ScrollToTop />
      <div className={`app-container ${!isLoading ? 'content-loaded' : ''}`}>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bikes" element={<BikeListing />} />
            <Route path="/bikes/:id" element={<BikeDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
            <Route path="/our-story" element={<OurStory />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

