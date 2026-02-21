import { motion } from 'motion/react';

interface MarqueeProps {
  items: string[];
  direction?: 'left' | 'right';
  speed?: number;
  className?: string;
}

export function Marquee({ items, direction = 'left', speed = 20, className = "" }: MarqueeProps) {
  return (
    <div className={`overflow-hidden flex whitespace-nowrap ${className}`}>
      <motion.div
        className="flex gap-8 items-center"
        initial={{ x: direction === 'left' ? 0 : '-100%' }}
        animate={{ x: direction === 'left' ? '-100%' : 0 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span key={idx} className="inline-block text-sm font-bold uppercase tracking-widest px-4">
            {item}
          </span>
        ))}
      </motion.div>
      <motion.div
        className="flex gap-8 items-center"
        initial={{ x: direction === 'left' ? 0 : '-100%' }}
        animate={{ x: direction === 'left' ? '-100%' : 0 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {[...items, ...items, ...items, ...items].map((item, idx) => (
          <span key={`dup-${idx}`} className="inline-block text-sm font-bold uppercase tracking-widest px-4">
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
