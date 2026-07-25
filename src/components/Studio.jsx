import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';

const ease = [0.22, 1, 0.36, 1];

export default function Studio() {
  const { dict } = useLocale();
  const { studio: s } = dict;

  return (
    <section id="studio" className="page-tail__section">
      <div className="page-tail__inner">
        <motion.div
          className="page-tail__split"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          <SectionHeading kicker={s.kicker} title={s.title} className="page-tail__split-head mb-0" />

          <div className="page-tail__split-body">
            <p className="page-tail__copy">{s.p1}</p>
            <p className="page-tail__copy">{s.p2}</p>

            <Link
              to="/studio"
              className="maydi-hover-fill maydi-hover-fill--ghost mt-[var(--space-8)] inline-flex items-center gap-[var(--space-2)] px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
            >
              <span className="maydi-hover-fill__label">{s.cta}</span>
              <span className="maydi-hover-fill__label" aria-hidden>
                →
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
