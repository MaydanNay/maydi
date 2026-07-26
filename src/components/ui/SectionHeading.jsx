import RevealText from './RevealText';

export function SectionHeading({ kicker, title, subtitle, className = '', delay = 0 }) {
  return (
    <header className={`mb-[var(--space-12)] max-w-2xl ${className}`.trim()}>
      {kicker ? (
        <RevealText
          as="p"
          text={kicker}
          mode="words"
          delay={delay}
          stagger={0.055}
          duration={0.75}
          className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.18em] text-[var(--color-muted)]"
        />
      ) : null}
      <RevealText
        as="h2"
        text={title}
        mode="words"
        delay={delay + (kicker ? 0.1 : 0)}
        stagger={0.045}
        className="text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-[var(--color-white)]"
      />
      {subtitle ? (
        <RevealText
          as="p"
          text={subtitle}
          mode="words"
          delay={delay + 0.22}
          stagger={0.028}
          className="mt-[var(--space-2)] text-[var(--text-base)] text-[var(--color-muted)]"
        />
      ) : null}
    </header>
  );
}
