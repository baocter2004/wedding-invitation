import { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, Heart, Send, Gift, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import { resolveGallery, resolveCover, formatDate, PORTRAITS, DECORATIVE } from '../../../assets/images';

// No continuous animations as per request
const LuxuryGoldTemplate = ({ weddingData }) => {
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

  const gold = theme_config_json?.primary_color || '#C8A951';
  const dark = theme_config_json?.secondary_color || '#0A0A0A';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <div className="min-h-screen font-serif antialiased overflow-x-hidden selection:text-black"
      style={{ backgroundColor: dark, color: '#f8fafc', selectionBackgroundColor: gold }}>

      {/* Music */}
      {weddingData?.music_url && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center border transition hover:scale-110"
          style={{ backgroundColor: `${dark}cc`, borderColor: `${gold}50`, backdropFilter: 'blur(8px)' }}>
          {isPlaying ? <Volume2 size={18} style={{ color: gold }} className="animate-pulse" /> : <VolumeX size={18} className="text-slate-500" />}
        </button>
      )}

      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">

        {/* ══ HERO ════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center py-20 px-4 border-x border-b overflow-hidden" style={{ borderColor: `${gold}20` }}>
          <div className={`w-full transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] mb-8 sm:mb-12 opacity-60" style={{ color: gold }}>Trân Trọng Kính Mời</p>

            <div className="relative w-full max-w-[280px] sm:max-w-xs aspect-[3/4] mx-auto mb-12 p-2 border" style={{ borderColor: `${gold}40` }}>
              <div className="w-full h-full overflow-hidden">
                <img src={cover} alt="Couple" className="w-full h-full object-cover transition-transform duration-[3000ms] hover:scale-110" />
              </div>
              {/* Corner Ornaments */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t border-l" style={{ borderColor: gold }} />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b border-r" style={{ borderColor: gold }} />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-light mb-6 tracking-wide leading-tight px-4" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: gold }}>
              {groom_name}
              <span className="block text-xl sm:text-2xl italic font-extralight my-3 sm:my-4 opacity-50">&amp;</span>
              {bride_name}
            </h1>

            <div className="flex items-center justify-center gap-4 mt-8 opacity-80">
              <div className="w-8 sm:w-12 h-px" style={{ backgroundColor: `${gold}50` }}></div>
              <p className="text-xs sm:text-sm tracking-[0.3em] uppercase">{dt.day} . {dt.month} . {dt.year}</p>
              <div className="w-8 sm:w-12 h-px" style={{ backgroundColor: `${gold}50` }}></div>
            </div>
            <p className="text-[10px] sm:text-xs italic mt-3 opacity-50 text-slate-400">{lunar_date_text}</p>
          </div>
        </section>

        {/* ══ INTRO ═══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-16 sm:py-20 text-center border-x" style={{ borderColor: `${gold}20` }}>
            <div className="max-w-2xl mx-auto px-4 sm:px-6">
              <Heart size={20} className="mx-auto mb-10 opacity-60" style={{ color: gold }} />
              <p className="text-base sm:text-lg md:text-xl leading-loose font-light italic text-slate-300">
                "{intro_text}"
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ DIVIDER ══════════════════════════════════════════ */}
        <div className="flex justify-center py-6 opacity-60 border-x" style={{ borderColor: `${gold}20` }}>
          <img src={DECORATIVE.goldOrnament} alt="divider" className="h-8 object-contain" />
        </div>

        {/* ══ FAMILY ══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-12 sm:py-16 border-x border-t" style={{ borderColor: `${gold}20` }}>
            <div className="text-center mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.5em] opacity-60" style={{ color: gold }}>Hai Gia Đình</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-16 sm:gap-20 px-4 sm:px-12">
              {/* Groom */}
              <div className="text-center group">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-8 transition-transform duration-700 group-hover:scale-105">
                  <div className="absolute inset-0 rounded-full border border-dashed animate-[spin_10s_linear_infinite]" style={{ borderColor: gold }} />
                  <div className="absolute inset-2 rounded-full overflow-hidden">
                    <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover opacity-90" />
                  </div>
                </div>
                <div className="space-y-1 mb-6 text-xs sm:text-sm text-slate-400">
                  <p>Ông: <span className="text-slate-200">{groom_father_name}</span></p>
                  <p>Bà: <span className="text-slate-200">{groom_mother_name}</span></p>
                </div>
                <div className="w-6 h-px mx-auto mb-6" style={{ backgroundColor: `${gold}50` }}></div>
                <h3 className="text-2xl sm:text-3xl font-light tracking-wide mb-2" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: gold }}>{groom_full_name}</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-40">Chú Rể</p>
              </div>
              {/* Bride */}
              <div className="text-center group">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto mb-8 transition-transform duration-700 group-hover:scale-105">
                  <div className="absolute inset-0 rounded-full border border-dashed animate-[spin_10s_linear_infinite_reverse]" style={{ borderColor: gold }} />
                  <div className="absolute inset-2 rounded-full overflow-hidden">
                    <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover opacity-90" />
                  </div>
                </div>
                <div className="space-y-1 mb-6 text-xs sm:text-sm text-slate-400">
                  <p>Ông: <span className="text-slate-200">{bride_father_name}</span></p>
                  <p>Bà: <span className="text-slate-200">{bride_mother_name}</span></p>
                </div>
                <div className="w-6 h-px mx-auto mb-6" style={{ backgroundColor: `${gold}50` }}></div>
                <h3 className="text-2xl sm:text-3xl font-light tracking-wide mb-2" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: gold }}>{bride_full_name}</h3>
                <p className="text-[10px] uppercase tracking-widest opacity-40">Cô Dâu</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <ScrollReveal>
            <section className="py-16 sm:py-12 px-6 text-center border-x border-t" style={{ borderColor: `${gold}20` }}>
              <h2 className="text-[10px] uppercase tracking-[0.5em] mb-10 opacity-60" style={{ color: gold }}>Chuyện Tình Yêu</h2>
              <p className="max-w-2xl mx-auto text-base sm:text-lg leading-loose font-light text-slate-300">
                {love_story}
              </p>
            </section>
          </ScrollReveal>
        )}

        {/* ══ DIVIDER ══════════════════════════════════════════ */}
        <div className="flex justify-center py-6 opacity-60 border-x" style={{ borderColor: `${gold}20` }}>
          <img src={DECORATIVE.goldOrnament} alt="divider" className="h-8 object-contain" />
        </div>

        {/* ══ EVENTS ══════════════════════════════════════════ */}
        <section className="py-16 sm:py-12 px-6 sm:px-12 border-x border-t" style={{ borderColor: `${gold}20` }}>
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.5em] mb-3 opacity-60" style={{ color: gold }}>Chương Trình</h2>
              <p className="text-sm italic opacity-50 text-slate-400">{lunar_date_text}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.1}>
                <div className="p-8 sm:p-10 border transition-colors hover:bg-white/[0.02]" style={{ borderColor: `${gold}30` }}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 flex items-center justify-center border rounded-full" style={{ borderColor: `${gold}40`, color: gold }}>
                      {event.event_type === 'ceremony' ? <Heart size={16} /> : <Gift size={16} />}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-light" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: gold }}>{event.title}</h3>
                    </div>
                  </div>

                  <div className="space-y-4 text-sm sm:text-base text-slate-300 font-light mb-8">
                    <div className="flex items-start gap-3">
                      <Clock size={16} className="mt-0.5 opacity-60 shrink-0" style={{ color: gold }} />
                      <div>
                        <p className="text-slate-100">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="text-sm opacity-60 mt-0.5">{new Date(event.event_time).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="mt-0.5 opacity-60 shrink-0" style={{ color: gold }} />
                      <div>
                        <p className="text-slate-100">{event.venue_name}</p>
                        <p className="opacity-60 text-sm mt-1">{event.address}</p>
                        {event.note && <p className="text-xs italic opacity-50 mt-2">{event.note}</p>}
                      </div>
                    </div>
                  </div>

                  <a href={event.map_url} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest transition-opacity hover:opacity-70 border-b pb-1"
                    style={{ color: gold, borderColor: `${gold}50` }}>
                    Xem Bản Đồ <ExternalLink size={12} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════ */}
        <section className="py-16 sm:py-20 border-x border-t" style={{ borderColor: `${gold}20` }}>
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-[10px] uppercase tracking-[0.5em] opacity-60" style={{ color: gold }}>Album Ảnh</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 px-1">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 3) * 0.08}>
                <div className="overflow-hidden group relative">
                  <div className="absolute inset-0 z-10 border transition-opacity duration-500 opacity-0 group-hover:opacity-100 m-2 pointer-events-none" style={{ borderColor: `${gold}50` }}></div>
                  <img src={photo.image_path} alt={photo.caption || ''} className="w-full aspect-square object-cover   transition-all duration-700 group-hover:scale-105" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <ScrollReveal>
            <section className="py-16 sm:py-12 px-6 text-center border-x border-t" style={{ borderColor: `${gold}20` }}>
              <h2 className="text-[10px] uppercase tracking-[0.5em] mb-4 opacity-60" style={{ color: gold }}>Hỷ Sự</h2>
              <p className="text-sm opacity-60 mb-10 italic font-light text-slate-300">Sự hiện diện của quý khách là món quà quý giá nhất.</p>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                {bankAccounts.map(b => <GiftEnvelope key={b.id} bank={b} primaryColor={dark} />)}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ RSVP ════════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-16 sm:py-12 px-6 border-x border-t" style={{ borderColor: `${gold}20` }}>
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-light mb-4 tracking-wide" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: gold }}>Tham Dự</h2>
              <p className="text-xs uppercase tracking-[0.2em] opacity-50 mb-12 text-slate-400">Vui lòng phản hồi</p>

              <form className="space-y-6 text-left">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60" style={{ color: gold }}>Họ và Tên</label>
                  <input type="text" className="w-full bg-transparent border-b px-2 py-3 outline-none transition-colors text-slate-200 placeholder:text-slate-600 focus:border-current" style={{ borderColor: `${gold}40` }} placeholder="Nhập tên..." />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60" style={{ color: gold }}>Xác Nhận</label>
                  <select className="w-full bg-transparent border-b px-2 py-3 outline-none transition-colors text-slate-200 appearance-none focus:border-current" style={{ borderColor: `${gold}40` }}>
                    <option className="bg-slate-900">Sẽ tham dự</option>
                    <option className="bg-slate-900">Rất tiếc không thể đến</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] mb-2 opacity-60" style={{ color: gold }}>Lời Chúc</label>
                  <textarea rows="3" className="w-full bg-transparent border-b px-2 py-3 outline-none transition-colors text-slate-200 resize-none placeholder:text-slate-600 focus:border-current" style={{ borderColor: `${gold}40` }} placeholder="Gửi lời chúc..."></textarea>
                </div>
                <button type="button" className="w-full py-5 text-black font-bold transition-opacity hover:opacity-90 flex items-center justify-center gap-2 uppercase tracking-[0.3em] text-[10px] mt-8" style={{ backgroundColor: gold }}>
                  Gửi Phản Hồi <Send size={14} />
                </button>
              </form>
            </div>
          </section>
        </ScrollReveal>

        {/* Footer */}
        <footer className="py-16 text-center border" style={{ borderColor: `${gold}20` }}>
          <p className="text-2xl font-light tracking-wide" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: gold }}>
            {groom_name} <span className="italic opacity-50 mx-1">&amp;</span> {bride_name}
          </p>
          <p className="mt-4 text-[9px] opacity-40 tracking-[0.4em] uppercase text-slate-400">{dt.day}.{dt.month}.{dt.year}</p>
        </footer>
      </main>
    </div>
  );
};

export default LuxuryGoldTemplate;
