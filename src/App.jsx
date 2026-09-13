import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicePage from './pages/ServicePage';
import Footer from './components/Footer';

export default function App() {
  return (
    <Router>
      <div className="bg-duna-offwhite text-duna-dark font-sans antialiased selection:bg-duna-dark selection:text-white overflow-x-hidden min-h-screen">
        {/* DUNA GLOBAL GRID PATTERN OVERLAY */}
        <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-60"></div>

        <Navbar />
        
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/:slug" element={<ServicePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
