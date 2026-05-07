import { useEffect, useRef, useState } from 'react';
import { MapPin, Clock, Heart, Send, Gift, ExternalLink, Volume2, VolumeX } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import { resolveGallery, resolveCover, formatDate } from '../../../assets/images';

const TraditionalRedTemplate = ({ weddingData }) => {
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

  const red = theme_config_json?.primary_color || '#B91C1C';
  const cream = theme_config_json?.secondary_color || '#FFF8EE';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  // Pre-computed rotations (no Math.random in render)
  const ROTATIONS = [-1.5, 1.2, -0.8, 1.8, -1.1, 0.9];

  return (
    <div className="min-h-screen font-serif antialiased overflow-x-hidden selection:bg-red-800 selection:text-yellow-100"
      style={{ backgroundColor: cream, color: '#450a0a' }}>

      {/* Fixed corner borders */}
      <div className="fixed top-4 left-4 w-14 h-14 border-t-2 border-l-2 pointer-events-none z-10 opacity-40" style={{ borderColor: red }} />
      <div className="fixed top-4 right-4 w-14 h-14 border-t-2 border-r-2 pointer-events-none z-10 opacity-40" style={{ borderColor: red }} />
      <div className="fixed bottom-4 left-4 w-14 h-14 border-b-2 border-l-2 pointer-events-none z-10 opacity-40" style={{ borderColor: red }} />
      <div className="fixed bottom-4 right-4 w-14 h-14 border-b-2 border-r-2 pointer-events-none z-10 opacity-40" style={{ borderColor: red }} />

      {/* Music */}
      {weddingData?.music_url && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-2"
          style={{ backgroundColor: red, borderColor: cream, color: cream }}>
          {isPlaying ? <Volume2 size={18} className="animate-pulse" /> : <VolumeX size={18} />}
        </button>
      )}

      <main className="relative z-0 max-w-4xl mx-auto">

        {/* ══ HERO ════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden" style={{ backgroundColor: red }}>
          {/* Decorative frame */}
          <div className="absolute inset-4 border-2 pointer-events-none z-0 opacity-20" style={{ borderColor: cream }}></div>
          <div className="absolute inset-6 border border-dashed pointer-events-none z-0 opacity-10" style={{ borderColor: cream }}></div>

          <div className={`relative z-10 w-full max-w-[280px] sm:max-w-sm mx-auto mb-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="aspect-[3/4] p-2 border-2 mx-auto relative group" style={{ borderColor: cream }}>
              <div className="w-full h-full overflow-hidden relative">
                <img src={cover} alt="Couple" className="w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110" />
              </div>
              {/* Corner Accents */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4" style={{ borderColor: cream }} />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4" style={{ borderColor: cream }} />
            </div>

            {/* Double Happiness Badge */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-4 z-20 shadow-xl"
              style={{ backgroundColor: red, borderColor: cream }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
            >
              <span className="text-3xl sm:text-4xl font-bold leading-none" style={{ color: cream }}>囍</span>
            </motion.div>
          </div>

          <div className={`relative z-10 text-center transition-all duration-[1200ms] delay-300 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-xs sm:text-sm uppercase tracking-[0.4em] mb-6 font-medium" style={{ color: cream }}>Trân Trọng Kính Mời</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight px-4" style={{ color: cream, fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
              {groom_name}
              <span className="block text-xl sm:text-2xl italic font-light my-2 opacity-60">&amp;</span>
              {bride_name}
            </h1>
            <div className="flex items-center justify-center gap-4 mb-3" style={{ color: cream }}>
              <div className="w-8 sm:w-12 h-px bg-current opacity-40"></div>
              <p className="text-base sm:text-xl tracking-widest uppercase font-light">{dt.day} . {dt.month} . {dt.year}</p>
              <div className="w-8 sm:w-12 h-px bg-current opacity-40"></div>
            </div>
            <p className="text-xs sm:text-sm italic opacity-60 tracking-wider" style={{ color: cream }}>{lunar_date_text}</p>
          </div>
        </section>

        {/* ══ INTRO ═══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-24 px-8 text-center" style={{ backgroundColor: cream }}>
            <div className="w-12 h-1 mx-auto mb-10" style={{ backgroundColor: red }}></div>
            <p className="max-w-2xl mx-auto text-xl leading-loose font-medium" style={{ color: '#7f1d1d' }}>
              "{intro_text}"
            </p>
            <div className="w-12 h-1 mx-auto mt-10" style={{ backgroundColor: red }}></div>
          </section>
        </ScrollReveal>

        {/* ══ FAMILY ══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-14 sm:py-12 px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 uppercase tracking-widest" style={{ color: red }}>
              Hai Gia Đình
            </h2>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
              {/* Groom's family */}
              <div className="rounded-3xl p-8 sm:p-10 text-center border-2" style={{ borderColor: `${red}20`, backgroundColor: 'white' }}>
                <p className="text-[10px] uppercase tracking-[0.4em] mb-5 font-bold" style={{ color: red }}>Nhà Trai</p>
                <div className="space-y-1 text-sm mb-6" style={{ color: '#7f1d1d' }}>
                  <p>Ông: <strong>{groom_father_name}</strong></p>
                  <p>Bà: <strong>{groom_mother_name}</strong></p>
                </div>
                <div className="w-10 h-0.5 mx-auto mb-5" style={{ backgroundColor: red }} />
                <h3 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: red }}>{groom_full_name}</h3>
                <p className="text-xs uppercase tracking-widest mt-2 opacity-40">Chú Rể</p>
              </div>
              {/* Bride's family */}
              <div className="rounded-3xl p-8 sm:p-10 text-center border-2" style={{ borderColor: `${red}20`, backgroundColor: 'white' }}>
                <p className="text-[10px] uppercase tracking-[0.4em] mb-5 font-bold" style={{ color: red }}>Nhà Gái</p>
                <div className="space-y-1 text-sm mb-6" style={{ color: '#7f1d1d' }}>
                  <p>Ông: <strong>{bride_father_name}</strong></p>
                  <p>Bà: <strong>{bride_mother_name}</strong></p>
                </div>
                <div className="w-10 h-0.5 mx-auto mb-5" style={{ backgroundColor: red }} />
                <h3 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: red }}>{bride_full_name}</h3>
                <p className="text-xs uppercase tracking-widest mt-2 opacity-40">Cô Dâu</p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <ScrollReveal>
            <section className="py-14 sm:py-20 px-8">
              <div className="max-w-xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest" style={{ color: red }}>Chuyện Tình Yêu</h2>
                <div className="w-10 h-0.5 mx-auto mb-8" style={{ backgroundColor: `${red}40` }} />
                <p className="text-base sm:text-lg leading-loose italic" style={{ color: '#7f1d1d' }}>{love_story}</p>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ EVENTS ══════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest mb-2" style={{ color: red }}>Chương Trình</h2>
              <div className="w-14 h-0.5 mx-auto mb-3" style={{ backgroundColor: `${red}40` }} />
              <p className="text-sm italic opacity-50">{lunar_date_text}</p>
            </div>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto space-y-6">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.12}>
                <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 shadow-sm relative overflow-hidden" style={{ borderColor: `${red}20` }}>
                  {/* Accent top bar */}
                  <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: red }} />

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${red}10` }}>
                      {idx === 0 ? <Heart size={22} style={{ color: red }} /> : <Gift size={22} style={{ color: red }} />}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold" style={{ color: red, fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{event.title}</h3>
                      <p className="text-xs uppercase tracking-widest opacity-40 mt-0.5">{event.event_type === 'ceremony' ? 'Lễ Cưới' : 'Tiệc Cưới'}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm sm:text-base mb-6" style={{ color: '#7f1d1d' }}>
                    <div className="flex items-center gap-3">
                      <Clock size={15} className="shrink-0 opacity-50" />
                      <span><strong>{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</strong> — {new Date(event.event_time).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={15} className="shrink-0 opacity-50 mt-0.5" />
                      <div>
                        <p className="font-bold">{event.venue_name}</p>
                        <p className="opacity-60 text-sm">{event.address}</p>
                        {event.note && <p className="text-xs italic opacity-40 mt-1">{event.note}</p>}
                      </div>
                    </div>
                  </div>

                  <a href={event.map_url} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-opacity hover:opacity-80"
                    style={{ backgroundColor: red, color: cream }}>
                    Xem Bản Đồ <ExternalLink size={14} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════ */}
        <section className="py-14 sm:py-20 px-4 sm:px-6">
          <ScrollReveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-center uppercase tracking-widest mb-12" style={{ color: red }}>Kỷ Niệm</h2>
          </ScrollReveal>
          {/* Grid layout — no random rotation to avoid SSR bugs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 max-w-4xl mx-auto p-4 sm:p-6 rounded-3xl" style={{ backgroundColor: red }}>
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={i * 0.07}>
                <div className="overflow-hidden rounded-xl group" style={{ transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}>
                  <img src={photo.image_path} alt={photo.caption || ''}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <ScrollReveal>
            <section className="py-14 sm:py-12 px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest mb-4" style={{ color: red }}>Hỷ Sự</h2>
              <p className="text-sm italic mb-8 opacity-60" style={{ color: '#7f1d1d' }}>
                Sự hiện diện của quý khách là món quà quý giá nhất. Nếu muốn gửi thiệp hồng, xin dùng thông tin bên dưới.
              </p>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                {bankAccounts.map(b => <GiftEnvelope key={b.id} bank={b} primaryColor={red} />)}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ RSVP ════════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-14 sm:py-20 px-4 sm:px-6 mb-8">
            <div className="max-w-lg mx-auto rounded-3xl overflow-hidden border-2" style={{ borderColor: `${red}30` }}>
              <div className="p-8 sm:p-12" style={{ backgroundColor: red }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2 uppercase tracking-widest" style={{ color: cream, fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
                  Gửi Lời Chúc
                </h2>
                <p className="text-center text-sm mb-8 opacity-70" style={{ color: cream }}>
                  Vui lòng cho gia đình biết để chuẩn bị đón tiếp chu đáo nhất.
                </p>
                <form className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] mb-2 opacity-60" style={{ color: cream }}>Họ Tên Quý Khách</label>
                    <input type="text" className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white/20 border border-white/20 focus:bg-white/30 transition placeholder:text-white/40" style={{ color: cream }} placeholder="Nhập tên..." />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] mb-2 opacity-60" style={{ color: cream }}>Xác Nhận</label>
                    <select className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white/20 border border-white/20 appearance-none" style={{ color: cream }}>
                      <option className="bg-red-800">Sẽ tham dự</option>
                      <option className="bg-red-800">Rất tiếc không thể đến</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.4em] mb-2 opacity-60" style={{ color: cream }}>Lời Nhắn</label>
                    <textarea rows="3" className="w-full rounded-xl px-4 py-3 text-sm outline-none bg-white/20 border border-white/20 focus:bg-white/30 transition resize-none placeholder:text-white/40" style={{ color: cream }} placeholder="Viết lời chúc..."></textarea>
                  </div>
                  <button type="button" className="w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition hover:opacity-90"
                    style={{ backgroundColor: cream, color: red }}>
                    Gửi Phản Hồi <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Footer */}
        <footer className="py-14 text-center border-t-2" style={{ borderColor: `${red}15` }}>
          <span className="text-2xl font-bold" style={{ color: red }}>囍</span>
          <p className="mt-3 font-bold text-xl" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: red }}>{groom_name} & {bride_name}</p>
          <p className="text-xs uppercase tracking-widest mt-2 opacity-30" style={{ color: '#7f1d1d' }}>{dt.year} · LoveKnot</p>
        </footer>
      </main>
    </div>
  );
};

export default TraditionalRedTemplate;
