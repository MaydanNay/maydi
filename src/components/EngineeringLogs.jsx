import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';
import RevealText from './ui/RevealText';

export default function EngineeringLogs() {
  const { dict } = useLocale();
  const { logs } = dict;

  return (
    <section id="engineering-logs" className="page-tail__section">
      <div className="page-tail__inner">
        <div className="page-tail__split">
          <div className="page-tail__split-head">
            <SectionHeading kicker={logs.kicker} title={logs.title} className="mb-0" />
            <RevealText
              as="p"
              text={logs.hint}
              mode="words"
              delay={0.2}
              stagger={0.04}
              duration={0.75}
              className="page-tail__log-hint"
            />
          </div>

          <ul className="page-tail__log-list page-tail__split-body" aria-label={logs.title}>
            {logs.entries.map((entry, index) => (
              <li key={`${entry.date}-${entry.tag}`} className="page-tail__log-item">
                <div className="page-tail__log-meta">
                  <RevealText
                    as="time"
                    text={entry.date}
                    mode="words"
                    delay={index * 0.06}
                    stagger={0.04}
                    duration={0.75}
                    dateTime={entry.date}
                    className="page-tail__log-date"
                  />
                  <RevealText
                    as="span"
                    text={entry.tag}
                    mode="words"
                    delay={0.06 + index * 0.06}
                    stagger={0.04}
                    duration={0.75}
                    className="page-tail__log-tag"
                  />
                </div>
                <RevealText
                  as="p"
                  text={entry.text}
                  mode="words"
                  delay={0.12 + index * 0.06}
                  stagger={0.024}
                  duration={0.88}
                  className="page-tail__log-text"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
