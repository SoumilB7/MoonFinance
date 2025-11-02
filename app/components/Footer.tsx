import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-[#03FFC9]">SuperFin</h3>
            <p className="text-gray-400 text-sm mt-2">
              Your trusted financial partner
            </p>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#03FFC9] transition-colors">
              About
            </a>
            <a href="#" className="hover:text-[#03FFC9] transition-colors">
              Contact
            </a>
            <a href="#" className="hover:text-[#03FFC9] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#03FFC9] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SuperFin. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
