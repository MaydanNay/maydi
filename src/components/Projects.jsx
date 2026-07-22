import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/content';
import { useLocale } from '../i18n/LocaleContext';
import { Card } from './ui/Card';
import { SectionHeading } from './ui/SectionHeading';

function ProjectCard({ project, copy, statusLabel }) {
  return (
    <Card className="flex h-[220px] w-[min(320px,78vw)] shrink-0 flex-col gap-[var(--space-3)]">
      <div className="flex items-start justify-between gap-[var(--space-2)]">
        <div>
          <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-white)]">
            {project.label}
          </h3>
          <p className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
            {copy.role}
          </p>
        </div>
        <span
          className={`shrink-0 border px-[var(--space-2)] py-[var(--space-1)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider ${
            project.status === 'live'
              ? 'border-[var(--color-white)] text-[var(--color-white)]'
              : 'border-[var(--color-line)] text-[var(--color-muted)]'
          }`}
        >
          {statusLabel}
        </span>
      </div>

      <p className="line-clamp-5 text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
        {copy.summary}
      </p>
    </Card>
  );
}

function ProjectRow({ projects, items, statusLive, statusBuild, inert = false }) {
  return (
    <div className="projects-marquee__row" aria-hidden={inert || undefined}>
      {projects.map((project) => (
        <ProjectCard
          key={`${inert ? 'loop' : 'main'}-${project.id}`}
          project={project}
          copy={items[project.id]}
          statusLabel={project.status === 'live' ? statusLive : statusBuild}
        />
      ))}
    </div>
  );
}

export default function Projects() {
  const { dict } = useLocale();
  const { projects: p } = dict;
  const list = Object.values(PROJECTS);

  return (
    <section
      id="projects"
      className="border-t border-[var(--color-line)] bg-[var(--color-bg-0)] py-[var(--space-10)]"
    >
      <div className="mx-auto max-w-[var(--max-width)] px-[var(--space-3)] md:px-[var(--space-6)]">
        <SectionHeading kicker={p.kicker} title={p.title} subtitle={p.subtitle} />
      </div>

      <div className="projects-marquee" aria-label={p.title}>
        <div className="projects-marquee__track">
          <ProjectRow
            projects={list}
            items={p.items}
            statusLive={p.statusLive}
            statusBuild={p.statusBuild}
          />
          <ProjectRow
            projects={list}
            items={p.items}
            statusLive={p.statusLive}
            statusBuild={p.statusBuild}
            inert
          />
        </div>
      </div>

      <div className="mx-auto mt-[var(--space-8)] max-w-[var(--max-width)] px-[var(--space-3)] md:px-[var(--space-6)]">
        <div className="border border-[var(--color-line)] bg-[var(--color-bg-1)] p-[var(--space-4)] md:flex md:items-center md:justify-between md:gap-[var(--space-4)]">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              {p.mapKicker}
            </p>
            <p className="mt-[var(--space-2)] max-w-xl text-[var(--text-base)] text-[var(--color-text)]">
              {p.mapText}
            </p>
          </div>
          <Link
            to="/ecosystem"
            className="mt-[var(--space-3)] inline-flex shrink-0 items-center gap-[var(--space-2)] border border-[var(--color-white)] bg-[var(--color-white)] px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-sm)] !text-[#0c0c0d] transition-opacity hover:opacity-90 md:mt-0"
          >
            {p.mapCta}
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
