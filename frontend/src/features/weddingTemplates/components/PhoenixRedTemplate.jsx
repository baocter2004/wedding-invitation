import { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, Heart, Send, Gift, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const PhoenixRedTemplate = ({ weddingData }) => {
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

  const crimson = theme_config_json?.primary_color || '#881337'; // Deep Rose 900
  const gold = theme_config_json?.secondary_color || '#FBBF24'; // Amber 400
  const bg = '#FCF8F5';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <div className="min-h-screen font-serif antialiased selection:bg-[#881337] selection:text-[#FBBF24]" style={{ backgroundColor: bg, color: crimson }}>

      {/* Music */}
      {weddingData?.music_url && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition hover:scale-110 border-2"
          style={{ backgroundColor: bg, borderColor: crimson }}>
          {isPlaying ? <Volume2 size={18} style={{ color: crimson }} className="animate-pulse" /> : <VolumeX size={18} className="text-slate-400" />}
        </button>
      )}

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center" style={{ backgroundColor: crimson, color: gold }}>
        {/* Ornate corner borders */}
        <div className="absolute top-6 left-6 w-24 h-24 border-t-4 border-l-4 opacity-50" style={{ borderColor: gold }}></div>
        <div className="absolute top-6 right-6 w-24 h-24 border-t-4 border-r-4 opacity-50" style={{ borderColor: gold }}></div>
        <div className="absolute bottom-6 left-6 w-24 h-24 border-b-4 border-l-4 opacity-50" style={{ borderColor: gold }}></div>
        <div className="absolute bottom-6 right-6 w-24 h-24 border-b-4 border-r-4 opacity-50" style={{ borderColor: gold }}></div>

        <div className={`relative z-10 transition-all duration-1000 w-full max-w-xl mx-auto ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-10 mx-auto w-16 h-16 rounded-full border-2 flex items-center justify-center" style={{ borderColor: gold }}>
            <span className="text-2xl font-bold leading-none">囍</span>
          </div>

          <div className="aspect-[4/5] mx-auto mb-12 p-2 border-2" style={{ borderColor: gold }}>
            <div className="w-full h-full overflow-hidden bg-black/20">
              <img src={cover} alt="Couple" className="w-full h-full object-cover" />
            </div>
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
            {groom_name}
            <span className="block text-xl italic font-light my-4 opacity-70 text-white">&amp;</span>
            {bride_name}
          </h1>

          <div className="flex items-center justify-center gap-6 mt-10">
            <div className="w-16 h-px" style={{ backgroundColor: gold }}></div>
            <p className="text-sm uppercase tracking-[0.4em] font-bold text-white">{dt.day} . {dt.month} . {dt.year}</p>
            <div className="w-16 h-px" style={{ backgroundColor: gold }}></div>
          </div>
          <p className="mt-4 text-sm italic opacity-80">{lunar_date_text}</p>
        </div>
      </section>

      {/* ══ INTRO ═══════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-16 sm:py-12 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <Heart size={24} className="mx-auto mb-10 opacity-50" />
            <p className="text-lg sm:text-2xl leading-loose italic font-medium">
              "{intro_text}"
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ FAMILY ══════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-12 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-widest mb-4">Hai Gia Đình</h2>
            <div className="w-12 h-1 mx-auto" style={{ backgroundColor: crimson }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Groom */}
            <div className="bg-white p-10 sm:p-12 shadow-xl text-center border-t-8" style={{ borderColor: crimson }}>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] opacity-50 mb-8">Nhà Trai</h3>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 mb-8" style={{ borderColor: gold }}>
                <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 mb-8 font-medium">
                <p>Ông: <span className="text-slate-800">{groom_father_name}</span></p>
                <p>Bà: <span className="text-slate-800">{groom_mother_name}</span></p>
              </div>
              <div className="w-20 h-px mx-auto mb-6 opacity-20" style={{ backgroundColor: crimson }}></div>
              <h4 className="text-3xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>{groom_full_name}</h4>
              <p className="text-xs uppercase tracking-widest mt-2 opacity-60">Chú Rể</p>
            </div>

            {/* Bride */}
            <div className="bg-white p-10 sm:p-12 shadow-xl text-center border-t-8" style={{ borderColor: crimson }}>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] opacity-50 mb-8">Nhà Gái</h3>
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 mb-8" style={{ borderColor: gold }}>
                <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 mb-8 font-medium">
                <p>Ông: <span className="text-slate-800">{bride_father_name}</span></p>
                <p>Bà: <span className="text-slate-800">{bride_mother_name}</span></p>
              </div>
              <div className="w-20 h-px mx-auto mb-6 opacity-20" style={{ backgroundColor: crimson }}></div>
              <h4 className="text-3xl font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>{bride_full_name}</h4>
              <p className="text-xs uppercase tracking-widest mt-2 opacity-60">Cô Dâu</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ LOVE STORY ══════════════════════════════════════ */}
      {love_story && (
        <ScrollReveal>
          <section className="py-16 sm:py-12 px-6">
            <div className="max-w-3xl mx-auto text-center border-4 p-8 sm:p-16" style={{ borderColor: crimson }}>
              <h2 className="text-3xl font-bold uppercase tracking-widest mb-6">Chuyện Tình Yêu</h2>
              <div className="w-12 h-1 mx-auto mb-10" style={{ backgroundColor: crimson }}></div>
              <p className="text-lg leading-loose font-medium italic opacity-90">{love_story}</p>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ══ EVENTS ══════════════════════════════════════════ */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-widest mb-4">Lịch Trình</h2>
            <div className="w-12 h-1 mx-auto mb-4" style={{ backgroundColor: crimson }}></div>
            <p className="text-sm italic opacity-60 font-bold">{lunar_date_text}</p>
          </div>
        </ScrollReveal>

        <div className="space-y-8">
          {events.map((event, idx) => (
            <ScrollReveal key={event.id} delay={idx * 0.1}>
              <div className="flex flex-col sm:flex-row bg-white shadow-xl">
                <div className="sm:w-1/3 p-8 flex flex-col items-center justify-center text-center text-white" style={{ backgroundColor: crimson }}>
                  {event.event_type === 'ceremony' ? <Heart size={32} className="mb-4" style={{ color: gold }} /> : <Gift size={32} className="mb-4" style={{ color: gold }} />}
                  <h3 className="text-2xl font-bold uppercase tracking-wider mb-2">{event.title}</h3>
                  <p className="text-xs uppercase tracking-widest opacity-70">{event.event_type === 'ceremony' ? 'Lễ Cưới' : 'Tiệc Cưới'}</p>
                </div>
                
                <div className="sm:w-2/3 p-8 sm:p-10 flex flex-col justify-center text-slate-800 font-medium">
                  <div className="space-y-5 mb-8">
                    <div className="flex items-center gap-4">
                      <Clock size={20} style={{ color: crimson }} />
                      <p className="text-lg">
                        <strong style={{ color: crimson }}>{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</strong>
                        <span className="mx-2 opacity-30">|</span>
                        {new Date(event.event_time).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin size={20} className="shrink-0 mt-1" style={{ color: crimson }} />
                      <div>
                        <p className="text-lg font-bold">{event.venue_name}</p>
                        <p className="opacity-80 mt-1">{event.address}</p>
                        {event.note && <p className="text-sm italic opacity-60 mt-2 p-2 bg-slate-50 border-l-2" style={{ borderColor: crimson }}>{event.note}</p>}
                      </div>
                    </div>
                  </div>

                  <a href={event.map_url} target="_blank" rel="noreferrer"
                    className="self-start inline-flex items-center gap-2 px-6 py-3 font-bold uppercase tracking-widest text-sm text-white transition-opacity hover:opacity-80"
                    style={{ backgroundColor: crimson }}>
                    Bản Đồ <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ GALLERY ═════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white border-y" style={{ borderColor: `${crimson}20` }}>
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-widest mb-4">Album Ảnh</h2>
            <div className="w-12 h-1 mx-auto" style={{ backgroundColor: crimson }}></div>
          </div>
        </ScrollReveal>
        
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((photo, i) => (
            <ScrollReveal key={photo.id} delay={(i % 3) * 0.1}>
              <div className="overflow-hidden shadow-md group border-4" style={{ borderColor: bg }}>
                <img src={photo.image_path} alt={photo.caption || ''} className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-1000" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ GIFTS ═══════════════════════════════════════════ */}
      {bankAccounts.length > 0 && (
        <ScrollReveal>
          <section className="py-16 sm:py-12 px-6 text-center">
            <h2 className="text-3xl font-bold uppercase tracking-widest mb-4">Hộp Mừng Cưới</h2>
            <div className="w-12 h-1 mx-auto mb-10" style={{ backgroundColor: crimson }}></div>
            <p className="text-base opacity-80 mb-10 italic font-medium">Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.</p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {bankAccounts.map(b => <GiftEnvelope key={b.id} bank={b} primaryColor={crimson} />)}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ══ RSVP ════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-16 px-6 text-white" style={{ backgroundColor: crimson }}>
          <div className="max-w-lg mx-auto text-center">
            <span className="inline-block w-12 h-12 rounded-full border-2 mb-8 flex items-center justify-center mx-auto" style={{ borderColor: gold, color: gold }}>
              <Heart size={20} />
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold uppercase tracking-widest mb-12">Gửi Lời Chúc</h2>
            
            <form className="space-y-6 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: gold }}>Họ và Tên</label>
                <input type="text" className="w-full bg-black/20 border-b-2 px-4 py-4 outline-none focus:border-white transition-colors text-white placeholder:text-white/40" style={{ borderColor: `${gold}50` }} placeholder="Nhập tên..." />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: gold }}>Xác Nhận</label>
                <select className="w-full bg-black/20 border-b-2 px-4 py-4 outline-none focus:border-white transition-colors text-white appearance-none" style={{ borderColor: `${gold}50` }}>
                  <option className="bg-red-900">Sẽ tham dự</option>
                  <option className="bg-red-900">Rất tiếc không thể đến</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: gold }}>Lời Chúc</label>
                <textarea rows="3" className="w-full bg-black/20 border-b-2 px-4 py-4 outline-none focus:border-white transition-colors text-white resize-none placeholder:text-white/40" style={{ borderColor: `${gold}50` }} placeholder="Viết lời chúc..."></textarea>
              </div>
              <button type="button" className="w-full py-5 font-bold uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-2 transition hover:opacity-90 mt-8 text-black" style={{ backgroundColor: gold }}>
                Gửi Phản Hồi <Send size={16} />
              </button>
            </form>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="py-16 text-center bg-white border-t-8" style={{ borderColor: crimson }}>
        <h2 className="text-3xl font-bold tracking-wide" style={{ fontFamily: '"Playfair Display", serif' }}>
          {groom_name} <span className="italic opacity-50 mx-2">&amp;</span> {bride_name}
        </h2>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.4em] opacity-50">{dt.day}.{dt.month}.{dt.year}</p>
      </footer>
    </div>
  );
};

export default PhoenixRedTemplate;
