import { useEffect, useState, useRef } from 'react';
import { MapPin, Clock, Heart, Send, Gift, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const EmeraldModernTemplate = ({ weddingData }) => {
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

  const emerald = theme_config_json?.primary_color || '#065F46';
  const emeraldLight = theme_config_json?.secondary_color || '#ECFDF5';

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-[#065F46] selection:text-white" style={{ backgroundColor: emeraldLight, color: '#1e293b' }}>

      {/* Decorative backdrop shapes */}
      <div className="fixed top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: emerald }}></div>
      <div className="fixed bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: emerald }}></div>

      {/* Music */}
      {weddingData?.music_url && (
        <button onClick={toggleMusic} className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center border transition-transform hover:scale-110" style={{ borderColor: `${emerald}30` }}>
          {isPlaying ? <Volume2 size={18} style={{ color: emerald }} className="animate-pulse" /> : <VolumeX size={18} className="text-slate-400" />}
        </button>
      )}

      {/* ══ HERO ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 lg:p-12 gap-8 lg:gap-16 max-w-7xl mx-auto overflow-hidden">
        {/* Left: Text */}
        <div className={`relative z-10 w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left transition-all duration-1000 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.4em] mb-4 sm:mb-6" style={{ color: emerald }}>Trân Trọng Kính Mời</p>
          <h1 className="text-4xl sm:text-7xl lg:text-8xl font-light mb-6 leading-tight lg:leading-[0.9] tracking-tight px-4 lg:px-0" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
            {groom_name}
            <span className="block text-2xl sm:text-4xl italic font-light my-2 opacity-40">&amp;</span>
            {bride_name}
          </h1>
          <div className="w-16 h-1 mb-8 mx-auto lg:mx-0" style={{ backgroundColor: emerald }}></div>
          <p className="text-base sm:text-xl font-medium tracking-[0.2em] uppercase mb-1">{dt.day} . {dt.month} . {dt.year}</p>
          <p className="text-xs sm:text-sm italic opacity-60">{lunar_date_text}</p>
        </div>

        {/* Right: Cover */}
        <div className={`relative z-10 w-full lg:w-1/2 flex justify-center lg:justify-end transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl group">
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000 z-10"></div>
            <img src={cover} alt="Couple" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />

            {/* Emerald badge */}
            <motion.div 
              className="absolute top-6 right-6 w-16 h-16 rounded-full backdrop-blur-md bg-white/30 border border-white/50 flex flex-col items-center justify-center text-white z-20 shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' }}
            >
              <span className="text-xl font-bold leading-none">{dt.day}</span>
              <span className="text-[10px] uppercase font-bold tracking-widest">{dt.month}</span>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="relative z-10 bg-white/60 backdrop-blur-3xl rounded-t-[3rem] sm:rounded-t-[5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pt-10">

        {/* ══ INTRO ═══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-12 sm:py-16 px-6 text-center">
            <Heart size={28} className="mx-auto mb-8" style={{ color: emerald }} />
            <p className="max-w-3xl mx-auto text-xl sm:text-3xl leading-relaxed font-light italic" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
              "{intro_text}"
            </p>
          </section>
        </ScrollReveal>

        {/* ══ FAMILY ══════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-12 sm:py-16 px-6 sm:px-12 max-w-6xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-center mb-10" style={{ color: emerald }}>Hai Gia Đình</h2>
            <div className="grid md:grid-cols-2 gap-12 sm:gap-20">

              {/* Groom */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 group">
                <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden shadow-lg border-2" style={{ borderColor: `${emerald}20` }}>
                  <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Nhà Trai</h3>
                  <div className="text-sm space-y-1 mb-4 opacity-70">
                    <p>Ông: <strong className="font-semibold">{groom_father_name}</strong></p>
                    <p>Bà: <strong className="font-semibold">{groom_mother_name}</strong></p>
                  </div>
                  <h4 className="text-3xl font-bold" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: emerald }}>{groom_full_name}</h4>
                  <p className="text-[10px] uppercase tracking-widest mt-2 opacity-40 font-bold">Chú Rể</p>
                </div>
              </div>

              {/* Bride */}
              <div className="flex flex-col sm:flex-row-reverse items-center sm:items-start text-center sm:text-right gap-6 group">
                <div className="w-32 h-32 shrink-0 rounded-2xl overflow-hidden shadow-lg border-2" style={{ borderColor: `${emerald}20` }}>
                  <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest mb-4 opacity-50">Nhà Gái</h3>
                  <div className="text-sm space-y-1 mb-4 opacity-70">
                    <p>Ông: <strong className="font-semibold">{bride_father_name}</strong></p>
                    <p>Bà: <strong className="font-semibold">{bride_mother_name}</strong></p>
                  </div>
                  <h4 className="text-3xl font-bold" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: emerald }}>{bride_full_name}</h4>
                  <p className="text-[10px] uppercase tracking-widest mt-2 opacity-40 font-bold">Cô Dâu</p>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ══ LOVE STORY ══════════════════════════════════════ */}
        {love_story && (
          <ScrollReveal>
            <section className="py-12 sm:py-16 px-6 bg-white/50 border-y" style={{ borderColor: `${emerald}10` }}>
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/3">
                  <h2 className="text-4xl font-light leading-tight" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: emerald }}>Chuyện<br />Tình Yêu</h2>
                  <div className="w-12 h-1 mt-6" style={{ backgroundColor: emerald }}></div>
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-lg leading-loose opacity-80">{love_story}</p>
                </div>
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ EVENTS ══════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-6 max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] mb-3" style={{ color: emerald }}>Lịch Trình</h2>
              <p className="text-sm italic opacity-60">{lunar_date_text}</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.1}>
                <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-lg shadow-emerald-900/5 hover:shadow-xl transition-shadow border" style={{ borderColor: `${emerald}10` }}>
                  <div className="w-14 h-14 rounded-2xl mb-8 flex items-center justify-center shadow-inner" style={{ backgroundColor: `${emerald}10`, color: emerald }}>
                    {event.event_type === 'ceremony' ? <Heart size={24} /> : <Gift size={24} />}
                  </div>

                  <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{event.title}</h3>

                  <div className="space-y-4 text-sm sm:text-base opacity-80 mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-8 flex justify-center"><Clock size={18} style={{ color: emerald }} /></div>
                      <div>
                        <strong className="text-slate-900">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</strong>
                        <span className="mx-2 opacity-40">|</span>
                        {new Date(event.event_time).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 flex justify-center mt-1"><MapPin size={18} style={{ color: emerald }} /></div>
                      <div>
                        <p className="font-bold text-slate-900">{event.venue_name}</p>
                        <p className="mt-1 leading-relaxed text-sm opacity-80">{event.address}</p>
                        {event.note && <p className="mt-2 text-xs italic opacity-60 border-l-2 pl-3" style={{ borderColor: emerald }}>{event.note}</p>}
                      </div>
                    </div>
                  </div>

                  <a href={event.map_url} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:-translate-y-1"
                    style={{ backgroundColor: emerald }}>
                    Chỉ Đường <ExternalLink size={16} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GALLERY ═════════════════════════════════════════ */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white/50 border-t" style={{ borderColor: `${emerald}10` }}>
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="text-4xl font-light" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: emerald }}>Khoảnh Khắc</h2>
            </div>
          </ScrollReveal>

          <div className="columns-2 md:columns-3 gap-4 space-y-4 max-w-7xl mx-auto">
            {gallery.map((photo, i) => (
              <ScrollReveal key={photo.id} delay={(i % 3) * 0.1}>
                <div className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm group">
                  <img src={photo.image_path} alt="" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ══ GIFTS ═══════════════════════════════════════════ */}
        {bankAccounts.length > 0 && (
          <ScrollReveal>
            <section className="py-12 sm:py-16 px-6 text-center border-t" style={{ borderColor: `${emerald}10` }}>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] mb-4" style={{ color: emerald }}>Gửi Tặng</h2>
              <p className="text-sm opacity-60 mb-8 italic">Sự hiện diện của quý khách là món quà vô giá.</p>
              <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
                {bankAccounts.map(b => <GiftEnvelope key={b.id} bank={b} primaryColor={emerald} />)}
              </div>
            </section>
          </ScrollReveal>
        )}

        {/* ══ RSVP ════════════════════════════════════════════ */}
        <ScrollReveal>
          <section className="py-12 sm:py-16 px-6">
            <div className="max-w-4xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row">
              <div className="w-full md:w-5/12 p-12 flex flex-col justify-center text-white" style={{ backgroundColor: emerald }}>
                <h2 className="text-4xl font-light mb-6" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>Phản Hồi<br />Tham Dự</h2>
                <p className="opacity-80 leading-relaxed text-sm">Vui lòng phản hồi trước 1 tuần để gia đình chúng tôi chuẩn bị đón tiếp quý khách được chu đáo nhất.</p>
              </div>

              <div className="w-full md:w-7/12 p-10 sm:p-12 bg-white">
                <form className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">Họ và Tên</label>
                    <input type="text" className="w-full border-b-2 py-2 outline-none focus:border-emerald-700 transition-colors bg-transparent placeholder:opacity-30" placeholder="Nhập tên..." />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">Xác Nhận</label>
                    <select className="w-full border-b-2 py-2 outline-none focus:border-emerald-700 transition-colors bg-transparent appearance-none">
                      <option>Sẽ tham dự</option>
                      <option>Rất tiếc không thể đến</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">Lời Chúc</label>
                    <textarea rows="2" className="w-full border-b-2 py-2 outline-none focus:border-emerald-700 transition-colors bg-transparent resize-none placeholder:opacity-30" placeholder="Viết lời chúc..."></textarea>
                  </div>
                  <button type="button" className="w-full py-4 rounded-xl font-bold text-white uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition hover:opacity-90 shadow-lg mt-8" style={{ backgroundColor: emerald }}>
                    Gửi Phản Hồi <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Footer */}
        <footer className="py-16 text-center border-t border-slate-200">
          <p className="text-xs font-bold uppercase tracking-[0.5em] mb-4 opacity-40">Trân Trọng Cảm Ơn</p>
          <h2 className="text-3xl font-light" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif', color: emerald }}>
            {groom_name} <span className="italic opacity-50 text-xl mx-2">&amp;</span> {bride_name}
          </h2>
          <p className="text-[10px] mt-6 opacity-30 uppercase tracking-[0.3em]">Made with ♥ by LoveKnot</p>
        </footer>
      </main>
    </div>
  );
};

export default EmeraldModernTemplate;
