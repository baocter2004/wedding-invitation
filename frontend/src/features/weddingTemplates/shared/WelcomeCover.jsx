import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower2, Sparkles, Leaf } from 'lucide-react';
import { formatDate, DECORATIVE } from '../../../assets/images';
import { getThemeByTemplateId } from '../constants/templateThemes';

const getCoverConfig = (theme) => {
  const t = theme.type || 'MINIMAL';

  if (t === 'TRADITIONAL') {
    return {
      backdrop: '#2f0c0c', cardBg: '#a82c23', textColor: '#e8c991',
      sealBg: '#e8c991', sealIconColor: '#a82c23', buttonBg: '#e8c991', buttonText: '#471612', guestBoxBg: 'rgba(0,0,0,0.2)',
      bgImage: DECORATIVE.redFrame, layout: 'traditional', bgOpacity: 0.25, bgBlendMode: 'normal', pt: 'pt-24 sm:pt-32'
    };
  }

  if (t === 'PHOENIX') {
    return {
      backdrop: '#1a0505', cardBg: '#8a1f18', textColor: '#e8c991',
      sealBg: '#e8c991', sealIconColor: '#8a1f18', buttonBg: '#e8c991', buttonText: '#471612', guestBoxBg: 'rgba(0,0,0,0.2)',
      bgImage: DECORATIVE.phoenix, layout: 'traditional', bgOpacity: 0.25, bgBlendMode: 'normal', pt: 'pt-24 sm:pt-32'
    };
  }

  if (t === 'LUXURY_RED') {
    return {
      backdrop: '#110000', cardBg: '#600000', textColor: '#f0d080',
      sealBg: '#f0d080', sealIconColor: '#600000', buttonBg: '#f0d080', buttonText: '#300000', guestBoxBg: 'rgba(0,0,0,0.2)',
      bgImage: DECORATIVE.luxuryPattern, layout: 'fullCard', bgOpacity: 0.4, bgBlendMode: 'normal', pt: 'pt-12'
    };
  }

  if (t === 'FLORAL') {
    return {
      backdrop: '#1b2a1a', cardBg: '#fcfaf5', textColor: '#2D4F1E',
      sealBg: '#2D4F1E', sealIconColor: '#fcfaf5', buttonBg: '#2D4F1E', buttonText: '#fcfaf5', guestBoxBg: 'rgba(0,0,0,0.05)',
      bgImage: DECORATIVE.floralBanner, layout: 'fullCard', bgOpacity: 0.8, bgBlendMode: 'normal'
    };
  }

  if (t === 'RUSTIC') {
    return {
      backdrop: '#253018', cardBg: '#f8f5ee', textColor: '#3a4f29',
      sealBg: '#3a4f29', sealIconColor: '#f8f5ee', buttonBg: '#3a4f29', buttonText: '#f8f5ee', guestBoxBg: 'rgba(0,0,0,0.05)',
      bgImage: DECORATIVE.decorRusticBoho, layout: 'cornerDecor', bgOpacity: 0.9
    };
  }

  if (t === 'EMERALD') {
    return {
      backdrop: '#042b1f', cardBg: '#ECFDF5', textColor: '#064E3B',
      sealBg: '#064E3B', sealIconColor: '#ECFDF5', buttonBg: '#064E3B', buttonText: '#ECFDF5', guestBoxBg: 'rgba(0,0,0,0.05)',
      bgImage: DECORATIVE.decorEmeraldLeaves, layout: 'cornerDecor', bgOpacity: 0.8
    };
  }

  if (t === 'LUXURY') {
    return {
      backdrop: '#050505', cardBg: '#111111', textColor: '#D4AF37',
      sealBg: '#D4AF37', sealIconColor: '#111111', buttonBg: '#D4AF37', buttonText: '#111111', guestBoxBg: 'rgba(255,255,255,0.08)',
      bgImage: DECORATIVE.luxuryGoldBg, layout: 'fullCard', bgOpacity: 0.7, bgBlendMode: 'normal'
    };
  }

  if (t === 'MODERN') {
    return {
      backdrop: '#d1d5db', cardBg: '#f9fafb', textColor: '#1f2937',
      sealBg: '#1f2937', sealIconColor: '#f9fafb', buttonBg: '#1f2937', buttonText: '#f9fafb', guestBoxBg: 'rgba(0,0,0,0.04)',
      bgImage: DECORATIVE.modernAbstract, layout: 'fullCard', bgOpacity: 0.5, bgBlendMode: 'normal'
    };
  }

  // MINIMAL
  return {
    backdrop: '#e5e5e5', cardBg: '#ffffff', textColor: '#111111',
    sealBg: '#111111', sealIconColor: '#ffffff', buttonBg: '#111111', buttonText: '#ffffff', guestBoxBg: 'rgba(0,0,0,0.04)',
    bgImage: DECORATIVE.minimalTexture, layout: 'fullCard', bgOpacity: 0.5, bgBlendMode: 'normal'
  };
};

