import { createElement, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export const REVEAL_EASE = [0.16, 1, 0.3, 1];
export const REVEAL_VIEWPORT = { once: false, margin: '-8% 0px', amount: 0.35 };

/** Long copy uses one mask instead of hundreds of motion nodes. */
const COMPACT_WORD_THRESHOLD = 8;

function splitUnits(value, mode) {
  if (!value) return [];

  if (mode === 'lines') {
    return value.split('\n').filter((line) => line.length > 0);
  }

  if (mode === 'chars') {
    return [...value];
  }

  if (mode === 'block') {
    return [value];
  }

  return value.split(/(\s+)/).filter((part) => part.length > 0);
}

function resolveMode(mode, units) {
  if (mode !== 'words') return mode;
  if (units.length > COMPACT_WORD_THRESHOLD) return 'block';
  return 'words';
}

export default function RevealText({
  as: Tag = 'span',
  text,
  children,
  mode = 'words',
  className = '',
  delay = 0,
  stagger = 0.032,
  duration = 0.88,
  trigger = 'view',
  viewport = REVEAL_VIEWPORT,
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const content = text ?? (typeof children === 'string' ? children : '');
  const rawUnits = useMemo(() => splitUnits(String(content), mode), [content, mode]);
  const effectiveMode = useMemo(() => resolveMode(mode, rawUnits), [mode, rawUnits]);
  const units = useMemo(
    () => (effectiveMode === 'block' ? [String(content)] : rawUnits),
    [effectiveMode, rawUnits, content],
  );

  if (reduceMotion || units.length === 0) {
    return createElement(Tag, { className, ...rest }, content || children);
  }

  const motionProps =
    trigger === 'mount'
      ? { initial: 'hidden', animate: 'visible' }
      : { initial: 'hidden', whileInView: 'visible', viewport };

  const isBlock = effectiveMode === 'block' || effectiveMode === 'lines';
  const blockStagger = isBlock ? 0 : stagger;

  const containerVariants = {
    hidden: {
      transition: {
        staggerChildren: blockStagger,
        staggerDirection: -1,
      },
    },
    visible: {
      transition: {
        staggerChildren: blockStagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '118%',
      opacity: 0,
      transition: { duration, ease: REVEAL_EASE },
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration, ease: REVEAL_EASE },
    },
  };

  return createElement(
    Tag,
    { className: `reveal-text ${className}`.trim(), ...rest },
    <motion.span
      className={`reveal-text__track ${isBlock ? 'reveal-text__track--lines' : ''}`.trim()}
      variants={containerVariants}
      {...motionProps}
    >
      {units.map((unit, index) => {
        if (effectiveMode === 'words' && /^\s+$/.test(unit)) {
          return <span key={`space-${index}`}>{unit}</span>;
        }

        return (
          <span
            key={`${unit}-${index}`}
            className={`reveal-text__mask ${isBlock ? 'reveal-text__mask--line' : ''}`.trim()}
          >
            <motion.span className="reveal-text__unit" variants={itemVariants}>
              {unit}
            </motion.span>
          </span>
        );
      })}
    </motion.span>,
  );
}
