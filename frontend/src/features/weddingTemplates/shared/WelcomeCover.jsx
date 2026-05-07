import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Leaf, Heart, MailOpen, Flower2 } from 'lucide-react';
import { resolveCover, formatDate } from '../../../assets/images';

const WelcomeCover = ({ weddingData, templateId, onOpen }) => {
  const [phase, setPhase] = useState('idle'); // idle | opening | done

  // ── Extract data ───────────────────────────────────────────
  const groom = weddingData?.groom_short_name || weddingData?.groom_name || 'Chú Rể';
  const bride = weddingData?.bride_short_name || weddingData?.bride_name || 'Cô Dâu';
  const eventDate = weddingData?.wedding_date || weddingData?.events?.[0]?.event_time;
  const dt = useMemo(() => formatDate(eventDate), [eventDate]);
  const coverImg = resolveCover(weddingData?.cover_image_path);

  // ── Theme Configuration ─────────────────────────────────────
  const theme = useMemo(() => {
    const id = templateId?.toLowerCase() || '';
    
    if (id.includes('gold') || id.includes('luxury')) {
      return {
        type: 'LUXURY',
        primary: '#C8A951',
        secondary: '#0A0A0A',
        bg: '#0F0F0F',
        font: '"Playfair Display", serif',
        accent: 'rgba(200, 169, 81, 0.2)',
        icon: Sparkles
      };
    }
    if (id.includes('rustic') || id.includes('emerald') || id.includes('green')) {
      return {
        type: 'RUSTIC',
        primary: '#2D4F1E',
        secondary: '#FDFCF8',
        bg: '#F4F7F0',
        font: '"Playfair Display", serif',
        accent: 'rgba(45, 79, 30, 0.1)',
        icon: Leaf
      };
    }
    if (id.includes('red') || id.includes('traditional') || id.includes('phoenix')) {
      return {
        type: 'TRADITIONAL',
        primary: '#D42F2F',
        secondary: '#FFF9F0',
        bg: '#FDF2F2',
        font: '"Playfair Display", serif',
        accent: 'rgba(212, 47, 47, 0.15)',
        icon: Heart
      };
    }
    if (id.includes('floral') || id.includes('pastel')) {
      return {
        type: 'FLORAL',
        primary: '#E29595',
        secondary: '#FFFFFF',
        bg: '#FFF9F9',
        font: '"Playfair Display", serif',
        accent: 'rgba(226, 149, 149, 0.1)',
        icon: Flower2
      };
    }
    return {
      type: 'MINIMAL',
      primary: '#1A1A1A',
      secondary: '#FFFFFF',
      bg: '#F9F9F9',
      font: '"Inter", sans-serif',
      accent: 'rgba(0, 0, 0, 0.05)',
      icon: Heart
    };
  }, [templateId]);

  // ── Lock scroll while cover visible ──────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    setTimeout(() => {
      document.body.style.overflow = '';
      if (onOpen) onOpen();
      setPhase('done');
    }, 1500);
  };

  if (phase === 'done') return null;

  const ThemeIcon = theme.icon;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: theme.bg }}
        exit={{ 
          y: '-100%',
          opacity: 0,
          transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } 
        }}
      >
        <BackgroundDecoration theme={theme} />

        <div className="relative w-full max-w-lg px-6 flex flex-col items-center">
          
          <motion.div
            layoutId="cover-card"
            className="relative w-full aspect-[3/4] sm:aspect-[4/5] bg-white shadow-2xl rounded-2xl overflow-hidden border border-black/5"
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0">
              <img src={coverImg} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-between p-8 sm:p-12 text-white text-center">
              
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                  <ThemeIcon size={20} className="text-white" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.5em] opacity-80 block">SAVE THE DATE</span>
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  className="text-4xl sm:text-6xl font-light tracking-tight"
                  style={{ fontFamily: theme.font }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="block">{groom}</span>
                  <div className="flex items-center justify-center gap-4 my-2">
                    <div className="h-px w-8 bg-white/30" />
                    <span className="text-2xl italic font-extralight opacity-60">&</span>
                    <div className="h-px w-8 bg-white/30" />
                  </div>
                  <span className="block">{bride}</span>
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4"
                >
                   <p className="text-sm sm:text-lg tracking-[0.2em] uppercase font-light">
                    {dt.day} . {dt.month} . {dt.year}
                  </p>
                  <div className="text-[10px] sm:text-xs opacity-60 mt-2 italic font-light tracking-widest">
                    {weddingData?.lunar_date_text}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="w-full"
              >
                <button
                  onClick={handleOpen}
                  disabled={phase === 'opening'}
                  className="group relative w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-semibold tracking-widest text-[10px] uppercase overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <MailOpen size={16} />
                    Mở Thiệp Cưới
                  </span>
                  <motion.div 
                    className="absolute inset-0 bg-gray-100"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ type: 'tween' }}
                  />
                </button>
              </motion.div>
            </div>

            <ThemeAccent theme={theme} />
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col items-center gap-3 opacity-30"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
             <div className="flex flex-col items-center gap-1">
                <div className="w-[1px] h-10 bg-gradient-to-b from-transparent to-current" style={{ color: theme.primary }} />
                <div className="w-1.5 h-1.5 rounded-full border border-current" style={{ color: theme.primary }} />
             </div>
            <span className="text-[8px] uppercase tracking-[0.4em] font-bold" style={{ color: theme.primary }}>Scroll Down</span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const BackgroundDecoration = ({ theme }) => {
  const Icon = theme.icon;
  
  switch (theme.type) {
    case 'LUXURY':
      return (
        <>
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
            style={{ backgroundImage: 'radial-gradient(circle, #C8A951 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          <div className="absolute top-1/4 -left-10 w-64 h-64 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: theme.primary }} />
          <div className="absolute bottom-1/4 -right-10 w-64 h-64 rounded-full blur-[120px] opacity-20" style={{ backgroundColor: theme.primary }} />
        </>
      );
    case 'RUSTIC':
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05]">
          <Leaf className="absolute -top-10 -left-10 w-64 h-64 rotate-45" />
          <Leaf className="absolute -bottom-10 -right-10 w-64 h-64 -rotate-[135deg]" />
        </div>
      );
    case 'TRADITIONAL':
      return (
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
          <Heart size={400} fill="currentColor" className="text-red-600" />
        </div>
      );
    default:
      return null;
  }
};

const ThemeAccent = ({ theme }) => {
  if (theme.type === 'LUXURY') {
    return (
      <div className="absolute inset-6 border border-white/10 pointer-events-none">
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t border-l border-white/40" />
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t border-r border-white/40" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b border-l border-white/40" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b border-r border-white/40" />
      </div>
    );
  }
  if (theme.type === 'TRADITIONAL') {
    return (
      <div className="absolute inset-0 border-[16px] border-double border-red-900/5 pointer-events-none" />
    );
  }
  return null;
};

export default WelcomeCover;
