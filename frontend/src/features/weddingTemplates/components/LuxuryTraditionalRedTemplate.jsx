import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Clock, Heart, Send, Volume2, VolumeX, Calendar, Gift, Sparkles, ExternalLink, ChevronDown } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const LuxuryTraditionalRedTemplate = ({ weddingData }) => {
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

  const primaryColor = theme_config_json?.primary_color || '#881337'; // Deep Crimson
  const accentColor = theme_config_json?.secondary_color || '#D4AF37'; // Royal Gold

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen font-serif antialiased selection:bg-red-900 selection:text-white overflow-x-hidden"
      style={{ backgroundColor: '#FDFCF8', color: '#1a1a1a' }}
    >
      <FloatingDecorativeElements count={15} type="heart" color={primaryColor} />

      {/* ══ MUSIC CONTROL ═════════════════════════════════════ */}
      {weddingData?.music_url && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border-2 transition-all hover:scale-110 active:scale-95 group overflow-hidden"
          style={{ backgroundColor: 'white', borderColor: `${primaryColor}40` }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={20} style={{ color: primaryColor }} className="animate-pulse" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-red-500/10"
              />
            </div>
          ) : (
            <VolumeX size={20} className="text-slate-400 group-hover:text-red-900 transition-colors" />
          )}
        </motion.button>
      )}

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0A0A0A]">
        {/* Cinematic Background */}
        <motion.div
          style={{ y: heroY, opacity: 0.7 }}
          className="absolute inset-0 z-0"
        >
          <img src={cover} alt="" className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute inset-8 border border-white/10 pointer-events-none z-10" />

        {/* Corner Ornaments */}
        <div className="absolute top-12 left-12 w-16 h-16 border-t-2 border-l-2 opacity-50 z-10" style={{ borderColor: accentColor }} />
        <div className="absolute top-12 right-12 w-16 h-16 border-t-2 border-r-2 opacity-50 z-10" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-12 left-12 w-16 h-16 border-b-2 border-l-2 opacity-50 z-10" style={{ borderColor: accentColor }} />
        <div className="absolute bottom-12 right-12 w-16 h-16 border-b-2 border-r-2 opacity-50 z-10" style={{ borderColor: accentColor }} />

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
              <div className="h-[1px] w-10 bg-white/30" />
              <span className="text-3xl font-bold tracking-[0.3em] select-none" style={{ color: accentColor }}>囍</span>
              <div className="h-[1px] w-10 bg-white/30" />
            </div>

            <p className="text-[11px] text-white/80 uppercase tracking-[0.7em] font-black mb-10">The Royal Invitation</p>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.8] mb-10" style={{ fontFamily: '"Playfair Display", serif', color: 'white' }}>
              <span className="block">{groom_name}</span>
              <span className="flex items-center justify-center gap-8 my-10">
                <div className="h-[1px] flex-1 max-w-[100px] bg-white/20" />
                <span className="text-3xl italic font-light text-white/30">&</span>
                <div className="h-[1px] flex-1 max-w-[100px] bg-white/20" />
              </span>
              <span className="block" style={{ color: accentColor }}>{bride_name}</span>
            </h1>

            <div className="mt-16 flex flex-col items-center gap-8">
              <div className="flex items-center gap-10">
                <div className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-light text-white tracking-widest">{dt.day}</span>
                  <span className="text-[11px] uppercase tracking-widest font-black text-white/40 mt-2">Day</span>
                </div>
                <div className="h-12 w-[1px] bg-white/20" />
                <div className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-light text-white tracking-widest">{dt.month}</span>
                  <span className="text-[11px] uppercase tracking-widest font-black text-white/40 mt-2">Month</span>
                </div>
                <div className="h-12 w-[1px] bg-white/20" />
                <div className="flex flex-col items-center">
                  <span className="text-5xl sm:text-6xl font-light text-white tracking-widest">{dt.year}</span>
                  <span className="text-[11px] uppercase tracking-widest font-black text-white/40 mt-2">Year</span>
                </div>
              </div>
              <p className="text-xs italic font-medium tracking-[0.3em] text-white/60 uppercase">{lunar_date_text}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </section>

      {/* ══ CONTENT AREA ══════════════════════════════════════ */}
      <main className="relative z-30 w-full max-w-6xl mx-auto">

        {/* ══ INTRO QUOTE ═════════════════════════════════════ */}
        <section className="py-24 px-8 text-center bg-white border-b border-slate-50 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] bg-red-50/30 rounded-full blur-[150px] -z-10" />
          <ScrollReveal variant="blur-reveal">
            <div className="max-w-4xl mx-auto">
              <Sparkles size={28} className="mx-auto mb-10 opacity-30 text-red-900" />
              <p className="text-2xl sm:text-4xl leading-[1.3] font-light italic text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>
                "{intro_text}"
              </p>
              <div className="mt-12 flex items-center justify-center gap-6">
                <div className="h-[1px] w-16 bg-slate-200" />
                <span className="text-2xl opacity-30 text-red-900 font-bold">囍</span>
                <div className="h-[1px] w-16 bg-slate-200" />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FAMILIES ═════════════════════════════════════════ */}
        <section className="py-24 px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-20">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-red-900/40 mb-4 block">Grand Lineage</span>
                <h2 className="text-5xl sm:text-6xl font-bold tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Hai Gia Đình</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-12 sm:gap-24 max-w-5xl mx-auto">
              {/* Groom's Side */}
              <ScrollReveal variant="mask-reveal">
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-64 h-[24rem] mb-10 overflow-hidden rounded-[2rem] shadow-xl transition-all duration-700 group-hover:scale-[1.01]">
                    <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 border-[16px] border-white/5 pointer-events-none" />
                  </div>

                  <div className="space-y-8 mb-10">
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-widest text-slate-500 mb-2 font-bold">Thân phụ</span>
                      <span className="text-2xl font-bold text-slate-950 tracking-tight">{groom_father_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-widest text-slate-500 mb-2 font-bold">Thân mẫu</span>
                      <span className="text-2xl font-bold text-slate-950 tracking-tight">{groom_mother_name}</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-10 bg-slate-200 mb-6" />
                  <h3 className="text-4xl font-bold tracking-tighter text-red-950" style={{ fontFamily: '"Playfair Display", serif' }}>{groom_full_name}</h3>
                  <span className="text-[11px] uppercase tracking-[0.4em] font-black text-red-900/30 mt-3 block">The Groom</span>
                </div>
              </ScrollReveal>

              {/* Bride's Side */}
              <ScrollReveal variant="mask-reveal" delay={0.2}>
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-64 h-[24rem] mb-10 overflow-hidden rounded-[2rem] shadow-xl transition-all duration-700 group-hover:scale-[1.01]">
                    <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 border-[16px] border-white/5 pointer-events-none" />
                  </div>

                  <div className="space-y-8 mb-10">
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-widest text-slate-500 mb-2 font-bold">Thân phụ</span>
                      <span className="text-2xl font-bold text-slate-950 tracking-tight">{bride_father_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] uppercase tracking-widest text-slate-500 mb-2 font-bold">Thân mẫu</span>
                      <span className="text-2xl font-bold text-slate-950 tracking-tight">{bride_mother_name}</span>
                    </div>
                  </div>

                  <div className="h-[1px] w-10 bg-slate-200 mb-6" />
                  <h3 className="text-4xl font-bold tracking-tighter text-red-950" style={{ fontFamily: '"Playfair Display", serif' }}>{bride_full_name}</h3>
                  <span className="text-[11px] uppercase tracking-[0.4em] font-black text-red-900/30 mt-3 block">The Bride</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <section className="py-24 px-8 bg-[#FDFCF8]">
            <ScrollReveal variant="blur-reveal">
              <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/3 text-center lg:text-left">
                  <span className="text-[11px] uppercase tracking-[0.7em] font-black text-red-900/30 mb-6 block">Our Romance</span>
                  <h2 className="text-5xl font-bold leading-none tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>
                    Duyên <br /> Tình <br /> <span className="text-red-900">Thắm</span>
                  </h2>
                  <div className="mt-6 h-1 w-16 bg-red-900 opacity-20 mx-auto lg:mx-0" />
                </div>
                <div className="w-full lg:w-2/3">
                  <p className="text-xl sm:text-2xl font-light leading-[1.4] text-slate-800 italic">
                    "{love_story}"
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ TIMELINE ═════════════════════════════════════════ */}
        <section className="py-24 px-8 bg-white">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-20">
                <h2 className="text-5xl sm:text-7xl font-bold tracking-tighter text-slate-950 mb-6" style={{ fontFamily: '"Playfair Display", serif' }}>Timeline</h2>
                <div className="flex items-center justify-center gap-6">
                  <div className="h-[1px] w-12 bg-slate-200" />
                  <p className="text-[11px] font-black tracking-[0.5em] uppercase text-red-900/40">{lunar_date_text}</p>
                  <div className="h-[1px] w-12 bg-slate-200" />
                </div>
              </div>
            </ScrollReveal>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {events.map((event, idx) => (
                <ScrollReveal key={event.id} delay={idx * 0.2} variant="mask-reveal">
                  <div className="group relative bg-white rounded-[3rem] p-8 sm:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-50 hover:shadow-[0_60px_120px_-20px_rgba(136,19,55,0.12)] transition-all duration-700 overflow-hidden text-center flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner">
                      {event.event_type === 'ceremony' ? <Calendar size={28} className="text-red-900 opacity-40" /> : <Sparkles size={28} className="text-red-900 opacity-40" />}
                    </div>

                    <h3 className="text-3xl font-bold tracking-tight mb-10 text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>{event.title}</h3>

                    <div className="space-y-10 mb-12 w-full">
                      <div className="flex flex-col items-center">
                        <Clock size={20} className="mb-4 text-red-700/50" />
                        <span className="text-2xl font-bold text-slate-950">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                        <span className="text-[11px] uppercase tracking-widest font-black mt-2 text-slate-500">{new Date(event.event_time).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <MapPin size={20} className="mb-4 text-red-700/50" />
                        <p className="text-xl font-bold text-slate-950 mb-2">{event.venue_name}</p>
                        <p className="text-sm leading-relaxed max-w-sm mx-auto text-slate-700">{event.address}</p>
                        {event.note && (
                          <div className="mt-6 p-5 rounded-[1.5rem] bg-red-50 text-red-950/70 italic text-xs border border-red-900/10">
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
        <section className="py-24 px-6 bg-white">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-20 px-4">
              <span className="text-[11px] uppercase tracking-[1em] font-black text-red-900/30 mb-4 block">Pastel Moments</span>
              <h2 className="text-5xl sm:text-6xl font-bold tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6 max-w-[1400px] mx-auto px-4">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 4) * 0.1} variant="scale-up">
                <div className="break-inside-avoid rounded-[2.5rem] overflow-hidden shadow-lg group relative border border-slate-50 p-2 bg-white">
                  <img src={photo.image_path} alt="" className="w-full rounded-[2rem] object-cover transition-transform duration-[4s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-red-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-8 text-center backdrop-blur-[2px]">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white border-b border-white/30 pb-4">{photo.caption || 'Royal Portrait'}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <section className="py-24 px-8 text-center bg-white border-y border-slate-50 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-red-50/20 rounded-full blur-[150px] -z-10" />
            <ScrollReveal variant="blur-reveal">
              <h2 className="text-[11px] font-black uppercase tracking-[0.8em] text-red-900/40 mb-8">Registry</h2>
              <h3 className="text-4xl sm:text-6xl font-bold mb-12 tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Hộp Mừng Cưới</h3>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl font-light italic text-slate-600 mb-16 leading-relaxed px-6">
                "Sự hiện diện của quý khách là món quà trân quý nhất. <br className="hidden sm:block" />
                Gia đình xin chân thành cảm ơn mọi tấm lòng và lời chúc mừng."
              </p>
              <div className="flex flex-wrap justify-center gap-10 sm:gap-16">
                {bankAccounts.map(b => (
                  <div key={b.id} className="transition-transform hover:scale-[1.02]">
                    <GiftEnvelope bank={b} primaryColor={primaryColor} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ RSVP FORM ════════════════════════════════════════ */}
        <section className="py-24 px-8 bg-white">
          <ScrollReveal variant="mask-reveal">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 max-w-5xl mx-auto">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="text-[11px] uppercase tracking-[0.8em] font-black text-red-900/30 mb-6 block">R.S.V.P</span>
                <h2 className="text-6xl sm:text-7xl font-black tracking-tighter text-slate-950 mb-10 leading-[0.85]" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn Sẽ <br /> Đến Chứ?</h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed mb-12 max-w-md italic">
                  Kính mong quý khách xác nhận thông tin tham dự để chúng tôi có thể đón tiếp quý vị một cách chu đáo nhất.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-8 opacity-40">
                  <div className="w-16 h-16 rounded-full border border-red-900/40 flex items-center justify-center">
                    <Heart size={24} className="text-red-900" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.5em] font-black text-slate-950">Awaiting your response</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 bg-white p-8 sm:p-14 rounded-[3rem] shadow-[0_60px_120px_-20px_rgba(136,19,55,0.12)] border border-slate-100">
                <form className="space-y-10">
                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-slate-500 group-focus-within:text-red-900 transition-all font-bold">Họ và Tên</label>
                    <input type="text" placeholder="Họ tên của quý khách..." className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl font-bold text-slate-950 outline-none transition-all duration-500 focus:border-red-900 placeholder:text-slate-200" />
                  </div>

                  <div className="group relative">
                    <label className="block text-[11px] uppercase tracking-[0.4em] mb-4 text-slate-500 group-focus-within:text-red-900 transition-all font-bold">Số Lượng</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b-2 border-slate-200 py-4 text-2xl font-bold text-slate-950 outline-none transition-all duration-500 focus:border-red-900 appearance-none cursor-pointer">
                        <option>1 Khách</option>
                        <option>2 Khách</option>
                        <option>Cả gia đình</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-7 text-white font-black transition-all shadow-xl flex items-center justify-center gap-5 uppercase tracking-[0.6em] text-[10px] rounded-full group/btn"
                    style={{ backgroundColor: primaryColor }}>
                    XÁC NHẬN <Send size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer className="py-24 text-center bg-[#0A0A0A] text-white">
          <ScrollReveal variant="blur-reveal">
            <p className="text-[11px] uppercase tracking-[1.2em] font-black mb-12 text-white/30">The Eternal Bond</p>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter mb-16" style={{ fontFamily: '"Playfair Display", serif' }}>
              {groom_name} <span className="text-white/30 italic font-light mx-4">&</span> {bride_name}
            </h2>
            <div className="flex items-center justify-center gap-10 opacity-20">
              <div className="h-[1px] w-20 bg-white/20" />
              <span className="text-4xl" style={{ color: accentColor }}>囍</span>
              <div className="h-[1px] w-20 bg-white/20" />
            </div>
            <p className="mt-24 text-[10px] text-white/20 uppercase tracking-[1.2em] font-black">Powered by iWedding Masterpiece</p>
          </ScrollReveal>
        </footer>
      </main>
    </motion.div>
  );
};

export default LuxuryTraditionalRedTemplate;
