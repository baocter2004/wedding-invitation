import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Heart, Send, Gift, Volume2, VolumeX, ExternalLink, Sparkles, Calendar, ChevronDown } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const PhoenixRedTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    setMounted(true);
    if (weddingData?.music_url) {
      audioRef.current = new Audio(weddingData.music_url);
      audioRef.current.loop = true;
    }
    return () => audioRef.current?.pause();
  }, [weddingData?.music_url]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    setIsPlaying(p => !p);
  };

  if (!mounted) return null;

  const {
    bride_name = '', groom_name = '',
    bride_full_name = '', groom_full_name = '',
    bride_father_name = '', bride_mother_name = '',
    groom_father_name = '', groom_mother_name = '',
    wedding_date = '', lunar_date_text = '',
    intro_text = '', love_story = '',
    cover_image_path = '',
    events = [], photos = [], bankAccounts = [],
    theme_config_json = {},
  } = weddingData || {};

  const primaryColor = theme_config_json?.primary_color || '#881337';
  const accentColor = theme_config_json?.secondary_color || '#FBBF24';
  const bgColor = '#050505';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen font-serif antialiased selection:bg-red-900 selection:text-white overflow-x-hidden"
      style={{ backgroundColor: bgColor, color: '#FDFCF8' }}
    >
      <FloatingDecorativeElements count={12} type="circle" color={accentColor} />

      {/* ══ MUSIC PLAYER ═════════════════════════════════════ */}
      {weddingData?.music_url && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-2xl bg-black/80 backdrop-blur-md shadow-2xl flex items-center justify-center border transition-all hover:scale-110 active:scale-95 group"
          style={{ borderColor: `${accentColor}40` }}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={20} style={{ color: accentColor }} className="animate-pulse" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-white/10"
              />
            </div>
          ) : (
            <VolumeX size={20} className="text-white/40 group-hover:text-white transition-colors" />
          )}
        </motion.button>
      )}

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black">
        {/* Cinematic Parallax Background */}
        <motion.div
          style={{ scale: heroScale, opacity: 0.5 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img src={cover} alt="" className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
        </motion.div>

        {/* Abstract Light Streaks */}
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-red-900/10 rounded-full blur-[150px] pointer-events-none z-10" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] bg-amber-900/10 rounded-full blur-[120px] pointer-events-none z-10" />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-20 text-center px-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="mb-8 flex items-center justify-center gap-6">
              <div className="h-[1px] w-8 bg-white/30" />
              <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl font-bold bg-white/5 backdrop-blur-md shadow-2xl transition-transform hover:rotate-12 duration-700" style={{ borderColor: accentColor }}>
                <span style={{ color: accentColor }}>囍</span>
              </div>
              <div className="h-[1px] w-8 bg-white/30" />
            </div>

            <p className="text-xs text-white/70 uppercase tracking-[0.8em] font-black mb-10">Eternal Phoenix Union</p>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.8] mb-10" style={{ fontFamily: '"Playfair Display", serif', color: accentColor }}>
              {groom_name}
              <span className="flex items-center justify-center gap-6 my-8">
                <div className="h-[2px] flex-1 max-w-[80px] bg-white/20" />
                <span className="text-2xl italic font-light text-white/30">&</span>
                <div className="h-[2px] flex-1 max-w-[80px] bg-white/20" />
              </span>
              {bride_name}
            </h1>

            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl font-light tracking-tighter text-white">{dt.day}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-white/50 mt-2">Day</span>
              </div>
              <div className="h-12 w-[1px] bg-white/20 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl font-light tracking-tighter text-white">{dt.month}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-white/50 mt-2">Month</span>
              </div>
              <div className="h-12 w-[1px] bg-white/20 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl font-light tracking-tighter text-white">{dt.year}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-white/50 mt-2">Year</span>
              </div>
            </div>

            <p className="mt-12 text-xs italic font-medium tracking-[0.3em] text-white/60 uppercase">
              {lunar_date_text}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-[2px] h-16 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* ══ CONTENT AREA ══════════════════════════════════════ */}
      <main className="relative z-30 w-full max-w-6xl mx-auto px-6 sm:px-12">

        {/* ══ INTRO QUOTE ═════════════════════════════════════ */}
        <section className="py-24 text-center">
          <ScrollReveal variant="blur-reveal">
            <div className="max-w-4xl mx-auto px-6">
              <Sparkles size={32} className="mx-auto mb-10 opacity-30" style={{ color: accentColor }} />
              <p className="text-3xl sm:text-5xl leading-[1.3] font-light italic text-white" style={{ fontFamily: '"Playfair Display", serif' }}>
                "{intro_text}"
              </p>
              <div className="mt-16 w-20 h-[1px] mx-auto bg-white/20" />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FAMILIES ═════════════════════════════════════════ */}
        <section className="py-24">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-20">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-white/40 mb-4 block">Ancestral Heritage</span>
              <div className="h-[1px] w-16 bg-white/20 mx-auto" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16 sm:gap-24 max-w-5xl mx-auto">
            {/* Groom side */}
            <ScrollReveal variant="mask-reveal">
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-80 mb-12 overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.02]">
                  <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 border-[16px] border-white/5 pointer-events-none" />
                </div>

                <div className="space-y-10 mb-12">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">Thân phụ</span>
                    <span className="text-3xl font-bold text-white">{groom_father_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">Thân mẫu</span>
                    <span className="text-3xl font-bold text-white">{groom_mother_name}</span>
                  </div>
                </div>

                <div className="h-[1px] w-12 bg-white/20 mb-6" />
                <h3 className="text-5xl font-bold tracking-tighter" style={{ color: accentColor, fontFamily: '"Playfair Display", serif' }}>{groom_full_name}</h3>
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/30 mt-3 block">The Groom</span>
              </div>
            </ScrollReveal>

            {/* Bride side */}
            <ScrollReveal variant="mask-reveal" delay={0.2}>
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-80 mb-12 overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.02]">
                  <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 border-[16px] border-white/5 pointer-events-none" />
                </div>

                <div className="space-y-10 mb-12">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">Thân phụ</span>
                    <span className="text-3xl font-bold text-white">{bride_father_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">Thân mẫu</span>
                    <span className="text-3xl font-bold text-white">{bride_mother_name}</span>
                  </div>
                </div>

                <div className="h-[1px] w-12 bg-white/20 mb-6" />
                <h3 className="text-5xl font-bold tracking-tighter" style={{ color: accentColor, fontFamily: '"Playfair Display", serif' }}>{bride_full_name}</h3>
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/30 mt-3 block">The Bride</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <section className="py-32 text-center">
            <ScrollReveal variant="blur-reveal">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-white/40 mb-6 block">The Eternal Legend</span>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-16 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Hành Trình Yêu</h2>
              <div className="max-w-4xl mx-auto px-6">
                <p className="text-xl sm:text-3xl font-light leading-[1.5] italic text-white/70">
                  "{love_story}"
                </p>
              </div>
              <div className="mt-16 flex justify-center opacity-20">
                <Heart size={40} fill="white" />
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ EVENTS TIMELINE ═══════════════════════════════════ */}
        <section className="py-24 px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-20">
              <h2 className="text-6xl sm:text-8xl font-bold tracking-tighter text-white mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Timeline</h2>
              <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-12 bg-white/20" />
                <p className="text-[11px] font-black tracking-[0.4em] uppercase text-white/40">{lunar_date_text}</p>
                <div className="h-[1px] w-12 bg-white/20" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.2} variant="mask-reveal">
                <div className="group relative bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 sm:p-14 border border-white/10 hover:bg-white/10 transition-all duration-700 overflow-hidden text-center flex flex-col items-center shadow-xl">
                  {/* Glowing Accent */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner">
                    {event.event_type === 'ceremony' ? <Calendar size={28} className="text-white opacity-40" /> : <Sparkles size={28} className="text-white opacity-40" />}
                  </div>

                  <h3 className="text-4xl font-bold tracking-tight mb-12 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>{event.title}</h3>

                  <div className="space-y-10 mb-12 w-full">
                    <div className="flex flex-col items-center">
                      <Clock size={20} className="mb-4 text-white/40" style={{ color: accentColor }} />
                      <span className="text-2xl font-bold text-white">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="text-[11px] uppercase tracking-widest font-black mt-2 text-white/50">{new Date(event.event_time).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <MapPin size={20} className="mb-4 text-white/40" style={{ color: accentColor }} />
                      <p className="text-2xl font-bold text-white mb-2">{event.venue_name}</p>
                      <p className="text-base leading-relaxed max-w-sm mx-auto text-white/60">{event.address}</p>
                      {event.note && (
                        <div className="mt-8 p-6 rounded-[2rem] bg-white/5 italic text-sm text-white/40">
                          {event.note}
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={event.map_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto min-w-[180px] py-5 px-10 rounded-full font-black uppercase tracking-[0.3em] text-[10px] text-black transition-all shadow-xl hover:opacity-95 active:scale-95"
                    style={{ backgroundColor: accentColor }}>
                    XEM BẢN ĐỒ <ExternalLink size={14} className="inline ml-2 -mt-1" />
                  </motion.a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════ */}
        <section className="py-32">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-24 px-6">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-white/40 mb-6 block">Cinematic Journey</span>
              <h2 className="text-6xl sm:text-8xl font-bold tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6 max-w-[1400px] mx-auto px-4">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 4) * 0.1} variant="scale-up">
                <div className="break-inside-avoid rounded-[2rem] overflow-hidden shadow-2xl group relative border border-white/10 bg-slate-900">
                  <img src={photo.image_path} alt="" className="w-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-8 text-center backdrop-blur-[2px]">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white border-b border-white/30 pb-4">{photo.caption || 'Special Moment'}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <section className="py-32 text-center bg-white/5 rounded-[3rem] my-24 border border-white/5 relative overflow-hidden">
            <ScrollReveal variant="blur-reveal">
              <h2 className="text-[11px] font-black uppercase tracking-[1em] text-white/30 mb-10">Registry</h2>
              <h3 className="text-5xl sm:text-7xl font-bold mb-16 tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Hộp Mừng Cưới</h3>
              <p className="max-w-3xl mx-auto text-xl sm:text-2xl font-light italic text-white/50 mb-16 leading-relaxed px-6">
                "Sự hiện diện của quý khách là món quà trân quý nhất. <br className="hidden sm:block" />
                Gia đình xin chân thành cảm ơn mọi tấm lòng và lời chúc mừng."
              </p>
              <div className="flex flex-wrap justify-center gap-10 sm:gap-16 px-4">
                {bankAccounts.map(b => (
                  <div key={b.id} className="transition-transform hover:scale-[1.02]">
                    <GiftEnvelope bank={b} primaryColor={accentColor} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ RSVP FORM ════════════════════════════════════════ */}
        <section className="py-32 px-8">
          <ScrollReveal variant="mask-reveal">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-6xl mx-auto">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="text-[11px] uppercase tracking-[1em] font-black text-white/30 mb-6 block">R.S.V.P</span>
                <h2 className="text-6xl sm:text-8xl font-black tracking-tighter text-white mb-10 leading-[0.9]" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn Sẽ <br /> Tham Dự <br /> <span style={{ color: accentColor }}>Chứ?</span></h2>
                <p className="text-xl text-white/50 font-light leading-relaxed mb-12 max-w-md italic">
                  Kính mong quý khách xác nhận thông tin tham dự để chúng tôi có thể đón tiếp quý vị một cách chu đáo nhất.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-8 opacity-40">
                  <div className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center">
                    <Heart size={24} className="text-white" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.5em] font-black text-white">Awaiting your response</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 bg-white/5 p-10 sm:p-16 rounded-[3rem] border border-white/10 shadow-2xl backdrop-blur-3xl">
                <form className="space-y-12">
                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-white/40 group-focus-within:text-white transition-all font-bold">Họ và Tên</label>
                    <input type="text" placeholder="Họ tên của quý khách..." className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl font-bold text-white outline-none transition-all duration-500 focus:border-white placeholder:text-white/20" />
                  </div>

                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-white/40 group-focus-within:text-white transition-all font-bold">Xác Nhận</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl font-bold text-white outline-none transition-all duration-500 focus:border-white appearance-none cursor-pointer">
                        <option className="bg-[#050505]">Sẽ tham dự</option>
                        <option className="bg-[#050505]">Tiếc là không thể</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-7 text-black font-black transition-all shadow-xl flex items-center justify-center gap-5 uppercase tracking-[0.6em] text-[10px] rounded-full group/btn"
                    style={{ backgroundColor: accentColor }}>
                    XÁC NHẬN <Send size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer className="py-32 text-center border-t border-white/10">
          <ScrollReveal variant="blur-reveal">
            <p className="text-[11px] uppercase tracking-[1.5em] font-black mb-10 text-white/20">Eternal Phoenix</p>
            <h2 className="text-6xl sm:text-8xl font-black tracking-tighter text-white mb-16" style={{ fontFamily: '"Playfair Display", serif' }}>
              {groom_name} <span className="opacity-20 italic font-light mx-4" style={{ color: accentColor }}>&</span> {bride_name}
            </h2>
            <div className="flex items-center justify-center gap-10 opacity-30">
              <div className="h-[1px] w-16 bg-white/20" />
              <Sparkles size={24} style={{ color: accentColor }} />
              <div className="h-[1px] w-16 bg-white/20" />
            </div>
            <p className="mt-32 text-[10px] text-white/20 uppercase tracking-[1.5em] font-black">Powered by iWedding Phoenix Collection</p>
          </ScrollReveal>
        </footer>
      </main>
    </motion.div>
  );
};

export default PhoenixRedTemplate;
