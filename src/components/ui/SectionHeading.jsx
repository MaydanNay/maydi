export function SectionHeading({ kicker, title, subtitle, className = '' }) {
  return (
    <header className={`mb-[var(--space-6)] max-w-2xl ${className}`.trim()}>
      {kicker ? (
        <p className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-[var(--color-white)]">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-[var(--space-2)] text-[var(--text-base)] text-[var(--color-muted)]">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
