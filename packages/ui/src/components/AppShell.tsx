'use client';

import { PropsWithChildren, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { fadeInScale, slideIn, staggerContainer } from '../motion/presets';

export type AppShellProps = PropsWithChildren<{
  sidebar?: ReactNode;
  header?: ReactNode;
  className?: string;
}>;

export const AppShell = ({ children, sidebar, header, className }: AppShellProps) => {
  return (
    <div className={clsx('min-h-screen bg-[var(--color-bg-base)] text-[var(--color-text-primary)] transition-colors duration-theme', className)}>
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_top,var(--gradient-hero),transparent_65%)]">
        <motion.header
          variants={fadeInScale}
          initial="initial"
          animate="animate"
          className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-surface)]/80 px-6 py-4 backdrop-blur-glass shadow-glass"
        >
          {header}
        </motion.header>
        <div className="grid min-h-[calc(100vh-80px)] grid-cols-1 lg:grid-cols-[320px_1fr]">
          {sidebar && (
            <motion.aside
              variants={slideIn}
              initial="initial"
              animate="animate"
              className="hidden border-r border-[var(--color-border)] bg-[var(--color-bg-surface)]/70 p-6 backdrop-blur-glass shadow-inner-glow lg:block"
            >
              {sidebar}
            </motion.aside>
          )}
          <motion.main
            variants={staggerContainer()}
            initial="initial"
            animate="animate"
            className="relative flex flex-col gap-6 bg-[var(--color-bg-base)]/92 p-6"
          >
            {children}
          </motion.main>
        </div>
      </div>
    </div>
  );
};
