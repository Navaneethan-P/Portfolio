import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  id: string;
  title: string;
  number?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, title, number, children, className = '' }: Props) {
  return (
    <section id={id} className={`py-28 px-6 relative z-10 ${className}`}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 flex items-end gap-4"
        >
          {number && (
            <span className="mono-text text-[11px] text-sky font-bold">{number}</span>
          )}
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-none">
              {title}
            </h2>
          </div>
          <div className="section-line flex-shrink-0 mb-2" />
        </motion.div>
        {children}
      </div>
    </section>
  );
}
