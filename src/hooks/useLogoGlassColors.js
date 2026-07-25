import { useEffect, useState } from 'react';

function readLogoGlassColors() {
  const style = getComputedStyle(document.documentElement);
  return {
    base: style.getPropertyValue('--logo-base').trim() || '#e8e8ec',
    morph: style.getPropertyValue('--logo-morph').trim() || '#8a8a93',
    opacity: Number.parseFloat(style.getPropertyValue('--logo-glass-opacity')) || 0.52,
  };
}

export function useLogoGlassColors() {
  const [colors, setColors] = useState(readLogoGlassColors);

  useEffect(() => {
    const update = () => setColors(readLogoGlassColors());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return colors;
}
