import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';

export default function Masterplan() {
  const { dict } = useLocale();
  const phases = dict.masterplan.phases;

  return (
    <section
      id="masterplan"
      className="border-t border-[var(--color-line)] bg-[var(--color-bg-0)] px-[var(--space-3)] py-[var(--space-10)] md:px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <SectionHeading title={dict.masterplan.title} />

        <ol className="relative flex flex-col border-l border-[var(--color-line)] pl-[var(--space-4)] md:pl-[var(--space-6)]">
          {phases.map((phase) => (
            <li
              key={phase.id}
              className="relative flex flex-col gap-[var(--space-2)] pb-[var(--space-8)] last:pb-0 md:flex-row md:items-start md:gap-[var(--space-6)]"
            >
              <span
                className="absolute -left-[calc(var(--space-4)+5px)] top-[0.35em] h-[9px] w-[9px] rounded-full border border-[var(--color-muted)] bg-[var(--color-bg-0)] md:-left-[calc(var(--space-6)+5px)]"
                aria-hidden
              />

              <span
                className="shrink-0 font-[family-name:var(--font-mono)] text-[clamp(40px,6vw,64px)] font-semibold leading-none tracking-tight text-[var(--color-white)]"
                aria-hidden
              >
                {phase.number}
              </span>

              <div className="min-w-0 flex-1 pt-[var(--space-1)] md:pt-[var(--space-2)]">
                <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                  {phase.tag}
                </p>
                <h3 className="mt-[var(--space-2)] text-[var(--text-xl)] font-semibold text-[var(--color-white)]">
                  <span className="sr-only">{phase.number}. </span>
                  {phase.title}
                </h3>
                <p className="mt-[var(--space-2)] max-w-2xl text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
                  {phase.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
