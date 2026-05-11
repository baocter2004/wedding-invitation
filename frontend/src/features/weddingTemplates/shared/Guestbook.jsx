import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const Guestbook = ({ wishes = [], primaryColor = '#B91C1C', secondaryColor = '#FFFFFF', fontHeading = 'inherit' }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [localWishes, setLocalWishes] = useState(wishes);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !message) return;

    const newWish = {
      id: Date.now(),
      guest_name: name,
      message: message,
      created_at: new Date().toISOString()
    };

    setLocalWishes([newWish, ...localWishes]);
    setName('');
    setMessage('');
  };

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6">
      <ScrollReveal variant="fade-up">
        <div className="text-center mb-12">
          <MessageSquare size={32} className="mx-auto mb-4 opacity-20" style={{ color: primaryColor }} />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4" style={{ fontFamily: fontHeading, color: primaryColor }}>
            Sổ Lưu Bút
          </h2>
          <div className="h-px w-20 mx-auto opacity-20" style={{ backgroundColor: primaryColor }} />
        </div>
      </ScrollReveal>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        {/* Form Side */}
        <ScrollReveal variant="mask-reveal">
          <div className="bg-white p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 className="text-xl font-bold mb-8 text-slate-800">Gửi lời chúc của bạn</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className="block text-xs uppercase tracking-widest font-black text-slate-400 mb-2">Nhập tên của bạn*</label>
                <div className="relative">
                  <User size={18} className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border-b border-slate-200 py-3 pl-8 outline-none focus:border-slate-900 transition-colors font-medium text-slate-800"
                    placeholder="Tên của bạn..."
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-xs uppercase tracking-widest font-black text-slate-400 mb-2">Nhập lời chúc của bạn*</label>
                <textarea
                  required
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:border-slate-300 transition-all font-medium text-slate-800 resize-none"
                  placeholder="Viết lời chúc tại đây..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-5 rounded-full flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-xs shadow-lg"
                style={{ backgroundColor: primaryColor }}
              >
                GỬI LỜI CHÚC <Send size={16} />
              </motion.button>
            </form>
          </div>
        </ScrollReveal>

        {/* List Side */}
        <ScrollReveal variant="fade-up" delay={0.2}>
          <div className="relative max-h-[600px] overflow-y-auto pr-4 scrollbar-hide space-y-6">
            <AnimatePresence mode="popLayout">
              {localWishes.length > 0 ? (
                localWishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-slate-100 relative group"
                  >
                    <Quote size={24} className="absolute top-6 right-6 opacity-5" style={{ color: primaryColor }} />
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: primaryColor }}>
                        {wish.guest_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 leading-none">{wish.guest_name}</h4>
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1 block">
                          {wish.created_at ? new Date(wish.created_at).toLocaleDateString('vi-VN') : 'Vừa xong'}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 leading-relaxed italic font-medium">
                      "{wish.message}"
                    </p>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <MessageSquare size={24} />
                  </div>
                  <p className="text-slate-400 font-medium italic">
                    Chưa có lời chúc nào. <br /> Hãy là người đầu tiên!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Guestbook;
