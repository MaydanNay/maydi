import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const SPRING = 0.065;
const DAMPING = 0.82;
const CURSOR_OFFSET = 18;
const PREVIEW_MAX_WIDTH = 280;

function computeTarget(clientX, clientY, width, height) {
  let x = clientX + CURSOR_OFFSET;
  let y = clientY + CURSOR_OFFSET;

  if (y + height > window.innerHeight - 12) {
    y = clientY - height - CURSOR_OFFSET;
  }

  if (x + width > window.innerWidth - 12) {
    x = clientX - width - CURSOR_OFFSET;
  }

  x = Math.max(12, Math.min(x, window.innerWidth - width - 12));
  y = Math.max(12, Math.min(y, window.innerHeight - height - 12));

  return { x, y };
}

function applyTransform(layer, x, y) {
  if (layer) {
    layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
}

export default function ProjectCursorPreview({ active, pointerRef }) {
  const layerRef = useRef(null);
  const frameRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const activeRef = useRef(active);
  const [ratio, setRatio] = useState(1.93);

  activeRef.current = active;

  const syncPointer = (x, y) => {
    if (x == null || y == null) return;
    mouse.current = { x, y };
  };

  useLayoutEffect(() => {
    if (!active?.preview?.image) return;

    const ptr = pointerRef?.current;
    const x = ptr?.x ?? active.x ?? 0;
    const y = ptr?.y ?? active.y ?? 0;
    syncPointer(x, y);

    const w = frameRef.current?.offsetWidth || PREVIEW_MAX_WIDTH;
    const h = frameRef.current?.offsetHeight || w / ratio;
    const target = computeTarget(x, y, w, h);

    current.current = { x: target.x, y: target.y };
    velocity.current = { x: 0, y: 0 };
    applyTransform(layerRef.current, target.x, target.y);
  }, [active?.preview?.image, active?.x, active?.y, pointerRef]);

  useEffect(() => {
    if (!active?.preview?.image) return undefined;

    const onMove = (event) => {
      syncPointer(event.clientX, event.clientY);
      if (pointerRef) {
        pointerRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    const tick = () => {
      if (!activeRef.current?.preview?.image) return;

      const frame = frameRef.current;
      const w = frame?.offsetWidth || PREVIEW_MAX_WIDTH;
      const h = frame?.offsetHeight || w / ratio;
      const target = computeTarget(mouse.current.x, mouse.current.y, w, h);

      velocity.current.x = (velocity.current.x + (target.x - current.current.x) * SPRING) * DAMPING;
      velocity.current.y = (velocity.current.y + (target.y - current.current.y) * SPRING) * DAMPING;
      current.current.x += velocity.current.x;
      current.current.y += velocity.current.y;

      applyTransform(layerRef.current, current.current.x, current.current.y);
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
    };
  }, [active?.preview?.image, pointerRef, ratio]);

  if (!active?.preview?.image) return null;

  const { preview, label } = active;

  const image = (
    <div
      ref={frameRef}
      className="projects-scatter__preview-frame"
      style={{
        width: `min(${PREVIEW_MAX_WIDTH}px, 40vw)`,
        aspectRatio: String(ratio),
      }}
    >
      <img
        key={preview.image}
        className="projects-scatter__preview-img"
        src={preview.image}
        alt=""
        draggable={false}
        onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget;
          if (naturalWidth > 0 && naturalHeight > 0) {
            setRatio(naturalWidth / naturalHeight);
          }
        }}
      />
    </div>
  );

  const node = (
    <div ref={layerRef} className="projects-scatter__cursor-preview">
      {preview.href ? (
        <a
          href={preview.href}
          target="_blank"
          rel="noreferrer"
          className="projects-scatter__preview-link"
          aria-label={label}
        >
          {image}
        </a>
      ) : (
        <div className="projects-scatter__preview-link">{image}</div>
      )}
    </div>
  );

  return createPortal(node, document.body);
}
