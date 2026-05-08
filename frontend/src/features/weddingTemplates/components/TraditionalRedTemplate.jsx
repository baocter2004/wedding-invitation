import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Heart, Send, Gift, ExternalLink, Volume2, VolumeX, Sparkles, ChevronDown } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const TraditionalRedTemplate = ({ weddingData }) => {
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

  const red = theme_config_json?.primary_color || '#B91C1C';
  const cream = theme_config_json?.secondary_color || '#FFFBF5';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-min-h-[85vh] font-serif antialiased overflow-x-hidden selection:bg-[#B91C1C] selection:text-white"
      style={{ backgroundColor: cream, color: '#450a0a' }}
    >
      <FloatingDecorativeElements count={12} type="circle" color={red} />

      {/* ══ MUSIC CONTROL ═════════════════════════════════════ */}
      {weddingData?.music_url && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center border transition-all hover:scale-110 active:scale-95 group"
          style={{ borderColor: `${red}40` }}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={20} style={{ color: red }} className="animate-pulse" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-[#B91C1C]/10"
              />
            </div>
          ) : (
            <VolumeX size={20} className="text-slate-400 group-hover:text-[#B91C1C] transition-colors" />
          )}
        </motion.button>
      )}

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
        {/* Intricate Decorative Borders */}
        <div className="absolute inset-6 border border-[#B91C1C]/10 pointer-events-none z-0" />
        <div className="absolute inset-10 border border-[#B91C1C]/5 pointer-events-none z-0" />

        {/* Corner Ornaments */}
        <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 opacity-40" style={{ borderColor: red }} />
        <div className="absolute top-10 right-10 w-16 h-16 border-t-2 border-r-2 opacity-40" style={{ borderColor: red }} />
        <div className="absolute bottom-10 left-10 w-16 h-16 border-b-2 border-l-2 opacity-40" style={{ borderColor: red }} />
        <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 opacity-40" style={{ borderColor: red }} />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center"
        >
          <motion.p
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-[11px] uppercase tracking-[1em] font-black text-red-900/60 mb-10"
          >
            The Union of Two Souls
          </motion.p>

          <motion.div
            style={{ scale: heroImageScale }}
            className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] mb-8 p-4 bg-white shadow-[0_40px_80px_-15px_rgba(185,28,28,0.12)] rounded-sm border border-red-900/10"
          >
            <div className="w-full h-full overflow-hidden relative group">
              <img src={cover} alt="Wedding Couple" className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/15 via-transparent to-transparent" />
            </div>

            {/* Double Happiness Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, type: "spring", damping: 12 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center border-[5px] z-20 shadow-2xl bg-white"
              style={{ borderColor: red }}
            >
              <span className="text-4xl font-bold leading-none" style={{ color: red }}>囍</span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="text-5xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[0.8] text-center"
            style={{ fontFamily: '"Playfair Display", serif', color: red }}
          >
            <span className="block">{groom_name}</span>
            <span className="flex items-center justify-center gap-8 my-8">
              <div className="h-[1px] flex-1 max-w-[100px] bg-red-900/20" />
              <span className="text-2xl italic font-light text-red-900/30">&</span>
              <div className="h-[1px] flex-1 max-w-[100px] bg-red-900/20" />
            </span>
            <span className="block">{bride_name}</span>
          </motion.h1>

          <div className="mt-16 flex flex-col items-center gap-8">
            <div className="flex items-center gap-10">
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-[#450a0a]/80">{dt.day}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-red-900/50 mt-2">Day</span>
              </div>
              <div className="h-10 w-[1px] bg-red-900/10" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-[#450a0a]/80">{dt.month}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-red-900/50 mt-2">Month</span>
              </div>
              <div className="h-10 w-[1px] bg-red-900/10" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-[#450a0a]/80">{dt.year}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-red-900/50 mt-2">Year</span>
              </div>
            </div>
            <p className="text-xs italic font-medium tracking-[0.3em] text-red-900/50 uppercase">{lunar_date_text}</p>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-red-900 to-transparent" />
        </motion.div>
      </section>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-12">

        {/* ══ INTRO QUOTE ═════════════════════════════════════ */}
        <section className="py-12 text-center relative overflow-hidden">
          <ScrollReveal variant="blur-reveal">
            <div className="max-w-4xl mx-auto px-6">
              <Sparkles size={28} className="mx-auto mb-10 opacity-30" style={{ color: red }} />
              <p className="text-2xl sm:text-4xl leading-[1.3] font-light italic text-[#450a0a]" style={{ fontFamily: '"Playfair Display", serif' }}>
                "{intro_text}"
              </p>
              <div className="mt-12 h-[1px] w-20 mx-auto" style={{ backgroundColor: `${red}30` }} />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FAMILIES ═════════════════════════════════════════ */}
        <section className="py-12 px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-10">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-red-900/50 mb-4 block">Grand Heritage</span>
              <div className="h-[1px] w-20 mx-auto bg-red-900/10" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 sm:gap-12 max-w-5xl mx-auto">
            {/* Groom side */}
            <ScrollReveal variant="mask-reveal">
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-64 mb-10 rounded-full overflow-hidden shadow-xl transition-all duration-700 group-hover:scale-[1.01] border-[10px] bg-white shadow-red-50" style={{ borderColor: red }}>
                  <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>

                <div className="space-y-8 mb-10">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-red-900/60 mb-2 font-bold">Thân phụ</span>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">{groom_father_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-red-900/60 mb-2 font-bold">Thân mẫu</span>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">{groom_mother_name}</span>
                  </div>
                </div>

                <div className="h-[1px] w-10 bg-red-900/10 mb-6" />
                <h3 className="text-4xl font-bold tracking-tighter" style={{ fontFamily: '"Playfair Display", serif', color: red }}>{groom_full_name}</h3>
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-red-900/40 mt-3 block">The Groom</span>
              </div>
            </ScrollReveal>

            {/* Bride side */}
            <ScrollReveal variant="mask-reveal" delay={0.2}>
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-64 mb-10 rounded-full overflow-hidden shadow-xl transition-all duration-700 group-hover:scale-[1.01] border-[10px] bg-white shadow-red-50" style={{ borderColor: red }}>
                  <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>

                <div className="space-y-8 mb-10">
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-red-900/60 mb-2 font-bold">Thân phụ</span>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">{bride_father_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-widest text-red-900/60 mb-2 font-bold">Thân mẫu</span>
                    <span className="text-2xl font-bold text-slate-900 tracking-tight">{bride_mother_name}</span>
                  </div>
                </div>

                <div className="h-[1px] w-10 bg-red-900/10 mb-6" />
                <h3 className="text-4xl font-bold tracking-tighter" style={{ fontFamily: '"Playfair Display", serif', color: red }}>{bride_full_name}</h3>
                <span className="text-[11px] uppercase tracking-[0.4em] font-black text-red-900/40 mt-3 block">The Bride</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <section className="py-12 px-8 bg-red-900/[0.02] rounded-[2rem] my-12 border border-red-900/5">
            <ScrollReveal variant="blur-reveal">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-red-900/50 mb-8 block">Our Sacred Union</span>
                <h2 className="text-5xl sm:text-6xl font-bold tracking-tighter mb-12" style={{ fontFamily: '"Playfair Display", serif', color: red }}>Hành Trình Hạnh Phúc</h2>
                <p className="text-xl sm:text-2xl font-light italic text-[#450a0a] leading-relaxed">
                  "{love_story}"
                </p>
                <div className="mt-16 text-5xl opacity-20" style={{ color: red }}>囍</div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ EVENTS TIMELINE ═══════════════════════════════════ */}
        <section className="py-12 px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-10">
              <h2 className="text-5xl sm:text-5xl font-bold tracking-tighter mb-6" style={{ fontFamily: '"Playfair Display", serif', color: red }}>Timeline</h2>
              <div className="flex items-center justify-center gap-6">
                <div className="h-[1px] w-12 bg-red-900/10" />
                <p className="text-[11px] font-black tracking-[0.5em] uppercase text-red-900/50">{lunar_date_text}</p>
                <div className="h-[1px] w-12 bg-red-900/10" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-5xl mx-auto">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.2} variant="mask-reveal">
                <div className="group relative p-8 sm:p-14 rounded-[3rem] border border-red-900/5 bg-white hover:shadow-[0_40px_80px_-15px_rgba(185,28,28,0.1)] transition-all duration-700 overflow-hidden text-center flex flex-col items-center shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                    {event.event_type === 'ceremony' ? <Heart size={28} className="text-red-900 opacity-40" /> : <Gift size={28} className="text-red-900 opacity-40" />}
                  </div>

                  <h3 className="text-3xl font-bold tracking-tight mb-10 text-[#450a0a]" style={{ fontFamily: '"Playfair Display", serif' }}>{event.title}</h3>

                  <div className="space-y-10 mb-12 w-full">
                    <div className="flex flex-col items-center">
                      <Clock size={20} className="mb-4 text-red-700/60" />
                      <span className="text-2xl font-bold text-slate-900">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="text-[11px] uppercase tracking-widest font-black mt-2 text-slate-500">{new Date(event.event_time).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <MapPin size={20} className="mb-4 text-red-700/60" />
                      <p className="text-xl font-bold text-slate-900 mb-1">{event.venue_name}</p>
                      <p className="text-sm leading-relaxed max-w-sm mx-auto text-slate-700">{event.address}</p>
                      {event.note && (
                        <div className="mt-6 p-5 rounded-[1.5rem] bg-red-50 italic text-xs text-red-900/70 border border-red-900/5">
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
                    className="w-full sm:w-auto min-w-[180px] py-5 px-10 rounded-full font-black uppercase tracking-[0.3em] text-[10px] text-white transition-all shadow-lg hover:opacity-95 active:scale-95"
                    style={{ backgroundColor: red }}>
                    XEM BẢN ĐỒ <ExternalLink size={14} className="inline ml-2 -mt-1" />
                  </motion.a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════ */}
        <section className="py-12">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-10 px-6">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-red-900/50 mb-6 block">Visual Anthology</span>
              <h2 className="text-5xl sm:text-5xl font-bold tracking-tighter mb-8" style={{ fontFamily: '"Playfair Display", serif', color: red }}>Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6 max-w-[1400px] mx-auto px-4">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 4) * 0.1} variant="scale-up">
                <div className="break-inside-avoid rounded-[2rem] overflow-hidden shadow-lg group relative border border-red-900/10 p-2 bg-white">
                  <img src={photo.image_path} alt={photo.caption || ''} className="w-full object-cover rounded-[1.5rem] transition-transform duration-[4s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-red-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-8 text-center backdrop-blur-[2px]">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white border-b border-white/30 pb-4">{photo.caption || 'Royal Memory'}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <section className="py-12 px-8 text-center bg-white rounded-[3rem] my-12 shadow-xl border border-red-900/5 relative overflow-hidden">
            <ScrollReveal variant="blur-reveal">
              <h2 className="text-[11px] font-black uppercase tracking-[1em] text-red-900/50 mb-10">Tradition</h2>
              <h3 className="text-4xl sm:text-6xl font-bold mb-12 tracking-tighter" style={{ fontFamily: '"Playfair Display", serif', color: red }}>Hỷ Sự</h3>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl font-light italic text-slate-600 mb-8 leading-relaxed">
                "Sự hiện diện của quý khách là món quà trân quý nhất. <br className="hidden sm:block" />
                Gia đình xin chân thành cảm ơn mọi tấm lòng và lời chúc mừng."
              </p>
              <div className="flex flex-wrap justify-center gap-10 sm:gap-8">
                {bankAccounts.map(b => (
                  <div key={b.id} className="transition-transform hover:scale-[1.02]">
                    <GiftEnvelope bank={b} primaryColor={red} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ RSVP FORM ════════════════════════════════════════ */}
        <section className="py-12 px-8">
          <ScrollReveal variant="mask-reveal">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-red-900/50 mb-6 block">R.S.V.P</span>
                <h2 className="text-6xl sm:text-5xl font-black tracking-tighter mb-10 leading-[0.85]" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn Sẽ <br /> Đến Chứ?</h2>
                <p className="text-lg opacity-60 font-light leading-relaxed mb-12 max-w-md italic text-slate-700">
                  Kính mong quý khách xác nhận thông tin tham dự để chúng tôi có thể chuẩn bị đón tiếp một cách chu đáo nhất.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-8 opacity-40">
                  <div className="w-16 h-16 rounded-full border border-red-600 flex items-center justify-center">
                    <Heart size={20} style={{ color: red }} />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.5em] font-black text-slate-950">Awaiting your response</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 bg-white p-8 sm:p-14 border border-red-900/10 rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(185,28,28,0.08)]">
                <form className="space-y-10">
                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-red-900/60 group-focus-within:text-red-950 transition-all font-bold">Họ và Tên</label>
                    <input type="text" placeholder="Họ và tên của quý khách..." className="w-full bg-transparent border-b-2 border-red-900/10 py-4 text-2xl font-bold text-slate-900 outline-none transition-all duration-500 focus:border-red-900 placeholder:text-slate-200" />
                  </div>

                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-red-900/60 group-focus-within:text-red-950 transition-all font-bold">Sẽ Tham Dự?</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b-2 border-red-900/10 py-4 text-2xl font-bold text-slate-900 outline-none transition-all duration-500 focus:border-red-900 appearance-none cursor-pointer">
                        <option>Chắc chắn sẽ tham dự</option>
                        <option>Rất tiếc không thể đến</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-7 text-white font-black transition-all shadow-xl flex items-center justify-center gap-5 uppercase tracking-[0.5em] text-[10px] rounded-full group/btn"
                    style={{ backgroundColor: red }}>
                    XÁC NHẬN <Send size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer className="py-12 text-center relative overflow-hidden border-t border-red-900/10">
          <ScrollReveal variant="blur-reveal">
            <p className="text-[11px] uppercase tracking-[1.2em] font-black mb-10 text-red-900/40">Eternal Love</p>
            <h2 className="text-5xl sm:text-5xl font-black tracking-tighter text-slate-950 mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
              {groom_name} <span className="text-red-900/30 italic font-light mx-4">&</span> {bride_name}
            </h2>
            <div className="flex items-center justify-center gap-8 opacity-20" style={{ color: red }}>
              <div className="h-[1px] w-16 bg-current" />
              <span className="text-4xl">囍</span>
              <div className="h-[1px] w-16 bg-current" />
            </div>
            <p className="mt-12 text-[10px] text-red-900/50 opacity-60 uppercase tracking-[1em] font-black">Powered by iWedding Traditional Collection</p>
          </ScrollReveal>
        </footer>
      </main>
    </motion.div>
  );
};

export default TraditionalRedTemplate;
