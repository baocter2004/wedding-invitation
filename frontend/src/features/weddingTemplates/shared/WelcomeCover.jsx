import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, ChevronDown, Sparkles, Heart } from 'lucide-react';
import { resolveCover, formatDate } from '../../../assets/images';
import { getThemeByTemplateId } from '../constants/templateThemes';
import FloatingDecorativeElements from './FloatingDecorativeElements';

const WelcomeCover = ({ weddingData, templateId, onOpen }) => {
  const [phase, setPhase] = useState('idle'); // idle | opening | done

  // ── Extract data ───────────────────────────────────────────
  const groom = weddingData?.groom_short_name || weddingData?.groom_name || 'Chú Rể';
  const bride = weddingData?.bride_short_name || weddingData?.bride_name || 'Cô Dâu';
  const eventDate = weddingData?.wedding_date || weddingData?.events?.[0]?.event_time;
  const dt = useMemo(() => formatDate(eventDate), [eventDate]);
  const coverImg = resolveCover(weddingData?.cover_image_path);

  // ── Theme Configuration ─────────────────────────────────────
  const theme = useMemo(() => getThemeByTemplateId(templateId), [templateId]);

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
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: theme.bg }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{
          opacity: 0,
          transition: { duration: 1, ease: "easeInOut" }
        }}
      >
        {/* Advanced Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <BackgroundDecoration theme={theme} />
        </div>

        {/* Cinematic Split Doors Reveal */}
        <AnimatePresence>
          {phase === 'opening' && (
            <>
              {/* Top Door */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: '-100%' }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 z-[60] origin-top"
                style={{ backgroundColor: theme.bg }}
              >
                <div className="absolute bottom-0 w-full h-px bg-white/10" />
              </motion.div>
              {/* Bottom Door */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: '100%' }}
                transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                className="absolute inset-0 z-[60] origin-bottom"
                style={{ backgroundColor: theme.bg }}
              >
                <div className="absolute top-0 w-full h-px bg-white/10" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Centered Card Container */}
        <div className="relative w-full max-w-xl px-8 flex flex-col items-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{
              scale: phase === 'opening' ? 1.1 : 1,
              opacity: phase === 'opening' ? 0 : 1,
              y: phase === 'opening' ? -50 : 0
            }}
            transition={{
              duration: phase === 'opening' ? 0.8 : 1.2,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="relative w-full aspect-[4/5.5] sm:aspect-[4/5.8] bg-white shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] rounded-[2.5rem] overflow-hidden group border border-white/20"
          >
            {/* Background Image with Ken Burns Effect */}
            <div className="absolute inset-0 z-0">
              <motion.img
                src={coverImg}
                alt="Cover"
                className="w-full h-full object-cover brightness-[0.45]"
                animate={{ scale: [1, 1.1] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-between py-12 px-8 sm:py-16 sm:px-12 text-white text-center">

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-4"
              >
                <span className="text-[10px] uppercase tracking-[1em] font-black text-white/50">The Wedding Of</span>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-white/20" />
                  <ThemeIcon size={16} style={{ color: theme.primary }} className="opacity-60" />
                  <div className="w-8 h-px bg-white/20" />
                </div>
              </motion.div>

              <div className="space-y-10 w-full">
                <motion.div
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                >
                  <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-none" style={{ fontFamily: '"Playfair Display", serif' }}>
                    <span className="block mb-3">{groom}</span>
                    <span className="flex items-center justify-center gap-4 my-4">
                      <span className="w-6 h-px bg-white/20" />
                      <span className="text-2xl italic font-light text-white/30">&</span>
                      <span className="w-6 h-px bg-white/20" />
                    </span>
                    <span className="block mt-3" style={{ color: theme.primary || '#D4AF37' }}>{bride}</span>
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-center gap-5 text-[12px] tracking-[0.5em] font-light text-white/70 uppercase">
                    <span>{dt.day}</span>
                    <span className="text-white/20">|</span>
                    <span>{dt.month}</span>
                    <span className="text-white/20">|</span>
                    <span>{dt.year}</span>
                  </div>
                  <div className="w-12 h-px bg-white/10 mx-auto" />
                  <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-white/40">{weddingData?.lunar_date_text || 'Save the Date'}</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="w-full flex flex-col items-center gap-8"
              >
                <div className="h-px w-16 bg-white/10" />

                <button
                  onClick={handleOpen}
                  disabled={phase === 'opening'}
                  className="group relative w-full sm:w-auto min-w-[240px] py-5 px-10 rounded-full transition-all duration-700 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 hover:border-white/40 active:scale-95"
                  style={{ backgroundColor: 'white' }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-slate-950">
                    {phase === 'opening' ? (
                      <span className="flex items-center gap-2">
                        <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="inline-block w-3 h-3 border-2 border-slate-900 border-t-transparent rounded-full" />
                        ĐANG MỞ...
                      </span>
                    ) : (
                      <>
                        MỞ THIỆP CƯỚI
                        <MailOpen size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                  {/* Glassmorphism Hover Effect */}
                  <div className="absolute inset-0 bg-slate-900 opacity-0 group-hover:opacity-5 transition-opacity" />
                </button>

                <p className="text-[10px] uppercase tracking-[0.5em] text-white/30 font-bold italic">
                  Trân trọng kính mời
                </p>
              </motion.div>
            </div>

            {/* Corner Decorative Ornaments */}
            <div className="absolute inset-10 border border-white/5 pointer-events-none z-20">
              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-white/20 rounded-tl-3xl" />
              <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-white/20 rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-white/20 rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-white/20 rounded-br-3xl" />
            </div>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{
              opacity: { delay: 2, duration: 1 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <span className="text-[9px] uppercase tracking-[0.8em] font-black text-white/60">Kéo xuống để xem</span>
            <ChevronDown size={18} className="text-white/60" />
          </motion.div>
        </div>

        {/* Cinematic Sparkles Overlay */}
        <div className="absolute inset-0 pointer-events-none z-40 opacity-20">
          <FloatingDecorativeElements count={10} type="sparkle" color="#FFFFFF" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const BackgroundDecoration = ({ theme }) => {
  const Icon = theme.icon;

  const floaters = useMemo(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 25 + 15,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 10
  })), []);

  return (
    <div className="absolute inset-0">
      <div
        className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-[0.12]"
        style={{ backgroundColor: theme.primary }}
      />
      <div
        className="absolute bottom-[-20%] right-[-20%] w-[80vw] h-[80vw] rounded-full blur-[150px] opacity-[0.08]"
        style={{ backgroundColor: theme.primary }}
      />

      {floaters.map(f => (
        <motion.div
          key={f.id}
          className="absolute"
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            color: theme.primary,
            opacity: 0.05
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 360],
            opacity: [0.05, 0.12, 0.05],
            scale: [1, 1.15, 1]
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: "easeInOut"
          }}
        >
          <Icon size={f.size} />
        </motion.div>
      ))}

      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }} />
    </div>
  );
};

export default WelcomeCover;
