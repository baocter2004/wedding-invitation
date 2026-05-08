import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Leaf } from 'lucide-react';
import { formatDate } from '../../../assets/images';
import { getThemeByTemplateId } from '../constants/templateThemes';

const getCoverConfig = (type) => {
  switch (type) {
    case 'TRADITIONAL':
      return {
        backdrop: 'bg-red-950',
        cardBg: 'bg-red-800',
        textColor: 'text-orange-200',
        buttonBg: 'bg-orange-200',
        buttonText: 'text-red-950',
        sealBg: 'bg-orange-200',
        sealColor: 'text-red-800',
        border: 'border-2 border-orange-200/30',
        invitationText: 'Kính mời',
        paddingTop: 'pt-24 sm:pt-32'
      };
    case 'EMERALD':
      return {
        backdrop: 'bg-emerald-950',
        cardBg: 'bg-emerald-50',
        textColor: 'text-emerald-900',
        buttonBg: 'bg-emerald-900',
        buttonText: 'text-emerald-50',
        sealBg: 'bg-emerald-900',
        sealColor: 'text-emerald-50',
        border: 'border border-emerald-900/20',
        invitationText: 'Thân mời',
        paddingTop: 'pt-16 sm:pt-20'
      };
    default: // MODERN
      return {
        backdrop: 'bg-gray-100',
        cardBg: 'bg-white',
        textColor: 'text-gray-900',
        buttonBg: 'bg-gray-900',
        buttonText: 'text-white',
        sealBg: 'bg-gray-900',
        sealColor: 'text-white',
        border: 'border border-gray-200',
        invitationText: 'Thân mời',
        paddingTop: 'pt-16 sm:pt-20'
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

  // ── Theme Configuration ─────────────────────────────────────
  const theme = useMemo(() => getThemeByTemplateId(templateId), [templateId]);
  const config = useMemo(() => getCoverConfig(theme.type), [theme.type]);
  const ThemeIcon = theme.icon || Heart;

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
          className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8 ${config.backdrop}`}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          {/* Card Container */}
          <motion.div
            className={`relative w-full max-w-lg shadow-2xl rounded-2xl flex flex-col items-center text-center px-8 pb-12 sm:px-12 sm:pb-16 ${config.cardBg} ${config.border} ${config.paddingTop}`}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Top Seal */}
            <div 
              className={`absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full shadow-lg flex items-center justify-center z-20 ${config.sealBg}`}
            >
              <ThemeIcon size={24} className={config.sealColor} />
            </div>

            {/* Names Section */}
            <div className="mb-10">
              <h2 
                className={`text-4xl sm:text-5xl font-bold leading-tight ${config.textColor}`}
                style={{ fontFamily: theme.font }}
              >
                {groom}
                <span className="block text-2xl italic font-light my-4 opacity-60">&</span>
                {bride}
              </h2>
            </div>

            {/* Divider */}
            <div className={`w-24 h-px mb-10 opacity-20 bg-current ${config.textColor}`} />

            {/* Date */}
            <p className={`text-sm sm:text-base font-medium tracking-widest uppercase mb-10 ${config.textColor}`}>
              {dt.day} . {dt.month} . {dt.year}
            </p>

            {/* Guest Invitation */}
            <div className="flex flex-col items-center w-full mb-12">
              <span className={`text-xs tracking-widest uppercase opacity-70 mb-4 ${config.textColor}`}>
                {config.invitationText}
              </span>
              
              {guestName && (
                <div 
                  className={`px-8 py-3 rounded-lg font-bold text-lg shadow-sm bg-black/5 ${config.textColor}`}
                >
                  {guestName}
                </div>
              )}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className={`px-12 py-4 rounded-full font-bold text-sm tracking-widest uppercase shadow-xl transition-all hover:shadow-2xl ${config.buttonBg} ${config.buttonText}`}
            >
              Mở thiệp
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeCover;
