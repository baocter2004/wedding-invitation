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
    <div className="relative w-[92vw] max-w-80 h-[470px] sm:h-[520px] flex items-end justify-center pb-6 sm:pb-8 shrink-0">
      <div
        className="relative w-full h-full cursor-pointer group"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-x-4 bottom-8 h-52 blur-2xl rounded-full opacity-70 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${primaryColor}52 0%, transparent 70%)`,
          }}
        />

        {/* Envelope base */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[190px] sm:h-[210px] rounded-2xl border shadow-[0_22px_40px_rgba(0,0,0,0.09)] overflow-hidden"
          style={{
            background: `linear-gradient(170deg, ${primaryColor}20 0%, #fff 48%, ${primaryColor}16 100%)`,
            borderColor: `${primaryColor}28`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(140deg, transparent 0%, ${primaryColor}12 100%)`,
            }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 46%)',
              background: `linear-gradient(180deg, ${primaryColor}26 0%, ${primaryColor}36 100%)`,
            }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              clipPath: 'polygon(0 0, 50% 46%, 100% 0, 100% 100%, 0 100%)',
              background: `linear-gradient(180deg, rgba(255,255,255,0.92) 0%, ${primaryColor}10 100%)`,
            }}
          />
          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
            <div
              className="w-11 h-11 rounded-full border-[3px] shadow-md flex items-center justify-center"
              style={{ backgroundColor: primaryColor, borderColor: `${primaryColor}66` }}
            >
              <Heart size={14} className="text-white" fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Floating letter card */}
        <motion.div
          className="absolute left-4 right-4 bg-white rounded-[24px] shadow-[0_24px_60px_rgba(0,0,0,0.15)] p-4 sm:p-5 text-center border flex flex-col items-center z-30"
          style={{ borderColor: `${primaryColor}20` }}
          initial={false}
          animate={{
            bottom: isOpen ? 120 : 52,
            y: isOpen ? -8 : 0,
            rotate: 0,
            scale: isOpen ? 1 : 0.975,
          }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(150deg, ${primaryColor}10 0%, transparent 35%, transparent 65%, ${primaryColor}12 100%)`,
            }}
          />

          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="w-full flex flex-col items-center relative z-10 pb-1"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={15} style={{ color: primaryColor }} />
                <p className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-slate-600 font-semibold">
                  Mừng cưới online
                </p>
                <Sparkles size={15} style={{ color: primaryColor }} />
              </div>

              <div
                className="w-40 h-40 sm:w-44 sm:h-44 mx-auto bg-white border rounded-2xl mb-4 p-2 shadow-sm relative"
                style={{ borderColor: `${primaryColor}25` }}
              >
                <div
                  className="absolute -inset-[1px] rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(140deg, ${primaryColor}22, transparent 30%, transparent 70%, ${primaryColor}2A)`,
                  }}
                />
                <img
                  src={qrImage}
                  alt="QR Code"
                  className="w-full h-full object-contain rounded-xl border border-slate-100"
                />
              </div>

              <p className="font-semibold text-slate-900 text-lg mb-1 leading-tight">{bank.bank_name}</p>
              <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-[0.2em]">{bank.owner_name}</p>

              <div className="bg-white w-full py-2.5 px-2 rounded-xl border border-slate-200 shadow-sm">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">Số tài khoản</p>
                <p className="font-mono font-bold text-[15px] sm:text-base tracking-[0.12em]" style={{ color: primaryColor }}>
                  {accountChunks.join(' ')}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-[180px] flex flex-col items-center justify-center relative z-10">
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart size={24} className="mb-2 opacity-70" style={{ color: primaryColor }} />
              </motion.div>
              <span className="text-slate-700 font-serif italic text-lg">Mừng Cưới</span>
              <p className="text-[11px] text-slate-500 mt-1 tracking-[0.1em] uppercase">Chạm để mở phong thư</p>
            </div>
          )}
        </motion.div>
      </div>

      <p className="absolute bottom-0 text-xs sm:text-sm text-slate-500 italic animate-pulse font-medium">
        {isOpen ? 'Chạm lại để đóng' : 'Nhấn vào phong bì để mở'}
      </p>
    </div>
  );
};

export default GiftEnvelope;
