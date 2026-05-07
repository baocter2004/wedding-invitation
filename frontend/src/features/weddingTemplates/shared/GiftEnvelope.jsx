import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const GiftEnvelope = ({ bank, primaryColor = '#D98BA5' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-full max-w-sm mx-auto h-[350px] sm:h-[400px] flex items-center justify-center perspective-1000">
      <div
        className="relative w-72 sm:w-80 h-44 sm:h-48 cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        {/* Envelope Back */}
        <div
          className="absolute inset-0 rounded-md shadow-inner border transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundColor: `${primaryColor}15`, borderColor: `${primaryColor}30` }}
        ></div>

        {/* Card sliding out */}
        <motion.div
          className="absolute left-4 right-4 bg-white rounded-lg shadow-xl p-4 sm:p-5 text-center border flex flex-col items-center justify-center z-10"
          style={{ borderColor: `${primaryColor}20` }}
          initial={{ bottom: '10px', height: '160px' }}
          animate={{
            bottom: isOpen ? '120px' : '10px',
            height: isOpen ? '320px' : '160px'
          }}
          transition={{ duration: 0.8, delay: isOpen ? 0.3 : 0, ease: 'backOut' }}
        >
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-40 h-40 mx-auto bg-white border rounded-xl mb-4 p-2 shadow-sm" style={{ borderColor: `${primaryColor}20` }}>
                <img
                  src={bank.qr_image_path || 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg'}
                  alt="QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="font-bold text-slate-800 text-lg mb-1 leading-tight">{bank.bank_name}</p>
              <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-widest">{bank.owner_name}</p>
              <div className="bg-slate-50 w-full py-2 rounded-lg border border-slate-100">
                <p className="font-mono font-bold text-base sm:text-lg tracking-wider" style={{ color: primaryColor }}>{bank.account_number}</p>
              </div>
            </motion.div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Heart size={24} className="mb-2 opacity-50" style={{ color: primaryColor }} />
              <span className="text-slate-600 font-serif italic text-lg">Thiệp Hồng</span>
            </div>
          )}
        </motion.div>

        {/* Envelope Front Left Flap */}
        <div
          className="absolute inset-0 rounded-md shadow-[2px_0_10px_rgba(0,0,0,0.05)] border-r z-20 pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}20`, clipPath: 'polygon(0 0, 50% 50%, 0 100%)', backdropFilter: 'blur(4px)' }}
        ></div>

        {/* Envelope Front Right Flap */}
        <div
          className="absolute inset-0 rounded-md shadow-[-2px_0_10px_rgba(0,0,0,0.05)] border-l z-20 pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundColor: `${primaryColor}10`, borderColor: `${primaryColor}20`, clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)', backdropFilter: 'blur(4px)' }}
        ></div>

        {/* Envelope Front Bottom Flap */}
        <div
          className="absolute inset-0 rounded-md shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t z-30 pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundColor: `${primaryColor}20`, borderColor: `${primaryColor}30`, clipPath: 'polygon(0 100%, 100% 100%, 50% 50%)', backdropFilter: 'blur(4px)' }}
        ></div>

        {/* Envelope Top Flap (Animated) */}
        <motion.div
          className="absolute inset-0 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.1)] border-b z-40 origin-top pointer-events-none transition-transform duration-300 group-hover:scale-[1.02]"
          style={{ backgroundColor: `${primaryColor}30`, borderColor: `${primaryColor}40`, clipPath: 'polygon(0 0, 100% 0, 50% 50%)', backdropFilter: 'blur(4px)' }}
          initial={{ rotateX: 0 }}
          animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 5 : 40 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Wax Seal */}
          <div
            className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-lg flex items-center justify-center border-4"
            style={{ backgroundColor: primaryColor, borderColor: `${primaryColor}40` }}
          >
            <Heart size={16} className="text-white opacity-90" fill="currentColor" />
          </div>
        </motion.div>
      </div>

      {!isOpen && (
        <p className="absolute bottom-4 sm:bottom-8 text-xs sm:text-sm text-slate-500 italic animate-pulse font-medium">
          Nhấn vào phong bì để mở
        </p>
      )}
    </div>
  );
};

export default GiftEnvelope;
