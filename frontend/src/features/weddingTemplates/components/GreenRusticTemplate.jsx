import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, Send, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import { resolveGallery, resolveCover, formatDate, DECORATIVE, PORTRAITS } from '../../../assets/images';

const GreenRusticTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (weddingData?.music_url) {
      audioRef.current = new Audio(weddingData.music_url);
      audioRef.current.loop = true;
    }
    return () => audioRef.current?.pause();
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(p => !p);
  };

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

  const primaryColor = theme_config_json?.primary_color || '#2D4F1E';
  const secondaryColor = theme_config_json?.secondary_color || '#FDFCF8';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <div className="min-h-screen font-serif selection:bg-[#2D4F1E] selection:text-white" style={{ backgroundColor: secondaryColor, color: primaryColor }}>

      {/* Background Leaves */}
      <motion.div
        className="fixed top-0 left-0 w-48 sm:w-64 aspect-square pointer-events-none z-0 overflow-hidden opacity-30"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 0.3, rotate: -85 }}
        transition={{ duration: 2, ease: "easeOut" }}>
        <img src={DECORATIVE.greenLeaves} alt="" className="w-full h-full object-contain scale-150 origin-center" />
      </motion.div>
      <motion.div
        className="fixed bottom-0 right-0 w-48 sm:w-64 aspect-square pointer-events-none z-0 overflow-hidden opacity-30"
        initial={{ opacity: 0, rotate: 90 }}
        animate={{ opacity: 0.3, rotate: 95 }}
        transition={{ duration: 2, ease: "easeOut" }}>
        <img src={DECORATIVE.greenLeaves} alt="" className="w-full h-full object-contain scale-150 origin-center" />
      </motion.div>

      {/* Music Player */}
      {weddingData?.music_url && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur shadow-lg flex items-center justify-center border" style={{ borderColor: `${primaryColor}20` }}>
          {isPlaying ? <Volume2 size={18} style={{ color: primaryColor }} className="animate-pulse" /> : <VolumeX size={18} className="text-slate-400" />}
        </button>
      )}

      <main className="relative z-10 max-w-4xl mx-auto shadow-sm bg-white/40 backdrop-blur-[2px]">

        {/* ══ HERO ════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          <ScrollReveal duration={1.5} yOffset={0}>
            <div className={`relative mb-12 transition-all duration-1000 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="absolute inset-0 -m-4 sm:-m-6 border rounded-full scale-105 pointer-events-none" style={{ borderColor: `${primaryColor}20` }}></div>
              <div className="absolute inset-0 -m-2 sm:-m-3 border border-dashed rounded-full scale-105 pointer-events-none" style={{ borderColor: `${primaryColor}30` }}></div>
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 sm:border-8 shadow-2xl relative z-10" style={{ borderColor: secondaryColor }}>
                <img src={cover} alt="Wedding" className="w-full h-full object-cover transition-transform duration-[5000ms] hover:scale-110" />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p className="text-[10px] sm:text-xs tracking-[0.4em] uppercase mb-6 opacity-60 font-medium">Thân Mời Tham Dự Lễ Cưới</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 px-4 leading-tight" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: primaryColor }}>
              {groom_name}
              <span className="block text-xl sm:text-2xl italic font-light my-2 opacity-50">&amp;</span>
              {bride_name}
            </h1>
            <div className="w-12 h-px mx-auto my-8 opacity-40" style={{ backgroundColor: primaryColor }}></div>
            <p className="text-base sm:text-xl tracking-[0.2em] uppercase font-light">
              {dt.day} <span className="mx-2 opacity-30">•</span> {dt.month} <span className="mx-2 opacity-30">•</span> {dt.year}
            </p>
            <p className="mt-3 text-xs sm:text-sm italic opacity-50 tracking-wide">{lunar_date_text}</p>
          </ScrollReveal>

          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30 hidden sm:block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.3, y: 0 }} transition={{ duration: 1, delay: 1 }}>
            <div className="w-px h-12" style={{ backgroundColor: primaryColor }}></div>
          </motion.div>
        </section>

        {/* ══ INTRO ═══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-16 sm:py-20 px-6 sm:px-8 text-center" style={{ backgroundColor: `${primaryColor}03` }}>
            <Heart className="mx-auto mb-10 opacity-30" size={20} style={{ color: primaryColor }} />
            <p className="text-lg sm:text-2xl italic leading-loose font-light max-w-2xl mx-auto opacity-80">
              "{intro_text}"
            </p>
          </section>
        </ScrollReveal>

        {/* ══ DIVIDER ══════════════════════════════════════════ */}
        <div className="flex justify-center my-4 sm:my-8 opacity-60">
          <img src={DECORATIVE.emeraldDivider} alt="divider" className="h-8 sm:h-12 object-contain" />
        </div>

        {/* ══ FAMILY ══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-12 sm:py-16 px-6 sm:px-8">
            <h2 className="text-center text-2xl font-bold uppercase tracking-widest mb-10 opacity-80">Hai Gia Đình</h2>
            <div className="grid md:grid-cols-2 gap-10 sm:gap-16 text-center">
              {/* Groom */}
              <div className="bg-white/60 p-8 sm:p-10 rounded-3xl border shadow-sm" style={{ borderColor: `${primaryColor}15` }}>
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover  opacity-80" />
                </div>
                <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-50 mb-6 font-bold">Nhà Trai</h3>
                <div className="text-sm space-y-1 mb-6 opacity-80">
                  <p>Ông: <strong className="text-base font-medium">{groom_father_name}</strong></p>
                  <p>Bà: <strong className="text-base font-medium">{groom_mother_name}</strong></p>
                </div>
                <div className="h-0.5 w-10 mx-auto mb-6" style={{ backgroundColor: `${primaryColor}20` }}></div>
                <h4 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{groom_full_name}</h4>
                <p className="text-[10px] uppercase tracking-widest mt-2 opacity-40">Chú Rể</p>
              </div>

              {/* Bride */}
              <div className="bg-white/60 p-8 sm:p-10 rounded-3xl border shadow-sm" style={{ borderColor: `${primaryColor}15` }}>
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6">
                  <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover  opacity-80" />
                </div>
                <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-50 mb-6 font-bold">Nhà Gái</h3>
                <div className="text-sm space-y-1 mb-6 opacity-80">
                  <p>Ông: <strong className="text-base font-medium">{bride_father_name}</strong></p>
                  <p>Bà: <strong className="text-base font-medium">{bride_mother_name}</strong></p>
                </div>
                <div className="h-0.5 w-10 mx-auto mb-6" style={{ backgroundColor: `${primaryColor}20` }}></div>
                <h4 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{bride_full_name}</h4>
                <p className="text-[10px] uppercase tracking-widest mt-2 opacity-40">Cô Dâu</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <ScrollReveal>
            <section className="py-12 sm:py-16 px-8 bg-white/40 border-y" style={{ borderColor: `${primaryColor}10` }}>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>Câu Chuyện Tình Yêu</h2>
                <div className="w-16 h-px mx-auto" style={{ backgroundColor: `${primaryColor}30` }}></div>
              </div>
              <div className="max-w-2xl mx-auto text-base sm:text-lg leading-loose italic opacity-80 text-center">
                {love_story}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ DIVIDER ══════════════════════════════════════════ */}
        <div className="flex justify-center my-4 sm:my-8 opacity-60">
          <img src={DECORATIVE.emeraldDivider} alt="divider" className="h-8 sm:h-12 object-contain" />
        </div>

        {/* ══ EVENTS ══════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-6 sm:px-8">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>Chương Trình</h2>
              <p className="text-[10px] tracking-widest uppercase opacity-50 font-bold">{lunar_date_text}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.1}>
                <div className="p-8 sm:p-10 rounded-3xl bg-white/70 backdrop-blur shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group border" style={{ borderColor: `${primaryColor}15` }}>
                  <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                    <Calendar size={100} />
                  </div>

                  <h3 className="text-2xl font-bold mb-6 pb-4 border-b" style={{ borderColor: `${primaryColor}15`, fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{event.title}</h3>

                  <div className="space-y-5 text-sm sm:text-base opacity-80">
                    <div className="flex items-start gap-4">
                      <Clock size={18} className="mt-0.5 opacity-60 shrink-0" />
                      <div>
                        <p className="font-bold">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-sm opacity-70 mt-0.5">{new Date(event.event_time).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <MapPin size={18} className="mt-0.5 opacity-60 shrink-0" />
                      <div>
                        <p className="font-bold">{event.venue_name}</p>
                        <p className="text-sm opacity-70 mt-1 leading-relaxed">{event.address}</p>
                        {event.note && <p className="text-xs italic mt-2 opacity-60">{event.note}</p>}
                      </div>
                    </div>
                  </div>

                  <a href={event.map_url} target="_blank" rel="noopener noreferrer"
                    className="mt-8 w-full py-3.5 text-white rounded-xl font-medium transition-opacity hover:opacity-90 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                    style={{ backgroundColor: primaryColor }}>
                    Xem Bản Đồ <ExternalLink size={14} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-[#2D4F1E]/5">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>Kỷ Niệm</h2>
            </div>
          </ScrollReveal>
          <div className="columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4 max-w-5xl mx-auto">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 3) * 0.1}>
                <div className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <img src={photo.image_path} alt={photo.caption || ''} className="w-full object-cover" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <ScrollReveal>
            <section className="py-12 sm:py-16 px-6 text-center border-b" style={{ borderColor: `${primaryColor}10` }}>
              <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>Hộp Mừng Cưới</h2>
              <p className="text-sm opacity-60 mb-8 italic max-w-sm mx-auto">Sự hiện diện của quý khách là món quà quý giá nhất.</p>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                {bankAccounts.map(b => <GiftEnvelope key={b.id} bank={b} primaryColor={primaryColor} />)}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ RSVP ════════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-12 sm:py-16 px-6">
            <div className="max-w-lg mx-auto bg-white/60 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border shadow-sm" style={{ borderColor: `${primaryColor}20` }}>
              <h2 className="text-3xl font-bold text-center mb-3" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>Gửi Lời Chúc</h2>
              <p className="text-center text-xs uppercase tracking-widest opacity-50 mb-10">Phản hồi tham dự</p>

              <form className="space-y-5">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-2">Họ và Tên</label>
                  <input type="text" className="w-full bg-white border rounded-xl px-4 py-3 outline-none focus:ring-1 transition-shadow" style={{ borderColor: `${primaryColor}20` }} />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-2">Xác Nhận</label>
                  <select className="w-full bg-white border rounded-xl px-4 py-3 outline-none focus:ring-1 transition-shadow appearance-none" style={{ borderColor: `${primaryColor}20` }}>
                    <option>Sẽ tham dự</option>
                    <option>Rất tiếc không thể đến</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 mb-2">Lời Chúc</label>
                  <textarea rows="3" className="w-full bg-white border rounded-xl px-4 py-3 outline-none focus:ring-1 transition-shadow resize-none" style={{ borderColor: `${primaryColor}20` }}></textarea>
                </div>
                <button type="button" className="w-full py-4 text-white font-bold rounded-xl transition-opacity hover:opacity-90 flex items-center justify-center gap-2 uppercase tracking-widest text-sm mt-4" style={{ backgroundColor: primaryColor }}>
                  Gửi Phản Hồi <Send size={15} />
                </button>
              </form>
            </div>
          </section>
        </ScrollReveal>

        {/* Footer */}
        <footer className="py-16 text-center" style={{ backgroundColor: `${primaryColor}05` }}>
          <p className="text-[10px] tracking-[0.5em] uppercase opacity-40 mb-4 font-bold">Trân trọng cảm ơn</p>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
            {groom_name} <span className="text-xl italic font-light opacity-50 mx-1">&amp;</span> {bride_name}
          </h2>
          <div className="mt-8 text-[9px] opacity-30 tracking-[0.3em] uppercase">Made with ♥ by LoveKnot</div>
        </footer>
      </main>
    </div>
  );
};

export default GreenRusticTemplate;
