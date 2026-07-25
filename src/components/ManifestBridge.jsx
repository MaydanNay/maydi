import { useLocale } from '../i18n/LocaleContext';

/**
 * Bridge between Hero and Founders — conflict / why we build.
 */
export default function ManifestBridge() {
  const { t } = useLocale();

  return (
    <section
      id="why"
      className="bg-[var(--color-bg-0)] py-[var(--space-20)] md:py-[var(--space-24)]"
    >
      <div className="mx-auto w-full max-w-[var(--max-width)] px-[var(--space-3)] md:px-[var(--space-6)] flex justify-center">
        <p className="max-w-2xl text-center text-[clamp(15px,1.8vw,18px)] leading-relaxed text-[var(--color-muted)]">
          {t('bridge.text')}
        </p>
      </div>
    </section>
  );
}
