import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingCart, X, User } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Sourcing', path: '/sourcing' },
    { name: 'Recipes', path: '/recipes' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm font-sans">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 group">
           <img 
            alt="BeeManHoney Logo" 
            className="h-10 group-hover:scale-105 transition-transform" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRRVCno4HJqtZaG_w0Hv7BsNjSpwXcS4Tv-Azd0bQO34XUAaMEkTlw1vMucDEbLftKyDwtk069r5IjN6J3l6R90yzge8FufbtK7jSMHmOBsrTBaSlQDPG41sirFzWOjLE7m7LG-7PFePpBahcRSNvFsYlLOzekc8GdROQei6qQXOapfibhUbtVxVay3GUyWTlKEwmIu8Rg7jOXp1_zBWEP7IWCmOSKIltO0s4KqzQod3cn0uxu1FR-WTCuLYtNV9qdY9y7aCfOb6te"
          />
          <span className="font-serif font-bold text-xl text-text hidden sm:block">BeeManHoney</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-text'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button aria-label="Search" className="text-text hover:text-primary transition-colors">
            <Search className="h-6 w-6" />
          </button>
          <Link to="/login" aria-label="Account" className="text-text hover:text-primary transition-colors hidden md:block">
            <User className="h-6 w-6" />
          </Link>
          <Link to="/history" aria-label="Shopping Cart" className="text-text hover:text-primary transition-colors relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
          </Link>
           <button 
            className="md:hidden text-text"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col space-y-4">
           {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={`text-sm font-semibold hover:text-primary transition-colors ${
                location.pathname === link.path ? 'text-primary' : 'text-text'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-semibold text-text hover:text-primary">Login</Link>
        </div>
      )}
    </header>
  );
};