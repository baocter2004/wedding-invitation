import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Calendar, Heart, Music, Volume2, VolumeX, ChevronDown, MessageSquare } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import Countdown from '../shared/Countdown';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import Guestbook from '../shared/Guestbook';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const FloralPastelTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setMounted(true);
    if (weddingData?.music_url) {
      const a = new Audio(weddingData.music_url);
      a.loop = true;
      setAudio(a);
    }
    return () => {
      if (audio) audio.pause();
    };
  }, [weddingData?.music_url]);

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
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
    theme_config_json = {}
  } = weddingData || {};

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);
  
  const primaryColor = theme_config_json.primary_color || '#D98BA5';
  const secondaryColor = theme_config_json.secondary_color || '#FFF7F9';

  return (
    <div className="bg-[#FFF7F9] text-slate-700 font-sans selection:bg-[#D98BA5] selection:text-white">
      {/* Decorative Background */}
      <FloatingDecorativeElements count={15} type="heart" color="#D98BA5" />
      <FloatingDecorativeElements count={10} type="leaf" color="#A3B18A" />

      {/* Music Control */}
      {weddingData?.music_url && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center border border-[#D98BA5]/20 text-[#D98BA5] transition-all hover:scale-110 active:scale-95"
        >
          {isPlaying ? <Volume2 size={20} className="animate-pulse" /> : <VolumeX size={20} />}
        </button>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-[#D98BA5] text-[#D98BA5] text-sm font-medium tracking-widest uppercase mb-6">
            Save The Date
          </span>
          <h1 className="text-6xl md:text-8xl font-serif text-[#D98BA5] mb-6 italic leading-tight">
            {groom_name} <span className="text-4xl md:text-5xl font-sans not-italic">&</span> {bride_name}
          </h1>
          <p className="text-lg md:text-xl font-light tracking-[0.2em] uppercase mb-12">
            {dt.full}
          </p>
          <div className="w-16 h-[1px] bg-[#D98BA5] mx-auto mb-12"></div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="relative w-full max-w-lg aspect-[4/5] rounded-t-full overflow-hidden shadow-2xl border-[12px] border-white"
        >
          <img src={cover} alt="Wedding Cover" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#D98BA5]/20 to-transparent"></div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#D98BA5] opacity-50"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-24 px-6 text-center max-w-3xl mx-auto">
        <ScrollReveal>
          <Heart className="mx-auto text-[#D98BA5] mb-8" size={32} fill="#D98BA5" />
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800 mb-8 italic">
            Lời Ngỏ
          </h2>
          <p className="text-lg leading-relaxed font-light italic text-slate-600">
            "{intro_text || 'Tình yêu là khi hai trái tim cùng chung một nhịp đập, là khi chúng ta cùng nhìn về một hướng và cùng nhau xây dựng tương lai.'}"
          </p>
        </ScrollReveal>
      </section>

      {/* 3. COUPLE INFO SECTION */}
      <section className="py-24 px-6 bg-white/50 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Groom */}
              <div className="text-center md:text-right space-y-6">
                <div className="w-48 h-48 mx-auto md:ml-auto md:mr-0 rounded-full overflow-hidden border-4 border-[#D98BA5] shadow-xl">
                  <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-[#D98BA5] italic font-bold">Chú Rể</h3>
                  <h4 className="text-3xl font-bold text-slate-800 mb-4">{groom_full_name || groom_name}</h4>
                  <div className="space-y-1 text-sm text-slate-500 uppercase tracking-widest">
                    <p>Con ông: {groom_father_name}</p>
                    <p>Con bà: {groom_mother_name}</p>
                  </div>
                </div>
              </div>

              {/* Bride */}
              <div className="text-center md:text-left space-y-6 order-last md:order-none">
                <div className="w-48 h-48 mx-auto md:mr-auto md:ml-0 rounded-full overflow-hidden border-4 border-[#D98BA5] shadow-xl">
                  <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-2xl font-serif text-[#D98BA5] italic font-bold">Cô Dâu</h3>
                  <h4 className="text-3xl font-bold text-slate-800 mb-4">{bride_full_name || bride_name}</h4>
                  <div className="space-y-1 text-sm text-slate-500 uppercase tracking-widest">
                    <p>Con ông: {bride_father_name}</p>
                    <p>Con bà: {bride_mother_name}</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. COUNTDOWN SECTION */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#D98BA5] opacity-5"></div>
        <div className="container mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl font-serif text-[#D98BA5] mb-4 italic">Đếm Ngược Thời Gian</h2>
            <p className="text-slate-500 uppercase tracking-widest text-sm mb-12">Cùng chờ đợi khoảnh khắc hạnh phúc</p>
            <Countdown targetDate={wedding_date} />
          </ScrollReveal>
        </div>
      </section>

      {/* 5. LOVE STORY SECTION */}
      {love_story && (
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif text-[#D98BA5] italic mb-4">Câu Chuyện Tình Yêu</h2>
              <div className="w-12 h-1 bg-[#D98BA5] mx-auto opacity-30"></div>
            </div>
            <div className="prose prose-pink mx-auto italic font-light text-slate-600 leading-loose text-center text-lg">
              {love_story}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* 6. EVENTS SECTION */}
      <section className="py-24 px-6 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#D98BA5] italic mb-4">Thời Gian & Địa Điểm</h2>
            <p className="text-slate-400 uppercase tracking-[0.3em] text-xs">Thông tin các buổi lễ</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.2}>
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#D98BA5]/10 hover:shadow-xl hover:border-[#D98BA5]/30 transition-all text-center group">
                  <div className="w-16 h-16 bg-[#FFF7F9] rounded-full flex items-center justify-center text-[#D98BA5] mx-auto mb-6 group-hover:scale-110 transition-transform">
                    {event.event_type === 'ceremony' ? <Calendar size={28} /> : <MapPin size={28} />}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{event.title}</h3>
                  <div className="space-y-4 text-slate-600 font-light">
                    <div className="flex items-center justify-center gap-3">
                      <Clock size={18} className="text-[#D98BA5]" />
                      <p>{dt.time(event.event_time)} - {dt.full}</p>
                    </div>
                    <div className="flex items-start justify-center gap-3">
                      <MapPin size={18} className="text-[#D98BA5] mt-1 shrink-0" />
                      <div>
                        <p className="font-bold text-slate-800">{event.venue_name}</p>
                        <p className="text-sm">{event.address}</p>
                      </div>
                    </div>
                  </div>
                  {event.map_url && (
                    <a 
                      href={event.map_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#D98BA5] text-[#D98BA5] text-sm font-medium hover:bg-[#D98BA5] hover:text-white transition-all"
                    >
                      Xem bản đồ <MapPin size={14} />
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY SECTION */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#D98BA5] italic mb-4">Album Hình Cưới</h2>
            <p className="text-slate-400 uppercase tracking-widest text-xs">Ghi dấu những khoảnh khắc đẹp nhất</p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {gallery.map((photo, idx) => (
              <ScrollReveal key={idx}>
                <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all group">
                  <img src={photo.image_path} alt={photo.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. BANK ACCOUNTS (GIFT) */}
      <section className="py-24 px-6 bg-[#D98BA5] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-serif italic mb-8">Hộp Mừng Cưới</h2>
            <p className="font-light mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Sự hiện diện của bạn là món quà lớn nhất đối với chúng tôi. Nếu bạn muốn gửi thêm lời chúc mừng, đây là các thông tin chuyển khoản:
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {bankAccounts.map((bank) => (
                <GiftEnvelope key={bank.id} bank={bank} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. GUESTBOOK (WISHES) */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-16">
              <MessageSquare className="mx-auto text-[#D98BA5] mb-6" size={32} />
              <h2 className="text-4xl font-serif text-[#D98BA5] italic mb-4">Sổ Lưu Bút</h2>
              <p className="text-slate-400 uppercase tracking-widest text-xs">Gửi những lời chúc tốt đẹp nhất</p>
            </div>
            <Guestbook weddingId={weddingData?.id} wishes={weddingData?.wishes} />
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 text-center border-t border-slate-100">
        <h2 className="text-3xl font-serif text-[#D98BA5] italic mb-4">{groom_name} & {bride_name}</h2>
        <p className="text-slate-400 text-sm font-light">Cảm ơn bạn đã là một phần trong ngày trọng đại của chúng tôi!</p>
        <p className="mt-8 text-[10px] text-slate-300 uppercase tracking-widest">Designed with love by LoveKnot</p>
      </footer>
    </div>
  );
};

export default FloralPastelTemplate;
