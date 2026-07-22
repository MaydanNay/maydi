import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';

export default function Studio() {
  const { t } = useLocale();

  return (
    <section
      id="studio"
      className="border-t border-[var(--color-line)] bg-[var(--color-bg-1)] px-[var(--space-3)] py-[var(--space-10)] md:px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <header className="mb-[var(--space-6)] max-w-3xl">
          <h2 className="text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-[var(--color-white)]">
            {t('studio.title')}
          </h2>
          <p className="mt-[var(--space-3)] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
            {t('studio.p1')}
          </p>
          <p className="mt-[var(--space-3)] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
            {t('studio.p2')}
          </p>
        </header>

        <Link
          to="/studio"
          className="inline-flex items-center gap-[var(--space-2)] border border-[var(--color-line)] px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-text)] transition-colors hover:border-[var(--color-muted)] hover:text-[var(--color-white)]"
        >
          {t('studio.cta')}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
