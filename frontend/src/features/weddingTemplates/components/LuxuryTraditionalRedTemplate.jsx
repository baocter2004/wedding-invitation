import { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, Heart, Send, Volume2, VolumeX, Calendar, Gift } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const LuxuryTraditionalRedTemplate = ({ weddingData }) => {
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

  const wineRed = theme_config_json?.primary_color || '#7F1D1D'; // Red 900
  const gold = theme_config_json?.secondary_color || '#D4AF37'; // Metallic Gold
  const cream = '#FDFBF7';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <div className="min-h-screen font-serif selection:bg-[#7F1D1D] selection:text-[#D4AF37]" style={{ backgroundColor: cream, color: wineRed }}>

      {/* Music Toggle */}
      {weddingData?.music_url && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-2xl flex items-center justify-center transition hover:scale-110 border"
          style={{ backgroundColor: wineRed, borderColor: gold }}>
          {isPlaying ? <Volume2 size={18} style={{ color: gold }} className="animate-pulse" /> : <VolumeX size={18} style={{ color: cream }} className="opacity-50" />}
        </button>
      )}

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center border-x-[16px] md:border-x-[32px] border-t-[16px] md:border-t-[32px]" style={{ borderColor: wineRed }}>

        {/* Inner Gold Frame */}
        <div className="absolute inset-4 md:inset-8 border-2 pointer-events-none" style={{ borderColor: gold, opacity: 0.3 }}></div>

        <div className={`relative z-10 w-full max-w-2xl mx-auto transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-8 w-20 h-20 mx-auto rounded-full border-2 flex items-center justify-center" style={{ borderColor: wineRed, backgroundColor: wineRed }}>
            <span className="text-3xl font-bold leading-none" style={{ color: gold }}>囍</span>
          </div>

          <p className="text-sm uppercase tracking-[0.4em] font-bold mb-12 opacity-80" style={{ color: wineRed }}>Lễ Thành Hôn</p>

          <h1 className="text-6xl sm:text-8xl font-bold mb-8 leading-[1.1]" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
            {groom_name}
            <span className="block text-2xl italic font-light my-4 opacity-70">&amp;</span>
            {bride_name}
          </h1>

          <div className="flex items-center justify-center gap-6 mt-12 mb-4">
            <div className="w-16 h-px" style={{ backgroundColor: wineRed, opacity: 0.3 }}></div>
            <p className="text-base uppercase tracking-[0.4em] font-bold">{dt.day} . {dt.month} . {dt.year}</p>
            <div className="w-16 h-px" style={{ backgroundColor: wineRed, opacity: 0.3 }}></div>
          </div>
          <p className="text-sm italic opacity-70">{lunar_date_text}</p>
        </div>
      </section>

      {/* ══ INTRO ═══════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-16 sm:py-12 px-6 border-x-[16px] md:border-x-[32px]" style={{ borderColor: wineRed }}>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl sm:text-3xl leading-loose font-medium italic opacity-90" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
              "{intro_text}"
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ FAMILY ══════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-16 px-6 border-x-[16px] md:border-x-[32px]" style={{ borderColor: wineRed }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Trân Trọng Kính Báo</h2>
              <div className="w-20 h-1 mx-auto" style={{ backgroundColor: gold }}></div>
            </div>

            <div className="grid md:grid-cols-2 gap-16 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x" style={{ borderColor: `${wineRed}20` }}>

              {/* Groom */}
              <div className="pt-8 md:pt-0">
                <h3 className="text-sm font-bold uppercase tracking-[0.4em] opacity-60 mb-10">Nhà Trai</h3>
                <div className="text-lg space-y-2 mb-10 font-medium">
                  <p>Ông: <span className="font-bold">{groom_father_name}</span></p>
                  <p>Bà: <span className="font-bold">{groom_mother_name}</span></p>
                </div>
                <h4 className="text-4xl font-bold mb-3" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{groom_full_name}</h4>
                <p className="text-xs uppercase tracking-widest opacity-60">Trưởng Nam</p>
              </div>

              {/* Bride */}
              <div className="pt-16 md:pt-0">
                <h3 className="text-sm font-bold uppercase tracking-[0.4em] opacity-60 mb-10">Nhà Gái</h3>
                <div className="text-lg space-y-2 mb-10 font-medium">
                  <p>Ông: <span className="font-bold">{bride_father_name}</span></p>
                  <p>Bà: <span className="font-bold">{bride_mother_name}</span></p>
                </div>
                <h4 className="text-4xl font-bold mb-3" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{bride_full_name}</h4>
                <p className="text-xs uppercase tracking-widest opacity-60">Út Nữ</p>
              </div>

            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ EVENTS ══════════════════════════════════════════ */}
      <section className="py-16 px-6 bg-white border-x-[16px] md:border-x-[32px]" style={{ borderColor: wineRed }}>
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Chương Trình Tổ Chức</h2>
              <div className="w-20 h-1 mx-auto mb-6" style={{ backgroundColor: gold }}></div>
              <p className="text-sm italic opacity-70 font-bold">{lunar_date_text}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.1}>
                <div className="h-full border-2 p-10 sm:p-12 text-center" style={{ borderColor: wineRed }}>
                  <div className="w-16 h-16 mx-auto rounded-full border-2 flex items-center justify-center mb-8" style={{ borderColor: gold, color: wineRed }}>
                    {event.event_type === 'ceremony' ? <Heart size={24} /> : <Gift size={24} />}
                  </div>

                  <h3 className="text-2xl font-bold uppercase tracking-wider mb-8">{event.title}</h3>

                  <div className="space-y-4 mb-10 font-medium">
                    <div className="flex items-center justify-center gap-3">
                      <Clock size={18} style={{ color: gold }} />
                      <p>
                        <strong className="text-xl">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</strong>
                        <span className="mx-2 opacity-50">|</span>
                        {new Date(event.event_time).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div className="flex items-start justify-center gap-3">
                      <MapPin size={18} className="mt-1 shrink-0" style={{ color: gold }} />
                      <div className="text-left">
                        <p className="font-bold text-lg">{event.venue_name}</p>
                        <p className="opacity-80 mt-1">{event.address}</p>
                        {event.note && <p className="text-sm italic opacity-60 mt-2">{event.note}</p>}
                      </div>
                    </div>
                  </div>

                  <a href={event.map_url} target="_blank" rel="noreferrer"
                    className="inline-block border py-3 px-8 font-bold uppercase tracking-widest text-sm transition-colors hover:text-white"
                    style={{ borderColor: wineRed, color: wineRed, '--tw-hover-bg': wineRed }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = wineRed}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  >
                    Xem Bản Đồ
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ═════════════════════════════════════════ */}
      <section className="py-24 px-4 border-x-[16px] md:border-x-[32px]" style={{ borderColor: wineRed }}>
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Album Ảnh</h2>
            <div className="w-20 h-1 mx-auto" style={{ backgroundColor: gold }}></div>
          </div>
        </ScrollReveal>

        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2">
          {gallery.map((photo, i) => (
            <ScrollReveal key={photo.id} delay={(i % 4) * 0.1}>
              <div className="aspect-[4/5] overflow-hidden group">
                <img src={photo.image_path} alt={photo.caption || ''} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 " />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ GIFTS ═══════════════════════════════════════════ */}
      {bankAccounts.length > 0 && (
        <ScrollReveal>
          <section className="py-16 px-6 text-center border-x-[16px] md:border-x-[32px]" style={{ borderColor: wineRed }}>
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Hỷ Sự</h2>
            <div className="w-20 h-1 mx-auto mb-10" style={{ backgroundColor: gold }}></div>
            <p className="text-lg opacity-90 mb-10 italic font-medium max-w-xl mx-auto">Sự hiện diện của quý khách là niềm vinh hạnh và món quà quý giá nhất đối với gia đình chúng tôi.</p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {bankAccounts.map(b => <GiftEnvelope key={b.id} bank={b} primaryColor={wineRed} />)}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ══ RSVP ════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-16 px-6 text-white border-[16px] md:border-[32px] border-t-0" style={{ backgroundColor: wineRed, borderColor: wineRed }}>
          <div className="max-w-2xl mx-auto text-center border-2 p-10 sm:p-16" style={{ borderColor: gold }}>
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-8">Hồi Đáp</h2>
            <p className="text-sm opacity-80 mb-12 font-medium">Kính mong quý khách xác nhận tham dự để gia đình chuẩn bị đón tiếp được chu đáo nhất.</p>

            <form className="space-y-6 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: gold }}>Họ và Tên</label>
                <input type="text" className="w-full bg-transparent border-b-2 px-2 py-4 outline-none focus:border-white transition-colors placeholder:text-white/30" style={{ borderColor: `${gold}50` }} placeholder="Nhập tên..." />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: gold }}>Xác Nhận</label>
                <select className="w-full bg-transparent border-b-2 px-2 py-4 outline-none focus:border-white transition-colors appearance-none" style={{ borderColor: `${gold}50` }}>
                  <option className="bg-red-900">Chắc chắn sẽ đến</option>
                  <option className="bg-red-900">Rất tiếc không thể đến</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: gold }}>Lời Chúc</label>
                <textarea rows="3" className="w-full bg-transparent border-b-2 px-2 py-4 outline-none focus:border-white transition-colors resize-none placeholder:text-white/30" style={{ borderColor: `${gold}50` }} placeholder="Viết lời chúc..."></textarea>
              </div>
              <button type="button" className="w-full py-5 font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-2 transition hover:bg-white hover:text-red-900 mt-10 border-2" style={{ borderColor: gold, color: gold }}>
                Gửi Phản Hồi <Send size={16} />
              </button>
            </form>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
};

export default LuxuryTraditionalRedTemplate;
