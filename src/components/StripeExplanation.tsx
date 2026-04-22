import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Lock, Apple, Smartphone, Wallet, CreditCard as VisaIcon, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface StripeExplanationProps {
  total: number;
  onComplete: () => void;
  tableNumber: string | null;
}

export const StripeExplanation: React.FC<StripeExplanationProps> = ({ total, onComplete, tableNumber }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'google'>('card');

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-8">
      <div className="mb-16">
        <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2 block font-semibold text-center md:text-left">Secure Gateway</span>
        <h2 className="text-6xl md:text-8xl font-serif font-light italic leading-none text-center md:text-left">Transaction</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Method Selector */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { id: 'card', name: 'Credit Card', icon: CreditCard },
              { id: 'apple', name: 'Apple Pay', icon: Apple },
              { id: 'google', name: 'Google Pay', icon: Smartphone }
            ].map((method) => (
              <button
                key={method.id}
                onClick={() => setPaymentMethod(method.id as any)}
                className={`py-4 px-6 border transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === method.id 
                    ? 'border-gold bg-gold/5 text-gold' 
                    : 'border-gold/10 text-cream/30 hover:border-gold/30'
                }`}
              >
                <method.icon className="w-5 h-5" />
                <span className="text-[8px] uppercase tracking-[0.2em] font-bold">{method.name}</span>
              </button>
            ))}
          </div>

          <div className="bg-glass border border-gold/20 p-8 space-y-8 min-h-[250px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {paymentMethod === 'card' ? (
                <motion.div 
                  key="card"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="flex justify-between items-center pb-6 border-b border-gold/10">
                    <span className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Authorized Account</span>
                    <VisaIcon className="w-8 h-8 text-gold" />
                  </div>
                  
                  <div className="flex items-center gap-8">
                    <div className="flex-1 space-y-1">
                      <p className="text-[10px] uppercase tracking-widest opacity-20">Card Member</p>
                      <p className="serif text-3xl font-light tracking-widest uppercase">M. OCEAN</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-[10px] uppercase tracking-widest opacity-20">Network ID</p>
                      <p className="mono text-xl font-light">•••• 4242</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gold/5">
                    <div className="space-y-1">
                      <p className="text-[8px] uppercase tracking-widest opacity-20">Card Brand</p>
                      <p className="text-[10px] uppercase tracking-widest font-bold">Priority Artisanal Luxe</p>
                    </div>
                    <div className="space-y-1 text-right">
                      <p className="text-[8px] uppercase tracking-widest opacity-20">Expires</p>
                      <p className="mono text-[10px]">12 / 2028</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="mobile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8 flex-1 flex flex-col justify-center items-center text-center py-10"
                >
                  <div className="p-6 border border-gold/20 rounded-full bg-gold/5 mb-4">
                    {paymentMethod === 'apple' ? (
                      <Apple className="w-12 h-12 text-gold" />
                    ) : (
                      <Smartphone className="w-12 h-12 text-gold" />
                    )}
                  </div>
                  <div>
                    <h4 className="serif text-2xl mb-2 italic">Ready to Authorize</h4>
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">
                      Linking via {paymentMethod === 'apple' ? 'iCloud Security' : 'Google Wallet'}
                    </p>
                  </div>

                  <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-full flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold">
                      {paymentMethod === 'apple' ? 'Apple Cash' : 'Play Store'} Primary Account : •••• 8812
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-8 flex items-center justify-between opacity-30 border-t border-gold/5">
              <div className="flex gap-4">
                <ShieldCheck className="w-4 h-4 grayscale" />
                <div className="mono text-[8px] border border-cream/20 px-2 flex items-center tracking-widest">PCI-DSS</div>
              </div>
              <div className="mono text-[8px] uppercase tracking-[0.2em]">Validated Session</div>
            </div>
          </div>

          <div className="p-10 border border-gold border-dashed flex flex-col items-center justify-center gap-6">
             <p className="text-center italic serif text-xl opacity-60 leading-relaxed font-light">
               "An automated digital signature and receipt will be generated and dispatched to your email address upon authorization."
             </p>
             <div className="flex items-center gap-3 grayscale brightness-200 opacity-20">
                <Lock className="w-4 h-4" />
                <span className="mono text-[10px] uppercase tracking-[0.3em]">Encrypted Data Path</span>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-8">
           <div className="bg-glass border border-gold/20 p-8 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Order Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm italic font-light">
                    <span>Chef's Choice</span>
                    <span className="mono text-[10px] text-gold">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm italic font-light opacity-50">
                    <span>Service Artefact</span>
                    <span className="mono text-[10px]">$4.50</span>
                  </div>
                  {tableNumber && (
                    <div className="flex justify-between items-center bg-gold/5 border border-gold/10 p-3 mt-4">
                      <span className="text-[9px] uppercase tracking-widest font-bold text-gold">Destination</span>
                      <span className="serif text-lg italic">Table {tableNumber}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-20 pt-8 border-t border-gold/20">
                <div className="flex justify-between items-baseline mb-8">
                  <span className="serif text-2xl italic">Lumière Total</span>
                  <span className="serif text-5xl text-gold font-light">${(total + 4.5).toFixed(2)}</span>
                </div>
                
                <button 
                  disabled={isProcessing}
                  onClick={handlePay}
                  className={`w-full py-6 font-bold uppercase tracking-[0.4em] text-[10px] transition-all border-2 ${
                    isProcessing 
                      ? 'border-gold/20 text-gold/40 animate-pulse' 
                      : 'bg-gold border-gold text-ink hover:bg-transparent hover:text-gold'
                  }`}
                >
                  {isProcessing 
                    ? 'Authorizing...' 
                    : paymentMethod === 'card' 
                      ? 'Charge Account' 
                      : paymentMethod === 'apple' 
                        ? 'Pay with Apple Pay' 
                        : 'Pay with Google Pay'}
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
