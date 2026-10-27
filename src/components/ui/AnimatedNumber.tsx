import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  value: number;
  /** Display format, e.g. formatPrice; defaults to the plain number */
  format?: (value: number) => string;
  className?: string;
};

/** Number that rolls to its new value (prices, result counts). */
export default function AnimatedNumber({ value, format = String, className }: Props) {
  return (
    <span className="relative inline-flex overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-60%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '60%', opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          {format(value)}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
