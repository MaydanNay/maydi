import { useLocale } from '../i18n/LocaleContext';

/**
 * Bridge between Hero and Founders — conflict / why we build.
 */
export default function ManifestBridge() {
  const { t } = useLocale();

  return (
    <section
      id="why"
      className="border-t border-[var(--color-line)] bg-[var(--color-bg-0)] px-[var(--space-3)] py-[var(--space-12)] md:px-[var(--space-6)] md:py-[var(--space-12)]"
    >
      <div className="mx-auto flex min-h-[50vh] max-w-[var(--max-width)] items-center">
        <p className="max-w-4xl text-[clamp(22px,3.6vw,36px)] font-semibold leading-snug tracking-tight text-[var(--color-white)]">
          {t('bridge.text')}
        </p>
      </div>
    </section>
  );
}
