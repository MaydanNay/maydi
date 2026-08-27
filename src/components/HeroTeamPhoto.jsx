import { useEffect, useRef } from 'react';

import { ASSETS } from '../data/assets.js';

export const TEAM_PHOTO = ASSETS.team;

const MAX_SHIFT = 20;
const LERP = 0.07;
const SETTLE_EPSILON = 0.08;

export default function HeroTeamPhoto({ sectionRef }) {
  const trackRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const active = useRef(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return undefined;

    const stopTick = () => {
      if (raf.current) {
        cancelAnimationFrame(raf.current);
        raf.current = 0;
      }
    };

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;

      if (Math.abs(dx) < SETTLE_EPSILON && Math.abs(dy) < SETTLE_EPSILON) {
        current.current.x = target.current.x;
        current.current.y = target.current.y;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
        }
        raf.current = 0;
        return;
      }

      current.current.x += dx * LERP;
      current.current.y += dy * LERP;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    const scheduleTick = () => {
      if (!active.current || raf.current) return;
      raf.current = requestAnimationFrame(tick);
    };

    const updateTarget = (clientX, clientY) => {
      if (!active.current) return;

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
        scheduleTick();
        return;
      }

      const relX = (clientX - rect.left) / rect.width - 0.5;
      const relY = (clientY - rect.top) / rect.height - 0.5;

      target.current.x = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, -relX * 2 * MAX_SHIFT));
      target.current.y = Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, -relY * 2 * MAX_SHIFT));
      scheduleTick();
    };

    const onPointerMove = (event) => {
      updateTarget(event.clientX, event.clientY);
    };

    const section = sectionRef.current;
    section?.addEventListener('pointermove', onPointerMove, { passive: true });

    let observer;
    if (section) {
      observer = new IntersectionObserver(
        ([entry]) => {
          active.current = Boolean(entry?.isIntersecting);
          if (!active.current) {
            target.current.x = 0;
            target.current.y = 0;
            scheduleTick();
          }
        },
        { threshold: 0.05 },
      );
      observer.observe(section);
    }

    return () => {
      section?.removeEventListener('pointermove', onPointerMove);
      observer?.disconnect();
      stopTick();
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
