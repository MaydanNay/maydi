import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import EcosystemGraph from '../components/EcosystemGraph';
import ProjectModal from '../components/ProjectModal';
import { useLocale } from '../i18n/LocaleContext';

/**
 * Full-page interactive ecosystem (legacy solar-system experience).
 */
export default function EcosystemPage() {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState(null);
  const onSelect = useCallback((id) => setActiveId(id), []);

  return (
    <div className="content-above-grid relative min-h-[100svh] bg-[var(--color-bg-0)] pt-14 md:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-14 z-20 flex items-start justify-between px-[var(--space-3)] pt-[var(--space-3)] md:top-16 md:px-[var(--space-6)] md:pt-[var(--space-4)]">
        <div className="pointer-events-auto">
          <Link
            to="/"
            className="maydi-hover-fill maydi-hover-fill--ghost pointer-events-auto inline-flex items-center gap-[var(--space-2)] px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.14em] backdrop-blur-sm"
          >
            <span className="maydi-hover-fill__label">{t('ecosystemPage.back')}</span>
          </Link>
        </div>
        <div className="pointer-events-none text-right">
          <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Ecosystem
          </p>
          <p className="mt-[var(--space-1)] hidden text-[var(--text-sm)] text-[var(--color-text)] sm:block">
            {t('ecosystemPage.hint')}
          </p>
        </div>
      </div>

      <EcosystemGraph dimmed={Boolean(activeId)} onSelect={onSelect} fullPage />
      <ProjectModal projectId={activeId} onClose={() => setActiveId(null)} />
    </div>
  );
}
