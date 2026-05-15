import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Heart, Volume2, VolumeX, Sparkles, MessageSquare } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import Countdown from '../shared/Countdown';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import Guestbook from '../shared/Guestbook';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const LuxuryGoldTemplate = ({ weddingData }) => {
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
    return () => audio?.pause();
  }, [weddingData?.music_url]);

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play().catch(e => console.error("Audio play failed:", e));
    setIsPlaying(!isPlaying);
  };

  if (!mounted) return null;

  const {
    bride_name = '', groom_name = '',
    bride_full_name = '', groom_full_name = '',
    bride_father_name = '', bride_mother_name = '',
    groom_father_name = '', groom_mother_name = '',
    wedding_date = '', intro_text = '', love_story = '',
    cover_image_path = '',
    events = [], photos = [], bankAccounts = []
  } = weddingData || {};

  const gallery = resolveGallery(photos);
  const cover = resolveCover(cover_image_path);
  const dt = formatDate(wedding_date);
  
  const gold = '#C8A951';

  return (
    <div className="bg-[#111111] text-[#E5E5E5] font-serif selection:bg-[#C8A951] selection:text-black overflow-x-hidden">
      {/* Golden Dust Effect */}
      <FloatingDecorativeElements count={30} type="circle" color={gold} />

      {/* Music Control */}
      {weddingData?.music_url && (
        <button
          onClick={toggleMusic}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-black/50 backdrop-blur-md shadow-2xl flex items-center justify-center border border-[#C8A951]/30 text-[#C8A951] transition-all hover:scale-110 active:scale-95"
        >
          {isPlaying ? <Volume2 size={22} className="animate-pulse" /> : <VolumeX size={22} />}
        </button>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Decorative Borders */}
        <div className="absolute top-10 left-10 right-10 bottom-10 border border-[#C8A951]/20 pointer-events-none z-0"></div>
        <div className="absolute top-12 left-12 right-12 bottom-12 border border-[#C8A951]/10 pointer-events-none z-0"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="z-10"
        >
          <Sparkles className="mx-auto text-[#C8A951] mb-8" size={32} />
          <p className="text-[#C8A951] tracking-[0.4em] uppercase text-sm mb-12">The Royal Wedding of</p>
          <h1 className="text-7xl md:text-9xl font-bold mb-10 text-white tracking-tighter">
            {groom_name} <span className="text-[#C8A951] block md:inline">&</span> {bride_name}
          </h1>
          <div className="flex items-center justify-center gap-6 mb-12">
            <div className="w-12 h-[1px] bg-[#C8A951]"></div>
            <p className="text-xl md:text-2xl font-light tracking-[0.2em]">{dt.full}</p>
            <div className="w-12 h-[1px] bg-[#C8A951]"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute inset-0 z-[-1] opacity-40"
        >
          <img src={cover} alt="Background" className="w-full h-full object-cover grayscale brightness-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111111] via-transparent to-[#111111]"></div>
        </motion.div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-32 px-6 text-center max-w-4xl mx-auto border-b border-[#C8A951]/10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl mb-12 text-[#C8A951] italic">Sincerely Invited</h2>
          <p className="text-xl md:text-2xl leading-relaxed font-light text-slate-300 italic">
            "{intro_text || 'Because you have shared in our lives with your friendship and love, we invite you to join us as we exchange our wedding vows.'}"
          </p>
        </ScrollReveal>
      </section>

      {/* 3. COUPLE SECTION */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-20">
            <ScrollReveal>
              <div className="group space-y-8">
                <div className="relative aspect-[3/4] overflow-hidden border border-[#C8A951]/30 p-2">
                  <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 border-[20px] border-[#111111] opacity-80 pointer-events-none"></div>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-[#C8A951] uppercase tracking-[0.3em] text-xs mb-2">The Groom</p>
                  <h3 className="text-4xl font-bold mb-4">{groom_full_name || groom_name}</h3>
                  <div className="h-[1px] w-20 bg-[#C8A951] mb-6 md:mx-0 mx-auto"></div>
                  <p className="text-slate-400 font-light">Son of {groom_father_name} & {groom_mother_name}</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="group space-y-8">
                <div className="relative aspect-[3/4] overflow-hidden border border-[#C8A951]/30 p-2">
                  <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 border-[20px] border-[#111111] opacity-80 pointer-events-none"></div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[#C8A951] uppercase tracking-[0.3em] text-xs mb-2">The Bride</p>
                  <h3 className="text-4xl font-bold mb-4">{bride_full_name || bride_name}</h3>
                  <div className="h-[1px] w-20 bg-[#C8A951] mb-6 md:ml-auto mx-auto"></div>
                  <p className="text-slate-400 font-light">Daughter of {bride_father_name} & {bride_mother_name}</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. COUNTDOWN */}
      <section className="py-32 px-6 bg-[#C8A951]/5 border-y border-[#C8A951]/10">
        <div className="container mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl md:text-5xl text-[#C8A951] mb-16">The Grand Countdown</h2>
            <Countdown targetDate={wedding_date} />
          </ScrollReveal>
        </div>
      </section>

      {/* 5. EVENTS SECTION */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl text-[#C8A951] mb-6">Wedding Schedule</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-[1px] bg-[#C8A951]/30"></div>
              <Heart size={16} className="text-[#C8A951]" fill="#C8A951" />
              <div className="w-12 h-[1px] bg-[#C8A951]/30"></div>
            </div>
          </div>

          <div className="space-y-16">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id}>
                <div className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2">
                    <div className="aspect-video overflow-hidden border border-[#C8A951]/20">
                      <img src={idx === 0 ? cover : gallery[0]?.image_path} alt="Event" className="w-full h-full object-cover grayscale brightness-75" />
                    </div>
                  </div>
                  <div className={`w-full md:w-1/2 text-center ${idx % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                    <h3 className="text-3xl font-bold mb-6 text-[#C8A951] uppercase tracking-widest">{event.title}</h3>
                    <div className="space-y-4 text-xl font-light text-slate-300">
                      <div className={`flex items-center gap-4 ${idx % 2 === 1 ? 'justify-center md:justify-start flex-row-reverse' : 'justify-center md:justify-start'}`}>
                        <Clock size={20} className="text-[#C8A951]" />
                        <p>{dt.time(event.event_time)} - {dt.full}</p>
                      </div>
                      <div className={`flex items-start gap-4 ${idx % 2 === 1 ? 'justify-center md:justify-start flex-row-reverse' : 'justify-center md:justify-start'}`}>
                        <MapPin size={20} className="text-[#C8A951] mt-1 shrink-0" />
                        <div>
                          <p className="font-bold text-white">{event.venue_name}</p>
                          <p className="text-base">{event.address}</p>
                        </div>
                      </div>
                    </div>
                    {event.map_url && (
                      <a href={event.map_url} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block px-10 py-3 border border-[#C8A951] text-[#C8A951] uppercase tracking-widest text-sm hover:bg-[#C8A951] hover:text-black transition-all font-bold">
                        View On Maps
                      </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY */}
      <section className="py-32 px-6 bg-[#000000]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-5xl text-[#C8A951] mb-6 italic">Wedding Moments</h2>
            <p className="text-slate-500 uppercase tracking-[0.5em] text-xs">A glimpse of our happiness</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((photo, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className={`relative overflow-hidden group ${idx === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img src={photo.image_path} alt={photo.caption} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#C8A951]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GIFTING */}
      <section className="py-32 px-6 border-y border-[#C8A951]/10">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <Sparkles className="mx-auto text-[#C8A951] mb-10" size={40} />
            <h2 className="text-4xl md:text-5xl text-[#C8A951] mb-12">Wedding Registry</h2>
            <p className="text-xl font-light text-slate-400 mb-16 leading-relaxed">
              Your presence is our greatest gift. If you wish to honor us with a wedding gift, you may use the following details:
            </p>
            <div className="flex flex-wrap justify-center gap-10">
              {bankAccounts.map((bank) => (
                <GiftEnvelope key={bank.id} bank={bank} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 8. WISHES */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-24">
              <MessageSquare className="mx-auto text-[#C8A951] mb-8" size={32} />
              <h2 className="text-4xl md:text-5xl text-[#C8A951] mb-6 italic">Send Your Blessings</h2>
              <p className="text-slate-500 uppercase tracking-widest text-xs">Leave a message for the couple</p>
            </div>
            <Guestbook weddingId={weddingData?.id} wishes={weddingData?.wishes} />
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-32 text-center border-t border-[#C8A951]/10 bg-black">
        <h2 className="text-4xl text-[#C8A951] mb-6 italic">{groom_name} & {bride_name}</h2>
        <p className="text-slate-500 tracking-widest text-sm uppercase">Thank you for being part of our story</p>
        <div className="mt-16 text-[10px] text-slate-700 uppercase tracking-[0.5em]">
          Elegance by LoveKnot
        </div>
      </footer>
    </div>
  );
};

export default LuxuryGoldTemplate;
