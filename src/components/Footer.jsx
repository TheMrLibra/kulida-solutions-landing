import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-duna-dark text-gray-400 py-10 border-gray-800 text-xs relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-white tracking-tight text-sm">
              Kulida Solutions
            </span>
          </div>

          <div className="text-gray-500">
            &copy; {currentYear} Kulida Solutions. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">GDPR Compliance</a>
          </div>

        </div>
      </div>
    </footer>
  );
}
