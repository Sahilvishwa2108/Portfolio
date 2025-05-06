import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * A hook that optimizes animations by only activating them when the element is in view
 * and disables them when out of view for better performance
 */
export function useOptimizedAnimation(
  threshold = 0.1, 
  triggerOnce = false,
  rootMargin = '0px'
) {
  const [isActive, setIsActive] = useState(false);
  const [ref, inView] = useInView({ 
    threshold,
    triggerOnce,
    rootMargin
  });

  useEffect(() => {
    // Add a small delay to prevent jank
    if (inView) {
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!triggerOnce) {
      setIsActive(false);
    }
  }, [inView, triggerOnce]);

  return { ref, isActive, inView };
}