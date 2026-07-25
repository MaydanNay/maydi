const CHARSET = 'abcdefghijklmnopqrstuvwxyz0123456789{/}\\._-';

export function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

export function scrambleMorph(from, to, progress) {
  const len = Math.max(from.length, to.length);
  let out = '';

  for (let i = 0; i < len; i += 1) {
    const source = from[i] ?? '';
    const target = to[i] ?? '';

    if (source === target) {
      out += target;
      continue;
    }

    if (progress >= 1) {
      out += target;
      continue;
    }

    if (progress <= 0) {
      out += source || randomChar();
      continue;
    }

    const settleStart = 0.35 + (i / Math.max(len, 1)) * 0.35;
    if (progress < settleStart) {
      out += Math.random() > 0.35 ? randomChar() : source || randomChar();
    } else {
      const local = (progress - settleStart) / (1 - settleStart);
      out += Math.random() < local ? target : randomChar();
    }
  }

  return out;
}

/** @typedef {{ mid: string, tail: string }} BrandState */

/** @type {BrandState[]} */
export const BRAND_STATES = [
  { mid: 'di', tail: '' },
  { mid: 'dan', tail: '' },
  { mid: 'di', tail: '' },
  { mid: 'di', tail: 'ana' },
];

export const BRAND_HOLDS_MS = [2200, 1800, 1800, 2400];
export const BRAND_SCRAMBLE_MS = 950;

export function stateKey(state) {
  return `${state.mid}|${state.tail}`;
}
