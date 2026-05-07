import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Clock, Send, Volume2, VolumeX, ExternalLink, Camera } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const ModernPhotoStoryTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Parallax effect for the hero image
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

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

  const mainColor = theme_config_json?.primary_color || '#1A1A1A';
  const bgColor = theme_config_json?.secondary_color || '#F9F9F9';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <div className="min-h-screen font-sans selection:bg-[#1A1A1A] selection:text-white" style={{ backgroundColor: bgColor, color: mainColor }}>

      {/* Music Toggle */}
      {weddingData?.music_url && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center transition-transform hover:scale-110">
          {isPlaying ? <Volume2 size={18} style={{ color: mainColor }} className="animate-pulse" /> : <VolumeX size={18} className="text-slate-400" />}
        </button>
      )}

      {/* ══ HERO (Parallax) ════════════════════════════════════ */}
      <section className="relative h-screen overflow-hidden bg-black">
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
          <img src={cover} alt="Cover" className="w-full h-full object-cover opacity-70" />
        </motion.div>
        
        <div className={`relative z-10 h-full flex flex-col justify-end p-8 md:p-16 text-white pb-24 transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-4xl">
            <h1 className="text-6xl sm:text-8xl md:text-[8rem] font-bold tracking-tighter leading-[0.8] mb-6">
              {groom_name} <br/>
              <span className="text-4xl sm:text-6xl md:text-[6rem] italic font-light">&amp;</span> {bride_name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <p className="text-sm md:text-base font-bold uppercase tracking-[0.3em]">{dt.day} . {dt.month} . {dt.year}</p>
              <div className="hidden sm:block w-12 h-px bg-white/50"></div>
              <p className="text-xs md:text-sm italic opacity-80">{lunar_date_text}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="relative z-20" style={{ backgroundColor: bgColor }}>
        
        {/* ══ INTRO / STORY ════════════════════════════════════ */}
        <section className="py-16 sm:py-12 px-6">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6">Lời Ngỏ</h2>
                <div className="w-12 h-1 mb-6 md:mx-0 mx-auto" style={{ backgroundColor: mainColor }}></div>
                <p className="text-lg sm:text-xl leading-relaxed italic opacity-80 font-serif">"{intro_text}"</p>
              </div>
              {love_story && (
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.3em] mb-6">Chuyện Tình Yêu</h2>
                  <p className="text-base leading-loose opacity-70">{love_story}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </section>

        {/* ══ GALLERY (Lookbook Style) ══════════════════════════ */}
        <section className="py-12 sm:py-24 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-10 px-4">
                <Camera size={24} style={{ color: mainColor }} />
                <h2 className="text-2xl font-bold tracking-tight">KỶ NIỆM</h2>
              </div>
            </ScrollReveal>

            {/* Masonry-style asymmetrical grid for photos */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
              {gallery.slice(0, 6).map((photo, i) => {
                // Create a varied grid layout
                let colSpan = 'md:col-span-4'; // default
                let aspect = 'aspect-[3/4]';
                
                if (i === 0) { colSpan = 'md:col-span-8 md:row-span-2'; aspect = 'aspect-square md:aspect-auto h-full'; }
                if (i === 3) { colSpan = 'md:col-span-6'; aspect = 'aspect-[4/3]'; }
                if (i === 4) { colSpan = 'md:col-span-6'; aspect = 'aspect-[4/3]'; }
                if (i === 5) { colSpan = 'md:col-span-12'; aspect = 'aspect-video'; }

                return (
                  <ScrollReveal key={photo.id} delay={i * 0.1} className={colSpan}>
                    <div className={`w-full overflow-hidden group bg-slate-200 ${aspect}`}>
                      <img src={photo.image_path} alt={photo.caption || ''} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000 grayscale-[10%]" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══ FAMILY ══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-16 px-6 bg-black text-white">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-sm font-bold uppercase tracking-[0.4em] mb-10 text-center opacity-70">Hai Gia Đình</h2>
              
              <div className="grid md:grid-cols-2 gap-16 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20">
                {/* Groom */}
                <div className="md:pr-16 flex flex-col items-center md:items-end text-center md:text-right">
                  <div className="w-48 h-48 mb-8 overflow-hidden">
                    <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover grayscale" />
                  </div>
                  <h4 className="text-4xl font-light mb-2">{groom_full_name}</h4>
                  <p className="text-xs uppercase tracking-widest opacity-50 mb-6">Chú Rể</p>
                  <div className="text-sm space-y-1 opacity-70">
                    <p>Trưởng nam</p>
                    <p>Ông: {groom_father_name}</p>
                    <p>Bà: {groom_mother_name}</p>
                  </div>
                </div>

                {/* Bride */}
                <div className="pt-16 md:pt-0 md:pl-16 flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="w-48 h-48 mb-8 overflow-hidden">
                    <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover grayscale" />
                  </div>
                  <h4 className="text-4xl font-light mb-2">{bride_full_name}</h4>
                  <p className="text-xs uppercase tracking-widest opacity-50 mb-6">Cô Dâu</p>
                  <div className="text-sm space-y-1 opacity-70">
                    <p>Út nữ</p>
                    <p>Ông: {bride_father_name}</p>
                    <p>Bà: {bride_mother_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ EVENTS ══════════════════════════════════════════ */}
        <section className="py-16 sm:py-12 px-6">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tighter mb-4">LỊCH TRÌNH</h2>
              <p className="text-sm font-bold uppercase tracking-[0.2em] opacity-50 mb-10">{lunar_date_text}</p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
              {events.map((event, idx) => (
                <ScrollReveal key={event.id} delay={idx * 0.1}>
                  <div className="group border-t-2 pt-8" style={{ borderColor: mainColor }}>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold">{event.title}</h3>
                      <span className="text-xs font-bold uppercase tracking-widest opacity-50 px-3 py-1 bg-black/5 rounded-full">
                        {event.event_type === 'ceremony' ? 'Lễ Cưới' : 'Tiệc Cưới'}
                      </span>
                    </div>

                    <div className="space-y-4 text-sm md:text-base opacity-80 mb-8">
                      <div className="flex items-center gap-3">
                        <Clock size={18} className="opacity-50" />
                        <strong className="font-bold">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</strong>
                        <span>- {new Date(event.event_time).toLocaleDateString('vi-VN')}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin size={18} className="opacity-50 mt-1 shrink-0" />
                        <div>
                          <p className="font-bold">{event.venue_name}</p>
                          <p className="mt-1 opacity-80">{event.address}</p>
                          {event.note && <p className="mt-2 text-xs italic opacity-60 bg-black/5 p-2 inline-block rounded">{event.note}</p>}
                        </div>
                      </div>
                    </div>

                    <a href={event.map_url} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:opacity-60 transition-opacity">
                      Xem Bản Đồ <ExternalLink size={14} />
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <ScrollReveal>
            <section className="py-16 px-6 text-center bg-slate-100">
              <h2 className="text-2xl font-bold tracking-tight mb-4">HỘP MỪNG CƯỚI</h2>
              <p className="text-sm opacity-60 mb-12">Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.</p>
              <div className="flex flex-wrap justify-center gap-8">
                {bankAccounts.map(b => <GiftEnvelope key={b.id} bank={b} primaryColor={mainColor} />)}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ RSVP ════════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-16 sm:py-12 px-6">
            <div className="max-w-3xl mx-auto border-8 p-8 sm:p-16" style={{ borderColor: mainColor }}>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4 text-center">RSVP</h2>
              <p className="text-center text-sm opacity-60 mb-12 uppercase tracking-widest">Xác nhận tham dự</p>
              
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70">Họ và Tên</label>
                    <input type="text" className="w-full border-b-2 py-3 outline-none focus:border-black transition-colors bg-transparent" style={{ borderColor: `${mainColor}30` }} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70">Xác Nhận</label>
                    <select className="w-full border-b-2 py-3 outline-none focus:border-black transition-colors bg-transparent appearance-none" style={{ borderColor: `${mainColor}30` }}>
                      <option>Sẽ tham dự</option>
                      <option>Không thể tham dự</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-70">Lời Chúc</label>
                  <textarea rows="3" className="w-full border-b-2 py-3 outline-none focus:border-black transition-colors bg-transparent resize-none" style={{ borderColor: `${mainColor}30` }}></textarea>
                </div>
                <button type="button" className="w-full py-5 text-white font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-2 hover:bg-black/80 transition-colors mt-8" style={{ backgroundColor: mainColor }}>
                  Gửi Phản Hồi <Send size={16} />
                </button>
              </form>
            </div>
          </section>
        </ScrollReveal>

        {/* Footer */}
        <footer className="py-16 text-center border-t border-black/10">
          <h2 className="text-2xl font-bold tracking-tighter">
            {groom_name} &amp; {bride_name}
          </h2>
          <p className="mt-4 text-[10px] opacity-40 uppercase tracking-[0.4em]">{dt.day}.{dt.month}.{dt.year}</p>
        </footer>
      </main>
    </div>
  );
};

export default ModernPhotoStoryTemplate;
