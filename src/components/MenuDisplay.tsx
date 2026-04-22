import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter } from 'lucide-react';
import { MenuItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface MenuDisplayProps {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
  onSelectItem: (item: MenuItem) => void;
  onSearch: (query: string) => void;
}

export const MenuDisplay: React.FC<MenuDisplayProps> = ({ items, onAddToCart, onSelectItem, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Food' | 'Drink'>('All');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounced search logic
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      onSearch(searchValue);
    }, 400);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchValue, onSearch]);

  const categories = ['All', 'Food', 'Drink', 'Dessert'];
  
  const filteredItems = items.filter(item => {
    const matchesCat = activeCategory === 'All' || (item.category as string) === activeCategory;
    return matchesCat;
  });

  return (
    <section id="menu" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-4">
          <h2 className="serif text-5xl md:text-7xl font-light tracking-tighter">THE MENU</h2>
          <p className="text-gold uppercase tracking-[0.4em] text-[10px] font-semibold">
            Coastal Artifacts • Kaduna & Santorini
          </p>
        </div>

        <div className="flex gap-1 border-b border-gold/20">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-6 py-2 text-[10px] font-bold tracking-widest uppercase transition-all relative ${
                activeCategory === cat 
                  ? 'text-gold' 
                  : 'text-cream/30 hover:text-cream'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div layoutId="cat-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-8 mb-12 items-end">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchValue}
            placeholder="“Search flavors...”"
            className="w-full bg-transparent border-b border-gold/30 py-3 pl-12 pr-6 serif italic text-2xl focus:outline-none focus:border-gold transition-all placeholder:opacity-20"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Search className="absolute left-0 bottom-4 w-6 h-6 text-gold opacity-40" />
          <div className="absolute right-0 bottom-4 text-[10px] uppercase tracking-widest opacity-20">Filter active</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="group flex flex-col gap-6 cursor-pointer"
              onClick={() => onSelectItem(item)}
            >
              <div className="aspect-[4/5] overflow-hidden relative border border-white/5">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-ink/30 group-hover:bg-transparent transition-colors duration-700" />
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                   <div className="bg-ink/80 backdrop-blur-md px-4 py-2 border border-gold/30">
                      <span className="serif text-2xl font-light">${item.price}</span>
                   </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h3 className="serif text-3xl font-light uppercase tracking-tight group-hover:text-gold transition-colors">{item.name}</h3>
                </div>
                <p className="text-cream/40 text-sm font-light leading-relaxed italic line-clamp-2">{item.description}</p>
                
                <div className="flex justify-between items-center pt-4">
                  <div className="flex gap-3">
                    {item.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] uppercase tracking-[0.2em] text-gold/60">
                        • {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(item);
                    }}
                    className="text-[10px] uppercase tracking-widest font-bold border-b border-gold/0 hover:border-gold pb-1 transition-all"
                  >
                    Add to order
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
