import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function Digit({ value }: { value: string }) {
  return (
    <span className="relative block h-8 w-9 overflow-hidden rounded-md bg-white text-base font-extrabold text-ink shadow-inner sm:h-10 sm:w-11 sm:text-xl">
      <AnimatePresence initial={false}>
        <motion.span
          key={value}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** Counts down to `target`; digits flip when they change. */
export default function Countdown({ target }: { target: number }) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const left = Math.max(0, Math.floor((target - now) / 1000));
  const parts = [Math.floor(left / 86400), Math.floor((left % 86400) / 3600), Math.floor((left % 3600) / 60), left % 60];

  return (
    <div className="flex items-center gap-1.5" aria-label="Thời gian còn lại">
      {parts.map((v, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <Digit value={pad(v)} />
          {i < parts.length - 1 && <span className="font-bold text-white">:</span>}
        </span>
      ))}
    </div>
  );
}
