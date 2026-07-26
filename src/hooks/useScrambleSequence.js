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
  const holdTimeoutRef = useRef(0);
  const indexRef = useRef(0);
  const fromRef = useRef(BRAND_STATES[0]);
  const targetRef = useRef(BRAND_STATES[1]);
  const scrambleStartRef = useRef(0);

  useEffect(() => {
    const clearTimers = () => {
      clearTimeout(holdTimeoutRef.current);
      cancelAnimationFrame(frameRef.current);
    };

    const enterHold = (index) => {
      const current = BRAND_STATES[index];
      indexRef.current = index;
      setDisplay(current);
      setMidVariant(current.mid === 'dan' ? 'dan' : 'di');
      setIsSettled(true);

      holdTimeoutRef.current = setTimeout(() => {
        const nextIndex = (index + 1) % BRAND_STATES.length;
        fromRef.current = current;
        targetRef.current = BRAND_STATES[nextIndex];
        indexRef.current = nextIndex;
        setMidVariant(targetRef.current.mid === 'dan' ? 'dan' : 'di');
        setIsSettled(false);
        scrambleStartRef.current = performance.now();
        frameRef.current = requestAnimationFrame(scrambleTick);
      }, BRAND_HOLDS_MS[index] ?? 1800);
    };

    const scrambleTick = (now) => {
      const progress = Math.min((now - scrambleStartRef.current) / BRAND_SCRAMBLE_MS, 1);

      setDisplay({
        mid: scrambleMorph(fromRef.current.mid, targetRef.current.mid, progress),
        tail: scrambleMorph(fromRef.current.tail, targetRef.current.tail, progress),
      });

      if (progress >= 1) {
        enterHold(indexRef.current);
        return;
      }

      frameRef.current = requestAnimationFrame(scrambleTick);
    };

    enterHold(0);
    return clearTimers;
  }, []);

  return {
    display,
    isAccentMid: midVariant === 'dan',
    hasTail: display.tail.length > 0,
    underlineMaydan: isSettled && display.mid === 'dan' && display.tail === '',
    underlineDiana: isSettled && display.mid === 'di' && display.tail === 'ana',
  };
}
