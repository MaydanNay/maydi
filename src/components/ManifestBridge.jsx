import { useLocale } from '../i18n/LocaleContext';
import RevealText from './ui/RevealText';

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
      <div className="mx-auto flex w-full max-w-[var(--max-width)] justify-center px-[var(--space-3)] md:px-[var(--space-6)]">
        <RevealText
          as="p"
          text={t('bridge.text')}
          mode="words"
          stagger={0.026}
          duration={0.9}
          className="max-w-2xl text-center text-[clamp(15px,1.8vw,18px)] leading-relaxed text-[var(--color-muted)]"
        />
      </div>
    </section>
  );
}
