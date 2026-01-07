/**
 * Animation configuration constants for consistent performance
 * Using GPU-accelerated properties (transform, opacity)
 */

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
} as const;

export const ANIMATION_EASINGS = {
  easeOut: 'easeOut',
  easeInOut: 'easeInOut',
  spring: { type: 'spring', stiffness: 300, damping: 30 },
  power3: 'power3.out',
} as const;

/**
 * Framer Motion variants for common animations
 * Optimized for GPU rendering
 */
export const fadeInUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      delay,
      ease: ANIMATION_EASINGS.easeOut,
    },
  }),
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      delay,
    },
  }),
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      delay,
      ease: ANIMATION_EASINGS.easeOut,
    },
  }),
};

export const slideInVariants = {
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
};

/**
 * Hover animation configs
 * Limited to transform and opacity for performance
 */
export const hoverScale = {
  scale: 1.02,
  transition: { duration: ANIMATION_DURATIONS.fast },
};

export const hoverLift = {
  y: -8,
  transition: { duration: ANIMATION_DURATIONS.fast },
};

export const tapScale = {
  scale: 0.98,
};

/**
 * GSAP ScrollTrigger default config
 */
export const defaultScrollTriggerConfig = {
  start: 'top 80%',
  toggleActions: 'play none none none',
  once: true,
};