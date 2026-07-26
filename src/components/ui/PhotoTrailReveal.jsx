import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const BRUSH = 64;
const FADE_MS = 2000;
const MIN_STEP = 4;

export default function PhotoTrailReveal({ src }) {
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const colorRef = useRef(null);
  const pointsRef = useRef([]);
  const rafRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const [ready, setReady] = useState(false);

  const applyMask = useCallback(() => {
    const canvas = canvasRef.current;
    const color = colorRef.current;
    if (!canvas || !color) return;

    const url = canvas.toDataURL('image/png');
    color.style.maskImage = `url("${url}")`;
    color.style.webkitMaskImage = `url("${url}")`;
    color.style.maskSize = '100% 100%';
    color.style.webkitMaskSize = '100% 100%';
  }, []);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const { w, h, dpr } = sizeRef.current;
    if (!w || !h) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    const now = performance.now();
    pointsRef.current = pointsRef.current.filter((p) => now - p.t < FADE_MS);

    ctx.globalCompositeOperation = 'lighter';
    for (const p of pointsRef.current) {
      const life = 1 - (now - p.t) / FADE_MS;
      const r = BRUSH * (0.5 + life * 0.55);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, `rgba(255,255,255,${life})`);
      g.addColorStop(0.5, `rgba(255,255,255,${life * 0.45})`);
      g.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';

    applyMask();

    if (pointsRef.current.length > 0) {
      rafRef.current = requestAnimationFrame(paint);
    } else {
      rafRef.current = 0;
    }
  }, [applyMask]);

  const schedule = useCallback(() => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(paint);
  }, [paint]);

  const resize = useCallback(() => {
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    if (!frame || !canvas) return;

    const w = Math.max(1, Math.round(frame.clientWidth));
    const h = Math.max(1, Math.round(frame.clientHeight));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    sizeRef.current = { w, h, dpr };
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    applyMask();
    setReady(true);
  }, [applyMask]);

  useLayoutEffect(() => {
    if (!src) return;
    resize();
  }, [src, resize]);

  useEffect(() => {
    if (!src) return undefined;
    const frame = frameRef.current;
    if (!frame) return undefined;

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    ro?.observe(frame);
    window.addEventListener('resize', resize, { passive: true });

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [src, resize]);

  const onPointerMove = (e) => {
    if (!src) return;
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

    const points = pointsRef.current;
    const last = points[points.length - 1];
    const now = performance.now();

    if (!last) {
      points.push({ x, y, t: now });
    } else {
      const dist = Math.hypot(x - last.x, y - last.y);
      const steps = Math.max(1, Math.ceil(dist / MIN_STEP));
      for (let i = 1; i <= steps; i += 1) {
        const t = i / steps;
        points.push({
          x: last.x + (x - last.x) * t,
          y: last.y + (y - last.y) * t,
          t: now,
        });
      }
    }
    schedule();
  };

  if (!src) {
    return <div className="photo-trail photo-trail--empty" aria-hidden />;
  }

  return (
    <div
      ref={frameRef}
      className="photo-trail"
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerMove}
    >
      <img className="photo-trail__img photo-trail__img--gray" src={src} alt="" draggable={false} />
      <div
        ref={colorRef}
        className={`photo-trail__color${ready ? ' photo-trail__color--ready' : ''}`}
      >
        <img className="photo-trail__img" src={src} alt="" draggable={false} />
      </div>
      <canvas ref={canvasRef} className="photo-trail__canvas" aria-hidden />
    </div>
  );
}
