import { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { setLenisInstance } from './lenisInstance';

const LenisContext = createContext(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const instance = new Lenis({
      lerp: 0.05,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.06,
      wheelMultiplier: 1.05,
      touchMultiplier: 1.4,
      autoRaf: false,
    });

    document.documentElement.classList.add('lenis', 'lenis-smooth');
    setLenisInstance(instance);
    setLenis(instance);

    let rafId = 0;
    const raf = (time) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      setLenisInstance(null);
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    requestAnimationFrame(() => lenis.resize());
  }, [lenis, pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
