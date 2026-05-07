import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Heart, Send, Gift, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import { resolveGallery, resolveCover, formatDate, PORTRAITS, DECORATIVE } from '../../../assets/images';

const FloralPastelTemplate = ({ weddingData }) => {
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

  const rose = theme_config_json?.primary_color || '#C9748F';
  const bg = theme_config_json?.secondary_color || '#FFF8F9';
  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden selection:bg-rose-300 selection:text-white" style={{ backgroundColor: bg, color: '#2d2d2d' }}>

      {/* Ambient blobs */}
      <div className="fixed top-0 left-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none z-0 opacity-40" style={{ backgroundColor: rose }} />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-[140px] pointer-events-none z-0 opacity-30" style={{ backgroundColor: rose }} />

      {/* Music button */}
      {weddingData?.music_url && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center transition-transform hover:scale-110" style={{ borderColor: `${rose}30` }}>
          {isPlaying ? <Volume2 size={18} style={{ color: rose }} className="animate-pulse" /> : <VolumeX size={18} className="text-slate-400" />}
        </button>
      )}

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Arched image container */}
        <div className={`relative z-10 w-full max-w-sm mx-auto mb-12 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="aspect-[3/4] rounded-t-full overflow-hidden shadow-2xl shadow-rose-900/10 border-8 border-white">
            <img src={cover} alt="Wedding" className="w-full h-full object-cover" />
          </div>
          {/* Decorative floating flowers could go here */}
        </div>

        <div className={`relative z-10 flex flex-col items-center transition-all duration-1000 delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-xs uppercase tracking-[0.4em] mb-6 opacity-60" style={{ color: rose }}>Trân trọng kính mời</p>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.1] mb-6" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>
            {bride_name}
            <span className="inline-block text-3xl italic font-light mx-4 opacity-50" style={{ color: rose }}>&amp;</span>
            {groom_name}
          </h1>

          <div className="flex items-center gap-4 mt-2">
            <div className="w-10 h-px" style={{ backgroundColor: `${rose}40` }} />
            <p className="text-lg opacity-80" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>{dt.full}</p>
            <div className="w-10 h-px" style={{ backgroundColor: `${rose}40` }} />
          </div>
          <p className="text-xs opacity-50 italic mt-3 text-slate-500">{lunar_date_text}</p>
        </div>

        {/* Scroll pulse */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1, duration: 1 }}>
          <div className="w-px h-10" style={{ backgroundColor: `${rose}40` }} />
        </motion.div>
      </section>

      {/* ══ INTRO ═════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 px-6">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 sm:p-14 shadow-sm border" style={{ borderColor: `${rose}15` }}>
            <Heart size={28} className="mx-auto mb-8" style={{ color: rose }} />
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>Lời Ngỏ</h2>
            <p className="text-base sm:text-lg text-slate-500 leading-loose text-center italic">"{intro_text}"</p>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ FAMILY ════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-12 sm:py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 sm:gap-6">
            {/* Bride */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border" style={{ borderColor: `${rose}15` }}>
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 ring-4" style={{ ringColor: `${rose}20` }}>
                <img src={PORTRAITS.bride} alt="Cô dâu" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <span className="inline-block text-[10px] uppercase tracking-[0.4em] px-3 py-1 rounded-full mb-4 font-semibold" style={{ backgroundColor: `${rose}15`, color: rose }}>Nhà Gái</span>
                <div className="text-sm text-slate-400 space-y-0.5 mb-5">
                  <p>Ông: <span className="text-slate-600 font-medium">{bride_father_name}</span></p>
                  <p>Bà: <span className="text-slate-600 font-medium">{bride_mother_name}</span></p>
                </div>
                <div className="w-8 h-px mx-auto mb-4" style={{ backgroundColor: rose }} />
                <h3 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: '"Playfair Display", serif', color: rose }}>{bride_full_name}</h3>
                <p className="text-xs uppercase tracking-widest text-slate-300 mt-2">Cô Dâu</p>
              </div>
            </div>
            {/* Groom */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border" style={{ borderColor: `${rose}15` }}>
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 ring-4" style={{ ringColor: `${rose}20` }}>
                <img src={PORTRAITS.groom} alt="Chú rể" className="w-full h-full object-cover" />
              </div>
              <div className="text-center">
                <span className="inline-block text-[10px] uppercase tracking-[0.4em] px-3 py-1 rounded-full mb-4 font-semibold" style={{ backgroundColor: `${rose}15`, color: rose }}>Nhà Trai</span>
                <div className="text-sm text-slate-400 space-y-0.5 mb-5">
                  <p>Ông: <span className="text-slate-600 font-medium">{groom_father_name}</span></p>
                  <p>Bà: <span className="text-slate-600 font-medium">{groom_mother_name}</span></p>
                </div>
                <div className="w-8 h-px mx-auto mb-4" style={{ backgroundColor: rose }} />
                <h3 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: '"Playfair Display", serif', color: rose }}>{groom_full_name}</h3>
                <p className="text-xs uppercase tracking-widest text-slate-300 mt-2">Chú Rể</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ LOVE STORY ════════════════════════════════════════ */}
      {love_story && (
        <ScrollReveal>
          <section className="py-12 px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>Chuyện Tình Yêu</h2>
              <div className="w-10 h-0.5 mx-auto mb-8" style={{ backgroundColor: rose }} />
              <p className="text-base sm:text-lg text-slate-700 leading-loose">{love_story}</p>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ══ EVENTS ════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: `${rose}08` }}>
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>Lịch Trình</h2>
              <p className="text-sm italic text-slate-600 font-medium">{lunar_date_text}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {events.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.12}>
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border h-full flex flex-col" style={{ borderColor: `${rose}15` }}>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${rose}15` }}>
                    {event.event_type === 'ceremony'
                      ? <Heart size={22} style={{ color: rose }} />
                      : <Gift size={22} style={{ color: rose }} />
                    }
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold mb-5" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>{event.title}</h3>

                  <div className="space-y-4 flex-1 text-slate-600 text-sm sm:text-base font-medium">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="shrink-0" style={{ color: rose }} />
                      <span>
                        <strong className="text-slate-700">
                          {new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</strong>
                        {' — '}
                        {new Date(event.event_time).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: rose }} />
                      <div>
                        <p className="font-semibold text-slate-700">{event.venue_name}</p>
                        <p className="text-slate-600 text-sm mt-0.5">{event.address}</p>
                        {event.note && <p className="text-xs italic text-slate-500 mt-1">{event.note}</p>}
                      </div>
                    </div>
                  </div>

                  <a href={event.map_url} target="_blank" rel="noreferrer"
                    className="mt-8 flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 hover:-translate-y-0.5"
                    style={{ backgroundColor: rose, color: 'white' }}>
                    Xem Bản Đồ <ExternalLink size={15} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═══════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>Album Ảnh</h2>
        </ScrollReveal>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-3">
          {gallery.map((photo, i) => (
            <ScrollReveal key={photo.id} delay={i * 0.07}>
              <div className={`rounded-2xl sm:rounded-3xl overflow-hidden group ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={photo.image_path} alt={photo.caption || ''} className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ GIFTS ═════════════════════════════════════════════ */}
      {bankAccounts.length > 0 && (
        <ScrollReveal>
          <section className="py-12 sm:py-16 px-6 text-center" style={{ backgroundColor: `${rose}08` }}>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>Hộp Mừng Cưới</h2>
            <p className="text-slate-600 font-medium text-sm mb-8 max-w-sm mx-auto">Sự hiện diện của quý vị là món quà quý nhất với chúng tôi.</p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {bankAccounts.map(bank => <GiftEnvelope key={bank.id} bank={bank} primaryColor={rose} />)}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ══ RSVP ══════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden">
            <div className="p-10 sm:p-16 text-white" style={{ backgroundColor: rose }}>
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
                {/* Left */}
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>Bạn sẽ<br />đến chứ?</h2>
                  <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                    Vui lòng xác nhận để gia đình chúng tôi có thể chuẩn bị đón tiếp quý vị chu đáo nhất.
                  </p>
                </div>
                {/* Right: form */}
                <form className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Họ và Tên</label>
                    <input type="text" className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:bg-white/25 transition" placeholder="Nhập tên của bạn..." />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Điện thoại</label>
                    <input type="tel" className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:bg-white/25 transition" placeholder="09..." />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Tham dự</label>
                    <select className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white outline-none focus:bg-white/25 transition appearance-none">
                      <option className="bg-rose-700">Chắc chắn sẽ đến</option>
                      <option className="bg-rose-700">Rất tiếc không thể đến</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">Lời chúc</label>
                    <textarea rows="2" className="w-full bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:bg-white/25 transition resize-none" placeholder="Gửi lời chúc..."></textarea>
                  </div>
                  <button type="button" className="w-full py-4 bg-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/90 transition" style={{ color: rose }}>
                    Gửi Phản Hồi <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="py-14 text-center border-t" style={{ borderColor: `${rose}15` }}>
        <Heart size={20} className="mx-auto mb-4 opacity-30" style={{ color: rose }} />
        <p className="font-bold text-lg" style={{ fontFamily: '"Playfair Display", serif', color: '#1a1a1a' }}>{groom_name} & {bride_name}</p>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-300 mt-2">{dt.day}.{dt.month}.{dt.year}</p>
      </footer>
    </div>
  );
};

export default FloralPastelTemplate;
