import { useEffect, useState } from 'react';

/**
 * Throttled resize hook to prevent excessive re-renders
 * @param delay - Throttle delay in milliseconds (default: 150ms)
 * @returns Current window dimensions
 */
export function useThrottledResize(delay: number = 150) {
  const [dimensions, setDimensions] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  }));

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, delay);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [delay]);

  return dimensions;
}

/**
 * Optimized hook that only returns boolean for mobile state
 * @param breakpoint - Mobile breakpoint in pixels (default: 768)
 * @returns Boolean indicating if viewport is mobile
 */
export function useThrottledIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth < breakpoint;
        setIsMobile(mobile);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
}