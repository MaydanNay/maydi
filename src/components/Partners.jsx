import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleContext';
import { Card } from './ui/Card';
import { SectionHeading } from './ui/SectionHeading';

const ease = [0.22, 1, 0.36, 1];

export default function Partners() {
  const { dict } = useLocale();
  const { partners: p } = dict;

  return (
    <section
      id="partners"
      className="bg-[var(--color-bg-0)] px-[var(--space-3)] py-[var(--space-20)] md:px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          <SectionHeading kicker={p.kicker} title={p.title} subtitle={p.subtitle} />
        </motion.div>

        <ul className="grid grid-cols-1 gap-[var(--space-4)] sm:grid-cols-2 lg:grid-cols-3 md:gap-[var(--space-5)]">
          {p.people.map((person, index) => (
            <motion.li
              key={person.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: index * 0.06 }}
              viewport={{ once: true, margin: '-6% 0px' }}
            >
              <Card className="flex h-full flex-col gap-[var(--space-3)]">
                <div className="flex items-start justify-between gap-[var(--space-3)]">
                  <h3 className="text-[var(--text-lg)] font-semibold leading-snug text-[var(--color-white)]">
                    {person.name}
                  </h3>
                  <span className="shrink-0 border border-[var(--color-line)] px-[var(--space-2)] py-[var(--space-1)] font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-[var(--color-muted)]">
                    {person.type === 'partner' ? p.typePartner : p.typeInhouse}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {person.role}
                </p>
                <p className="text-[var(--text-sm)] leading-relaxed text-[var(--color-text)]">
                  {person.description}
                </p>
              </Card>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
