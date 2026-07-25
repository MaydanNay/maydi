import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleContext';
import HeroGlassScene from './HeroGlassScene';
import HeroTeamPhoto from './HeroTeamPhoto';

export default function Hero() {
  const { t } = useLocale();
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      className="hero-below-grid relative h-[100svh] min-h-[560px] overflow-hidden bg-[var(--color-bg-0)]"
    >
      <HeroTeamPhoto sectionRef={sectionRef} />

      <div className="pointer-events-none absolute inset-0 z-[18]" aria-hidden>
        <HeroGlassScene />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.22) 0%, transparent 34%, transparent 100%)',
          }}
        />
      </div>

      <motion.div
        className="pointer-events-none relative z-20 mx-auto flex w-full max-w-[var(--max-width)] justify-end px-0 pt-[var(--space-6)] md:px-[var(--space-1)] md:pt-[var(--space-8)]"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <div className="max-w-xs pl-[var(--space-8)] md:max-w-sm md:pl-[var(--space-12)]">
          <p className="hero-lead text-left text-[clamp(12px,1.35vw,14px)] leading-relaxed">
            {t('hero.lead')}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
