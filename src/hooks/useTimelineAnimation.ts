import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export const useTimelineAnimation = () => {
  const controls = useAnimation();
  const entryRef = useRef(null);
  const inView = useInView(entryRef, { once: true, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start({ x: 0, opacity: 1 });
    }
  }, [inView, controls]);

  return { controls, entryRef };
};