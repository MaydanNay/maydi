import { useEffect, useRef } from 'react';
import { useLenis } from '../lenis/LenisProvider';

const MOBILE_MAX = 767;

export function useStickyHorizontalScroll() {
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    const scrollEl = scrollRef.current;
    const track = trackRef.current;
    if (!scrollEl || !track) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let maxShift = 0;
    let raf = 0;

    const isMobile = () => window.innerWidth <= MOBILE_MAX;

    const measure = () => {
      const viewWidth = track.parentElement?.clientWidth ?? window.innerWidth;
      maxShift = Math.max(0, track.scrollWidth - viewWidth);

      if (reducedMotion || isMobile()) {
        scrollEl.style.height = '';
        track.style.transform = '';
        return;
      }

      scrollEl.style.height = `${window.innerHeight + maxShift}px`;
    };

    const update = () => {
      raf = 0;

      if (reducedMotion || isMobile() || maxShift <= 0) {
        track.style.transform = '';
        return;
      }

      const rect = scrollEl.getBoundingClientRect();
      const scrollable = scrollEl.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      track.style.transform = `translate3d(${-progress * maxShift}px, 0, 0)`;
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    schedule();

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            measure();
            schedule();
          })
        : null;

    window.addEventListener('resize', onResize, { passive: true });
    ro?.observe(track);

    if (lenis) lenis.on('scroll', schedule);
    else window.addEventListener('scroll', schedule, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
      if (lenis) lenis.off('scroll', schedule);
      else window.removeEventListener('scroll', schedule);
      if (raf) cancelAnimationFrame(raf);
      scrollEl.style.height = '';
      track.style.transform = '';
    };
  }, [lenis]);

  return { scrollRef, trackRef };
}
