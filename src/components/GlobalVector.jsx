import { useLocale } from '../i18n/LocaleContext';

export default function GlobalVector() {
  const { t } = useLocale();

  return (
    <section
      id="global"
      className="border-t border-[var(--color-line)] bg-[var(--color-bg-0)] px-[var(--space-3)] py-[var(--space-8)] md:px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <h2 className="mb-[var(--space-3)] text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-[var(--color-white)]">
          {t('global.title')}
        </h2>
        <p className="max-w-3xl text-[clamp(16px,2vw,20px)] leading-relaxed text-[var(--color-text)]">
          {t('global.text')}
        </p>
        <p className="mt-[var(--space-3)] max-w-3xl font-[family-name:var(--font-mono)] text-[var(--text-xs)] leading-relaxed tracking-[0.02em] text-[var(--color-muted)]">
          {t('global.infra')}
        </p>
      </div>
    </section>
  );
}
