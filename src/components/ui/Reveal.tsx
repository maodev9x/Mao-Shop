import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type Props = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  /** false = fade back out when the block leaves the viewport */
  once?: boolean;
  as?: 'div' | 'section';
};

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 48 },
  down: { y: -48 },
  left: { x: 48 },
  right: { x: -48 },
  none: {},
};

/** Fades a block in as it scrolls into view and out again as it leaves. */
export default function Reveal({ children, className, direction = 'up', delay = 0, once = false, as = 'div' }: Props) {
  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.98, ...offset[direction] },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const Component = as === 'section' ? motion.section : motion.div;

  return (
    <Component
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12, margin: '0px 0px -40px 0px' }}
    >
      {children}
    </Component>
  );
}

/** Container that staggers its <RevealItem> children. */
export function RevealGroup({ children, className, stagger = 0.06 }: { children: ReactNode; className?: string; stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  );
}
