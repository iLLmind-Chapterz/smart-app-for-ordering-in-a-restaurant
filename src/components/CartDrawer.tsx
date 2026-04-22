import React from 'react';
import { X, Trash2, ArrowRight, CreditCard, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, MenuItem } from '../types';
import { MENU_ITEMS } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onCheckout: () => void;
  onAddItem: (item: MenuItem) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, onClose, items, onRemove, onUpdateQty, onCheckout, onAddItem 
}) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Simple upselling logic based on pairings
  const allPairingIds = Array.from(new Set(items.flatMap(i => i.pairingIds || [])));
  const suggestedItems = MENU_ITEMS.filter(i => 
    allPairingIds.includes(i.id) && !items.find(ci => ci.id === i.id)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0D0D0D] border-l border-gold/20 z-50 flex flex-col"
          >
            <div className="p-8 border-b border-gold/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.4em] text-gold mb-1 font-semibold">Your Selection</span>
                <h2 className="text-4xl font-serif font-light italic">Smart Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 border border-gold/20 rounded-full hover:bg-gold/10 text-gold transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
              {items.length === 0 ? (
                <div className="text-center py-20 text-[10px] uppercase tracking-[0.4em] opacity-20 italic">
                  Awaiting Selection
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-6 items-center">
                    <img src={item.image} className="w-16 h-20 grayscale hover:grayscale-0 transition-all object-cover border border-gold/10" />
                    <div className="flex-1">
                      <h4 className="serif text-xl font-light uppercase tracking-tight">{item.name}</h4>
                      <p className="mono text-[10px] text-gold mt-1">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-4 mt-4">
                        <button 
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="text-gold opacity-40 hover:opacity-100 transition-opacity"
                        >-</button>
                        <span className="mono text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="text-gold opacity-40 hover:opacity-100 transition-opacity"
                        >+</button>
                      </div>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-gold/20 hover:text-red-900 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}

              {suggestedItems.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gold/10">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Smart Suggestions</span>
                  </div>
                  <div className="space-y-6">
                    {suggestedItems.map(item => (
                      <div key={item.id} className="flex items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4">
                          <img src={item.image} className="w-10 h-10 grayscale object-cover border border-gold/10" />
                          <div>
                            <p className="serif text-sm italic">{item.name}</p>
                            <p className="mono text-[8px] text-gold/60">${item.price}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => onAddItem(item)}
                          className="text-[8px] font-bold uppercase border border-gold/30 hover:bg-gold hover:text-ink px-3 py-1.5 transition-all"
                        >Add</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-gold/10 bg-[#0A0A0A] space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold">Total</span>
                <span className="serif text-4xl font-light text-gold">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                disabled={items.length === 0}
                className="w-full bg-white text-black py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-gold transition-all disabled:opacity-20"
              >
                Confirm Order
              </button>
              <div className="p-2 bg-black border border-white/5">
                <p className="mono text-[8px] text-gold mb-1 uppercase opacity-40">Stripe Invariant Check</p>
                <div className="mono text-[7px] text-green-800 flex justify-between">
                   <span>AUTH_STATE: OK</span>
                   <span>TOKEN: ...4x9a</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
