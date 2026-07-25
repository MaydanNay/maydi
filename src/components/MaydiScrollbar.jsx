import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLenis } from '../lenis/LenisProvider';
import { getLenisInstance, getScrollMetrics } from '../lenis/lenisInstance';

/**
 * Custom thin thumb-only scrollbar (hides native OS chrome).
 */
export default function MaydiScrollbar() {
  const lenis = useLenis();
  const thumbRef = useRef(null);
  const dragging = useRef(false);
  const dragOffset = useRef(0);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const sync = () => {
      const { scrollTop, scrollHeight, clientHeight } = getScrollMetrics();
      const canScroll = scrollHeight > clientHeight + 1;
      setVisible(canScroll);

      const thumb = thumbRef.current;
      if (!canScroll || !thumb) return;

      const track = clientHeight;
      const ratio = clientHeight / scrollHeight;
      const thumbH = Math.max(32, Math.round(track * ratio));
      const maxTop = track - thumbH;
      const top =
        scrollHeight <= clientHeight
          ? 0
          : Math.round((scrollTop / (scrollHeight - clientHeight)) * maxTop);

      thumb.style.height = `${thumbH}px`;
      thumb.style.transform = `translateY(${top}px)`;
    };

    sync();
    requestAnimationFrame(sync);

    if (lenis) {
      lenis.on('scroll', sync);
    } else {
      window.addEventListener('scroll', sync, { passive: true });
    }

    window.addEventListener('resize', sync);

    const ro = new ResizeObserver(sync);
    ro.observe(document.documentElement);
    if (document.body) ro.observe(document.body);

    return () => {
      if (lenis) lenis.off('scroll', sync);
      else window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
      ro.disconnect();
    };
  }, [lenis]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current || !thumbRef.current) return;
      const instance = getLenisInstance();
      const { scrollHeight, clientHeight } = getScrollMetrics();
      const thumbH = thumbRef.current.offsetHeight;
      const maxTop = clientHeight - thumbH;
      const y = e.clientY - dragOffset.current;
      const clamped = Math.min(maxTop, Math.max(0, y));
      const progress = maxTop <= 0 ? 0 : clamped / maxTop;
      const target = progress * (scrollHeight - clientHeight);

      if (instance) instance.scrollTo(target, { immediate: true });
      else window.scrollTo({ top: target, behavior: 'auto' });
    };

    const onUp = () => {
      dragging.current = false;
      document.body.style.userSelect = '';
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <div
      className="maydi-scrollbar"
      aria-hidden
      style={{ opacity: visible ? 1 : 0, visibility: visible ? 'visible' : 'hidden' }}
    >
      <button
        type="button"
        ref={thumbRef}
        className="maydi-scrollbar__thumb"
        tabIndex={-1}
        onPointerDown={(e) => {
          dragging.current = true;
          dragOffset.current = e.clientY - (thumbRef.current?.getBoundingClientRect().top ?? 0);
          document.body.style.userSelect = 'none';
          e.preventDefault();
        }}
        aria-label="Scroll"
      />
    </div>
  );
}
