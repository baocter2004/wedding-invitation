import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Calendar, Heart, Camera, MessageCircle, ArrowRight } from 'lucide-react';
import ScrollReveal from '../shared/ScrollReveal';
import GiftEnvelope from '../shared/GiftEnvelope';
import Countdown from '../shared/Countdown';
import FloatingDecorativeElements from '../shared/FloatingDecorativeElements';
import Guestbook from '../shared/Guestbook';
import { resolveGallery, resolveCover, formatDate, PORTRAITS } from '../../../assets/images';

const ModernPhotoStoryTemplate = ({ weddingData }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  return (
    <div className="bg-white text-slate-900 font-sans selection:bg-rose-500 selection:text-white overflow-x-hidden">
      <FloatingDecorativeElements count={10} type="circle" color="#F43F5E" />

      {/* 1. HERO SECTION - Full Width Image */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img src={cover} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-sm uppercase tracking-[0.5em] mb-6 font-medium">The Wedding Day</p>
            <h1 className="text-6xl md:text-8xl font-black mb-6 uppercase leading-tight">
              {groom_name} <br /> & {bride_name}
            </h1>
            <div className="w-20 h-1 bg-rose-500 mx-auto mb-10"></div>
            <p className="text-xl md:text-2xl font-bold tracking-widest">{dt.full}</p>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-10 text-white/50 hidden md:block">
          <p className="text-xs uppercase tracking-widest">Est. 2026</p>
        </div>
      </section>

      {/* 2. INTRO - Big Typography */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-slate-200">
              True <br /> Love <br /> Stories <br /> Never <br /> End
            </h2>
            <div className="space-y-8">
              <div className="w-12 h-1 bg-rose-500"></div>
              <p className="text-2xl font-medium leading-relaxed italic text-slate-700">
                "{intro_text || 'We are so excited to celebrate our special day with you. Your support and love mean everything to us.'}"
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. THE COUPLE - Modern Split */}
      <section className="py-32 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4">
            <ScrollReveal>
              <div className="bg-white p-8 md:p-16 flex flex-col items-center text-center space-y-8 shadow-sm">
                <div className="w-64 h-64 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={PORTRAITS.groom} alt="Groom" className="w-full h-full object-cover rounded-none" />
                </div>
                <div>
                  <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-4">The Groom</p>
                  <h3 className="text-4xl font-black uppercase mb-4">{groom_full_name || groom_name}</h3>
                  <div className="space-y-1 text-slate-400 text-sm">
                    <p>Parents: {groom_father_name} & {groom_mother_name}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="bg-white p-8 md:p-16 flex flex-col items-center text-center space-y-8 shadow-sm">
                <div className="w-64 h-64 grayscale hover:grayscale-0 transition-all duration-700">
                  <img src={PORTRAITS.bride} alt="Bride" className="w-full h-full object-cover rounded-none" />
                </div>
                <div>
                  <p className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-4">The Bride</p>
                  <h3 className="text-4xl font-black uppercase mb-4">{bride_full_name || bride_name}</h3>
                  <div className="space-y-1 text-slate-400 text-sm">
                    <p>Parents: {bride_father_name} & {bride_mother_name}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. STORY SECTION */}
      {love_story && (
        <section className="py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <ScrollReveal>
              <div className="flex flex-col md:flex-row gap-16 items-start">
                <div className="md:w-1/3 shrink-0">
                  <h2 className="text-4xl font-black uppercase leading-tight mb-4">Our <br /> Love <br /> Story</h2>
                  <div className="w-12 h-1 bg-rose-500"></div>
                </div>
                <div className="md:w-2/3">
                  <p className="text-xl text-slate-600 leading-loose first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-rose-500">
                    {love_story}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 5. COUNTDOWN */}
      <section className="py-24 bg-rose-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-black uppercase tracking-widest mb-12">Counting Down To Forever</h2>
            <Countdown targetDate={wedding_date} />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. EVENTS - High Contrast */}
      <section className="py-32 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <h2 className="text-6xl md:text-8xl font-black uppercase text-slate-900 leading-none">The <br /> Big <br /> Day</h2>
            <p className="text-slate-500 max-w-xs font-medium uppercase tracking-widest text-sm">Join us at these locations for our celebration</p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-slate-200">
            {events.map((event, idx) => (
              <ScrollReveal key={event.id} delay={idx * 0.2}>
                <div className="bg-white p-12 md:p-20 space-y-10 group hover:bg-slate-900 hover:text-white transition-all duration-500">
                  <div className="flex justify-between items-start">
                    <span className="text-6xl font-black opacity-10 group-hover:opacity-30">0{idx + 1}</span>
                    <div className="p-4 bg-slate-100 rounded-full group-hover:bg-rose-500 transition-colors">
                      {event.event_type === 'ceremony' ? <Calendar size={24} /> : <MapPin size={24} />}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black uppercase mb-6 tracking-tight">{event.title}</h3>
                    <div className="space-y-4 opacity-70">
                      <div className="flex items-center gap-4">
                        <Clock size={20} />
                        <p className="font-bold uppercase tracking-widest">{dt.time(event.event_time)} - {dt.full}</p>
                      </div>
                      <div className="flex items-start gap-4">
                        <MapPin size={20} className="mt-1" />
                        <div>
                          <p className="font-bold uppercase tracking-wider">{event.venue_name}</p>
                          <p>{event.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {event.map_url && (
                    <a href={event.map_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 font-black uppercase tracking-widest text-sm text-rose-500 group-hover:text-white transition-colors">
                      Google Maps <ArrowRight size={20} />
                    </a>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. GALLERY - Grid Layout */}
      <section className="py-32 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <div className="flex items-center gap-6">
              <Camera size={40} className="text-rose-500" />
              <h2 className="text-5xl md:text-7xl font-black uppercase">Gallery</h2>
            </div>
            <p className="text-slate-400 uppercase tracking-widest text-sm font-bold">Captured Moments</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((photo, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <div className="aspect-[3/4] overflow-hidden group">
                  <img src={photo.image_path} alt={photo.caption} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-110" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. GIFTS */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="container mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <h2 className="text-5xl font-black uppercase mb-12">Registry</h2>
            <p className="text-slate-500 text-xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed">
              If you were thinking of giving a gift, to help us on our way, a gift of cash towards our house, would really make our day.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {bankAccounts.map((bank) => (
                <GiftEnvelope key={bank.id} bank={bank} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 9. GUESTBOOK */}
      <section className="py-32 px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="text-center mb-24">
              <MessageCircle className="mx-auto text-rose-500 mb-8" size={40} />
              <h2 className="text-5xl font-black uppercase mb-6">Wishes</h2>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Send your love</p>
            </div>
            <Guestbook weddingId={weddingData?.id} wishes={weddingData?.wishes} />
          </ScrollReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-32 bg-white text-center">
        <div className="w-20 h-1 bg-rose-500 mx-auto mb-10"></div>
        <h2 className="text-6xl font-black uppercase mb-6 tracking-tighter">
          {groom_name} & {bride_name}
        </h2>
        <p className="text-slate-400 uppercase tracking-[0.5em] text-xs font-bold">Forever Begins Now</p>
      </footer>
    </div>
  );
};

export default ModernPhotoStoryTemplate;
