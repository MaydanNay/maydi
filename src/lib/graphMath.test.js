import { describe, expect, it } from 'vitest';
import { createGraphNodes, hitTest, nodePosition, orbitRadius } from './graphMath';

describe('graphMath', () => {
  it('keeps Helixa at center', () => {
    const nodes = createGraphNodes();
    const core = nodes.find((n) => n.id === 'helixa');
    const pos = nodePosition(core, 10, 200, 200, 400);
    expect(pos.x).toBe(200);
    expect(pos.y).toBe(200);
  });

  it('hit-tests product nodes', () => {
    const nodes = createGraphNodes();
    const mimora = nodes.find((n) => n.id === 'mimora');
    const { x, y } = nodePosition(mimora, 0, 200, 200, 400);
    const hit = hitTest(nodes, 0, 200, 200, 400, x, y);
    expect(hit?.id).toBe('mimora');
  });

  it('computes concentric orbits', () => {
    expect(orbitRadius(1, 400)).toBeLessThan(orbitRadius(2, 400));
    expect(orbitRadius(2, 400)).toBeLessThan(orbitRadius(3, 400));
  });
});
