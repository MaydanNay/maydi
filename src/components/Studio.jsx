import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';
import RevealText from './ui/RevealText';

export default function Studio() {
  const { dict } = useLocale();
  const { studio: s } = dict;

  return (
    <section id="studio" className="page-tail__section">
      <div className="page-tail__inner">
        <div className="page-tail__split">
          <SectionHeading kicker={s.kicker} title={s.title} className="page-tail__split-head mb-0" />

          <div className="page-tail__split-body">
            <RevealText as="p" text={s.p1} mode="words" delay={0.18} stagger={0.026} className="page-tail__copy" />
            <RevealText as="p" text={s.p2} mode="words" delay={0.32} stagger={0.026} className="page-tail__copy" />

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
        </div>
      </div>
    </section>
  );
}
