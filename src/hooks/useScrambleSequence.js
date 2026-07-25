import { useEffect, useRef, useState } from 'react';
import {
  BRAND_HOLDS_MS,
  BRAND_SCRAMBLE_MS,
  BRAND_STATES,
  scrambleMorph,
} from './brandSequence';

export function useScrambleSequence() {
  const [display, setDisplay] = useState(BRAND_STATES[0]);
  const [midVariant, setMidVariant] = useState('di');
  const [isSettled, setIsSettled] = useState(true);
  const frameRef = useRef(0);
  const indexRef = useRef(0);
  const phaseRef = useRef('hold');
  const startRef = useRef(0);
  const fromRef = useRef(BRAND_STATES[0]);
  const targetRef = useRef(BRAND_STATES[1]);

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now) => {
      const index = indexRef.current;
      const current = BRAND_STATES[index];
      const elapsed = now - startRef.current;

      if (phaseRef.current === 'hold') {
        setDisplay(current);
        setMidVariant(current.mid === 'dan' ? 'dan' : 'di');
        setIsSettled(true);

        if (elapsed >= (BRAND_HOLDS_MS[index] ?? 1800)) {
          const nextIndex = (index + 1) % BRAND_STATES.length;
          fromRef.current = current;
          targetRef.current = BRAND_STATES[nextIndex];
          indexRef.current = nextIndex;
          phaseRef.current = 'scramble';
          startRef.current = now;
          setMidVariant(targetRef.current.mid === 'dan' ? 'dan' : 'di');
          setIsSettled(false);
        }
      } else {
        setIsSettled(false);
        const progress = Math.min(elapsed / BRAND_SCRAMBLE_MS, 1);
        setDisplay({
          mid: scrambleMorph(fromRef.current.mid, targetRef.current.mid, progress),
          tail: scrambleMorph(fromRef.current.tail, targetRef.current.tail, progress),
        });

        if (progress >= 1) {
          setDisplay(targetRef.current);
          setMidVariant(targetRef.current.mid === 'dan' ? 'dan' : 'di');
          phaseRef.current = 'hold';
          startRef.current = now;
        }
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return {
    display,
    isAccentMid: midVariant === 'dan',
    hasTail: display.tail.length > 0,
    underlineMaydan: isSettled && display.mid === 'dan' && display.tail === '',
    underlineDiana: isSettled && display.mid === 'di' && display.tail === 'ana',
  };
}
