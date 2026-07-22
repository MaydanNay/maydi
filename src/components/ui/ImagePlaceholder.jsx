import { IMAGE_PLACEHOLDER_LABEL } from '../../data/content';

const ASPECT = {
  video: 'aspect-video',
  portrait: 'aspect-[9/16]',
  tall: 'aspect-[3/5]',
};

/**
 * Media stub. Default 16:9; founders use portrait 9:16 (or taller).
 */
export function ImagePlaceholder({
  label = IMAGE_PLACEHOLDER_LABEL,
  aspect = 'video',
  className = '',
}) {
  const ratio = ASPECT[aspect] ?? ASPECT.video;

  return (
    <div
      className={`flex w-full items-center justify-center bg-[var(--color-bg-3)] px-[var(--space-2)] text-center font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed text-[var(--color-muted)] ${ratio} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      {label}
    </div>
  );
}
