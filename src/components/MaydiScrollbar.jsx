import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * Custom thin thumb-only scrollbar for #root (hides native OS chrome).
 */
export default function MaydiScrollbar() {
  const thumbRef = useRef(null);
  const dragging = useRef(false);
  const dragOffset = useRef(0);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const root = document.getElementById('root');
    if (!root) return undefined;

    const sync = () => {
      const { scrollTop, scrollHeight, clientHeight } = root;
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
    // Re-sync after paint so thumb exists when visibility flips on
    requestAnimationFrame(sync);

    root.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);

    const ro = new ResizeObserver(sync);
    ro.observe(root);
    if (root.firstElementChild) ro.observe(root.firstElementChild);

    return () => {
      root.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
      ro.disconnect();
    };
  }, []);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return undefined;

    const onMove = (e) => {
      if (!dragging.current || !thumbRef.current) return;
      const { scrollHeight, clientHeight } = root;
      const thumbH = thumbRef.current.offsetHeight;
      const maxTop = clientHeight - thumbH;
      const y = e.clientY - dragOffset.current;
      const clamped = Math.min(maxTop, Math.max(0, y));
      const progress = maxTop <= 0 ? 0 : clamped / maxTop;
      root.scrollTop = progress * (scrollHeight - clientHeight);
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
