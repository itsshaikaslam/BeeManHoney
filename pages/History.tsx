import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import { MobileNav } from '../components/MobileNav';
import { formatPrice } from '../utils/currency';

const History: React.FC = () => {
  const navigate = useNavigate();

  const orders = [
    { id: '52301', date: 'Oct 24, 2023', total: 1800, status: 'Delivered' },
    { id: '52298', date: 'Sep 15, 2023', total: 1300, status: 'Shipped' },
    { id: '52255', date: 'Aug 2, 2023', total: 2200, status: 'Delivered' }
  ];

  return (
    <div className="bg-background font-sans text-text min-h-screen pb-16">
      <div className="max-w-md mx-auto min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-4 pt-6 flex items-center justify-between">
          <button onClick={() => navigate(-1)}>
            <ChevronLeft className="h-7 w-7 text-text" />
          </button>
          <div className="text-center">
            <h1 className="font-bold text-lg font-serif">BeeManHoney</h1>
            <h2 className="font-bold text-lg">Purchase History</h2>
          </div>
          <button className="p-1 border border-text rounded-full">
            <User className="h-6 w-6 text-text" />
          </button>
        </header>

        <main className="flex-grow p-4 space-y-4">
          {orders.map(order => (
            <article key={order.id} className="relative bg-primary text-text rounded-xl shadow-sm p-4 overflow-hidden">
               {/* Pattern overlay */}
              <div 
                className="absolute inset-0 bg-repeat bg-center opacity-20 pointer-events-none" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvl8UaWlNevNJIkEGwPjmAOgcrx5M1uAr46AAxx9fBXK2cGwfvFjqoc1h4Webpshl5HH2zjQKvEGTZu0nahwgBGL3DCCuJByrfYAry9-mkcDJqY3FsGixBQ41F_J-fAU03713uglWGpdCbnAhtg9Q7RbyMzwZzKAmNfUwBZSlFwVMI4JY_IzPAi5MQ3SiHplEaqn9Mq23aif56IBdkERP8pET8P4a2WJNQ8OsGQbJqP5bHddGhRA6LH1kwSE5gwnPRwgeg2KXGik7t')", backgroundSize: 'cover' }}
              ></div>
              
              <div className="relative flex justify-between items-start z-10">
                <div className="flex flex-col space-y-2">
                  <h3 className="text-2xl font-bold">Order #{order.id}</h3>
                  <p className="text-sm text-text opacity-75">{order.date}</p>
                  <p className="font-bold pt-3">Total: {formatPrice(order.total)}</p>
                </div>
                <div className="flex flex-col space-y-3 items-center">
                  <span className={`text-white text-xs font-bold px-4 py-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-600' : 'bg-blue-600'}`}>
                    {order.status}
                  </span>
                  <ChevronRight className="h-6 w-6 text-text" />
                </div>
              </div>
            </article>
          ))}
        </main>
      </div>
      <MobileNav />
    </div>
  );
};

export default History;