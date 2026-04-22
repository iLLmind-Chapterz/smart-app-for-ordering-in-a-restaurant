import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Calendar, Car, User, QrCode, ChevronDown, Hash, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservations: () => void;
  onOpenProfile: () => void;
  onOpenQRScanner: () => void;
  tableNumber: string | null;
  onOpenDelivery: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  cartCount, 
  onOpenCart, 
  onOpenReservations, 
  onOpenProfile,
  onOpenQRScanner,
  tableNumber,
  onOpenDelivery
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-16 right-0 z-50 bg-ink/80 backdrop-blur-md px-12 py-8 flex items-center justify-between border-b border-gold/10">
      <div className="flex items-center gap-12">
        <div className="flex flex-col">
          <span className="text-[8px] uppercase tracking-[0.4em] text-gold mb-1 font-semibold">Established 2026</span>
          <span className="text-2xl font-serif font-light tracking-tighter uppercase italic">OCEAN VIEW</span>
        </div>

        {tableNumber && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-3 px-4 py-1.5 border border-gold/30 bg-gold/5 rounded-full"
          >
            <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold">Table {tableNumber} Active</span>
          </motion.div>
        )}
      </div>

      <div className="flex items-center gap-12">
        <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-cream/40">
          <a href="#menu" className="hover:text-gold transition-colors">Selection</a>
          <button onClick={onOpenReservations} className="hover:text-gold transition-colors uppercase">Tables</button>
          <button onClick={onOpenQRScanner} className="flex items-center gap-2 hover:text-gold transition-colors uppercase">
            <QrCode className="w-3.5 h-3.5" />
            Scan QR
          </button>
          <a href="#delivery" className="hover:text-gold transition-colors">Concierge</a>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenProfile}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gold hover:text-white transition-colors"
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="group flex items-center gap-3 pl-4 border-l border-gold/20"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold group-hover:text-cream transition-colors">Order Services</span>
                {cartCount > 0 && (
                  <span className="text-[8px] text-gold/60 font-bold uppercase tracking-widest">{cartCount} items selected</span>
                )}
              </div>
              <div className="p-2 border border-gold/30 rounded-full group-hover:bg-gold/10 transition-colors relative">
                <ChevronDown className={`w-4 h-4 text-gold transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-ink text-[8px] font-black w-3 h-3 flex items-center justify-center rounded-full">
                    !
                  </span>
                )}
              </div>
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-64 bg-ink/95 border border-gold/20 backdrop-blur-xl shadow-2xl p-2 z-[60]"
                >
                  <div className="grid gap-1">
                    {/* Table Number Display/Action */}
                    <div className="px-4 py-3 border-b border-gold/10 flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <Hash className="w-4 h-4 text-gold" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Table Assignment</span>
                          <span className="text-[11px] text-cream/60">Currently: {tableNumber || 'None'}</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => { setIsDropdownOpen(false); onOpenQRScanner(); }}
                        className="text-[8px] uppercase tracking-widest font-bold text-gold/40 hover:text-gold"
                      >
                        Change
                      </button>
                    </div>

                    <button 
                      onClick={() => { setIsDropdownOpen(false); onOpenReservations(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gold/10 transition-all text-left group"
                    >
                      <Calendar className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cream group-hover:text-gold">Table Reservations</span>
                        <span className="text-[8px] text-cream/30 uppercase tracking-[0.2em]">Book a sunset view</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => { setIsDropdownOpen(false); onOpenDelivery(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gold/10 transition-all text-left group"
                    >
                      <Car className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-cream group-hover:text-gold">Delivery & Concierge</span>
                        <span className="text-[8px] text-cream/30 uppercase tracking-[0.2em]">Coastal residence delivery</span>
                      </div>
                    </button>

                    <button 
                      onClick={() => { setIsDropdownOpen(false); onOpenCart(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 bg-gold/5 hover:bg-gold/20 transition-all text-left group mt-1"
                    >
                      <div className="relative">
                        <CreditCard className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-white text-ink text-[7px] font-black w-2.5 h-2.5 flex items-center justify-center rounded-full">
                            {cartCount}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold">Checkout Options</span>
                        <span className="text-[8px] text-cream/30 uppercase tracking-[0.2em]">Settle your selection</span>
                      </div>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  );
};
