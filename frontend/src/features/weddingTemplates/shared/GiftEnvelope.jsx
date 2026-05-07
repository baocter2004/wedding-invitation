import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const GiftEnvelope = ({ bank, primaryColor = '#D98BA5' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const qrImage =
    bank.qr_image_path || 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg';
  const accountChunks = useMemo(() => {
    if (!bank?.account_number) return [];
    return String(bank.account_number).match(/.{1,4}/g) || [String(bank.account_number)];
  }, [bank?.account_number]);

  return (
    <div className="relative w-full max-w-[320px] h-[480px] sm:h-[500px] flex items-end justify-center pb-6 sm:pb-8 mx-auto">
      <div
        className="relative w-full h-full cursor-pointer group"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-x-4 bottom-8 h-40 blur-2xl rounded-full opacity-60 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${primaryColor}40 0%, transparent 70%)`,
          }}
        />

        {/* Envelope base */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[180px] sm:h-[200px] rounded-2xl border shadow-xl overflow-hidden"
          style={{
            background: `linear-gradient(170deg, ${primaryColor}15 0%, #fff 48%, ${primaryColor}10 100%)`,
            borderColor: `${primaryColor}20`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(140deg, transparent 0%, ${primaryColor}10 100%)`,
            }}
          />
          {/* Back flap */}
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 46%)',
              background: `linear-gradient(180deg, ${primaryColor}20 0%, ${primaryColor}30 100%)`,
            }}
          />
          {/* Front sides */}
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: 'polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)',
              background: `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, ${primaryColor}05 100%)`,
            }}
          />
          {/* Wax seal */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div
              className="w-10 h-10 rounded-full border-2 shadow-lg flex items-center justify-center"
              style={{ backgroundColor: primaryColor, borderColor: `${primaryColor}40` }}
            >
              <Heart size={12} className="text-white" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Floating letter card */}
        <motion.div
          className="absolute left-3 right-3 bg-white rounded-[20px] shadow-2xl p-4 sm:p-5 text-center border flex flex-col items-center z-30"
          style={{ borderColor: `${primaryColor}15` }}
          initial={false}
          animate={{
            bottom: isOpen ? 110 : 45,
            y: isOpen ? -5 : 0,
            scale: isOpen ? 1 : 0.98,
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          <div
            className="absolute inset-0 pointer-events-none rounded-[20px]"
            style={{
              background: `linear-gradient(150deg, ${primaryColor}05 0%, transparent 35%, transparent 65%, ${primaryColor}08 100%)`,
            }}
          />

          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="w-full flex flex-col items-center relative z-10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={14} style={{ color: primaryColor }} />
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">
                  Mừng cưới online
                </p>
                <Sparkles size={14} style={{ color: primaryColor }} />
              </div>

              <div
                className="w-36 h-36 sm:w-40 sm:h-40 mx-auto bg-white border rounded-xl mb-4 p-2 shadow-sm relative"
                style={{ borderColor: `${primaryColor}15` }}
              >
                <img
                  src={qrImage}
                  alt="QR Code"
                  className="w-full h-full object-contain rounded-lg border border-slate-50"
                />
              </div>

              <p className="font-bold text-slate-900 text-base mb-1 leading-tight">{bank.bank_name}</p>
              <p className="text-[10px] font-black text-slate-500 mb-3 uppercase tracking-[0.15em]">{bank.owner_name}</p>

              <div className="bg-slate-50/50 w-full py-2.5 px-2 rounded-xl border border-slate-100">
                <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 mb-1 font-bold">Số tài khoản</p>
                <p className="font-mono font-bold text-sm sm:text-base tracking-[0.1em]" style={{ color: primaryColor }}>
                  {accountChunks.join(' ')}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-[180px] flex flex-col items-center justify-center relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={20} className="mb-2 opacity-60" style={{ color: primaryColor }} />
              </motion.div>
              <span className="text-slate-800 font-serif italic text-base">Hộp Mừng Cưới</span>
              <p className="text-[10px] text-slate-400 mt-2 tracking-[0.1em] uppercase font-bold">Chạm để mở</p>
            </div>
          )}
        </motion.div>
      </div>

      <p className="absolute bottom-0 text-[10px] text-slate-400 italic font-bold uppercase tracking-widest">
        {isOpen ? 'Chạm để đóng' : 'Chạm để xem QR'}
      </p>
    </div>
  );
};

export default GiftEnvelope;
