import { motion } from 'framer-motion';
import BrandMark from './BrandMark';
import { useLocale } from '../i18n/LocaleContext';

export default function Hero() {
  const { t } = useLocale();

  return (
    <section className="relative flex h-[100svh] min-h-[560px] flex-col justify-end overflow-hidden bg-[var(--color-bg-0)]">
      <div className="absolute inset-0" aria-hidden>
        <img
          src="/assets/team.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,12,13,0.35) 0%, rgba(12,12,13,0.2) 35%, rgba(12,12,13,0.75) 70%, rgba(12,12,13,0.96) 100%)',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 mx-auto mb-[var(--space-12)] w-full max-w-[var(--max-width)] px-[var(--space-3)] md:mb-[var(--space-10)] md:px-[var(--space-6)]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <BrandMark className="text-[clamp(56px,12vw,104px)]" />
        <p className="mt-[var(--space-4)] max-w-6xl text-[clamp(16px,2.2vw,20px)] leading-relaxed text-[var(--color-text)]">
          {t('hero.lead')}
        </p>
      </motion.div>
    </section>
  );
}
