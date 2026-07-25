import { useEffect, useRef } from 'react';

export const TEAM_PHOTO = '/assets/team.jpg';

const MAX_SHIFT = 20;
const LERP = 0.07;

export default function HeroTeamPhoto({ sectionRef }) {
  const trackRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * LERP;
      current.current.y += (target.current.y - current.current.y) * LERP;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    const updateTarget = (clientX, clientY) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const inside =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;

      if (!inside) {
        target.current.x = 0;
        target.current.y = 0;
        return;
      }

      const relX = (clientX - rect.left) / rect.width - 0.5;
      const relY = (clientY - rect.top) / rect.height - 0.5;

      target.current.x = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, -relX * 2 * MAX_SHIFT));
      target.current.y = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, -relY * 2 * MAX_SHIFT));
    };

    const onPointerMove = (event) => {
      updateTarget(event.clientX, event.clientY);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(raf.current);
    };
  }, [sectionRef]);

  return (
    <div className="hero-team-photo" aria-hidden>
      <div ref={trackRef} className="hero-team-photo__track">
        <img className="hero-team-photo__img" src={TEAM_PHOTO} alt="" draggable={false} />
      </div>
      <div className="hero-team-photo__veil" />
    </div>
  );
}
