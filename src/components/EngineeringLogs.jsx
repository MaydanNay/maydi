import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';

const ease = [0.22, 1, 0.36, 1];

export default function EngineeringLogs() {
  const { dict } = useLocale();
  const { logs } = dict;

  return (
    <section id="engineering-logs" className="page-tail__section">
      <div className="page-tail__inner">
        <div className="page-tail__split">
          <div className="page-tail__split-head">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              viewport={{ once: true, margin: '-8% 0px' }}
            >
              <SectionHeading kicker={logs.kicker} title={logs.title} className="mb-0" />
              <p className="page-tail__log-hint">{logs.hint}</p>
            </motion.div>
          </div>

          <ul className="page-tail__log-list page-tail__split-body" aria-label={logs.title}>
            {logs.entries.map((entry, index) => (
              <motion.li
                key={`${entry.date}-${entry.tag}`}
                className="page-tail__log-item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: index * 0.05 }}
                viewport={{ once: true, margin: '-5% 0px' }}
              >
                <div className="page-tail__log-meta">
                  <time dateTime={entry.date} className="page-tail__log-date">
                    {entry.date}
                  </time>
                  <span className="page-tail__log-tag">{entry.tag}</span>
                </div>
                <p className="page-tail__log-text">{entry.text}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
