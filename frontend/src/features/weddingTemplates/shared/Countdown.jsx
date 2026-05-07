import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate, primaryColor = '#1f2937' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const items = [
    { label: 'Ngày', value: timeLeft.days },
    { label: 'Giờ', value: timeLeft.hours },
    { label: 'Phút', value: timeLeft.minutes },
    { label: 'Giây', value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-8 py-8">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div 
            className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100"
            style={{ color: primaryColor }}
          >
            <span className="text-2xl sm:text-3xl font-light">{item.value}</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] mt-3 text-slate-400 font-medium">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default Countdown;
