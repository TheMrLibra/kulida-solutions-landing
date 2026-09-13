import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { servicesData } from '../data/servicesData';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const coreServices = servicesData.filter(s => ['01', '02', '05', '07'].includes(s.id));
  const aiServices = servicesData.filter(s => ['03', '04', '06'].includes(s.id));

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <svg className="w-5 h-5 text-duna-dark group-hover:rotate-45 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="3" x2="12" y2="21" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="5.64" y1="5.64" x2="18.36" y2="18.36" />
            <line x1="5.64" y1="18.36" x2="18.36" y2="5.64" />
          </svg>
          <span className="font-bold text-duna-dark text-lg tracking-tight">Kulida Solutions</span>
        </Link>

        {/* Center Navigation Links: DUNA Pill Hover Styling */}
        <nav className="hidden md:flex items-center gap-2 text-base lg:text-[20px] font-medium">

          {/* Services Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`transition-all duration-200 py-1.5 px-5 rounded-full focus:outline-none ${dropdownOpen
                ? 'bg-[#38332E] text-white shadow-md'
                : 'text-gray-900 hover:bg-[#38332E] hover:text-white'
                }`}
            >
              <span>Services</span>
            </button>

            {/* DUNA 2-COLUMN DROPDOWN MENU PANEL */}
            {dropdownOpen && (
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute top-full left-0 w-[680px] bg-[#38332E]/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 mt-3 animate-in fade-in slide-in-from-bottom-3 duration-200 text-white z-50"
              >
                <div className="grid grid-cols-2 gap-8">

                  {/* Left Column: Solutions & Core Tech */}
                  <div className="pr-4 border-r border-white/10 space-y-3">
                    <div
                      className="text-xs text-gray-400 font-normal px-4 animate-item-slide-up"
                      style={{ animationDelay: '30ms' }}
                    >
                      Solutions & Infrastructure
                    </div>

                    {coreServices.map((service, index) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        className="block group px-4 py-2 -mx-4 rounded-full hover:bg-white/10 transition-all duration-200 animate-item-slide-up"
                        style={{ animationDelay: `${(index + 1) * 45 + 30}ms` }}
                      >
                        <div className="text-base lg:text-lg font-medium text-white group-hover:text-blue-200 transition-colors">
                          {service.title}
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Right Column: AI & Knowledge Systems */}
                  <div className="pl-2 space-y-3">
                    <div
                      className="text-xs text-gray-400 font-normal px-4 animate-item-slide-up"
                      style={{ animationDelay: '30ms' }}
                    >
                      AI & Intelligent Platforms
                    </div>

                    {aiServices.map((service, index) => (
                      <Link
                        key={service.id}
                        to={`/services/${service.slug}`}
                        className="block group px-4 py-2 -mx-4 rounded-full hover:bg-white/10 transition-all duration-200 animate-item-slide-up"
                        style={{ animationDelay: `${(index + 1) * 45 + 30}ms` }}
                      >
                        <div className="text-base lg:text-lg font-medium text-white group-hover:text-blue-200 transition-colors">
                          {service.title}
                        </div>
                      </Link>
                    ))}
                  </div>

                </div>
              </div>
            )}
          </div>

          <a href="/#value" className="text-gray-900 hover:bg-[#38332E] hover:text-white transition-all duration-200 py-1.5 px-5 rounded-full">Value</a>
          <a href="/#workflow" className="text-gray-900 hover:bg-[#38332E] hover:text-white transition-all duration-200 py-1.5 px-5 rounded-full">Workflow</a>
          <a href="/#contact" className="text-gray-900 hover:bg-[#38332E] hover:text-white transition-all duration-200 py-1.5 px-5 rounded-full">Contact</a>
        </nav>

        {/* CTA Button: Pill-shaped dark button matching contact form */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/#contact" className="bg-[#1c1917] hover:bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
            Free Consultation
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          className="md:hidden p-2 text-duna-dark focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#38332E]/95 backdrop-blur-xl text-white px-6 pt-4 pb-6 space-y-3 text-base font-medium shadow-2xl border-white/10">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200">Home</Link>

          <div className="pt-2 border-white/10 pb-3">
            <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold px-4">Services</div>
            <div className="space-y-1 pl-2">
              {servicesData.map((service) => (
                <Link
                  key={service.id}
                  to={`/services/${service.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm font-medium text-white px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-200"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <a href="/#value" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200">Value</a>
          <a href="/#workflow" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200">Workflow</a>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-full hover:bg-white/10 transition-all duration-200">Contact</a>
          <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center bg-[#1c1917] hover:bg-black text-white text-sm font-medium px-5 py-3 rounded-full mt-4 transition-all duration-200 shadow-md">Free Consultation</a>
        </div>
      )}
    </header>
  );
}
