import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * DEPRECATED: Use useThrottledIsMobile from useThrottledResize.ts instead
 * This hook is kept for backwards compatibility but will cause unnecessary re-renders
 * 
 * Optimized version with throttling available at:
 * import { useThrottledIsMobile } from './useThrottledResize'
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  React.useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      }, 150); // Throttle resize events
    };

    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}