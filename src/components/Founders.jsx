import { useState } from 'react';
import { useLocale } from '../i18n/LocaleContext';

const PHOTOS = {
  base: '/assets/%D0%B1%D0%B0%D0%B7%D0%B0.png',
  maidan: '/assets/maydan.png',
  diana: '/assets/diana.png',
};

function cardClass(active, id) {
  const parts = ['founders-card'];
  if (active === id) parts.push('founders-card--active');
  if (active && active !== id) parts.push('founders-card--dimmed');
  return parts.join(' ');
}

export default function Founders() {
  const { dict } = useLocale();
  const { founders: f } = dict;
  const [maidan, diana] = f.people;
  const [active, setActive] = useState(null);

  const maidanPhotoActive = active === 'maidan';
  const dianaPhotoActive = active === 'diana';

  const activate = (id) => setActive(id);
  const toggle = (id) => setActive((prev) => (prev === id ? null : id));

  return (
    <section
      id="founders"
      className="founders-section relative min-h-[min(100svh,1200px)] overflow-hidden bg-[var(--color-bg-0)]"
      onMouseLeave={() => setActive(null)}
    >
      <div className="absolute inset-0" aria-hidden>
        <img
          src={PHOTOS.base}
          alt=""
          className={`founders-photo founders-photo--base absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
            active ? 'opacity-0 blur-0' : 'opacity-35 blur-2xl'
          }`}
        />
        <img
          src={PHOTOS.maidan}
          alt=""
          className={`founders-photo founders-photo--maidan absolute inset-0 h-full w-full object-contain object-left transition-all duration-700 ease-out ${
            maidanPhotoActive ? 'opacity-80 blur-0' : 'pointer-events-none opacity-0 blur-2xl'
          }`}
        />
        <img
          src={PHOTOS.diana}
          alt=""
          className={`founders-photo founders-photo--diana absolute inset-0 h-full w-full object-contain object-right transition-all duration-700 ease-out ${
            dianaPhotoActive ? 'opacity-80 blur-0' : 'pointer-events-none opacity-0 blur-2xl'
          }`}
        />
        <div
          className={`absolute inset-0 bg-[var(--color-bg-0)] transition-opacity duration-700 ${
            active ? 'opacity-45' : 'opacity-72'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[min(100svh,1200px)] max-w-[var(--max-width)] flex-col px-[var(--space-3)] py-[var(--space-20)] md:px-[var(--space-6)] md:py-[var(--space-24)]">
        <header className="mb-[var(--space-8)] max-w-xl">
          <p className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-muted)]">
            {f.kicker}
          </p>
          <h2 className="text-[clamp(22px,3vw,30px)] font-semibold leading-tight text-[var(--color-white)]">
            {f.title}
          </h2>
          <p
            className={`founders-hint mt-[var(--space-4)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)] transition-opacity duration-300 ${
              active ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {f.hint}
          </p>
        </header>

        <div className="grid flex-1 grid-cols-1 gap-[var(--space-4)] md:grid-cols-2 md:gap-[var(--space-6)]">
          <article
            className={`${cardClass(active, 'maidan')} founders-card--maidan`}
            onMouseEnter={() => activate('maidan')}
            onFocus={() => activate('maidan')}
            onBlur={() => setActive(null)}
            onClick={() => toggle('maidan')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle('maidan');
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={active === 'maidan'}
            aria-label={maidan.name}
          >
            <p className="founders-card__label">{f.leftLabel}</p>
            <h3 className="founders-card__name">{maidan.name}</h3>
            <p className="founders-card__role">{maidan.title}</p>
            <p
              className={`founders-card__bio mt-[var(--space-4)] max-w-md text-[var(--text-base)] leading-relaxed text-[var(--color-text)] ${
                active === 'maidan' ? 'founders-card__bio--visible' : ''
              }`}
            >
              {maidan.text}
            </p>
            <span className="founders-card__cta" aria-hidden>
              {active === 'maidan' ? '—' : '→'}
            </span>
          </article>

          <article
            className={`${cardClass(active, 'diana')} founders-card--diana md:text-right`}
            onMouseEnter={() => activate('diana')}
            onFocus={() => activate('diana')}
            onBlur={() => setActive(null)}
            onClick={() => toggle('diana')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle('diana');
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed={active === 'diana'}
            aria-label={diana.name}
          >
            <p className="founders-card__label">{f.rightLabel}</p>
            <h3 className="founders-card__name">{diana.name}</h3>
            <p className="founders-card__role">{diana.title}</p>
            <p
              className={`founders-card__bio mt-[var(--space-4)] max-w-md text-[var(--text-base)] leading-relaxed text-[var(--color-text)] md:ml-auto ${
                active === 'diana' ? 'founders-card__bio--visible' : ''
              }`}
            >
              {diana.text}
            </p>
            <span className="founders-card__cta founders-card__cta--right" aria-hidden>
              {active === 'diana' ? '—' : '←'}
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}
