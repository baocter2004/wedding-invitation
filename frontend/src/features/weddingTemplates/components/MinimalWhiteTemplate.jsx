import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Send, ExternalLink } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import Countdown from '../shared/Countdown';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const MinimalWhiteTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const {
    bride_name = '', groom_name = '',
    bride_full_name = '', groom_full_name = '',
    bride_father_name = '', bride_mother_name = '',
    groom_father_name = '', groom_mother_name = '',
    wedding_date = '', lunar_date_text = '',
    intro_text = '', love_story = '',
    cover_image_path = '', music_url = '',
    events = [], photos = [], bankAccounts = [],
  } = weddingData || {};

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased overflow-x-hidden selection:bg-slate-900 selection:text-white">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-6">
        {/* Very clean editorial hero */}
        <div className={`transition-all duration-1000 w-full max-w-lg mx-auto flex flex-col items-center ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-[10px] uppercase tracking-[0.7em] text-slate-400 mb-8">{dt.dayName}</p>

          <div className="aspect-[4/5] w-full max-w-sm overflow-hidden mb-12 bg-slate-50">
            <img src={cover} alt="Wedding cover" className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-1000" />
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-light text-slate-900 leading-[0.85] tracking-tight text-center" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
            {bride_name}
            <span className="block text-slate-300 text-3xl italic font-light my-4 tracking-normal">&amp;</span>
            {groom_name}
          </h1>

          <div className="flex items-center gap-4 mt-12 mb-4">
            <div className="w-12 h-px bg-slate-300" />
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{dt.day} . {dt.month} . {dt.year}</p>
            <div className="w-12 h-px bg-slate-300" />
          </div>
          <p className="text-xs text-slate-300 italic mb-8">{lunar_date_text}</p>
          
          <Countdown targetDate={wedding_date} primaryColor="#0f172a" />
        </div>

        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ delay: 1, duration: 1 }}>
          <div className="w-px h-12 bg-slate-300" />
        </motion.div>
      </section>

      {/* ══ INTRO ═════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-16 sm:py-20 px-8 border-b border-slate-100">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.5em] text-slate-300 mb-8">Lời Ngỏ</p>
            <p className="text-lg sm:text-xl text-slate-500 leading-loose italic" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>
              "{intro_text}"
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ FAMILY ════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 px-6 border-b border-slate-100">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {/* Groom */}
            <div className="py-10 md:py-0 md:pr-12 lg:pr-16 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                <img src={PORTRAITS.groom} alt="Chú rể" className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-300 mb-3">Nhà Trai</p>
                <div className="text-sm text-slate-400 space-y-0.5 mb-4">
                  <p>Ông: <strong className="text-slate-600">{groom_father_name}</strong></p>
                  <p>Bà: <strong className="text-slate-600">{groom_mother_name}</strong></p>
                </div>
                <h3 className="text-2xl font-light text-slate-900" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{groom_full_name}</h3>
                <p className="text-xs text-slate-300 uppercase tracking-widest mt-1">Chú Rể</p>
              </div>
            </div>

            {/* Bride */}
            <div className="py-10 md:py-0 md:pl-12 lg:pl-16 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                <img src={PORTRAITS.bride} alt="Cô dâu" className="w-full h-full object-cover  hover:grayscale-0 transition-all duration-500" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.4em] text-slate-300 mb-3">Nhà Gái</p>
                <div className="text-sm text-slate-400 space-y-0.5 mb-4">
                  <p>Ông: <strong className="text-slate-600">{bride_father_name}</strong></p>
                  <p>Bà: <strong className="text-slate-600">{bride_mother_name}</strong></p>
                </div>
                <h3 className="text-2xl font-light text-slate-900" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{bride_full_name}</h3>
                <p className="text-xs text-slate-300 uppercase tracking-widest mt-1">Cô Dâu</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ LOVE STORY ════════════════════════════════════════ */}
      {love_story && (
        <ScrollReveal>
          <section className="py-12 sm:py-16 px-8 border-b border-slate-100">
            <div className="max-w-xl mx-auto">
              <p className="text-[10px] uppercase tracking-[0.5em] text-slate-300 text-center mb-8">Câu Chuyện Của Chúng Tôi</p>
              <p className="text-base sm:text-lg text-slate-500 leading-loose text-center">{love_story}</p>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ══ EVENTS ════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 px-6 border-b border-slate-100">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] uppercase tracking-[0.5em] text-slate-300 text-center mb-8">Lịch Trình · {lunar_date_text}</p>
            <div className="space-y-0 divide-y divide-slate-100">
              {events.map((event) => (
                <div key={event.id} className="grid sm:grid-cols-3 gap-4 sm:gap-6 py-10 group">
                  <div>
                    <h3 className="text-xl font-light text-slate-900 mb-1" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{event.title}</h3>
                    <p className="text-xs text-slate-300 uppercase tracking-widest">{event.event_type === 'ceremony' ? 'Lễ Cưới' : 'Tiệc Cưới'}</p>
                  </div>
                  <div className="sm:col-span-2 space-y-3 text-slate-500 text-sm">
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-slate-300 shrink-0" />
                      <span><strong className="text-slate-700">{new Date(event.event_time).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</strong> — {new Date(event.event_time).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-slate-300 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-slate-700">{event.venue_name}</p>
                        <p className="text-slate-400 text-xs mt-0.5">{event.address}</p>
                        {event.note && <p className="text-xs italic text-slate-300 mt-1">{event.note}</p>}
                      </div>
                    </div>
                    <a href={event.map_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors border-b border-slate-200 hover:border-slate-900 pb-px">
                      Xem bản đồ <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ══ GALLERY ═══════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 border-b border-slate-100">
        <ScrollReveal>
          <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold text-center mb-8">Kỷ Niệm</p>
        </ScrollReveal>
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3">
          {gallery.map((photo, i) => (
            <ScrollReveal key={photo.id} delay={i * 0.06}>
              <div className={`overflow-hidden group bg-slate-50 ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={photo.image_path} alt={photo.caption || ''}
                  className="w-full h-full object-cover aspect-square   group-hover:scale-105 transition-all duration-700" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ GIFTS ═════════════════════════════════════════════ */}
      {bankAccounts.length > 0 && (
        <ScrollReveal>
          <section className="py-12 sm:py-16 px-6 border-b border-slate-100 text-center">
            <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold mb-4">Hộp Mừng Cưới</p>
            <h2 className="text-2xl sm:text-3xl font-light text-slate-900 mb-4" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>Mừng Hôn Lễ</h2>
            <p className="text-sm text-slate-600 mb-10 max-w-sm mx-auto">Sự hiện diện của quý vị là món quà lớn nhất với chúng tôi.</p>
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {bankAccounts.map(b => <GiftEnvelope key={b.id} bank={b} primaryColor="#1F2937" />)}
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* ══ RSVP ══════════════════════════════════════════════ */}
      <ScrollReveal>
        <section className="py-12 sm:py-16 px-6 bg-slate-900 text-white">
          <div className="max-w-lg mx-auto">
            <p className="text-[10px] uppercase tracking-[0.5em] text-slate-500 text-center mb-4">Xác Nhận</p>
            <h2 className="text-3xl sm:text-4xl font-light text-center mb-10" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>Bạn Sẽ Đến Chứ?</h2>
            <form className="space-y-6">
              {[
                { label: 'Họ và Tên', type: 'text', placeholder: 'Nhập tên của bạn...' },
                { label: 'Điện thoại', type: 'tel', placeholder: '09...' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-3">{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} className="w-full bg-transparent border-b border-slate-700 py-3 text-white outline-none focus:border-white transition-colors placeholder:text-slate-700" />
                </div>
              ))}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-3">Xác Nhận</label>
                <select className="w-full bg-transparent border-b border-slate-700 py-3 text-slate-300 outline-none focus:border-white transition-colors appearance-none">
                  <option className="bg-slate-900">Sẽ tham dự</option>
                  <option className="bg-slate-900">Rất tiếc không thể đến</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.4em] text-slate-500 mb-3">Lời Chúc</label>
                <textarea rows="3" placeholder="Gửi lời chúc..." className="w-full bg-transparent border-b border-slate-700 py-3 text-white outline-none focus:border-white transition-colors resize-none placeholder:text-slate-700"></textarea>
              </div>
              <button type="button" className="w-full py-4 border border-white text-xs uppercase tracking-[0.4em] hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-3">
                Gửi Phản Hồi <Send size={14} />
              </button>
            </form>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <footer className="py-14 text-center border-t border-slate-100">
        <p className="font-light text-2xl text-slate-900" style={{ fontFamily: '"Playfair Display", "Lora", "Times New Roman", serif' }}>{bride_name} &amp; {groom_name}</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.5em] text-slate-500 font-bold">{dt.day} . {dt.month} . {dt.year} · LoveKnot</p>
      </footer>
    </div>
  );
};

export default MinimalWhiteTemplate;
