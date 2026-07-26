import { useEffect, useRef } from 'react';
import { useLenis } from '../lenis/LenisProvider';
import { getScrollTop } from '../lenis/lenisInstance';

/** Tune feel */
const SENSITIVITY = 48;
const MAX_BLUR = 36;
const MAX_TINT = 0.78;
const DECAY = 0.86;
const LERP_SPEED = 0.14;

const IDLE_EPSILON = 0.004;

export default function PetrolScrollBlur() {
  const lenis = useLenis();
  const backdropRef = useRef(null);
  const tintRef = useRef(null);
  const lastScrollRef = useRef(0);
  const velocityRef = useRef(0);
  const displayRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const backdrop = backdropRef.current;
    const tint = tintRef.current;
    if (!backdrop || !tint) return undefined;

    lastScrollRef.current = getScrollTop();

    const applyStyles = () => {
      const intensity = displayRef.current;
      const blurPx = intensity * MAX_BLUR;
      const tintOpacity = intensity * MAX_TINT;

      if (blurPx < 0.5) {
        backdrop.style.opacity = '0';
        backdrop.style.backdropFilter = 'none';
        backdrop.style.webkitBackdropFilter = 'none';
        tint.style.opacity = '0';
        return;
      }

      backdrop.style.opacity = '1';
      const filter = `blur(${blurPx}px) saturate(140%) brightness(0.9)`;
      backdrop.style.backdropFilter = filter;
      backdrop.style.webkitBackdropFilter = filter;
      tint.style.opacity = String(tintOpacity);
    };

    const tick = () => {
      velocityRef.current *= DECAY;

      const target = Math.min(velocityRef.current / SENSITIVITY, 1);
      displayRef.current += (target - displayRef.current) * LERP_SPEED;

      applyStyles();

      const idle =
        velocityRef.current < IDLE_EPSILON && Math.abs(target - displayRef.current) < IDLE_EPSILON;

      if (idle) {
        displayRef.current = 0;
        velocityRef.current = 0;
        applyStyles();
        rafRef.current = 0;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    const scheduleTick = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const current = getScrollTop();
      const delta = Math.abs(current - lastScrollRef.current);
      lastScrollRef.current = current;
      velocityRef.current = Math.max(velocityRef.current, delta);
      scheduleTick();
    };

    if (lenis) {
      lenis.on('scroll', onScroll);
    } else {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      if (lenis) lenis.off('scroll', onScroll);
      else window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      backdrop.style.opacity = '0';
      backdrop.style.backdropFilter = 'none';
      backdrop.style.webkitBackdropFilter = 'none';
      tint.style.opacity = '0';
    };
  }, [lenis]);

  return (
    <div className="petrol-scroll-blur" aria-hidden>
      <div ref={backdropRef} className="petrol-scroll-blur__backdrop" />
      <div ref={tintRef} className="petrol-scroll-blur__sheen" />
    </div>
  );
}
