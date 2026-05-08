import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
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

  const primaryColor = theme_config_json?.primary_color || '#10B981'; // Bright Emerald Green
  const bgColor = '#022c22'; // Emerald 950
  const cardBg = '#064e3b'; // Emerald 900

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-white overflow-x-hidden"
      style={{ backgroundColor: bgColor, color: '#ecfdf5' }}
    >
      <FloatingDecorativeElements count={12} type="leaf" color={primaryColor} />

      {/* ══ MUSIC CONTROL ═════════════════════════════════════ */}
      {weddingData?.music_url && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-2xl bg-[#064e3b]/80 backdrop-blur-md shadow-2xl flex items-center justify-center border border-emerald-700/50 transition-all hover:scale-110 active:scale-95 group"
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={20} style={{ color: primaryColor }} className="animate-pulse" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl bg-emerald-500/20"
              />
            </div>
          ) : (
            <VolumeX size={20} className="text-emerald-500/50 group-hover:text-emerald-400 transition-colors" />
          )}
        </motion.button>
      )}

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#022c22]">
        {/* Cinematic Parallax Background */}
        <motion.div
          style={{ y: heroY, opacity: 0.6 }}
          className="absolute inset-0 z-0"
        >
          <img src={cover} alt="" className="w-full h-full object-cover brightness-[0.5]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#022c22]/80 via-[#022c22]/40 to-[#022c22]" />
        </motion.div>

        {/* Minimalist Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10"
          style={{ backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)', backgroundSize: '80px 80px' }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-6"
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <div className="mb-10 flex items-center justify-center gap-6">
              <div className="h-[1px] w-10 bg-emerald-500/30" />
              <p className="text-[11px] text-emerald-100/80 uppercase tracking-[0.8em] font-black">Emerald Collection</p>
              <div className="h-[1px] w-10 bg-emerald-500/30" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-10" style={{ fontFamily: '"Playfair Display", serif', color: 'white' }}>
              <span className="block">{groom_name}</span>
              <span className="flex items-center justify-center gap-8 my-8">
                <div className="h-[1px] flex-1 max-w-[80px] bg-emerald-500/30" />
                <span className="text-2xl italic font-light text-emerald-400/50">&</span>
                <div className="h-[1px] flex-1 max-w-[80px] bg-emerald-500/30" />
              </span>
              <span className="block" style={{ color: primaryColor }}>{bride_name}</span>
            </h1>

            <div className="mt-16 flex flex-wrap justify-center items-center gap-10 sm:gap-8">
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white">{dt.day}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-emerald-400 mt-2">Day</span>
              </div>
              <div className="h-12 w-[1px] bg-emerald-500/30 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white">{dt.month}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-emerald-400 mt-2">Month</span>
              </div>
              <div className="h-12 w-[1px] bg-emerald-500/30 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white">{dt.year}</span>
                <span className="text-[11px] uppercase tracking-widest font-black text-emerald-400 mt-2">Year</span>
              </div>
            </div>

            <p className="mt-12 text-xs italic font-medium tracking-[0.3em] text-emerald-200/60 uppercase">
              {lunar_date_text}
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-emerald-500 to-transparent" />
        </motion.div>
      </section>

      {/* ══ MAIN CONTENT ══════════════════════════════════════ */}
      <main className="relative z-30 w-full max-w-6xl mx-auto">

        {/* ══ INTRO ═══════════════════════════════════════════ */}
        <section className="py-16 px-8 text-center border-b border-emerald-900/50">
          <ScrollReveal variant="blur-reveal">
            <div className="max-w-4xl mx-auto">
              <Leaf size={28} className="mx-auto mb-10 opacity-30 text-emerald-400" />
              <p className="text-2xl sm:text-4xl leading-[1.4] font-light italic text-emerald-50" style={{ fontFamily: '"Playfair Display", serif' }}>
                "{intro_text}"
              </p>
              <div className="mt-12 h-[1px] w-20 mx-auto bg-emerald-800" />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ COVER PHOTO ═════════════════════════════════════ */}
        <section className="py-20 px-8">
          <ScrollReveal variant="mask-reveal">
            <div className="max-w-5xl mx-auto aspect-[16/9] rounded-[2rem] overflow-hidden shadow-2xl relative group border border-emerald-800/50">
              <img src={cover} alt="Wedding" className="w-full h-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-[#022c22]/10 transition-opacity group-hover:opacity-0" />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FAMILIES ═════════════════════════════════════════ */}
        <section className="py-16 px-8 bg-[#064e3b]/30 rounded-[3rem] mx-4 sm:mx-8 my-12 border border-emerald-800/30 shadow-2xl">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-16">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-emerald-400/50 mb-4 block">The Legacy</span>
                <h2 className="text-5xl sm:text-6xl font-bold tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Hai Gia Đình</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-12 sm:gap-12 max-w-5xl mx-auto">
              {/* Groom's Side */}
              <ScrollReveal variant="mask-reveal">
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-64 h-80 mb-10 overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.01] bg-[#022c22] border-[8px] border-[#064e3b]">
                    <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" />
                  </div>

                  <div className="space-y-8 mb-10">
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-widest text-emerald-400/60 mb-2 font-bold">Thân phụ</span>
                      <span className="text-2xl font-bold text-emerald-50 tracking-tight">{groom_father_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-widest text-emerald-400/60 mb-2 font-bold">Thân mẫu</span>
                      <span className="text-2xl font-bold text-emerald-50 tracking-tight">{groom_mother_name}</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-12 bg-emerald-800 mb-6" />
                  <h3 className="text-4xl font-bold tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif', color: primaryColor }}>{groom_full_name}</h3>
                  <span className="text-[11px] uppercase tracking-[0.5em] font-black text-emerald-500/40 mt-3 block">The Groom</span>
                </div>
              </ScrollReveal>

              {/* Bride's Side */}
              <ScrollReveal variant="mask-reveal" delay={0.2}>
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-64 h-80 mb-10 overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-700 group-hover:scale-[1.01] bg-[#022c22] border-[8px] border-[#064e3b]">
                    <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-90" />
                  </div>

                  <div className="space-y-8 mb-10">
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-widest text-emerald-400/60 mb-2 font-bold">Thân phụ</span>
                      <span className="text-2xl font-bold text-emerald-50 tracking-tight">{bride_father_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-widest text-emerald-400/60 mb-2 font-bold">Thân mẫu</span>
                      <span className="text-2xl font-bold text-emerald-50 tracking-tight">{bride_mother_name}</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-12 bg-emerald-800 mb-6" />
                  <h3 className="text-4xl font-bold tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif', color: primaryColor }}>{bride_full_name}</h3>
                  <span className="text-[11px] uppercase tracking-[0.5em] font-black text-emerald-500/40 mt-3 block">The Bride</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ══ TIMELINE ═════════════════════════════════════════ */}
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-16">
                <h2 className="text-5xl sm:text-6xl font-bold tracking-tighter text-white mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Timeline</h2>
                <div className="flex items-center justify-center gap-6">
                  <div className="h-[1px] w-12 bg-emerald-800" />
                  <p className="text-[11px] font-black tracking-[0.8em] uppercase text-emerald-400/60">{lunar_date_text}</p>
                  <div className="h-[1px] w-12 bg-emerald-800" />
                </div>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {events.map((event, idx) => (
                <ScrollReveal key={event.id} delay={idx * 0.2} variant="mask-reveal">
                  <div className="group relative bg-[#064e3b]/40 backdrop-blur-md rounded-[3rem] p-8 sm:p-12 shadow-2xl border border-emerald-700/30 hover:bg-[#064e3b]/60 transition-all duration-700 overflow-hidden text-center flex flex-col items-center">
                    <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                    
                    <div className="w-20 h-20 rounded-full bg-[#022c22] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-emerald-800">
                      {event.event_type === 'ceremony' ? <Calendar size={28} className="text-emerald-400 opacity-80" /> : <Sparkles size={28} className="text-emerald-400 opacity-80" />}
                    </div>

                    <h3 className="text-3xl font-bold tracking-tight mb-10 text-white" style={{ fontFamily: '"Playfair Display", serif' }}>{event.title}</h3>

                    <div className="space-y-10 mb-12 w-full">
                      <div className="flex flex-col items-center">
                        <Clock size={20} className="mb-4 text-emerald-500" />
                        <span className="text-2xl font-bold text-emerald-50">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-[11px] uppercase tracking-widest font-black mt-2 text-emerald-400/60">{new Date(event.event_time).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <MapPin size={20} className="mb-4 text-emerald-500" />
                        <p className="text-xl font-bold text-emerald-50 mb-2">{event.venue_name}</p>
                        <p className="text-sm leading-relaxed max-w-sm mx-auto text-emerald-200/60">{event.address}</p>
                        {event.note && (
                          <div className="mt-6 p-5 rounded-[1.5rem] bg-[#022c22]/50 italic text-xs text-emerald-300/70 border border-emerald-800/50">
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
                      className="w-full sm:w-auto min-w-[180px] py-5 px-10 rounded-full font-black uppercase tracking-[0.3em] text-[10px] text-white transition-all shadow-lg hover:opacity-95"
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
        <section className="py-16 px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-12">
              <span className="text-[11px] uppercase tracking-[0.8em] font-black text-emerald-500/50 mb-4 block">Visual Journey</span>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6 max-w-[1400px] mx-auto px-4">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 4) * 0.1} variant="scale-up">
                <div className="break-inside-avoid rounded-[2.5rem] overflow-hidden shadow-2xl group relative border border-emerald-800/50 p-2 bg-[#064e3b]">
                  <img src={photo.image_path} alt="" className="w-full rounded-[2rem] object-cover transition-transform duration-[4s] group-hover:scale-105 opacity-90 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-[#022c22]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-8 text-center backdrop-blur-sm rounded-[2rem] m-2">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white border-b border-emerald-500/50 pb-4">{photo.caption || 'Special Memory'}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <section className="py-20 px-8 text-center bg-[#064e3b]/30 rounded-[3rem] mx-4 sm:mx-8 my-16 border border-emerald-800/30 relative overflow-hidden shadow-2xl">
            <ScrollReveal variant="blur-reveal">
              <h2 className="text-[11px] font-black uppercase tracking-[0.8em] text-emerald-400/60 mb-10">Gratitude</h2>
              <h3 className="text-4xl sm:text-6xl font-bold mb-12 tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Hộp Mừng Cưới</h3>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl font-light italic text-emerald-100/70 mb-12 leading-relaxed px-6">
                "Sự hiện diện của quý khách là món quà trân quý nhất. <br className="hidden sm:block" />
                Gia đình xin chân thành cảm ơn mọi tấm lòng và lời chúc mừng."
              </p>
              <div className="flex flex-wrap justify-center gap-10 sm:gap-8">
                {bankAccounts.map(b => (
                  <div key={b.id} className="transition-transform hover:scale-[1.02]">
                    <GiftEnvelope bank={b} primaryColor={primaryColor} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ RSVP ════════════════════════════════════════════ */}
        <section className="py-20 px-8">
          <ScrollReveal variant="mask-reveal">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 max-w-5xl mx-auto">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-emerald-500/50 mb-6 block">R.S.V.P</span>
                <h2 className="text-6xl sm:text-7xl font-black tracking-tighter text-white mb-10 leading-[0.9]" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn Sẽ <br /> Tham Dự <br /> <span style={{ color: primaryColor }}>Chứ?</span></h2>
                <p className="text-lg text-emerald-100/60 font-light leading-relaxed mb-12 max-w-md italic">
                  Kính mong quý khách xác nhận thông tin tham dự để chúng tôi có thể đón tiếp quý vị một cách chu đáo nhất.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-8 opacity-60">
                  <div className="w-16 h-16 rounded-full border border-emerald-500/40 flex items-center justify-center">
                    <Heart size={24} className="text-emerald-400" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.5em] font-black text-emerald-200">Awaiting your response</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 bg-[#064e3b]/50 backdrop-blur-xl p-8 sm:p-14 rounded-[3rem] shadow-2xl border border-emerald-600/30">
                <form className="space-y-10">
                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-emerald-400/60 group-focus-within:text-emerald-300 transition-all font-bold">Họ và Tên</label>
                    <input type="text" placeholder="Họ tên của quý khách..." className="w-full bg-transparent border-b-2 border-emerald-800 py-4 text-2xl font-bold text-white outline-none transition-all duration-500 focus:border-emerald-400 placeholder:text-emerald-800/50" />
                  </div>

                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-emerald-400/60 group-focus-within:text-emerald-300 transition-all font-bold">Xác Nhận</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b-2 border-emerald-800 py-4 text-2xl font-bold text-white outline-none transition-all duration-500 focus:border-emerald-400 appearance-none cursor-pointer">
                        <option className="bg-[#022c22]">Sẽ tham dự</option>
                        <option className="bg-[#022c22]">Tiếc là không thể</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-7 text-[#022c22] font-black transition-all shadow-xl flex items-center justify-center gap-5 uppercase tracking-[0.6em] text-[10px] rounded-full group/btn"
                    style={{ backgroundColor: primaryColor }}>
                    XÁC NHẬN <Send size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer className="py-20 text-center border-t border-emerald-900/50 bg-[#022c22] text-white">
          <ScrollReveal variant="blur-reveal">
            <p className="text-[11px] uppercase tracking-[1.2em] font-black mb-12 text-emerald-500/40">Forever Together</p>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tighter mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>
              {groom_name} <span className="text-emerald-500/50 italic font-light mx-4">&</span> {bride_name}
            </h2>
            <div className="flex items-center justify-center gap-10 opacity-30">
              <div className="h-[1px] w-20 bg-emerald-500/30" />
              <Leaf size={32} className="text-emerald-500" />
              <div className="h-[1px] w-20 bg-emerald-500/30" />
            </div>
            <p className="mt-16 text-[10px] text-emerald-500/20 uppercase tracking-[1.2em] font-black">Powered by iWedding Emerald Collection</p>
          </ScrollReveal>
        </footer>
      </main>
    </motion.div>
  );
};

export default EmeraldModernTemplate;
