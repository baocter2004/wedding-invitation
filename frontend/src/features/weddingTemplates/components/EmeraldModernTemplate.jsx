import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Clock, Heart, Send, Gift, Volume2, VolumeX, ExternalLink, Sparkles, Leaf, Calendar, ChevronDown } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import Guestbook from '../shared/Guestbook';
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
  } = weddingData || {};

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen font-sans antialiased selection:bg-emerald-500 selection:text-white overflow-x-hidden bg-emerald-950 text-emerald-50"
    >
      <FloatingDecorativeElements count={12} type="leaf" color="#10B981" />

      {/* ══ MUSIC CONTROL ═════════════════════════════════════ */}
      {weddingData?.music_url && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-10 right-10 z-50 w-14 h-14 rounded-2xl bg-emerald-900/80 backdrop-blur-md shadow-2xl flex items-center justify-center border border-emerald-700/50 transition-all hover:scale-110 active:scale-95 group"
        >
          {isPlaying ? (
            <div className="relative">
              <Volume2 size={20} className="text-emerald-400 animate-pulse" />
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
      <section ref={heroRef} className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Cinematic Parallax Background */}
        <motion.div
          style={{ y: heroY, opacity: 0.5 }}
          className="absolute inset-0 z-0"
        >
          <img src={cover} alt="" className="w-full h-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-transparent to-emerald-950" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-20 text-center px-4 sm:px-6"
        >
          <div className="mb-10 flex items-center justify-center gap-6">
            <div className="h-px w-10 bg-emerald-500/30" />
            <p className="text-xs text-emerald-100/80 uppercase tracking-[0.8em] font-black">Emerald Collection</p>
            <div className="h-px w-10 bg-emerald-500/30" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-10 text-white flex flex-col sm:flex-row items-center justify-center" style={{ fontFamily: '"Playfair Display", serif' }}>
            <span className="max-w-full truncate px-2">{groom_name}</span>
            <span className="flex items-center justify-center gap-4 sm:gap-8 my-6 sm:my-0 sm:mx-6 text-emerald-400/50 w-full sm:w-auto">
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-current opacity-30" />
              <span className="text-2xl italic font-light">&</span>
              <div className="h-px flex-1 max-w-[60px] sm:max-w-[80px] bg-current opacity-30" />
            </span>
            <span className="text-emerald-400 max-w-full truncate px-2">{bride_name}</span>
          </h1>

          <div className="mt-16 flex flex-wrap justify-center items-center gap-10 sm:gap-8">
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white">{dt.day}</span>
              <span className="text-xs uppercase tracking-widest font-black text-emerald-400 mt-2">Day</span>
            </div>
            <div className="h-12 w-px bg-emerald-500/30 hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white">{dt.month}</span>
              <span className="text-xs uppercase tracking-widest font-black text-emerald-400 mt-2">Month</span>
            </div>
            <div className="h-12 w-px bg-emerald-500/30 hidden sm:block" />
            <div className="flex flex-col items-center">
              <span className="text-5xl sm:text-6xl font-light tracking-tighter text-white">{dt.year}</span>
              <span className="text-xs uppercase tracking-widest font-black text-emerald-400 mt-2">Year</span>
            </div>
          </div>

          <p className="mt-12 text-xs italic font-medium tracking-widest text-emerald-200/60 uppercase">
            {lunar_date_text}
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-10 flex flex-col items-center gap-2 opacity-50"
        >
          <div className="w-px h-16 bg-gradient-to-b from-emerald-500 to-transparent" />
        </motion.div>
      </section>

      <main className="relative z-30 w-full max-w-6xl mx-auto py-16">
        {/* ══ INTRO ═══════════════════════════════════════════ */}
        <section className="py-16 px-8 text-center">
          <ScrollReveal variant="blur-reveal">
            <div className="max-w-4xl mx-auto">
              <Leaf size={28} className="mx-auto mb-10 opacity-30 text-emerald-400" />
              <p className="text-2xl sm:text-4xl leading-tight font-light italic text-emerald-50" style={{ fontFamily: '"Playfair Display", serif' }}>
                "{intro_text}"
              </p>
              <div className="mt-12 h-px w-20 mx-auto bg-emerald-800" />
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FAMILIES ═════════════════════════════════════════ */}
        <section className="py-16 px-8 bg-emerald-900/30 rounded-[3rem] mx-4 sm:mx-8 my-12 border border-emerald-800/30 ">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal variant="fade-up">
              <div className="text-center mb-16">
                <span className="text-xs uppercase tracking-[0.8em] font-black text-emerald-400/50 mb-4 block">The Legacy</span>
                <h2 className="text-5xl font-bold tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Hai Gia Đình</h2>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-16">
              {/* Groom side */}
              <ScrollReveal variant="mask-reveal">
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-64 h-80 mb-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-emerald-800 p-2 bg-emerald-950 shadow-emerald-950/50">
                    <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-[2rem]" />
                  </div>

                  <div className="space-y-8 mb-10">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-emerald-500/60 mb-2 font-bold">Thân phụ</span>
                      <span className="text-2xl font-bold text-emerald-50 tracking-tight">{groom_father_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-emerald-500/60 mb-2 font-bold">Thân mẫu</span>
                      <span className="text-2xl font-bold text-emerald-50 tracking-tight">{groom_mother_name}</span>
                    </div>
                  </div>

                  <div className="h-px w-10 bg-emerald-800 mb-6" />
                  <h3 className="text-4xl font-bold tracking-tighter text-emerald-100" style={{ fontFamily: '"Playfair Display", serif' }}>{groom_full_name}</h3>
                  <span className="text-xs uppercase tracking-widest font-black text-emerald-500/40 mt-3 block">The Groom</span>
                </div>
              </ScrollReveal>

              {/* Bride side */}
              <ScrollReveal variant="mask-reveal" delay={0.2}>
                <div className="flex flex-col items-center text-center group">
                  <div className="relative w-64 h-80 mb-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-2 border-emerald-800 p-2 bg-emerald-950 shadow-emerald-950/50">
                    <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 rounded-[2rem]" />
                  </div>

                  <div className="space-y-8 mb-10">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-emerald-500/60 mb-2 font-bold">Thân phụ</span>
                      <span className="text-2xl font-bold text-emerald-50 tracking-tight">{bride_father_name}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-emerald-500/60 mb-2 font-bold">Thân mẫu</span>
                      <span className="text-2xl font-bold text-emerald-50 tracking-tight">{bride_mother_name}</span>
                    </div>
                  </div>

                  <div className="h-px w-10 bg-emerald-800 mb-6" />
                  <h3 className="text-4xl font-bold tracking-tighter text-emerald-100" style={{ fontFamily: '"Playfair Display", serif' }}>{bride_full_name}</h3>
                  <span className="text-xs uppercase tracking-widest font-black text-emerald-500/40 mt-3 block">The Bride</span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ══ EVENTS ═══════════════════════════════════════════ */}
        <section className="py-20 px-8">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Tiệc Cưới</h2>
              <div className="mt-4 flex items-center justify-center gap-4 opacity-30">
                <div className="h-px w-12 bg-emerald-500" />
                <Leaf size={16} className="text-emerald-500" />
                <div className="h-px w-12 bg-emerald-500" />
              </div>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.2} variant="mask-reveal">
                <div className="group relative p-10 sm:p-14 rounded-[4rem] border border-emerald-800 bg-emerald-900/20 hover:bg-emerald-900/40 transition-all duration-700 shadow-xl text-center flex flex-col items-center">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-emerald-500 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20">
                    <Calendar size={32} className="text-emerald-950" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>{event.title}</h3>
                  <div className="space-y-8 mb-10">
                    <div className="flex flex-col items-center">
                      <Clock size={20} className="text-emerald-500/50 mb-3" />
                      <span className="text-2xl font-bold text-white">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MapPin size={20} className="text-emerald-500/50 mb-3" />
                      <p className="text-xl font-bold text-white mb-2">{event.venue_name}</p>
                      <p className="text-sm text-emerald-100/60 leading-relaxed max-w-xs mx-auto">{event.address}</p>
                    </div>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={event.map_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto py-5 px-12 rounded-2xl bg-emerald-500 text-emerald-950 font-black uppercase tracking-widest text-xs transition-all shadow-2xl hover:bg-emerald-400"
                  >
                    XEM BẢN ĐỒ
                  </motion.a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════ */}
        <section className="py-20">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-16 px-4 sm:px-6">
              <span className="text-xs uppercase tracking-[0.8em] font-black text-emerald-500/40 mb-6 block">Artistic Moments</span>
              <h2 className="text-5xl font-bold tracking-tighter text-white" style={{ fontFamily: '"Playfair Display", serif' }}>Gallery</h2>
            </div>
          </ScrollReveal>
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6 px-4 sm:px-6">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 4) * 0.1} variant="scale-up">
                <div className="break-inside-avoid rounded-[3rem] overflow-hidden border border-emerald-800/50 group relative ">
                  <img src={photo.image_path} alt={photo.caption || ''} className="w-full object-cover transition-transform duration-[4s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-emerald-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center p-8 text-center backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-widest font-black text-emerald-400 border-b border-emerald-500/20 pb-4">{photo.caption || 'Eternal Love'}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GUESTBOOK ═════════════════════════════════════════ */}
        <Guestbook
          wishes={weddingData.wishes}
          primaryColor="#10B981"
          secondaryColor="#064E3B"
          fontHeading='"Playfair Display", serif'
        />

        {/* ══ RSVP ════════════════════════════════════════════ */}
        <section className="py-16 sm:py-24 px-4 sm:px-8">
          <ScrollReveal variant="mask-reveal">
            <div className="max-w-4xl mx-auto bg-emerald-900/40 p-6 sm:p-14 md:p-20 rounded-3xl sm:rounded-[4rem] border border-emerald-800 shadow-2xl text-center">
              <h2 className="text-5xl font-bold text-white mb-8" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn Sẽ <br /> Tham Dự Chứ?</h2>
              <p className="text-emerald-100/60 mb-12 italic">Sự hiện diện của bạn là vinh hạnh của gia đình chúng tôi.</p>
              <form className="space-y-8 sm:space-y-10 max-w-md mx-auto text-left">
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest mb-3 sm:mb-4 text-emerald-500/50 font-bold">Họ và Tên</label>
                  <input type="text" placeholder="Họ và tên..." className="w-full bg-transparent border-b-2 border-emerald-800 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-bold text-white outline-none focus:border-emerald-500 transition-colors placeholder:text-emerald-800/50" />
                </div>
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest mb-3 sm:mb-4 text-emerald-500/50 font-bold">Tham Dự?</label>
                  <select className="w-full bg-transparent border-b-2 border-emerald-800 py-3 sm:py-4 text-lg sm:text-xl md:text-2xl font-bold text-white outline-none appearance-none cursor-pointer focus:border-emerald-500">
                    <option className="bg-emerald-950">Chắc chắn tham dự</option>
                    <option className="bg-emerald-950">Rất tiếc không thể đến</option>
                  </select>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 sm:py-6 rounded-full bg-emerald-500 text-emerald-950 font-black uppercase tracking-widest text-xs "
                >
                  XÁC NHẬN
                </motion.button>
              </form>
            </div>
          </ScrollReveal>
        </section>

        {/* ══ FOOTER ═══════════════════════════════════════════ */}
        <footer className="py-20 text-center border-t border-emerald-900">
          <ScrollReveal variant="blur-reveal">
            <p className="text-xs uppercase tracking-[1em] font-black text-emerald-500/30 mb-8">Eternal Love</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8 flex flex-col sm:flex-row items-center justify-center" style={{ fontFamily: '"Playfair Display", serif' }}>
              <span className="max-w-full truncate px-2">{groom_name}</span>
              <span className="text-emerald-500/50 italic font-light my-4 sm:my-0 sm:mx-4">&</span>
              <span className="max-w-full truncate px-2">{bride_name}</span>
            </h2>
            <div className="flex justify-center gap-6 opacity-20 text-emerald-500">
              <Leaf size={24} />
              <Heart size={24} />
              <Leaf size={24} />
            </div>
          </ScrollReveal>
        </footer>
      </main>
    </motion.div>
  );
};

export default EmeraldModernTemplate;
