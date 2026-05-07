import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Heart, Send, Gift, Volume2, VolumeX, ExternalLink, Sparkles, Leaf, Calendar, ChevronDown } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const EmeraldModernTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
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

  const primaryColor = theme_config_json?.primary_color || '#065F46'; // Emerald Green
  const secondaryColor = '#FDFCF8'; // Warm White

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen font-sans antialiased selection:bg-emerald-900 selection:text-white overflow-x-hidden"
      style={{ backgroundColor: secondaryColor, color: '#1e293b' }}
    >
      <FloatingDecorativeElements count={10} type="circle" color={primaryColor} />

      {/* ══ MUSIC CONTROL ═════════════════════════════════════ */}
      {weddingData?.music_url && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-2xl bg-white shadow-2xl flex items-center justify-center border transition-all hover:scale-110 active:scale-95 group"
          style={{ borderColor: `${primaryColor}20` }}
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={20} style={{ color: primaryColor }} className="animate-pulse" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-emerald-500/10"
              />
            </div>
          ) : (
            <VolumeX size={20} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
          )}
        </motion.button>
      )}

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A1A10]">
        {/* Cinematic Parallax Background */}
        <motion.div
          style={{ y: heroY, opacity: 0.7 }}
          className="absolute inset-0 z-0"
        >
          <img src={cover} alt="" className="w-full h-full object-cover brightness-[0.45]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-[#0A1A10]" />
        </motion.div>

        {/* Minimalist Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-10"
          style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-6"
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="mb-12 flex items-center justify-center gap-6">
              <div className="h-px w-12 bg-white/40" />
              <p className="text-[10px] sm:text-xs text-white/70 uppercase tracking-[1em] font-black">Modern Editorial</p>
              <div className="h-px w-12 bg-white/40" />
            </div>

            <h1 className="text-6xl sm:text-[7rem] lg:text-[9rem] font-bold tracking-tighter leading-[0.8] mb-12" style={{ fontFamily: '"Playfair Display", serif', color: 'white' }}>
              <span className="block">{groom_name}</span>
              <span className="flex items-center justify-center gap-8 my-10">
                <div className="h-px flex-1 max-w-[100px] bg-white/20" />
                <span className="text-3xl italic font-light text-white/40">&</span>
                <div className="h-px flex-1 max-w-[100px] bg-white/20" />
              </span>
              <span className="block" style={{ color: '#10B981' }}>{bride_name}</span>
            </h1>

            <div className="mt-20 flex flex-wrap justify-center items-center gap-10 sm:gap-20">
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl font-light tracking-tighter text-white/95">{dt.day}</span>
                <span className="text-[10px] uppercase tracking-widest font-black text-white/50 mt-3">Day</span>
              </div>
              <div className="h-16 w-px bg-white/20 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl font-light tracking-tighter text-white/95">{dt.month}</span>
                <span className="text-[10px] uppercase tracking-widest font-black text-white/50 mt-3">Month</span>
              </div>
              <div className="h-16 w-px bg-white/20 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-7xl font-light tracking-tighter text-white/95">{dt.year}</span>
                <span className="text-[10px] uppercase tracking-widest font-black text-white/50 mt-3">Year</span>
              </div>
            </div>

            <p className="mt-16 text-xs italic font-medium tracking-[0.4em] text-white/60 uppercase">
              {lunar_date_text}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-3 opacity-40"
        >
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* ══ MAIN CONTENT ══════════════════════════════════════ */}
      <main className="relative z-30">

        {/* ══ INTRO ═══════════════════════════════════════════ */}
        <section className="py-32 px-8 text-center bg-white border-b border-slate-50">
          <ScrollReveal variant="blur-reveal">
            <div className="max-w-4xl mx-auto">
              <Leaf size={32} className="mx-auto mb-12 opacity-30 text-emerald-900" />
              <p className="text-3xl sm:text-5xl leading-[1.3] font-light italic text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>
                "{intro_text}"
              </p>
              <div className="mt-16 h-px w-24 mx-auto bg-slate-200" />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ COVER PHOTO ═════════════════════════════════════ */}
        <section className="py-24 px-8 bg-white">
          <ScrollReveal variant="mask-reveal">
            <div className="max-w-5xl mx-auto aspect-[16/9] rounded-[3rem] overflow-hidden shadow-[0_60px_120px_-20px_rgba(0,0,0,0.25)] relative group">
              <img src={cover} alt="Wedding" className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-emerald-950/10 transition-opacity group-hover:opacity-0" />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FAMILIES ═════════════════════════════════════════ */}
        <section className="py-32 px-8 bg-[#FDFCF8]">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-24">
                <span className="text-[10px] uppercase tracking-[1em] font-black text-emerald-900/40 mb-6 block">The Legacy</span>
                <h2 className="text-6xl sm:text-7xl font-bold tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Hai Gia Đình</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-16 sm:gap-32">
              {/* Groom's Side */}
              <ScrollReveal variant="mask-reveal">
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-64 h-80 mb-12 overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-700 group-hover:scale-[1.02] bg-white border-[12px] border-emerald-50">
                    <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>

                  <div className="space-y-10 mb-12">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-3 font-bold">Thân phụ</span>
                      <span className="text-3xl font-bold text-slate-950 tracking-tight">{groom_father_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-3 font-bold">Thân mẫu</span>
                      <span className="text-3xl font-bold text-slate-950 tracking-tight">{groom_mother_name}</span>
                    </div>
                  </div>

                  <div className="h-px w-12 bg-slate-200 mb-8" />
                  <h3 className="text-5xl font-bold tracking-tighter text-emerald-950" style={{ fontFamily: '"Playfair Display", serif' }}>{groom_full_name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.6em] font-black text-emerald-900/30 mt-4 block">The Groom</span>
                </div>
              </ScrollReveal>

              {/* Bride's Side */}
              <ScrollReveal variant="mask-reveal" delay={0.2}>
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-64 h-80 mb-12 overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-700 group-hover:scale-[1.02] bg-white border-[12px] border-emerald-50">
                    <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  </div>

                  <div className="space-y-10 mb-12">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-3 font-bold">Thân phụ</span>
                      <span className="text-3xl font-bold text-slate-950 tracking-tight">{bride_father_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-3 font-bold">Thân mẫu</span>
                      <span className="text-3xl font-bold text-slate-950 tracking-tight">{bride_mother_name}</span>
                    </div>
                  </div>

                  <div className="h-px w-12 bg-slate-200 mb-8" />
                  <h3 className="text-5xl font-bold tracking-tighter text-emerald-950" style={{ fontFamily: '"Playfair Display", serif' }}>{bride_full_name}</h3>
                  <span className="text-[10px] uppercase tracking-[0.6em] font-black text-emerald-900/30 mt-4 block">The Bride</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ═════════════════════════════════════════ */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-24">
                <h2 className="text-6xl sm:text-[7rem] font-bold tracking-tighter text-slate-950 mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>Timeline</h2>
                <p className="text-[10px] font-black tracking-[1em] uppercase text-emerald-900/40">{lunar_date_text}</p>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-10 sm:gap-16">
              {events.map((event, idx) => (
                <ScrollReveal key={event.id} delay={idx * 0.2} variant="mask-reveal">
                  <div className="group relative bg-white rounded-[4rem] p-10 sm:p-16 shadow-[0_15px_60px_rgba(0,0,0,0.03)] border border-slate-50 hover:shadow-[0_60px_120px_-20px_rgba(6,95,70,0.15)] transition-all duration-700 overflow-hidden text-center flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform shadow-inner">
                      {event.event_type === 'ceremony' ? <Calendar size={32} className="text-emerald-900 opacity-40" /> : <Sparkles size={32} className="text-emerald-900 opacity-40" />}
                    </div>

                    <h3 className="text-4xl font-bold tracking-tight mb-12 text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>{event.title}</h3>

                    <div className="space-y-12 mb-16 w-full">
                      <div className="flex flex-col items-center">
                        <Clock size={24} className="mb-5 text-emerald-700/60" />
                        <span className="text-3xl font-bold text-slate-950">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-[10px] uppercase tracking-widest font-black mt-3 text-slate-500">{new Date(event.event_time).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <MapPin size={24} className="mb-5 text-emerald-700/60" />
                        <p className="text-2xl font-bold text-slate-950 mb-2">{event.venue_name}</p>
                        <p className="text-base leading-relaxed max-w-sm mx-auto text-slate-700">{event.address}</p>
                        {event.note && (
                          <div className="mt-8 p-6 rounded-[2rem] bg-emerald-50 italic text-sm text-emerald-900/70 border border-emerald-900/10">
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
                      className="w-full sm:w-auto min-w-[220px] py-6 px-12 rounded-full font-black uppercase tracking-[0.4em] text-[10px] text-white transition-all shadow-xl hover:opacity-95"
                      style={{ backgroundColor: primaryColor }}
                    >
                      XEM BẢN ĐỒ <ExternalLink size={14} className="inline ml-2 -mt-1" />
                    </motion.a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GALLERY ══════════════════════════════════════════ */}
        <section className="py-32 px-6 bg-white">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-24">
              <span className="text-[10px] uppercase tracking-[1em] font-black text-emerald-900/30 mb-6 block">Visual Journey</span>
              <h2 className="text-6xl sm:text-[7rem] font-bold tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-8 space-y-8 max-w-[1400px] mx-auto px-4">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 4) * 0.1} variant="scale-up">
                <div className="break-inside-avoid rounded-[3rem] overflow-hidden shadow-lg group relative border border-slate-100 p-2 bg-white">
                  <img src={photo.image_path} alt="" className="w-full rounded-[2.5rem] object-cover transition-transform duration-[4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-emerald-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-10 text-center backdrop-blur-[4px]">
                    <p className="text-[10px] uppercase tracking-[0.6em] font-black text-white border-b border-white/30 pb-6">{photo.caption || 'Special Memory'}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <section className="py-32 px-8 text-center bg-[#FDFCF8] border-y border-slate-50 relative overflow-hidden">
            <ScrollReveal variant="blur-reveal">
              <h2 className="text-[10px] font-black uppercase tracking-[1em] text-emerald-900/40 mb-12">Gratitude</h2>
              <h3 className="text-5xl sm:text-[6rem] font-bold mb-16 tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Hộp Mừng Cưới</h3>
              <p className="max-w-3xl mx-auto text-xl sm:text-2xl font-light italic text-slate-600 mb-20 leading-relaxed px-6">
                "Sự hiện diện của quý khách là món quà trân quý nhất. <br className="hidden sm:block" />
                Gia đình xin chân thành cảm ơn mọi tấm lòng và lời chúc mừng."
              </p>
              <div className="flex flex-wrap justify-center gap-12 sm:gap-20">
                {bankAccounts.map(b => (
                  <div key={b.id} className="p-6 bg-white/80 backdrop-blur-3xl rounded-[4rem] shadow-xl border border-white transition-transform hover:scale-105">
                    <GiftEnvelope bank={b} primaryColor={primaryColor} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ RSVP ════════════════════════════════════════════ */}
        <section className="py-32 px-8 bg-white max-w-6xl mx-auto">
          <ScrollReveal variant="mask-reveal">
            <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="text-[10px] uppercase tracking-[1em] font-black text-emerald-900/30 mb-8 block">R.S.V.P</span>
                <h2 className="text-7xl sm:text-[8rem] font-black tracking-tighter text-slate-950 mb-10 leading-[0.85]" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn Sẽ <br /> Đến Chứ?</h2>
                <p className="text-xl text-slate-600 font-light leading-relaxed mb-16 max-w-md italic">
                  Kính mong quý khách xác nhận thông tin tham dự để chúng tôi có thể đón tiếp quý vị một cách chu đáo nhất.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-10 opacity-30">
                  <div className="w-20 h-20 rounded-full border border-emerald-900 flex items-center justify-center">
                    <Heart size={32} className="text-emerald-900" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.6em] font-black text-slate-950">Awaiting your response</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 bg-white p-10 sm:p-20 rounded-[4rem] shadow-[0_80px_150px_-30px_rgba(6,95,70,0.15)] border border-slate-100">
                <form className="space-y-12">
                  <div className="group relative">
                    <label className="block text-[10px] uppercase tracking-[0.4em] mb-4 text-slate-500 group-focus-within:text-emerald-900 transition-all font-bold">Họ và Tên</label>
                    <input type="text" placeholder="Họ tên của quý khách..." className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl font-bold text-slate-950 outline-none transition-all duration-500 focus:border-emerald-950 placeholder:text-slate-200" />
                  </div>

                  <div className="group relative">
                    <label className="block text-[10px] uppercase tracking-[0.4em] mb-4 text-slate-500 group-focus-within:text-emerald-900 transition-all font-bold">Xác Nhận</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl font-bold text-slate-950 outline-none transition-all duration-500 focus:border-emerald-950 appearance-none cursor-pointer">
                        <option>Sẽ tham dự</option>
                        <option>Tiếc là không thể</option>
                      </select>
                      <ChevronDown size={24} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-8 text-white font-black transition-all shadow-xl flex items-center justify-center gap-5 uppercase tracking-[0.8em] text-[10px] rounded-full group/btn"
                    style={{ backgroundColor: primaryColor }}>
                    XÁC NHẬN <Send size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer className="py-32 text-center border-t border-slate-50 bg-[#0A1A10] text-white">
          <ScrollReveal variant="blur-reveal">
            <p className="text-[10px] uppercase tracking-[1.5em] font-black mb-16 text-white/30">Forever Together</p>
            <h2 className="text-6xl sm:text-[8rem] font-black tracking-tighter mb-20" style={{ fontFamily: '"Playfair Display", serif' }}>
              {groom_name} <span className="text-emerald-500/30 italic font-light mx-6">&</span> {bride_name}
            </h2>
            <div className="flex items-center justify-center gap-12 opacity-20">
              <div className="h-px w-24 bg-white/20" />
              <Leaf size={32} className="text-emerald-500" />
              <div className="h-px w-24 bg-white/20" />
            </div>
            <p className="mt-32 text-[10px] text-white/20 uppercase tracking-[1.5em] font-black">Powered by iWedding Emerald Collection</p>
          </ScrollReveal>
        </footer>
      </main>
    </motion.div>
  );
};

export default EmeraldModernTemplate;
