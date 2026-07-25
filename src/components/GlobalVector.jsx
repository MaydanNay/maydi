import { motion } from 'framer-motion';
import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';

const ease = [0.22, 1, 0.36, 1];

export default function GlobalVector() {
  const { dict } = useLocale();
  const { global: g } = dict;

  return (
    <section id="global" className="page-tail__section page-tail__section--last">
      <div className="page-tail__inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true, margin: '-8% 0px' }}
        >
          <SectionHeading kicker={g.kicker} title={g.title} />
          <p className="page-tail__lead">{g.text}</p>
          <p className="page-tail__note">{g.infra}</p>
        </motion.div>
      </div>
    </section>
  );
}
