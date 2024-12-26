"use client"
import { useRef, useEffect, useState, ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface AnimatedContainerProps {
  children: ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
}

export const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  distance = 100,
  direction = 'vertical',
  reverse = false
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current); // Unobserve after triggering the animation
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const directions = {
    vertical: 'Y',
    horizontal: 'X'
  };

  const springProps = useSpring({
    from: { transform: `translate${directions[direction]}(${reverse ? `-${distance}px` : `${distance}px`})` },
    to: { transform: `translate${directions[direction]}(0px)` },
    config: { tension: 50, friction: 25 },
    reset: inView,
  });

  return (
    <animated.div ref={ref} style={springProps}>
      {children}
    </animated.div>
  );
};
