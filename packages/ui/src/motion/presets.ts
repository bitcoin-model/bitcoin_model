import { Variants, Transition } from 'framer-motion';

const transition: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.9
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition },
  exit: { opacity: 0, y: -12, transition: { ...transition, duration: 0.2 } }
};

export const fadeInScale: Variants = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1, transition },
  exit: { opacity: 0, scale: 0.9, transition: { ...transition, duration: 0.25 } }
};

export const slideIn: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0, transition },
  exit: { opacity: 0, x: 24, transition: { ...transition, duration: 0.2 } }
};

export const staggerContainer = (stagger = 0.08): Variants => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: stagger, delayChildren: 0.1 }
  }
});

export const glowPulse: Variants = {
  animate: {
    boxShadow: ['0 0 0 0 rgba(45,212,191,0.0)', '0 0 0 6px rgba(45,212,191,0.3)', '0 0 0 0 rgba(45,212,191,0.0)'],
    transition: { duration: 2.4, repeat: Infinity }
  }
};

export const routeTransition: Variants = {
  initial: { opacity: 0, filter: 'blur(12px)', y: 12 },
  animate: { opacity: 1, filter: 'blur(0px)', y: 0, transition },
  exit: { opacity: 0, filter: 'blur(8px)', y: -8, transition: { ...transition, duration: 0.25 } }
};

export type MotionPreset = Variants | ReturnType<typeof staggerContainer>;
