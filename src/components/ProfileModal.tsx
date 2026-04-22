import React from 'react';
import { X, Receipt, Package, ChevronRight, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, orders }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/95 backdrop-blur-xl z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0D0D0D] border-l border-gold/20 z-[110] shadow-2xl flex flex-col"
          >
            <div className="p-10 border-b border-gold/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.4em] text-gold mb-1 font-semibold">Guardian Account</span>
                <h2 className="text-4xl font-serif font-light italic">Your Profile</h2>
              </div>
              <button onClick={onClose} className="p-2 border border-gold/20 rounded-full hover:bg-gold/10 text-gold transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-12 custom-scrollbar">
              {/* User Bio Preview */}
              <div className="flex items-center gap-6 pb-12 border-b border-gold/5">
                <div className="w-20 h-20 rounded-full border border-gold flex items-center justify-center text-3xl serif italic text-gold bg-gold/5">
                  M
                </div>
                <div>
                  <h3 className="serif text-2xl uppercase tracking-tighter">Morgan Sea</h3>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold mt-1">Connoisseur Tier Member</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h4 className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Order Archive</h4>
                  <History className="w-4 h-4 text-gold opacity-30" />
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-20 text-[10px] uppercase tracking-[0.4em] opacity-20 italic">
                    No archival transmissions found
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="group border border-gold/5 hover:border-gold/20 p-6 transition-all bg-white/[0.02]">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="mono text-[9px] uppercase opacity-30">Reference: {order.id}</p>
                            <p className="serif text-sm italic mt-1 text-cream/70">{order.date}</p>
                          </div>
                          <span className={`text-[8px] uppercase tracking-widest px-2 py-1 border border-gold/10 font-bold ${
                            order.status === 'completed' ? 'text-green-800' : 'text-gold'
                          }`}>
                            {order.status}
                          </span>
                        </div>

                        <div className="space-y-2 mb-4">
                          {order.items.slice(0, 2).map((item, idx) => (
                            <div key={idx} className="flex justify-between text-[11px] uppercase tracking-wider opacity-60">
                              <span>{item.quantity}x {item.name}</span>
                              <span className="mono">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-[9px] italic opacity-30">+ {order.items.length - 2} more items</p>
                          )}
                        </div>

                        <div className="flex justify-between items-end pt-4 border-t border-gold/5">
                          <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Artifact Total</span>
                          <span className="serif text-2xl font-light text-gold">${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-10 border-t border-gold/10 bg-[#0A0A0A]">
              <button 
                className="w-full border border-gold/20 py-4 font-bold uppercase tracking-[0.4em] text-[9px] hover:bg-gold hover:text-ink transition-all"
              >
                Sign Out of Pavilion
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
