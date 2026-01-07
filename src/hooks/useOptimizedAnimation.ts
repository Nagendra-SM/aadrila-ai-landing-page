import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
  trigger?: string | Element | null;
  start?: string;
  toggleActions?: string;
}

/**
 * Optimized GSAP animation hook with automatic cleanup
 * Prevents animation re-execution and memory leaks
 */
export function useGSAPAnimation<T extends Element>(
  config: AnimationConfig | AnimationConfig[],
  dependencies: React.DependencyList = []
) {
  const elementRefs = useRef<(T | null)[]>([]);
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const configs = Array.isArray(config) ? config : [config];

    contextRef.current = gsap.context(() => {
      configs.forEach((cfg, index) => {
        const element = elementRefs.current[index];
        if (!element) return;

        gsap.fromTo(element, cfg.from, {
          ...cfg.to,
          scrollTrigger: cfg.trigger ? {
            trigger: cfg.trigger || element,
            start: cfg.start || 'top 80%',
            toggleActions: cfg.toggleActions || 'play none none none',
          } : undefined,
        });
      });
    });

    return () => {
      contextRef.current?.revert();
    };
  }, dependencies);

  const setRef = useCallback((index: number) => (el: T | null) => {
    elementRefs.current[index] = el;
  }, []);

  return { setRef, elementRefs: elementRefs.current };
}

/**
 * Hook for managing intervals with proper cleanup
 */
export function useAnimationInterval(
  callback: () => void,
  delay: number | null,
  immediate: boolean = false
) {
  const savedCallback = useRef(callback);

  // Update callback ref
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) return;

    if (immediate) {
      savedCallback.current();
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay, immediate]);
}