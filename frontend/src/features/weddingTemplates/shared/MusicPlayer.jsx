import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = ({ url, primaryColor = '#C9748F' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (url) {
      audioRef.current = new Audio(url);
      audioRef.current.loop = true;
    }
    
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    
    return () => {
      audioRef.current?.pause();
      clearTimeout(timer);
    };
  }, [url]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
    setIsPlaying(!isPlaying);
    setShowTooltip(false);
  };

  if (!url) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white px-4 py-2 rounded-full shadow-lg border text-xs font-medium whitespace-nowrap"
            style={{ borderColor: `${primaryColor}30`, color: primaryColor }}
          >
            Chạm để nghe nhạc ✨
          </motion.div>
        )}
      </AnimatePresence>
      
      <button 
        onClick={toggleMusic} 
        className="w-12 h-12 rounded-full bg-white shadow-lg border flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group"
        style={{ borderColor: `${primaryColor}30` }}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 size={20} style={{ color: primaryColor }} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: primaryColor }}></span>
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: primaryColor }}></span>
            </span>
          </div>
        ) : (
          <VolumeX size={20} className="text-slate-400 group-hover:text-slate-600" />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
