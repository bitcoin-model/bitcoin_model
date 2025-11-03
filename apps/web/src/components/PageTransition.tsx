'use client';

import { PropsWithChildren } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { routeTransition } from '@bitcoin24/ui';

export const PageTransition = ({ children }: PropsWithChildren) => (
  <AnimatePresence mode="wait">
    <motion.div key={(children as any)?.key ?? 'page'} variants={routeTransition} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  </AnimatePresence>
);
