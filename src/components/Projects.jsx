import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/content';
import { useLocale } from '../i18n/LocaleContext';

const PROJECT_SLOTS = [
  { key: 'helixa', slot: 'a' },
  { key: 'mimora', slot: 'b' },
  { key: 'mixlink', slot: 'c' },
  { key: 'vivida', slot: 'd' },
  { key: 'lyutik', slot: 'e' },
];

function ProjectCard({ project, copy, statusLabel, readMore, slot }) {
  return (
    <article className={`projects-scatter__card projects-scatter__card--slot-${slot}`}>
      <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
        {statusLabel} · {copy.role}
      </p>
      <h3 className="projects-scatter__card-title mt-[var(--space-3)] text-[clamp(20px,2.4vw,28px)] leading-snug text-[var(--color-white)]">
        {project.label}
      </h3>
      <p className="mt-[var(--space-3)] text-[clamp(14px,1.5vw,16px)] leading-relaxed text-[var(--color-muted)]">
        {copy.summary}
      </p>
      <Link
        to="/ecosystem"
        className="maydi-hover-fill maydi-hover-fill--muted mt-[var(--space-6)] inline-flex px-[var(--space-2)] py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em]"
      >
        <span className="maydi-hover-fill__label">{readMore}</span>
      </Link>
    </article>
  );
}

export default function Projects() {
  const { dict } = useLocale();
  const { projects: p } = dict;

  return (
    <section id="projects" className="projects-scatter bg-[var(--color-bg-0)]">
      <div className="projects-scatter__stage">
        <header className="projects-scatter__head">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            {p.kicker}
          </p>
          <h2 className="mt-[var(--space-4)] max-w-[14ch] text-[clamp(28px,4.5vw,52px)] uppercase leading-[0.95] tracking-[-0.02em] text-[var(--color-white)]">
            {p.title}
          </h2>
          <p className="mt-[var(--space-4)] max-w-xs text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]">
            {p.subtitle}
          </p>
          <Link to="/ecosystem" className="projects-scatter__cta maydi-hover-fill maydi-hover-fill--outline mt-[var(--space-8)]">
            <span className="maydi-hover-fill__label">{p.mapCta}</span>
          </Link>
        </header>

        <div className="projects-scatter__cards">
          {PROJECT_SLOTS.map(({ key, slot }) => {
            const project = PROJECTS[key];
            const copy = p.items[key];
            if (!project || !copy) return null;

            return (
              <ProjectCard
                key={key}
                project={project}
                copy={copy}
                slot={slot}
                statusLabel={project.status === 'live' ? p.statusLive : p.statusBuild}
                readMore={p.readMore}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
