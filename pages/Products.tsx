import React, { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { MobileNav } from '../components/MobileNav';
import { formatPrice } from '../utils/currency';
import { Link } from 'react-router-dom';

const Products: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Clover', 'Wildflower', 'Creamed', 'Infused'];

  const products = [
    {
      id: 1,
      name: 'Clover Honey',
      description: 'Sweet & mild, perfect for tea.',
      price: 450,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhjOb0nDgUMAgRKzavogXJoEUYYThpAJQvMe3AX9PFbjbDyqfNaL2rExryJATZNpVuiObcSnF-4BjwBaQqMDcHGDD_OlaUrMcSIdouprhxBtkYQ7m2NfaHFg_bSyi6XxyNofPCpFhxO756-dNmNWYAQfiihzp1GajiUIzSOHh7WJLiKt9eeSnZ_M4rLK1HGTBdQcyjE40_3JL2QaGc7Gq_h072E5a7fvo6fusH1PfzfQKKLOEvvJ5nEnl7dr_Z5h_zmnfOHWJGlNp',
      category: 'Clover'
    },
    {
      id: 2,
      name: 'Wildflower Honey',
      description: 'Robust flavor, floral notes.',
      price: 550,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh8b86DUxRQPLg0-VBnuewEISiqGPF9WbtcQtwP0k89Hsyw-V6wKaHCfFij3XUX5J9nchPVI1TfWW74jsSlkqZ600YNkBi9bruch1MtGvELTNNvEH-PJjAtstX80GwTNe8XXKdm0eEhdK0z0weFyV7rlnUCmBx0fuyh8j2gdKjyNvMykK5Mu5aKbH7k0FPb_hD6n8Ti4Q2w7qZTvP_8PPi9TB9vgpJw5-ne4rTF-ETFk3RHdfzpQZ9-RAgQ6qEhw3hkiFfGD2Tx-fH',
      category: 'Wildflower'
    },
    {
      id: 3,
      name: 'Creamed Honey',
      description: 'Smooth, spreadable, rich.',
      price: 600,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLUUiFUiKydGYQ2HyyKl13Q3dGdm1R5Klb4jjb0-sf37V5aiz6_zk-FNio58XULx1mWj70Hzdaj4wj-eh95i_wP1W7fILbMIBIrfjKQzsnDsb7wwsqD3nPn_kwha77DE4yAajJRlXBeACfJ17IUQM3vbxTybHtlrkUObic2PbVvTDwyjZ9MaRbt2EreKsTgbMYb7qWr2XuQ4tIkWHuudorUbxK9ClQ45lXRfozFphowYYb5cq63uqIrxz4cGqkNvjKO5SEe5blj1Qw',
      category: 'Creamed'
    },
    {
      id: 4,
      name: 'Blueberry Infused Honey',
      description: 'Delicate fruit flavor.',
      price: 700,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGes0Is5JhtFZZrl-UqxepESzKOtXPGVoJfce6LvE9gctFwOOQ2Vl19x0-glcSbrDbhbAKNtcS4dZrZhZyXAIh_5HGMePwGtUdG_vnufNZpK-bYLpkIivveXK1YKPC2H1WsGt8P7P2_YDd5eJUrI2X1DQNRcJsyM-I2eqgtOatZ_PAfp-AtlnNQ8Tzz_64dhlUQaGjMvvfBhhG9FTQUc84NFiNjaJ36feENt_qGYLNZIWSVA_TDbiNZpb77-bkwE6FktX51QT1shFf',
      category: 'Infused'
    }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-[#fef9f0] font-sans text-text min-h-screen pb-20">
      {/* Custom Header for Products Page */}
      <header className="bg-[#f3dcb3] sticky top-0 z-20 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button aria-label="Search" className="p-2">
            <Search className="h-6 w-6 text-text" />
          </button>
          <h1 className="text-xl font-semibold text-text font-serif">BeeManHoney</h1>
          <Link to="/history" aria-label="Shopping Cart" className="p-2 relative">
            <ShoppingCart className="h-6 w-6 text-text" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">2</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4">
        {/* Filters */}
        <section className="mb-4">
          <div className="flex items-center overflow-x-auto pb-2 -mb-2 space-x-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`py-2 text-sm font-medium rounded-full shadow-sm whitespace-nowrap px-4 transition-colors ${
                  activeCategory === cat 
                    ? 'text-white bg-primary' 
                    : 'text-text bg-white border border-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-text bg-white border border-gray-300 rounded-full shadow-sm">
              Sort By
              <svg className="h-4 w-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path clipRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" fillRule="evenodd"></path>
              </svg>
            </button>
          </div>
        </section>

        {/* Product Grid */}
        <section className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => (
            <article key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
              <div className="p-4 bg-[#f9e9cc] flex-grow flex items-center justify-center h-40">
                <img src={product.image} alt={product.name} className="h-32 object-contain" />
              </div>
              <div className="p-4 text-left flex flex-col flex-grow">
                <h3 className="text-base font-semibold text-text">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{product.description}</p>
                <p className="text-lg font-bold text-text mt-2">{formatPrice(product.price)}</p>
                <button className="mt-4 w-full py-2 text-sm font-medium text-text bg-white border border-[#c8a66b] rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
      <MobileNav />
    </div>
  );
};

export default Products;