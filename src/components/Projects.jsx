import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../data/content';
import { useLocale } from '../i18n/LocaleContext';
import ProjectCursorPreview from './ProjectCursorPreview';
import RevealText from './ui/RevealText';

const PROJECT_SLOTS = [
  { key: 'helixa', slot: 'a' },
  { key: 'mimora', slot: 'b' },
  { key: 'mixlink', slot: 'c' },
  { key: 'vivida', slot: 'd' },
  { key: 'lyutik', slot: 'e' },
];

function ProjectCard({ copy, project, statusLabel, readMore, index }) {
  const baseDelay = 0.08 + index * 0.06;

  return (
    <article className="projects-scatter__card">
      <RevealText
        as="p"
        text={`${statusLabel} · ${copy.role}`}
        mode="words"
        delay={baseDelay}
        stagger={0.035}
        duration={0.75}
        className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]"
      />
      <RevealText
        as="h3"
        text={project.label}
        mode="words"
        delay={baseDelay + 0.08}
        stagger={0.04}
        className="projects-scatter__card-title mt-[var(--space-3)] text-[clamp(20px,2.4vw,28px)] leading-snug text-[var(--color-white)]"
      />
      <RevealText
        as="p"
        text={copy.summary}
        mode="words"
        delay={baseDelay + 0.16}
        stagger={0.024}
        duration={0.88}
        className="mt-[var(--space-3)] text-[clamp(14px,1.5vw,16px)] leading-relaxed text-[var(--color-muted)]"
      />
      <Link
        to="/ecosystem"
        className="maydi-hover-fill maydi-hover-fill--muted pointer-events-auto relative z-[2] mt-[var(--space-6)] inline-flex px-[var(--space-2)] py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em]"
      >
        <span className="maydi-hover-fill__label">{readMore}</span>
      </Link>
    </article>
  );
}

export default function Projects() {
  const { dict } = useLocale();
  const { projects: p } = dict;
  const [activePreview, setActivePreview] = useState(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const startPreview = (project, event) => {
    if (!project.preview?.image) return;

    pointerRef.current = { x: event.clientX, y: event.clientY };

    setActivePreview({
      preview: project.preview,
      label: project.label,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const trackPointer = (event) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
  };

  const endPreview = () => setActivePreview(null);

  return (
    <section id="projects" className="projects-scatter bg-[var(--color-bg-0)]">
      <ProjectCursorPreview active={activePreview} pointerRef={pointerRef} />

      <div className="projects-scatter__stage">
        <header className="projects-scatter__head">
          <RevealText
            as="p"
            text={p.kicker}
            mode="words"
            stagger={0.055}
            duration={0.75}
            className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-muted)]"
          />
          <RevealText
            as="h2"
            text={p.title}
            mode="words"
            delay={0.1}
            stagger={0.042}
            className="mt-[var(--space-4)] max-w-[14ch] text-[clamp(28px,4.5vw,52px)] uppercase leading-[0.95] tracking-[-0.02em] text-[var(--color-white)]"
          />
          <RevealText
            as="p"
            text={p.subtitle}
            mode="words"
            delay={0.22}
            stagger={0.026}
            duration={0.9}
            className="mt-[var(--space-4)] max-w-xs text-[var(--text-sm)] leading-relaxed text-[var(--color-muted)]"
          />
          <Link to="/ecosystem" className="projects-scatter__cta maydi-hover-fill maydi-hover-fill--outline mt-[var(--space-8)]">
            <span className="maydi-hover-fill__label">{p.mapCta}</span>
          </Link>
        </header>

        <div className="projects-scatter__cards">
          {PROJECT_SLOTS.map(({ key, slot }, index) => {
            const project = PROJECTS[key];
            const copy = p.items[key];
            if (!project || !copy) return null;

            const hasPreview = Boolean(project.preview?.image);

            return (
              <div
                key={key}
                className={`projects-scatter__zone projects-scatter__zone--slot-${slot}${hasPreview ? ' projects-scatter__zone--preview' : ''}`}
                onMouseEnter={hasPreview ? (event) => startPreview(project, event) : undefined}
                onMouseMove={hasPreview ? trackPointer : undefined}
                onMouseLeave={hasPreview ? endPreview : undefined}
              >
                <ProjectCard
                  project={project}
                  copy={copy}
                  index={index}
                  statusLabel={project.status === 'live' ? p.statusLive : p.statusBuild}
                  readMore={p.readMore}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
