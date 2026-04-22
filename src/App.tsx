import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/Navbar';
import { MenuDisplay } from './components/MenuDisplay';
import { CartDrawer } from './components/CartDrawer';
import { StripeExplanation } from './components/StripeExplanation';
import { MENU_ITEMS } from './constants';
import { CartItem, MenuItem, Order, Review } from './types';
import { ArrowDown, ChevronRight, MapPin, Clock, User, Check, Search } from 'lucide-react';

import { ReservationModal } from './components/ReservationModal';
import { ProfileModal } from './components/ProfileModal';
import { QRScannerModal } from './components/QRScannerModal';
import { ItemDetailModal } from './components/ItemDetailModal';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isResOpen, setIsResOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [tableNumber, setTableNumber] = useState<string | null>(null);
  const [view, setView] = useState<'home' | 'checkout' | 'success'>('home');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(MENU_ITEMS);
  const [itemReviews, setItemReviews] = useState<Record<string, Review[]>>({});

  const footer = (
    <footer className="py-20 border-t border-white/10 px-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start">
           <span className="text-2xl font-serif font-light tracking-tighter uppercase italic">OCEAN VIEW</span>
           <span className="text-[8px] uppercase tracking-[0.4em] text-gold mt-1">Artisanal Coastal Dining</span>
        </div>
        <div className="flex gap-10 text-[10px] font-bold uppercase tracking-widest text-cream/30">
          <a href="#" className="hover:text-gold transition-colors">Providence</a>
          <a href="#" className="hover:text-gold transition-colors">Manifesto</a>
          <a href="#" className="hover:text-gold transition-colors">Contact</a>
        </div>
        <p className="text-[10px] text-cream/20 uppercase tracking-widest">
          © 2026 OCEAN VIEW. All Rights Reserved.
        </p>
      </div>
    </footer>
  );

  const handleSubmitReview = (itemId: string, review: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...review,
      id: `REV-${Math.random().toString(36).substr(2, 9)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    };
    setItemReviews(prev => ({
      ...prev,
      [itemId]: [newReview, ...(prev[itemId] || [])]
    }));
  };

  // Mock Order History
  const [orderHistory] = useState<Order[]>([
    {
      id: 'OV-8821',
      date: 'April 12, 2026',
      total: 124.50,
      status: 'completed',
      items: [
        { ...MENU_ITEMS[0], quantity: 1 } as CartItem,
        { ...MENU_ITEMS[2], quantity: 1 } as CartItem
      ]
    },
    {
      id: 'OV-4402',
      date: 'March 28, 2026',
      total: 58.00,
      status: 'completed',
      items: [
        { ...MENU_ITEMS[4], quantity: 1 } as CartItem,
        { ...MENU_ITEMS[1], quantity: 1 } as CartItem
      ]
    }
  ]);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.id === id) {
        const newQty = Math.max(1, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }));
  };

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setMenuItems(MENU_ITEMS);
      return;
    }
    const lowerQuery = query.toLowerCase();
    setMenuItems(MENU_ITEMS.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) || 
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    ));
  };

  if (view === 'success') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mb-8"
        >
          <Check className="w-12 h-12 text-ink" />
        </motion.div>
        <h1 className="text-6xl font-serif italic mb-4">Bon Appétit!</h1>
        <p className="text-cream/50 max-w-md mx-auto mb-10 leading-relaxed">
          Your order has been transmitted to our kitchen. 
          {tableNumber ? (
            <span className="text-gold font-bold"> Delivery is dispatched to Table {tableNumber}. </span>
          ) : (
            <span> A digital receipt has been dispatched to your email. </span>
          )}
        </p>
        <button 
          onClick={() => { setCart([]); setView('home'); }}
          className="border border-white/10 px-10 py-4 rounded-2xl hover:bg-white/5 transition-all uppercase tracking-widest text-xs font-bold"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-ink text-cream selection:bg-gold selection:text-ink border-8 border-[#1A1A1A]">
      {/* Sidebar Rail */}
      <aside className="w-16 flex flex-col items-center py-8 border-r border-gold/30 shrink-0">
        <div className="sidebar-rail uppercase tracking-[0.4em] text-[10px] opacity-40 font-semibold mb-auto py-4">
          ESTABLISHED 2026 — KADUNA & SANTORINI
        </div>
        <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center text-xs text-gold font-bold">O</div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar 
          cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenReservations={() => setIsResOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          onOpenQRScanner={() => setIsQRScannerOpen(true)}
          tableNumber={tableNumber}
          onOpenDelivery={() => {}}
        />

        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.main
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col p-8 overflow-y-auto"
            >
              {/* Artistic Header */}
              <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 mt-16 pb-8 border-b border-gold/20">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2 font-semibold">Boutique Dining Experience</span>
                  <h1 className="serif text-8xl md:text-9xl font-light leading-none tracking-tighter">OCEAN VIEW</h1>
                </div>
                
                <div className="flex-1 max-w-xl md:mx-12 relative mt-8 md:mt-0">
                   <div className="flex items-center gap-6 mb-4">
                     <div className="flex items-center gap-2 opacity-40">
                        <div className="w-1 h-1 bg-gold rounded-full" />
                        <span className="text-[8px] uppercase tracking-[0.3em] font-bold">Kitchen Capacity: 84%</span>
                     </div>
                   </div>
                   <p className="text-cream/50 text-sm italic font-serif leading-relaxed">
                     "Experience a menu curated by the rhythm of the tide. Explore our artisanal selections sourced from the finest coastal waters."
                   </p>
                </div>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 h-fit flex flex-col gap-12">
                  {/* Manifesto Section */}
                  <div className="border border-gold/10 p-10 space-y-6">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">The Tide Manifesto</span>
                    <h3 className="serif text-3xl italic font-light leading-tight">"The sea provides the rhythm, we provide the soul."</h3>
                    <p className="text-cream/40 text-[11px] leading-relaxed tracking-wider uppercase">
                      Ocean View was born from the rhythm of the waves. We do not just serve seafood; we celebrate the ocean's bounty with respect, precision, and an eye for coastal heritage.
                    </p>
                    <div className="w-12 h-px bg-gold/30" />
                    <p className="serif italic text-sm opacity-60">— Executive Chef Abu Umarfaruk</p>
                  </div>

                  {/* Pavilion Location */}
                  <div className="bg-glass p-10 space-y-8 border border-gold/5">
                    <div className="space-y-4">
                      <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">The Pavilion</span>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-gold opacity-50" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">24 Ali Akilu Road, Kaduna, Nigeria</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-gold opacity-50" />
                          <span className="text-[10px] uppercase tracking-widest font-bold">11:00 — 23:00 Daily</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex-1 border border-gold/20 py-3 text-[8px] uppercase tracking-widest hover:bg-gold/10 transition-all">Directions</button>
                      <button className="flex-1 border border-gold/20 py-3 text-[8px] uppercase tracking-widest hover:bg-gold/10 transition-all">Contact</button>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-8">
                  <MenuDisplay 
                    items={menuItems} 
                    onAddToCart={handleAddToCart}
                    onSelectItem={(item) => setSelectedItem(item)}
                    onSearch={handleSearch}
                  />
                </div>
              </div>
              {footer}
            </motion.main>
          ) : (
            <motion.div
              key="checkout"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="pt-32"
            >
              <StripeExplanation 
                total={cart.reduce((a, b) => a + (b.price * b.quantity), 0)} 
                onComplete={() => setView('success')}
                tableNumber={tableNumber}
              />
              {footer}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
        onAddItem={handleAddToCart}
        onCheckout={() => { setIsCartOpen(false); setView('checkout'); }}
      />

      <ReservationModal 
        isOpen={isResOpen}
        onClose={() => setIsResOpen(false)}
      />

      <ProfileModal 
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        orders={orderHistory}
      />

      <QRScannerModal 
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onTableScan={(num) => setTableNumber(num)}
      />

      <ItemDetailModal 
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
        reviews={selectedItem ? (itemReviews[selectedItem.id] || []) : []}
        onSubmitReview={(review) => selectedItem && handleSubmitReview(selectedItem.id, review)}
      />
    </div>
  );
}
