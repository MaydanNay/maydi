import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PROJECTS } from '../data/content';
import { useLocale } from '../i18n/LocaleContext';
import { Button } from './ui/Button';

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : false,
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = () => setIsDesktop(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isDesktop;
}

export default function ProjectModal({ projectId, onClose }) {
  const { dict, t } = useLocale();
  const base = projectId ? PROJECTS[projectId] : null;
  const copy = projectId ? dict.projects.items[projectId] : null;
  const project = base && copy ? { ...base, ...copy } : null;
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!project) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [project, onClose]);

  const panelMotion = isDesktop
    ? {
        initial: { x: '100%', opacity: 0.85 },
        animate: { x: 0, opacity: 1 },
        exit: { x: '100%', opacity: 0 },
      }
    : {
        initial: { y: '100%', opacity: 0.85 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '100%', opacity: 0 },
      };

  return (
    <AnimatePresence>
      {project ? (
        <>
          <motion.button
            type="button"
            aria-label={t('modal.close')}
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="maydi-scroll fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto border-t border-[var(--color-line)] bg-[var(--color-bg-1)] p-[var(--space-4)] md:inset-y-0 md:right-0 md:left-auto md:w-[min(420px,100%)] md:border-l md:border-t-0"
            {...panelMotion}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="mb-[var(--space-4)] flex items-start justify-between gap-[var(--space-3)]">
              <div>
                <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--color-muted)]">
                  {project.role}
                </p>
                <h3
                  id="project-modal-title"
                  className="mt-[var(--space-1)] text-[var(--text-xl)] font-semibold text-[var(--color-white)]"
                >
                  {project.label}
                </h3>
              </div>
              <Button variant="ghost" onClick={onClose} aria-label={t('modal.close')}>
                {t('modal.close')}
              </Button>
            </div>

            <div className="space-y-[var(--space-4)]">
              <section>
                <h4 className="mb-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-wider text-[var(--color-muted)]">
                  {t('modal.description')}
                </h4>
                <p className="text-[var(--text-sm)] text-[var(--color-text)]">{project.summary}</p>
              </section>

              <section>
                <h4 className="mb-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-wider text-[var(--color-muted)]">
                  {t('modal.problem')}
                </h4>
                <p className="text-[var(--text-sm)] text-[var(--color-text)]">{project.problem}</p>
              </section>

              <section>
                <h4 className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-wider text-[var(--color-muted)]">
                  {t('modal.stack')}
                </h4>
                <ul className="flex flex-wrap gap-[var(--space-1)]">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="border border-[var(--color-line)] px-[var(--space-2)] py-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
