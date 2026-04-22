import React from 'react';
import { X, QrCode, Share2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';

interface MenuQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string | null;
}

export const MenuQRModal: React.FC<MenuQRModalProps> = ({ isOpen, onClose, tableNumber }) => {
  const currentUrl = window.location.href;
  const shareUrl = tableNumber ? `${currentUrl}?table=${tableNumber}` : currentUrl;

  const handleDownload = () => {
    const svg = document.getElementById('menu-qr-code');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 100;
      if (ctx) {
        ctx.fillStyle = '#0A0A0A';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        ctx.fillStyle = '#D4AF37';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('OCEAN VIEW KADUNA', canvas.width / 2, img.height + 60);
        if (tableNumber) {
          ctx.fillText(`TABLE ${tableNumber}`, canvas.width / 2, img.height + 80);
        }
      }
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `ocean-view-menu${tableNumber ? `-table-${tableNumber}` : ''}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
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
                <span className="text-[8px] uppercase tracking-[0.4em] text-gold mb-1 font-semibold">Guest Access</span>
                <h2 className="text-3xl font-serif font-light italic">Digital Portal</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 border border-gold/20 rounded-full hover:bg-gold/10 text-gold transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 flex flex-col items-center justify-center text-center space-y-8">
              <div className="relative p-6 bg-white rounded-3xl">
                <QRCodeSVG 
                  id="menu-qr-code"
                  value={shareUrl} 
                  size={200}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "/favicon.ico", // Attempt to use favicon if it exists
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>

              <div className="space-y-4 w-full">
                <div className="space-y-1">
                  <h3 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold">Scan to Begin Selection</h3>
                  <p className="text-cream/50 text-xs italic serif leading-relaxed px-4">
                    "Present this identifier to guests to grant immediate access to our digital collection, real-time reservations, and seamless settlement."
                  </p>
                </div>

                {tableNumber && (
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-gold/30 bg-gold/5 rounded-full">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-gold">Linked to Table {tableNumber}</span>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText(shareUrl);
                        // Optional: Show toast
                    }}
                    className="flex-1 flex items-center justify-center gap-2 border border-gold/20 text-gold py-4 font-bold uppercase tracking-widest text-[9px] hover:bg-gold/10 transition-all"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Copy Link
                  </button>
                  <button 
                    onClick={handleDownload}
                    className="flex-1 flex items-center justify-center gap-2 bg-gold text-ink py-4 font-bold uppercase tracking-widest text-[9px] hover:bg-white hover:text-black transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
