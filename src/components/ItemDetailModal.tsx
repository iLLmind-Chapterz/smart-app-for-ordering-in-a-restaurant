import React, { useState } from 'react';
import { X, Plus, Leaf, Star, Flame, PenLine, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem, Review } from '../types';

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  reviews: Review[];
  onSubmitReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ 
  item, 
  isOpen, 
  onClose, 
  onAddToCart,
  reviews,
  onSubmitReview
}) => {
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!item) return null;

  const handleShare = async () => {
    const shareData = {
      title: `Ocean View — ${item.name}`,
      text: `Discover this artisanal coastal artifact at Ocean View: ${item.name}`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Static mock reviews to complement dynamic ones
  const staticReviews = [
    { id: 'static-1', author: "E. Vance", rating: 5, text: "A revelation in texture and balance. The subtle infusion of smoke is mastery.", date: "April 5, 2026" },
    { id: 'static-2', author: "Marcus T.", rating: 4, text: "Exquisite presentation. The play of various spices is truly sophisticated.", date: "March 20, 2026" }
  ];

  const allReviews = [...reviews, ...staticReviews];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim()) return;
    
    setIsSubmitting(true);
    // Simulate slight delay for effect
    setTimeout(() => {
      onSubmitReview({
        author: "Guest Critic",
        text: newReviewText,
        rating: newReviewRating
      });
      setNewReviewText('');
      setNewReviewRating(5);
      setIsSubmitting(false);
    }, 800);
  };

  const mockDetailed = item.description + " This dish is meticulously prepared using heritage techniques, sourcing the finest seasonal ingredients to ensure an unparalleled depth of flavor. Every element is balanced to provide a cohesive sensory journey.";
  const mockIngredients = ["Locally Sourced Seasonal Produce", "Himalayan Pink Salt", "Artisanal Cold-Pressed Oils", "Organic Herb Infusions", "House-Fermented Accents"];

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
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[600px] bg-[#0A0A0A] border-l border-gold/10 z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-gold/10 flex items-center justify-between bg-ink/50 backdrop-blur-md sticky top-0 z-10">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-[0.4em] text-gold mb-1 font-semibold">Artifact Detail</span>
                <h2 className="text-3xl font-serif font-light italic truncate max-w-[300px]">{item.name}</h2>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-full hover:bg-gold/10 text-gold transition-all"
                  title="Share Artifact"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  <span className="text-[10px] uppercase tracking-widest font-bold hidden sm:inline">
                    {copied ? 'Copied' : 'Share Artifact'}
                  </span>
                </button>
                <button 
                  onClick={onClose} 
                  className="p-2 border border-gold/20 rounded-full hover:bg-gold/10 text-gold transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {/* Dynamic Hero */}
              <div className="aspect-square w-full relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <div className="flex gap-2 mb-4">
                    {item.tags.map(tag => {
                      const isVegetarian = tag.toLowerCase() === 'vegetarian';
                      return (
                        <span 
                          key={tag} 
                          className={`px-3 py-1 bg-white/5 border rounded-full text-[9px] uppercase tracking-widest font-bold flex items-center gap-1.5 ${
                            isVegetarian 
                              ? 'text-green-400 border-green-400/20 bg-green-400/5' 
                              : 'text-gold border-white/10'
                          }`}
                        >
                          {isVegetarian && <Leaf className="w-2.5 h-2.5" />}
                          {tag}
                        </span>
                      );
                    })}
                  </div>
                  <div className="bg-ink/80 backdrop-blur-md px-6 py-4 border border-gold/30 inline-block">
                    <span className="serif text-4xl font-light text-gold">${item.price}</span>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-12">
                {/* Description */}
                 <div className="space-y-4">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Provenance & Narrative</span>
                  <p className="serif text-xl italic font-light leading-relaxed text-cream/70">
                    "{item.detailedDescription || mockDetailed}"
                  </p>
                </div>

                {/* Ingredients */}
                <div className="space-y-6">
                  <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Composition</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(item.ingredients || mockIngredients).map((ing, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-2 border-b border-white/5">
                        <Plus className="w-3 h-3 text-gold/40" />
                        <span className="text-[11px] uppercase tracking-wider font-medium text-cream/40">{ing}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-gold font-bold">Echoes from the Shore</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-2 h-2 text-gold fill-gold" />)}
                    </div>
                  </div>

                  {/* Submit Review Form */}
                  <form onSubmit={handleReviewSubmit} className="bg-white/5 border border-white/10 p-6 space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-[8px] uppercase tracking-widest opacity-40 font-bold">Leave a Review</span>
                       <div className="flex gap-1">
                          {[1,2,3,4,5].map(star => (
                            <button 
                              key={star} 
                              type="button"
                              onClick={() => setNewReviewRating(star)}
                              className="transition-transform active:scale-90"
                            >
                              <Star className={`w-3 h-3 ${newReviewRating >= star ? 'text-gold fill-gold' : 'text-white/10'}`} />
                            </button>
                          ))}
                       </div>
                    </div>
                    <textarea 
                      value={newReviewText}
                      onChange={(e) => setNewReviewText(e.target.value)}
                      placeholder="Share your experience..."
                      className="w-full bg-ink/50 border border-gold/10 p-4 text-sm font-light italic serif focus:outline-none focus:border-gold/30 min-h-[80px] resize-none"
                    />
                    <button 
                      type="submit"
                      disabled={isSubmitting || !newReviewText.trim()}
                      className="w-full flex items-center justify-center gap-2 py-3 border border-gold/20 text-[8px] uppercase tracking-[0.3em] font-bold hover:bg-gold/10 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <PenLine className="w-3 h-3" />
                      {isSubmitting ? 'Transmitting...' : 'Submit Reflection'}
                    </button>
                  </form>

                  <div className="space-y-6">
                    {allReviews.map((review, idx) => (
                      <div 
                        key={review.id} 
                        className="p-6 bg-white/[0.02] border border-white/5 space-y-4 hover:border-gold/20 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold">{review.author}</span>
                            <p className="text-[8px] uppercase tracking-widest opacity-20">{review.date}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-2.5 h-2.5 ${i < review.rating ? 'text-gold fill-gold' : 'text-white/5'}`} 
                              />
                            ))}
                          </div>
                        </div>
                        <div className="relative">
                          <span className="absolute -top-3 -left-2 text-4xl serif opacity-10 text-gold font-light">"</span>
                          <p className="text-sm italic font-serif text-cream/70 leading-relaxed pl-4">
                            {review.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-8 border-t border-gold/10 bg-ink/80 backdrop-blur-md">
              <button 
                onClick={() => {
                  onAddToCart(item);
                }}
                className="w-full bg-gold text-ink py-5 font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4"
              >
                <Plus className="w-4 h-4" />
                Add to Selection
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
