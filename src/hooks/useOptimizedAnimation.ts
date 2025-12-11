import { useEffect, useState, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * A hook that optimizes animations by only activating them when the element is in view
 * Uses proper rootMargin format and better thresholds for smoother transitions
 */
export function useOptimizedAnimation(
  threshold = 0.2, 
  triggerOnce = true,
  rootMargin = '-50px 0px -50px 0px' // top, right, bottom, left - triggers when element is 50px into viewport
) {
  const [isActive, setIsActive] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  const { ref, inView } = useInView({ 
    threshold,
    triggerOnce,
    rootMargin
  });

  useEffect(() => {
    if (inView && !hasAnimated) {
      // Small delay for smoother batch animations
      const timer = setTimeout(() => {
        setIsActive(true);
        if (triggerOnce) {
          setHasAnimated(true);
        }
      }, 50);
      return () => clearTimeout(timer);
    } else if (!inView && !triggerOnce && hasAnimated) {
      // For non-triggerOnce, reset when out of view
      setIsActive(false);
    }
  }, [inView, triggerOnce, hasAnimated]);

  return { ref, isActive, inView };
}