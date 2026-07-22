import { useLocale } from '../i18n/LocaleContext';
import { SectionHeading } from './ui/SectionHeading';

export default function EngineeringLogs() {
  const { dict } = useLocale();
  const { logs } = dict;

  return (
    <section
      id="engineering-logs"
      className="border-t border-[var(--color-line)] bg-[var(--color-bg-1)] px-[var(--space-3)] py-[var(--space-10)] md:px-[var(--space-6)]"
    >
      <div className="mx-auto max-w-[var(--max-width)]">
        <SectionHeading title={logs.title} />

        <div className="border border-[var(--color-line)] bg-[var(--color-bg-0)] p-[var(--space-4)] md:p-[var(--space-5)]">
          <p className="mb-[var(--space-4)] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
            {logs.hint}
          </p>

          <ul className="flex flex-col gap-[var(--space-4)]" aria-label={logs.title}>
            {logs.entries.map((entry) => (
              <li
                key={`${entry.date}-${entry.tag}`}
                className="border-t border-[var(--color-line)] pt-[var(--space-3)] first:border-t-0 first:pt-0"
              >
                <div className="flex flex-wrap items-baseline gap-x-[var(--space-2)] gap-y-[var(--space-1)]">
                  <time
                    dateTime={entry.date}
                    className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]"
                  >
                    [{entry.date}]
                  </time>
                  <span className="font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.08em] text-[var(--color-white)]">
                    {entry.tag}
                  </span>
                </div>
                <p className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-sm)] leading-relaxed text-[var(--color-text)]">
                  {entry.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
