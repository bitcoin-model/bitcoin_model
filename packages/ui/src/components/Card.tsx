'use client';

import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { fadeInUp } from '../motion/presets';

export type CardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  className?: string;
}>;

export const Card = ({ children, title, description, className }: CardProps) => (
  <motion.section
    variants={fadeInUp}
    initial="initial"
    animate="animate"
    className={clsx(
      'rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 p-6 shadow-glass backdrop-blur-glass transition-colors duration-theme',
      className
    )}
  >
    {(title || description) && (
      <header className="mb-4">
        {title && <h2 className="font-display text-xl text-[var(--color-text-primary)]">{title}</h2>}
        {description && <p className="text-sm text-[var(--color-text-secondary)]">{description}</p>}
      </header>
    )}
    {children}
  </motion.section>
);
