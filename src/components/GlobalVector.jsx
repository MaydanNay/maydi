import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';
import RevealText from './ui/RevealText';

export default function GlobalVector() {
  const { dict } = useLocale();
  const { global: g } = dict;

  return (
    <section id="global" className="page-tail__section page-tail__section--last">
      <div className="page-tail__inner">
        <SectionHeading kicker={g.kicker} title={g.title} />
        <RevealText as="p" text={g.text} mode="words" delay={0.2} stagger={0.026} className="page-tail__lead" />
        <RevealText as="p" text={g.infra} mode="words" delay={0.38} stagger={0.028} className="page-tail__note" />
      </div>
    </section>
  );
}
