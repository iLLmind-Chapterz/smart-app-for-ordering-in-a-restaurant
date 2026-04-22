import React, { useState } from 'react';
import { X, Calendar, Users, Clock, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[] | null>(null);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState('Main Hall');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    email: '',
  });

  const handleSearch = () => {
    if (!formData.date || !formData.time) return;
    
    setIsSearching(true);
    setAvailableSlots(null);

    // Mock search logic: generates 3 slots around the requested time
    setTimeout(() => {
      const [hours, minutes] = formData.time.split(':');
      const h = parseInt(hours);
      const slots = [
        `${h-1 < 0 ? 23 : h-1}:${minutes}`,
        formData.time,
        `${h+1 > 23 ? 0 : h+1}:${minutes}`
      ].sort();
      
      setAvailableSlots(slots);
      setIsSearching(false);
    }, 1500);
  };

  const handleBook = () => {
    setStep(3);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep(1), 300); // Reset after exit animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-ink/95 backdrop-blur-xl z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[500px] bg-[#0A0A0A] border border-gold/20 rounded-none z-[110] shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="p-10 border-b border-gold/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.4em] text-gold mb-1 font-semibold">Table Concierge</span>
                <h2 className="text-4xl font-serif font-light italic">Reservation</h2>
              </div>
              <button onClick={handleClose} className="p-2 border border-gold/20 rounded-full hover:bg-gold/10 text-gold transition-all">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-10 space-y-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold block">Select Atmosphere</label>
                    <div className="grid grid-cols-2 gap-2">
                       {['Main Hall', 'Terrace', 'Private Cellar', 'Chef Counter'].map(box => (
                         <button 
                           key={box} 
                           onClick={() => setSelectedAtmosphere(box)}
                           className={`px-4 py-3 border text-[10px] uppercase tracking-widest transition-all text-left ${
                             selectedAtmosphere === box ? 'border-gold text-gold bg-gold/5' : 'border-gold/10 hover:border-gold/30'
                           }`}
                         >
                           {box}
                         </button>
                       ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Party Size</label>
                      <div className="flex items-center border-b border-gold/30">
                        <Users className="w-4 h-4 text-gold opacity-50 mr-3" />
                        <input 
                          type="number" 
                          min="1" 
                          max="12"
                          value={formData.guests}
                          onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                          className="bg-transparent py-3 w-full serif text-xl focus:outline-none" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Date</label>
                      <div className="flex items-center border-b border-gold/30">
                        <Calendar className="w-4 h-4 text-gold opacity-50 mr-3" />
                        <input 
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          className="bg-transparent py-3 w-full serif text-sm focus:outline-none" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold block">Preferred Time</label>
                    <div className="flex items-center border-b border-gold/30">
                      <Clock className="w-4 h-4 text-gold opacity-50 mr-3" />
                      <input 
                        type="time" 
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="bg-transparent py-3 w-full serif text-sm focus:outline-none" 
                      />
                    </div>
                  </div>

                  {availableSlots ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <label className="text-[10px] uppercase tracking-widest text-gold font-bold block">Available Tables Found</label>
                      <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                        {availableSlots.map(slot => (
                          <button
                            key={slot}
                            onClick={() => {
                              setFormData({...formData, time: slot});
                              setStep(2);
                            }}
                            className={`shrink-0 px-6 py-3 border border-gold/30 rounded-none text-[10px] font-bold tracking-widest hover:bg-gold hover:text-ink transition-all ${
                              formData.time === slot ? 'bg-gold text-ink' : 'bg-transparent text-cream'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                      <p className="text-[9px] uppercase tracking-widest opacity-30 italic">Select a timestamp to proceed</p>
                    </motion.div>
                  ) : (
                    <button 
                      onClick={handleSearch}
                      disabled={isSearching || !formData.date || !formData.time}
                      className="w-full border border-gold/30 text-gold py-5 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-gold/10 disabled:opacity-20 transition-all flex items-center justify-center gap-3"
                    >
                      {isSearching ? (
                        <>
                          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                            <Clock className="w-4 h-4" />
                          </motion.div>
                          Verifying Placements...
                        </>
                      ) : (
                        'Search Available Tables'
                      )}
                    </button>
                  )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                   <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Full Name</label>
                        <input type="text" className="w-full bg-transparent border-b border-gold/30 py-3 serif text-xl focus:outline-none focus:border-gold transition-all" placeholder="P. Poseidon" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] uppercase tracking-widest opacity-40 font-bold">Email Contact</label>
                        <input type="email" className="w-full bg-transparent border-b border-gold/30 py-3 serif text-xl focus:outline-none focus:border-gold transition-all" placeholder="concierge@oceanview.com" />
                      </div>
                   </div>

                   <div className="p-4 bg-gold/5 border border-gold/20 italic serif text-sm opacity-60 leading-relaxed">
                     "Your reservation includes a complimentary glass of vintage champagne on arrival."
                   </div>

                   <div className="flex gap-4 pt-4">
                      <button onClick={() => setStep(1)} className="flex-1 border border-gold/30 text-gold py-4 font-bold uppercase tracking-widest text-[9px] hover:bg-gold/10">Back</button>
                      <button onClick={handleBook} className="flex-[2] bg-gold text-ink py-4 font-bold uppercase tracking-widest text-[9px]">Confirm Booking</button>
                   </div>
                </div>
              )}

              {step === 3 && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-8">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-gold rounded-full flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-ink" />
                  </motion.div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <h3 className="serif text-3xl italic">Table Secured</h3>
                      <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">
                        An invitation has been dispatched
                      </p>
                    </div>

                    <div className="bg-gold/5 border border-gold/10 p-6 space-y-4 w-full">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
                        <span className="opacity-40">Date</span>
                        <span className="text-gold">{formData.date || 'To be selected'}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
                        <span className="opacity-40">Time</span>
                        <span className="text-gold">{formData.time || 'TBD'}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
                        <span className="opacity-40">Guests</span>
                        <span className="text-gold">{formData.guests} persons</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.2em] font-bold">
                        <span className="opacity-40">Atmosphere</span>
                        <span className="text-gold">{selectedAtmosphere}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleClose}
                    className="w-full border border-gold/20 py-4 font-bold uppercase tracking-[0.4em] text-[9px] hover:bg-gold hover:text-ink transition-all"
                  >
                    Dismiss Concierge
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
