import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Flower } from 'lucide-react';
import { formatDate, resolveCover } from '../../../assets/images';
import { getThemeByTemplateId } from '../constants/templateThemes';
import FloatingDecorativeElements from './FloatingDecorativeElements';

const getCoverConfig = (type) => {
  switch (type) {
    case 'TRADITIONAL':
      return {
        backdrop: 'bg-red-950',
        cardBg: 'bg-[#FFFBF5]',
        textColor: 'text-red-950',
        accentColor: 'text-[#B91C1C]',
        buttonBg: 'bg-[#B91C1C]',
        buttonText: 'text-white',
        sealBg: 'bg-[#B91C1C]',
        sealColor: 'text-white',
        border: 'border-0',
        invitationText: 'Kính mời',
        icon: Sparkles
      };
    case 'EMERALD':
      return {
        backdrop: 'bg-[#022c22]', // very dark emerald
        cardBg: 'bg-[#F8FAFC]',
        textColor: 'text-[#064e3b]',
        accentColor: 'text-[#047857]',
        buttonBg: 'bg-[#064e3b]',
        buttonText: 'text-white',
        sealBg: 'bg-[#064e3b]',
        sealColor: 'text-white',
        border: 'border-0',
        invitationText: 'Thân mời',
        icon: Flower
      };
    default: // MODERN
      return {
        backdrop: 'bg-slate-100',
        cardBg: 'bg-white',
        textColor: 'text-slate-800',
        accentColor: 'text-slate-900',
        buttonBg: 'bg-slate-900',
        buttonText: 'text-white',
        sealBg: 'bg-slate-900',
        sealColor: 'text-white',
        border: 'border-0',
        invitationText: 'Thân mời',
        icon: Heart
      };
  }
};

const WelcomeCover = ({ weddingData, templateId, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ── Extract Data ───────────────────────────────────────────
  const groom = weddingData?.groom_short_name || 'Chú Rể';
  const bride = weddingData?.bride_short_name || 'Cô Dâu';
  const eventDate = weddingData?.wedding_date || weddingData?.events?.[0]?.event_time;
  const dt = useMemo(() => formatDate(eventDate), [eventDate]);
  const guestName = weddingData?.guest_name || weddingData?.invitation?.guest_name;
  const cover = useMemo(() => resolveCover(weddingData?.cover_image_path), [weddingData?.cover_image_path]);

  // ── Theme Configuration ─────────────────────────────────────
  const theme = useMemo(() => getThemeByTemplateId(templateId), [templateId]);
  const config = useMemo(() => getCoverConfig(theme.type), [theme.type]);
  const ThemeIcon = config.icon;

  // ── Lock Scroll while visible ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      if (onOpen) onOpen();
    }, 800);
  };

  if (isOpen && !onOpen) return null;

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className={`fixed inset-0 z-[9999] overflow-y-auto ${config.backdrop}`}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none opacity-50">
            <FloatingDecorativeElements count={15} type={theme.type === 'EMERALD' ? 'leaf' : 'heart'} color="currentColor" />
          </div>

          <div className="min-h-full w-full flex items-center justify-center p-4 py-12 sm:p-8 relative z-10">
            {/* Card Container */}
            <motion.div
              className={`relative w-full max-w-xs sm:max-w-md md:max-w-lg rounded-2xl sm:rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col items-center text-center px-4 py-8 sm:px-12 sm:py-12 ${config.cardBg} ${config.border}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            {/* Elegant Inner Frame & Corner Motifs */}
            <div className={`absolute inset-3 sm:inset-4 border border-current opacity-[0.08] rounded-xl sm:rounded-2xl pointer-events-none ${config.textColor}`} />
            <div className={`absolute inset-0 pointer-events-none ${config.textColor}`}>
              <ThemeIcon className="absolute top-5 left-5 opacity-10 w-6 h-6 sm:w-8 sm:h-8" />
              <ThemeIcon className="absolute top-5 right-5 opacity-10 w-6 h-6 sm:w-8 sm:h-8 scale-x-[-1]" />
              <ThemeIcon className="absolute bottom-5 left-5 opacity-10 w-6 h-6 sm:w-8 sm:h-8 scale-y-[-1]" />
              <ThemeIcon className="absolute bottom-5 right-5 opacity-10 w-6 h-6 sm:w-8 sm:h-8 scale-[-1]" />
            </div>

            {/* Elegant Top Badge (Clickable) */}
            <motion.button
              onClick={handleOpen}
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.05, 1] }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ 
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                type: "spring", damping: 15, stiffness: 100, delay: 0.5 
              }}
              className={`absolute -top-7 sm:-top-10 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-xl cursor-pointer z-20 ${config.sealBg}`}
            >
              <ThemeIcon className={`w-5 h-5 sm:w-8 sm:h-8 ${config.sealColor}`} strokeWidth={1.5} />
            </motion.button>

            {/* Luxury Arch Photo Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="relative w-28 sm:w-44 aspect-[3/4] mt-2 mb-4 sm:mb-8 rounded-t-full rounded-b-2xl sm:rounded-b-3xl overflow-hidden shadow-xl p-1 sm:p-1.5 z-10"
              style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
            >
              <div className="w-full h-full rounded-t-full rounded-b-xl sm:rounded-b-[1.25rem] overflow-hidden relative group border border-current opacity-90" style={{ borderColor: 'inherit' }}>
                <img 
                  src={cover} 
                  alt="Couple Cover" 
                  className="w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* Names Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-4 sm:mb-8 w-full z-10"
            >
              <h2 
                className={`text-2xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight flex flex-col sm:flex-row items-center justify-center ${config.textColor}`}
                style={{ fontFamily: theme.font }}
              >
                <span className="truncate px-2 max-w-full">{groom}</span>
                <motion.span 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg sm:text-2xl italic font-light my-1.5 sm:my-0 sm:mx-4"
                >
                  &
                </motion.span>
                <span className="truncate px-2 max-w-full">{bride}</span>
              </h2>
            </motion.div>

            {/* Subtle Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className={`h-[1px] w-10 sm:w-16 mb-4 sm:mb-6 bg-current opacity-20 ${config.textColor}`} 
            />

            {/* Date */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className={`flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-8 ${config.textColor}`}
            >
              <span className="text-xs sm:text-base font-medium tracking-[0.2em]">{dt.day}</span>
              <span className="w-1 h-1 rounded-full bg-current opacity-40"></span>
              <span className="text-xs sm:text-base font-medium tracking-[0.2em]">{dt.month}</span>
              <span className="w-1 h-1 rounded-full bg-current opacity-40"></span>
              <span className="text-xs sm:text-base font-medium tracking-[0.2em]">{dt.year}</span>
            </motion.div>

            {/* Guest Invitation */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col items-center w-full mb-5 sm:mb-8 z-10"
            >
              <span className={`text-[9px] sm:text-xs tracking-[0.3em] uppercase opacity-70 mb-2 sm:mb-4 font-bold ${config.accentColor}`}>
                {config.invitationText}
              </span>
              
              {guestName && (
                <div 
                  className={`px-4 sm:px-8 py-2 rounded-lg font-medium text-sm sm:text-lg border border-current/10 bg-current/5 w-full max-w-[200px] sm:max-w-xs truncate ${config.textColor}`}
                >
                  {guestName}
                </div>
              )}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="w-full sm:w-auto z-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className={`w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase shadow-lg hover:shadow-xl transition-all ${config.buttonBg} ${config.buttonText}`}
              >
                Mở thiệp
              </motion.button>
            </motion.div>
          </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeCover;
