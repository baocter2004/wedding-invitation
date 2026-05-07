import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Send, Volume2, VolumeX, ExternalLink, Camera, Heart, Sparkles, Quote, Calendar, ChevronDown } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const ModernPhotoStoryTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
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

  const primaryColor = theme_config_json?.primary_color || '#1A1A1A';
  const secondaryColor = theme_config_json?.secondary_color || '#FFFFFF';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen font-serif selection:bg-black selection:text-white antialiased overflow-x-hidden"
      style={{ backgroundColor: secondaryColor, color: primaryColor }}
    >
      <FloatingDecorativeElements count={8} type="circle" color="#000000" />

      {/* ══ MUSIC CONTROL ═════════════════════════════════════ */}
      {weddingData?.music_url && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center border border-slate-100 transition-all hover:scale-110 active:scale-95 group"
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={20} className="text-black animate-pulse" />
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-black/10"
              />
            </div>
          ) : (
            <VolumeX size={20} className="text-slate-300 group-hover:text-black transition-colors" />
          )}
        </motion.button>
      )}

      {/* ══ HERO SECTION ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative h-screen overflow-hidden bg-black flex items-center justify-center">
        <motion.div
          style={{ y: heroImageY, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <img src={cover} alt="Wedding Cover" className="w-full h-full object-cover opacity-70 brightness-[0.6]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full max-w-6xl px-8 text-white text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <p className="text-[10px] sm:text-xs font-black uppercase tracking-[1.2em] mb-12 text-white/50">A Cinematic Masterpiece</p>
            <h1 className="text-6xl sm:text-[7rem] md:text-[9rem] font-bold tracking-tighter leading-[0.8] mb-10" style={{ fontFamily: '"Playfair Display", serif' }}>
              {groom_name}
              <span className="flex items-center justify-center gap-10 my-12">
                <div className="h-px flex-1 max-w-[120px] bg-white/20" />
                <span className="text-3xl italic font-light text-white/30">&</span>
                <div className="h-px flex-1 max-w-[120px] bg-white/20" />
              </span>
              {bride_name}
            </h1>

            <div className="flex flex-col items-center gap-8 mt-16">
              <div className="bg-white/10 backdrop-blur-2xl px-10 py-6 rounded-full border border-white/20 shadow-2xl">
                <p className="text-xl sm:text-4xl font-light tracking-[0.4em] text-white">
                  {dt.day} <span className="text-white/20 mx-4">/</span> {dt.month} <span className="text-white/20 mx-4">/</span> {dt.year}
                </p>
              </div>
              <p className="text-xs italic font-medium tracking-[0.4em] text-white/40 uppercase">{lunar_date_text}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-3 opacity-40"
        >
          <div className="w-px h-20 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      <main className="relative z-20 w-full max-w-6xl mx-auto px-6 sm:px-12">

        {/* ══ INTRO QUOTE ═════════════════════════════════════ */}
        <section className="py-32 text-center relative overflow-hidden">
          <ScrollReveal variant="blur-reveal">
            <div className="max-w-4xl mx-auto px-6">
              <Quote size={32} className="mx-auto mb-12 opacity-30 text-black" />
              <p className="text-3xl sm:text-5xl leading-[1.3] font-light italic text-black" style={{ fontFamily: '"Playfair Display", serif' }}>
                "{intro_text}"
              </p>
              <div className="mt-16 w-24 h-px mx-auto bg-black/10" />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FAMILIES ═════════════════════════════════════════ */}
        <section className="py-32 px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-24">
              <span className="text-[10px] uppercase tracking-[1em] font-black text-black/30 mb-6 block">Legacy of Love</span>
              <div className="h-px w-24 mx-auto bg-black/10" />
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-16 sm:gap-32 max-w-5xl mx-auto">
            {/* Groom side */}
            <ScrollReveal variant="mask-reveal">
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-80 mb-12 overflow-hidden shadow-xl transition-all duration-700 group-hover:scale-[1.02] bg-white border-[12px] border-slate-50">
                  <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>

                <div className="space-y-10 mb-12">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-black/40 mb-3 font-bold">Thân phụ</span>
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{groom_father_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-black/40 mb-3 font-bold">Thân mẫu</span>
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{groom_mother_name}</span>
                  </div>
                </div>

                <div className="h-px w-12 bg-black/10 mb-8" />
                <h3 className="text-5xl font-bold tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>{groom_full_name}</h3>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-black/30 mt-4 block">The Groom</span>
              </div>
            </ScrollReveal>

            {/* Bride side */}
            <ScrollReveal variant="mask-reveal" delay={0.2}>
              <div className="flex flex-col items-center text-center group">
                <div className="relative w-64 h-80 mb-12 overflow-hidden shadow-xl transition-all duration-700 group-hover:scale-[1.02] bg-white border-[12px] border-slate-50">
                  <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                </div>

                <div className="space-y-10 mb-12">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-black/40 mb-3 font-bold">Thân phụ</span>
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{bride_father_name}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-black/40 mb-3 font-bold">Thân mẫu</span>
                    <span className="text-3xl font-bold text-slate-900 tracking-tight">{bride_mother_name}</span>
                  </div>
                </div>

                <div className="h-px w-12 bg-black/10 mb-8" />
                <h3 className="text-5xl font-bold tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>{bride_full_name}</h3>
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-black/30 mt-4 block">The Bride</span>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <section className="py-32 px-8 bg-slate-50/80 rounded-[3rem] my-32 border border-slate-100">
            <ScrollReveal variant="blur-reveal">
              <div className="max-w-4xl mx-auto text-center">
                <span className="text-[10px] uppercase tracking-[1em] font-black text-black/20 mb-10 block">A Modern Narrative</span>
                <h2 className="text-6xl sm:text-7xl font-bold tracking-tighter mb-16 text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Hành Trình Hạnh Phúc</h2>
                <p className="text-xl sm:text-4xl leading-[1.6] font-light italic text-slate-700">
                  "{love_story}"
                </p>
                <div className="mt-20 flex justify-center opacity-30">
                  <Heart size={64} fill="currentColor" className="text-slate-900" />
                </div>
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ EVENTS TIMELINE ═══════════════════════════════════ */}
        <section className="py-32 px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-24">
              <h2 className="text-6xl sm:text-[7rem] font-bold tracking-tighter mb-8 text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Timeline</h2>
              <div className="flex items-center justify-center gap-8">
                <div className="h-px w-16 bg-black/10" />
                <p className="text-[10px] font-black tracking-[0.6em] uppercase text-black/40">{lunar_date_text}</p>
                <div className="h-px w-16 bg-black/10" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-10 max-w-5xl mx-auto">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.2} variant="mask-reveal">
                <div className="group relative p-10 sm:p-16 rounded-[3rem] border border-slate-100 bg-white hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.08)] transition-all duration-700 flex flex-col md:flex-row items-center gap-12 md:gap-20 shadow-sm overflow-hidden">
                  {/* Subtle Number Background */}
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-[12rem] font-black text-black/[0.03] pointer-events-none select-none italic" style={{ fontFamily: '"Playfair Display", serif' }}>
                    0{idx + 1}
                  </div>

                  <div className="flex-1 relative z-10 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 mb-12">
                      <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto md:mx-0 shadow-inner">
                        {event.event_type === 'ceremony' ? <Calendar size={28} className="opacity-40" /> : <Sparkles size={28} className="opacity-40" />}
                      </div>
                      <h3 className="text-4xl font-bold tracking-tight text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>{event.title}</h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-16">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-black mb-5 text-slate-400">Schedule</span>
                        <div className="flex items-center justify-center md:justify-start gap-4">
                          <Clock size={20} className="text-slate-900" />
                          <span className="text-3xl font-bold text-slate-900">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <span className="text-[10px] uppercase tracking-widest font-black mt-3 text-slate-500">{new Date(event.event_time).toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>

                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-black mb-5 text-slate-400">Location</span>
                        <div className="flex items-start justify-center md:justify-start gap-4">
                          <MapPin size={20} className="text-slate-900 shrink-0 mt-1.5" />
                          <div>
                            <p className="text-2xl font-bold text-slate-900 mb-2">{event.venue_name}</p>
                            <p className="text-base text-slate-600 leading-relaxed max-w-xs">{event.address}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={event.map_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full md:w-auto min-w-[200px] py-6 px-10 border-2 border-slate-900 font-black uppercase tracking-[0.3em] text-[10px] text-slate-950 flex items-center justify-center gap-4 transition-all hover:bg-slate-950 hover:text-white active:scale-95 z-10"
                  >
                    DIRECTIONS <ExternalLink size={14} />
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
              <span className="text-[10px] uppercase tracking-[1em] font-black text-black/20 mb-6 block">Photo Lookbook</span>
              <h2 className="text-6xl sm:text-[7rem] font-bold tracking-tighter mb-8 text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Gallery</h2>
            </div>
          </ScrollReveal>

          <div className="columns-1 sm:columns-2 lg:columns-4 gap-8 space-y-8 max-w-[1400px] mx-auto px-4">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 4) * 0.1} variant="scale-up">
                <div className="break-inside-avoid rounded-sm overflow-hidden shadow-lg group relative border border-slate-100 bg-white p-2">
                  <img src={photo.image_path} alt={photo.caption || ''} className="w-full object-cover transition-transform duration-[4s] group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-10 text-center backdrop-blur-[4px]">
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white border-b border-white/30 pb-6">{photo.caption || 'Royal Memory'}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <section className="py-32 px-8 text-center bg-white rounded-[4rem] my-32 shadow-xl border border-slate-50 relative overflow-hidden">
            <ScrollReveal variant="blur-reveal">
              <h2 className="text-[10px] font-black uppercase tracking-[1.2em] text-black/20 mb-12">Registry</h2>
              <h3 className="text-5xl sm:text-[6rem] font-bold mb-16 tracking-tighter text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Hộp Mừng Cưới</h3>
              <p className="max-w-3xl mx-auto text-xl sm:text-2xl font-light italic text-slate-600 mb-20 leading-relaxed">
                "Sự hiện diện của quý khách là món quà trân quý nhất. <br className="hidden sm:block" />
                Gia đình xin chân thành cảm ơn mọi tấm lòng và lời chúc mừng."
              </p>
              <div className="flex flex-wrap justify-center gap-12 sm:gap-20">
                {bankAccounts.map(b => (
                  <div key={b.id} className="p-6 bg-slate-50/80 rounded-[2.5rem] border border-slate-100 transition-transform hover:scale-105 backdrop-blur-xl">
                    <GiftEnvelope bank={b} primaryColor={primaryColor} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>
        )}

        {/* ══ RSVP FORM ════════════════════════════════════════ */}
        <section className="py-32 px-8">
          <ScrollReveal variant="mask-reveal">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="text-[10px] uppercase tracking-[1em] font-black text-black/20 mb-8 block">R.S.V.P</span>
                <h2 className="text-7xl sm:text-[8rem] font-black tracking-tighter mb-10 leading-[0.9] text-slate-950" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn Sẽ <br /> Đến Chứ?</h2>
                <p className="text-xl opacity-40 font-light leading-relaxed mb-16 max-w-md italic text-slate-700">
                  Xác nhận sự hiện diện của bạn để chúng tôi có thể đón tiếp quý vị một cách chu đáo và trang trọng nhất.
                </p>
                <div className="flex items-center justify-center lg:justify-start gap-10 opacity-30">
                  <div className="w-16 h-16 rounded-full bg-slate-950 flex items-center justify-center shadow-2xl">
                    <Sparkles size={24} className="text-white opacity-60" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.6em] font-black text-slate-950">Awaiting your response</span>
                </div>
              </div>

              <div className="w-full lg:w-1/2 bg-slate-50 p-10 sm:p-20 border border-slate-200 rounded-sm shadow-[0_60px_120px_-20px_rgba(0,0,0,0.12)]">
                <form className="space-y-12">
                  <div className="group relative">
                    <label className="block text-[10px] uppercase tracking-[0.4em] mb-4 text-slate-500 group-focus-within:text-black transition-all font-bold">Họ và Tên</label>
                    <input type="text" placeholder="Họ và tên của quý khách..." className="w-full bg-transparent border-b-2 border-slate-300 py-4 text-2xl font-bold text-slate-950 outline-none transition-all duration-500 focus:border-black placeholder:text-slate-200" />
                  </div>

                  <div className="group relative">
                    <label className="block text-[10px] uppercase tracking-[0.4em] mb-4 text-slate-500 group-focus-within:text-black transition-all font-bold">Sẽ Tham Dự?</label>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b-2 border-slate-300 py-4 text-2xl font-bold text-slate-950 outline-none transition-all duration-500 focus:border-black appearance-none cursor-pointer">
                        <option>Chắc chắn sẽ tham dự</option>
                        <option>Rất tiếc không thể đến</option>
                      </select>
                      <ChevronDown size={20} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="w-full py-8 bg-slate-950 text-white font-black transition-all shadow-xl flex items-center justify-center gap-5 uppercase tracking-[0.6em] text-[10px] group/btn">
                    XÁC NHẬN <Send size={18} className="group-hover/btn:translate-x-2 transition-transform" />
                  </motion.button>
                </form>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer className="py-32 text-center relative overflow-hidden border-t border-slate-100">
          <ScrollReveal variant="blur-reveal">
            <p className="text-[10px] uppercase tracking-[1.5em] font-black mb-12 text-black/10">The Eternal Union</p>
            <h2 className="text-6xl sm:text-[8rem] font-black tracking-tighter text-slate-950 mb-20 opacity-20" style={{ fontFamily: '"Playfair Display", serif' }}>
              {groom_name} <span className="text-black/10 italic font-light mx-6">&</span> {bride_name}
            </h2>
            <div className="flex items-center justify-center gap-10 opacity-20">
              <div className="h-px w-20 bg-black" />
              <Heart size={24} />
              <div className="h-px w-20 bg-black" />
            </div>
            <p className="mt-32 text-[10px] text-black/10 uppercase tracking-[1.5em] font-black">Powered by iWedding Story Collection</p>
          </ScrollReveal>
        </footer>
      </main>
    </motion.div>
  );
};

export default ModernPhotoStoryTemplate;
