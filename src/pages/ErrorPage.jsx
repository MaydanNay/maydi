import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import RevealText from '../components/ui/RevealText';

export default function ErrorPage() {
  const { t } = useLocale();

  return (
    <div className="content-above-grid relative flex min-h-[100svh] flex-col items-center justify-center bg-[var(--color-bg-0)] px-[var(--space-3)] pt-16 text-center md:px-[var(--space-6)]">
      <RevealText
        as="p"
        text={t('error.kicker')}
        mode="words"
        trigger="mount"
        delay={0.1}
        stagger={0.05}
        duration={0.75}
        className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]"
      />
      <RevealText
        as="h1"
        text={t('error.code')}
        mode="chars"
        trigger="mount"
        delay={0.2}
        stagger={0.06}
        duration={0.8}
        className="mt-[var(--space-4)] text-[clamp(56px,14vw,112px)] font-semibold leading-none tracking-[-0.02em] text-[var(--color-white)]"
      />
      <RevealText
        as="p"
        text={t('error.text')}
        mode="words"
        trigger="mount"
        delay={0.45}
        stagger={0.03}
        className="mt-[var(--space-4)] max-w-md text-[clamp(15px,1.8vw,18px)] leading-relaxed text-[var(--color-muted)]"
      />
      <Link
        to="/"
        className="maydi-hover-fill maydi-hover-fill--ghost mt-[var(--space-8)] inline-flex px-[var(--space-4)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em]"
      >
        <span className="maydi-hover-fill__label">{t('error.home')}</span>
      </Link>
    </div>
  );
}
