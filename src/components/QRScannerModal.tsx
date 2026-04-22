import React, { useState, useEffect } from 'react';
import { X, QrCode, Scan, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTableScan: (tableNumber: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({ isOpen, onClose, onTableScan }) => {
  const [scanning, setScanning] = useState(false);
  const [detected, setDetected] = useState<string | null>(null);

  const simulateScan = () => {
    setScanning(true);
    setDetected(null);
    
    // Simulate a 2s scan process
    setTimeout(() => {
      const mockTable = Math.floor(Math.random() * 20 + 1).toString();
      setScanning(false);
      setDetected(mockTable);
      
      // Auto-confirm after detection
      setTimeout(() => {
        onTableScan(mockTable);
        onClose();
        setDetected(null);
      }, 1500);
    }, 2000);
  };

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
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[450px] bg-[#0A0A0A] border border-gold/20 rounded-none z-[110] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-8 border-b border-gold/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.4em] text-gold mb-1 font-semibold">Table Link</span>
                <h2 className="text-3xl font-serif font-light italic">QR Scanner</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 border border-gold/20 rounded-full hover:bg-gold/10 text-gold transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 flex flex-col items-center justify-center text-center space-y-8">
              <div className="relative w-64 h-64 border-2 border-gold/20 rounded-3xl flex items-center justify-center overflow-hidden">
                {!scanning && !detected && (
                  <QrCode className="w-16 h-16 text-gold/20" />
                )}
                
                {scanning && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gold/5">
                    <Loader2 className="w-12 h-12 text-gold animate-spin mb-4" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-gold font-bold">Scanning Surface...</span>
                    
                    {/* Scanning animation line */}
                    <motion.div 
                      initial={{ top: '0%' }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-0.5 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                    />
                  </div>
                )}

                {detected && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-green-500/10"
                  >
                    <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
                    <span className="text-[10px] uppercase tracking-[0.4em] text-green-500 font-bold">Table {detected} Linked</span>
                  </motion.div>
                )}
              </div>

              {!scanning && !detected && (
                <div className="space-y-6 w-full">
                  <p className="text-cream/50 text-xs italic serif leading-relaxed px-4">
                    "Point your camera at the unique QR identifier located on your Lumière table to link your digital order directly to your physical placement."
                  </p>
                  <button 
                    onClick={simulateScan}
                    className="w-full bg-gold text-ink py-4 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                    <Scan className="w-4 h-4" />
                    Activate Optical Lens
                  </button>
                </div>
              )}

              {scanning && (
                <p className="text-cream/30 text-[10px] uppercase tracking-widest animate-pulse">
                  Decrypting local coordinates...
                </p>
              )}

              {detected && (
                <div className="space-y-2">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Success</span>
                  <p className="text-cream/60 text-xs serif italic">Establishing secure link to Table {detected}...</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
