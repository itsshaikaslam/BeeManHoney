import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingBag, BookOpen, User, ShoppingCart } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: Home, path: '/home' },
    { name: 'Shop', icon: ShoppingBag, path: '/products' },
    { name: 'Recipes', icon: BookOpen, path: '/recipes' },
    { name: 'Cart', icon: ShoppingCart, path: '/history' }, // Linking cart to history as per design flow roughly
    { name: 'Profile', icon: User, path: '/login' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-40">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-1/5 ${
                isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
              }`}
            >
              <div className="relative">
                 {isActive && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 h-0.5 w-6 rounded-full bg-primary"></span>
                 )}
                 <item.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-bold' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};