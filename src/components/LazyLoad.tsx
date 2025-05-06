"use client";
import { Suspense, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface LazyLoadProps {
  children: React.ReactNode;
  threshold?: number;
  fallback?: React.ReactNode;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  threshold = 0.1,
  fallback = <div className="min-h-[200px] w-full flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      setShouldRender(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full">
      {shouldRender ? (
        <Suspense fallback={fallback}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};