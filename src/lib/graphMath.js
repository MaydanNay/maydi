/**
 * Graph layout: center Helixa + two product orbits + teaser orbit.
 * Angles in radians; speed is revolutions per second (visual spin).
 */
export function createGraphNodes() {
  return [
    {
      id: 'helixa',
      kind: 'core',
      label: 'Helixa',
      orbit: 0,
      angle: 0,
      speed: 0,
      radiusFactor: 0.11,
    },
    {
      id: 'mimora',
      kind: 'product',
      label: 'mimora',
      orbit: 1,
      angle: -Math.PI / 2,
      speed: 0.035,
      radiusFactor: 0.055,
    },
    {
      id: 'vivida',
      kind: 'product',
      label: 'vivida',
      orbit: 1,
      angle: Math.PI / 2,
      speed: 0.035,
      radiusFactor: 0.055,
    },
    {
      id: 'lyutik',
      kind: 'product',
      label: 'Lyutik',
      orbit: 2,
      angle: 0,
      speed: -0.022,
      radiusFactor: 0.048,
    },
    {
      id: 'mixlink',
      kind: 'product',
      label: 'mixlink',
      orbit: 2,
      angle: Math.PI,
      speed: -0.022,
      radiusFactor: 0.048,
    },
    {
      id: 'teaser-1',
      kind: 'teaser',
      label: '?',
      orbit: 3,
      angle: -Math.PI * 0.75,
      speed: 0.014,
      radiusFactor: 0.032,
    },
    {
      id: 'teaser-2',
      kind: 'teaser',
      label: '?',
      orbit: 3,
      angle: Math.PI * 0.15,
      speed: 0.014,
      radiusFactor: 0.032,
    },
    {
      id: 'teaser-3',
      kind: 'teaser',
      label: '?',
      orbit: 3,
      angle: Math.PI * 0.55,
      speed: 0.014,
      radiusFactor: 0.032,
    },
  ];
}

export function orbitRadius(orbitIndex, minDim) {
  if (orbitIndex <= 0) return 0;
  const base = minDim * 0.16;
  return base + (orbitIndex - 1) * minDim * 0.12;
}

export function nodePosition(node, elapsedSec, cx, cy, minDim) {
  if (node.kind === 'core') {
    return { x: cx, y: cy, r: minDim * node.radiusFactor };
  }
  const R = orbitRadius(node.orbit, minDim);
  const a = node.angle + elapsedSec * node.speed * Math.PI * 2;
  return {
    x: cx + Math.cos(a) * R,
    y: cy + Math.sin(a) * R,
    r: minDim * node.radiusFactor,
  };
}

export function hitTest(nodes, elapsedSec, cx, cy, minDim, px, py) {
  let best = null;
  let bestDist = Infinity;
  for (const node of nodes) {
    const { x, y, r } = nodePosition(node, elapsedSec, cx, cy, minDim);
    const hitR = Math.max(r, 18);
    const d = Math.hypot(px - x, py - y);
    if (d <= hitR && d < bestDist) {
      best = node;
      bestDist = d;
    }
  }
  return best;
}
