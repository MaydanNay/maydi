import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';

const ease = [0.22, 1, 0.36, 1];

export default function Masterplan() {
  const { dict } = useLocale();
  const phases = dict.masterplan.phases;

  return (
    <section
      id="masterplan"
      className="bg-[var(--color-bg-0)] px-[var(--space-3)] py-[var(--space-20)] md:px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          viewport={{ once: true, margin: '-5% 0px' }}
        >
          <SectionHeading title={dict.masterplan.title} />
        </motion.div>

        <ol className="relative flex flex-col border-l border-[var(--color-line)] pl-[var(--space-4)] md:pl-[var(--space-6)]">
          {phases.map((phase, index) => {
            const numberFromLeft = index % 2 === 0;
            const numberX = numberFromLeft ? -64 : 64;
            const textX = numberFromLeft ? 64 : -64;

            return (
              <li
                key={phase.id}
                className="relative flex flex-col gap-[var(--space-2)] pb-[var(--space-16)] last:pb-0 md:flex-row md:items-start md:gap-[var(--space-12)]"
              >
                <motion.span
                  className="absolute -left-[calc(var(--space-4)+5px)] top-[0.35em] h-[9px] w-[9px] rounded-full border border-[var(--color-muted)] bg-[var(--color-bg-0)] md:-left-[calc(var(--space-6)+5px)]"
                  aria-hidden
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, ease, delay: 0.05 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                />

                <motion.span
                  className="shrink-0 font-[family-name:var(--font-mono)] text-[clamp(40px,6vw,64px)] font-semibold leading-none tracking-tight text-[var(--color-white)]"
                  aria-hidden
                  initial={{ opacity: 0, x: numberX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.08 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                >
                  {phase.number}
                </motion.span>

                <motion.div
                  className="min-w-0 flex-1 pt-[var(--space-1)] md:pt-[var(--space-2)]"
                  initial={{ opacity: 0, x: textX }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.75, ease, delay: 0.18 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                >
                  <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                    {phase.tag}
                  </p>
                  <h3 className="mt-[var(--space-2)] text-[var(--text-xl)] font-semibold text-[var(--color-white)]">
                    <span className="sr-only">{phase.number}. </span>
                    {phase.title}
                  </h3>
                  <p className="mt-[var(--space-2)] max-w-2xl text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
                    {phase.text}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
