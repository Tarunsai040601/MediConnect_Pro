import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Lazy loaded pages
const Home = lazy(() => import('./pages/Home/Home'));
const About = lazy(() => import('./pages/About/About'));
const Contact = lazy(() => import('./pages/ContactUs/ContactUs'));
const Services = lazy(() => import('./pages/Services/Services'));
const Doctors = lazy(() => import('./pages/Doctors/Doctors'));
const BookAppointment = lazy(() => import('./pages/BookAppointment/BookAppointment'));
const Login = lazy(() => import('./pages/Login/Login'));
const Signup = lazy(() => import('./pages/Signup/Signup'));

const App = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  // Route-based metadata (optional)
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'MediConnect Pro - Premium Healthcare System';
      case '/about': return 'About Us - MediConnect Pro';
      case '/contact': return 'Contact Us - MediConnect Pro';
      case '/services': return 'Our Services - MediConnect Pro';
      case '/doctors': return 'Meet Our Doctors - MediConnect Pro';
      case '/book-appointment': return 'Book Appointment - MediConnect Pro';
      case '/login': return 'Login - MediConnect Pro';
      case '/signup': return 'Create Account - MediConnect Pro';
      default: return 'MediConnect Pro';
    }
  };

  return (
    <div className="app-container">
      <Navbar />

      {/* Suspense for lazy loading */}
      <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LoadingSpinner /></div>}>
        <div className="main-content">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Redirect root to home */}
              <Route path="/" element={<Navigate to="/home" replace />} />

              {/* All routes */}
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </AnimatePresence>
        </div>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;