const WelcomeCover = ({ weddingData, templateId, onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  // ── Extract data ───────────────────────────────────────────
  const groom = weddingData?.groom_short_name || weddingData?.groom_name || 'Chú Rể';
  const bride = weddingData?.bride_short_name || weddingData?.bride_name || 'Cô Dâu';
  const eventDate = weddingData?.wedding_date || weddingData?.events?.[0]?.event_time;
  const dt = useMemo(() => formatDate(eventDate), [eventDate]);
  const guestName = weddingData?.guest_name || weddingData?.invitation?.guest_name;

  // ── Theme Configuration ─────────────────────────────────────
  const theme = useMemo(() => getThemeByTemplateId(templateId), [templateId]);
  const config = useMemo(() => getCoverConfig(theme), [theme]);
  const ThemeIcon = theme.icon || Heart;

  // ── Lock scroll while cover visible ──────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
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
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden"
          style={{ backgroundColor: config.backdrop }}
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Subtle Background Elements */}
          {config.layout === 'floral' && (
             <div className="absolute inset-0 pointer-events-none opacity-20 flex justify-between">
                <Leaf size={40} className="absolute top-[10%] left-[20%] text-white opacity-20 -rotate-45" />
                <Leaf size={24} className="absolute top-[30%] right-[15%] text-white opacity-20 rotate-12" />
                <Leaf size={32} className="absolute bottom-[20%] left-[10%] text-white opacity-20 rotate-90" />
             </div>
          )}

          {/* Modal Card Container */}
          <motion.div 
            className={`relative w-full max-w-xl shadow-lg rounded-lg flex flex-col items-center text-center px-6 ${config.pt || 'py-12 sm:py-16'} z-10`}
            style={{ 
              backgroundColor: config.cardBg,
              minHeight: '400px'
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Template Specific Decorations */}
            {config.bgImage && ['floral', 'traditional', 'fullCard'].includes(config.layout) && (
              <div
                className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${config.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: config.bgOpacity || 0.3,
                  mixBlendMode: config.bgBlendMode || 'normal'
                }}
              />
            )}

            {config.bgImage && config.layout === 'cornerDecor' && (
              <div className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden">
                <img 
                  src={config.bgImage} 
                  alt="" 
                  className="absolute top-0 left-0 w-[55%] max-w-[280px] object-contain" 
                  style={{ opacity: config.bgOpacity }}
                />
                <img 
                  src={config.bgImage} 
                  alt="" 
                  className="absolute bottom-0 right-0 w-[55%] max-w-[280px] object-contain transform rotate-180" 
                  style={{ opacity: config.bgOpacity }}
                />
              </div>
            )}

            {config.bgImage && config.layout === 'fullCard_luxury' && (
              <div
                className="absolute inset-0 pointer-events-none rounded-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${config.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: config.bgOpacity || 0.4,
                  mixBlendMode: 'screen'
                }}
              />
            )}

            {(config.layout === 'luxury' || config.layout === 'fullCard_luxury') && (
               <div className="absolute inset-4 border border-solid pointer-events-none opacity-30 rounded-md" style={{ borderColor: config.textColor }} />
            )}

            {/* Seal / Emblem */}
            <div
              className="absolute left-1/2 -translate-x-1/2 -top-[25px] sm:-top-[30px] w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] rounded-full flex items-center justify-center shadow-lg z-20"
              style={{ backgroundColor: config.sealBg }}
            >
              <ThemeIcon size={24} style={{ color: config.sealIconColor }} />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center w-full mt-4">
              <div className="mb-2 p-10 rounded-full" style={{ background: `radial-gradient(circle, ${config.cardBg} 40%, transparent 100%)`, opacity: 0.9 }}>
                <h2
                  className="text-4xl sm:text-5xl font-bold leading-tight"
                  style={{ color: config.textColor, fontFamily: theme.font }}
                >
                  {groom} <br />
                  <span className="text-xl sm:text-2xl italic font-light my-2 block opacity-80">&</span>
                  {bride}
                </h2>
              </div>

              <div className="flex items-center justify-center gap-3 my-4 w-full">
                <div className="w-16 h-[1px] opacity-40" style={{ backgroundColor: config.textColor }} />
                <Heart size={12} style={{ color: config.textColor }} className="opacity-60" />
                <div className="w-16 h-[1px] opacity-40" style={{ backgroundColor: config.textColor }} />
              </div>

              <p className="text-sm sm:text-base font-medium tracking-wide mb-6" style={{ color: config.textColor }}>
                {dt.day} tháng {dt.month}, {dt.year}
              </p>

              <div className="flex flex-col items-center mb-8">
                <p className="text-xs sm:text-sm tracking-[0.1em] mb-4 opacity-90 font-medium" style={{ color: config.textColor }}>
                  {config.layout === 'traditional' ? 'Kính mời' : 'Thân Mời'}
                </p>

                {guestName && (
                  <div
                    className="px-6 py-2 rounded mb-3 font-semibold text-sm sm:text-base"
                    style={{ backgroundColor: config.guestBoxBg, color: config.textColor }}
                  >
                    {guestName}
                  </div>
                )}

                {guestName && (
                  <p className="text-xs opacity-80" style={{ color: config.textColor }}>
                    đến dự buổi tiệc chung vui cùng gia đình
                  </p>
                )}
              </div>

              <button
                onClick={handleOpen}
                className="px-8 py-2.5 rounded-full font-bold text-[13px] transition-transform hover:scale-105 active:scale-95 shadow-md"
                style={{ backgroundColor: config.buttonBg, color: config.buttonText }}
              >
                Mở thiệp
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeCover;
