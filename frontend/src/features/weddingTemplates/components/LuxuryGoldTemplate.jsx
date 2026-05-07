import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Heart, Send, Gift, Volume2, VolumeX, ExternalLink, Sparkles, ChevronDown, Calendar } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const LuxuryGoldTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
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

  const gold = theme_config_json?.primary_color || '#D4AF37';
  const dark = theme_config_json?.secondary_color || '#0F0F0F';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen font-serif antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-black"
      style={{ backgroundColor: dark, color: '#f8fafc' }}
    >
      <FloatingDecorativeElements count={10} type="circle" color={gold} />

      {/* ══ MUSIC CONTROL ═════════════════════════════════════ */}
      {weddingData?.music_url && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-full bg-black/80 backdrop-blur-xl shadow-2xl flex items-center justify-center border transition-all hover:scale-110 active:scale-95 group"
          style={{ borderColor: `${gold}40` }}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={20} style={{ color: gold }} className="animate-pulse" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-[#D4AF37]/20"
              />
            </div>
          ) : (
            <VolumeX size={20} className="text-slate-400 group-hover:text-[#D4AF37] transition-colors" />
          )}
        </motion.button>
      )}

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
        {/* Cinematic Backdrop */}
        <motion.div
          style={{ scale: heroImageScale, opacity: 0.35 }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <img src={cover} alt="" className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        </motion.div>

        {/* Decorative Framing */}
        <div className="absolute inset-8 border border-[#D4AF37]/10 pointer-events-none z-10" />
        <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 opacity-40" style={{ borderColor: gold }} />
        <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 opacity-40" style={{ borderColor: gold }} />
        <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 opacity-40" style={{ borderColor: gold }} />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 opacity-40" style={{ borderColor: gold }} />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center"
        >
          <motion.p
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-[11px] uppercase tracking-[1em] mb-10 font-black" style={{ color: gold }}
          >
            The Union of Two Families
          </motion.p>

          <motion.div
            style={{ scale: heroImageScale }}
            className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] mb-16 p-4 border border-white/10 rounded-sm bg-white/5 backdrop-blur-md shadow-2xl"
          >
            <div className="w-full h-full overflow-hidden relative group">
              <img src={cover} alt="Wedding Couple" className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -top-8 -right-8 w-24 h-24 opacity-20 pointer-events-none"
            >
              <Sparkles size={96} style={{ color: gold }} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.85]"
            style={{ fontFamily: '"Playfair Display", serif', color: gold }}
          >
            <span className="block">{groom_name}</span>
            <span className="flex items-center justify-center gap-8 my-8">
              <div className="h-[1px] flex-1 max-w-[100px] bg-white/20" />
              <span className="text-2xl italic font-light text-white/40">&</span>
              <div className="h-[1px] flex-1 max-w-[100px] bg-white/20" />
            </span>
            <span className="block">{bride_name}</span>
          </motion.h1>

          <div className="mt-16 flex flex-col items-center gap-8">
            <div className="flex items-center gap-10">
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white/90">{dt.day}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-white/50 mt-2">Day</span>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white/90">{dt.month}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-white/50 mt-2">Month</span>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white/90">{dt.year}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-white/50 mt-2">Year</span>
              </div>
            </div>
            <p className="text-xs italic font-medium tracking-[0.3em] text-white/50 uppercase">{lunar_date_text}</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#D4AF37] to-transparent" />
        </motion.div>
      </section>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12">

        {/* ══ INTRO QUOTE ═════════════════════════════════════ */}
        <section className="py-24 text-center relative overflow-hidden">
          <ScrollReveal variant="blur-reveal">
            <div className="max-w-4xl mx-auto px-6">
              <Sparkles size={28} className="mx-auto mb-10 opacity-30" style={{ color: gold }} />
              <p className="text-2xl sm:text-4xl leading-[1.3] font-light italic text-white/90" style={{ fontFamily: '"Playfair Display", serif' }}>
                "{intro_text}"
              </p>
              <div className="mt-12 h-[1px] w-20 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FAMILIES ═════════════════════════════════════════ */}
        <section className="py-24 px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-20">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-white/40 mb-6 block">Ancestral Heritage</span>
              <div className="h-[1px] w-20 mx-auto bg-white/10" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 sm:gap-24 max-w-5xl mx-auto">
            {/* Groom side */}
            <ScrollReveal variant="mask-reveal">
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-64 mb-10">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/30 animate-[spin_40s_linear_infinite]" />
                  <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/10 bg-white/5 shadow-2xl">
                    <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">Thân phụ</span>
                    <span className="text-2xl font-bold text-white tracking-tight">{groom_father_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">Thân mẫu</span>
                    <span className="text-2xl font-bold text-white tracking-tight">{groom_mother_name}</span>
                  </div>
                </div>

                <div className="h-[1px] w-10 bg-white/10 mb-6" />
                <h3 className="text-4xl font-bold tracking-tighter" style={{ fontFamily: '"Playfair Display", serif', color: gold }}>{groom_full_name}</h3>
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 mt-3 block">The Groom</span>
              </div>
            </ScrollReveal>

            {/* Bride side */}
            <ScrollReveal variant="mask-reveal" delay={0.2}>
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-64 mb-10">
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4AF37]/30 animate-[spin_40s_linear_infinite_reverse]" />
                  <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white/10 bg-white/5 shadow-2xl">
                    <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">Thân phụ</span>
                    <span className="text-2xl font-bold text-white tracking-tight">{bride_father_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-white/50 mb-2 font-bold">Thân mẫu</span>
                    <span className="text-2xl font-bold text-white tracking-tight">{bride_mother_name}</span>
                  </div>
                </div>

                <div className="h-[1px] w-10 bg-white/10 mb-6" />
                <h3 className="text-4xl font-bold tracking-tighter" style={{ fontFamily: '"Playfair Display", serif', color: gold }}>{bride_full_name}</h3>
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/40 mt-3 block">The Bride</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <section className="py-24 px-8 bg-white/[0.02] rounded-[2.5rem] my-24 relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[80px] -z-10" />
            <ScrollReveal variant="blur-reveal">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-white/40 mb-8 block">A Golden Legend</span>
                <h2 className="text-5xl sm:text-6xl font-bold tracking-tighter mb-12 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Hành Trình Hạnh Phúc</h2>
                <p className="text-xl sm:text-2xl font-light italic text-white/70 leading-relaxed">
                  "{love_story}"
                </p>
                <div className="mt-16 flex justify-center opacity-30">
                  <Heart size={48} fill="currentColor" style={{ color: gold }} />
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ EVENTS TIMELINE ═══════════════════════════════════ */}
        <section className="py-24 px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-20">
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-6 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Timeline</h2>
              <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-12 bg-white/10" />
                <p className="text-[11px] font-black tracking-[0.5em] uppercase text-white/50">{lunar_date_text}</p>
                <div className="h-[1px] w-12 bg-white/10" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.2} variant="mask-reveal">
                <div className="group relative p-8 sm:p-14 rounded-[3rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-700 overflow-hidden text-center flex flex-col items-center shadow-2xl">
                  {/* Gold Gradient Top Bar */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    {event.event_type === 'ceremony' ? <Calendar size={28} className="text-white opacity-40" /> : <Sparkles size={28} className="text-white opacity-40" />}
                  </div>

                  <h3 className="text-3xl font-bold tracking-tight mb-10 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>{event.title}</h3>

                  <div className="space-y-10 mb-12 w-full">
                    <div className="flex flex-col items-center">
                      <Clock size={18} className="mb-4 text-white/40" style={{ color: gold }} />
                      <span className="text-2xl font-bold text-white">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="text-[11px] uppercase tracking-widest font-black mt-2 text-white/50">{new Date(event.event_time).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <MapPin size={18} className="mb-4 text-white/40" style={{ color: gold }} />
                      <p className="text-xl font-bold text-white mb-1">{event.venue_name}</p>
                      <p className="text-sm leading-relaxed max-w-sm mx-auto text-white/60">{event.address}</p>
                      {event.note && (
                        <div className="mt-6 p-5 rounded-[1.5rem] bg-white/5 italic text-xs text-white/40 border border-white/5">
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
                    className="w-full sm:w-auto min-w-[180px] py-5 px-10 rounded-full font-black uppercase tracking-[0.2em] text-[10px] text-black transition-all shadow-xl hover:opacity-95 active:scale-95"
                    style={{ backgroundColor: gold }}>
                    XEM BẢN ĐỒ <ExternalLink size={14} className="inline ml-2 -mt-1" />
                  </motion.a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════ */}
        <section className="py-24">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-20 px-6">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-white/40 mb-6 block">Cinematic Anthology</span>
              <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-8 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6 max-w-[1400px] mx-auto px-4">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 4) * 0.1} variant="scale-up">
                <div className="break-inside-avoid rounded-[2rem] overflow-hidden shadow-xl group relative border border-white/10 p-2 bg-white/5">
                  <img src={photo.image_path} alt={photo.caption || ''} className="w-full object-cover rounded-[1.5rem] transition-transform duration-[4s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-8 text-center backdrop-blur-[2px]">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white border-b border-[#D4AF37]/30 pb-4">{photo.caption || 'Royal Portrait'}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <section className="py-24 px-8 text-center border-y border-white/5 my-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[100px] pointer-events-none" />
            <ScrollReveal variant="blur-reveal">
              <h2 className="text-[11px] font-black uppercase tracking-[1em] text-white/30 mb-10">Registry</h2>
              <h3 className="text-4xl sm:text-6xl font-bold mb-12 tracking-tighter" style={{ fontFamily: '"Playfair Display", serif', color: gold }}>Hộp Mừng Cưới</h3>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl font-light italic text-white/50 mb-16 leading-relaxed">
                "Sự hiện diện của quý khách là món quà trân quý nhất. <br className="hidden sm:block" />
                Gia đình xin chân thành cảm ơn mọi tấm lòng và lời chúc mừng."
              </p>
              <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
                {bankAccounts.map(b => (
                  <div key={b.id} className="transition-transform hover:scale-[1.02]">
                    <GiftEnvelope bank={b} primaryColor={gold} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ RSVP FORM ════════════════════════════════════════ */}
        <section className="py-24 px-8">
          <ScrollReveal variant="mask-reveal">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-white/30 mb-8 block">R.S.V.P</span>
                <h2 className="text-6xl sm:text-7xl font-black tracking-tighter mb-10 leading-[0.85]" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn Sẽ <br /> Đến Chứ?</h2>
                <p className="text-lg opacity-60 font-light leading-relaxed mb-12 max-w-md italic text-white/70">
                  Kính mong quý khách xác nhận thông tin tham dự để chúng tôi có thể chuẩn bị đón tiếp một cách chu đáo nhất.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-8 opacity-40">
                  <div className="w-16 h-16 rounded-full border border-[#D4AF37] flex items-center justify-center">
                    <Heart size={20} style={{ color: gold }} />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.5em] font-black text-white">Awaiting your response</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 bg-white/5 p-8 sm:p-14 border border-white/10 rounded-[3rem] shadow-2xl backdrop-blur-2xl">
                <form className="space-y-10">
                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-white/40 group-focus-within:text-[#D4AF37] transition-all font-bold">Họ và Tên</label>
                    <input type="text" placeholder="Họ và tên của quý khách..." className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl font-bold text-white outline-none transition-all duration-500 focus:border-[#D4AF37] placeholder:text-white/20" />
                  </div>

                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-white/40 group-focus-within:text-[#D4AF37] transition-all font-bold">Sẽ Tham Dự?</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b-2 border-white/10 py-4 text-2xl font-bold text-white outline-none transition-all duration-500 focus:border-[#D4AF37] appearance-none cursor-pointer">
                        <option className="bg-[#0A0A0A]">Chắc chắn sẽ tham dự</option>
                        <option className="bg-[#0A0A0A]">Rất tiếc không thể đến</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-white/30" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-7 text-black font-black transition-all shadow-xl flex items-center justify-center gap-5 uppercase tracking-[0.5em] text-[10px] rounded-full group/btn"
                    style={{ backgroundColor: gold }}>
                    XÁC NHẬN <Send size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer className="py-24 text-center relative overflow-hidden border-t border-white/10">
          <ScrollReveal variant="blur-reveal">
            <p className="text-[11px] uppercase tracking-[1.2em] font-black mb-10 text-white/20">Eternal Love</p>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter text-white mb-16" style={{ fontFamily: '"Playfair Display", serif' }}>
              {groom_name} <span className="text-white/10 italic font-light mx-4">&</span> {bride_name}
            </h2>
            <div className="flex items-center justify-center gap-8 opacity-20" style={{ color: gold }}>
              <div className="h-[1px] w-16 bg-current" />
              <Sparkles size={20} />
              <div className="h-[1px] w-16 bg-current" />
            </div>
            <p className="mt-24 text-[10px] text-white/20 uppercase tracking-[1em] font-black">Powered by iWedding Royal Collection</p>
          </ScrollReveal>
        </footer>
      </main>
    </motion.div>
  );
};

export default LuxuryGoldTemplate;
