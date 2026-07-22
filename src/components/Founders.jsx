import { ImagePlaceholder } from './ui/ImagePlaceholder';
import { useLocale } from '../i18n/LocaleContext';

export default function Founders() {
  const { dict } = useLocale();
  const [maidan, diana] = dict.founders.people;

  return (
    <section
      id="founders"
      className="border-t border-[var(--color-line)] bg-[var(--color-bg-0)] py-[var(--space-10)] md:py-0"
    >
      <div className="grid grid-cols-1 items-start gap-[var(--space-6)] md:grid-cols-[minmax(0,1fr)_minmax(300px,440px)_minmax(0,1fr)] md:items-stretch md:gap-0">
        <div className="order-2 w-full md:order-1">
          <ImagePlaceholder
            aspect="portrait"
            label={dict.founders.photo}
            className="h-auto w-full md:min-h-[min(100svh,920px)] md:!aspect-auto md:h-full"
          />
        </div>

        <div className="order-1 px-[var(--space-3)] md:order-2 md:flex md:flex-col md:justify-center md:px-[var(--space-4)] md:py-[var(--space-10)] lg:px-[var(--space-6)]">
          <header className="mb-[var(--space-6)]">
            <p className="mb-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              {dict.founders.kicker}
            </p>
            <h2 className="text-[clamp(28px,4vw,40px)] font-semibold leading-tight text-[var(--color-white)]">
              {dict.founders.title}
            </h2>
          </header>

          <div className="flex flex-col gap-[var(--space-6)]">
            <article>
              <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-white)]">
                {maidan.name}
              </h3>
              <p className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {maidan.title}
              </p>
              <p className="mt-[var(--space-2)] text-[var(--text-base)] text-[var(--color-muted)]">
                {maidan.text}
              </p>
            </article>

            <div className="h-px w-full bg-[var(--color-line)]" role="separator" aria-hidden />

            <article>
              <h3 className="text-[var(--text-lg)] font-semibold text-[var(--color-white)]">
                {diana.name}
              </h3>
              <p className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-muted)]">
                {diana.title}
              </p>
              <p className="mt-[var(--space-2)] text-[var(--text-base)] text-[var(--color-muted)]">
                {diana.text}
              </p>
            </article>
          </div>
        </div>

        <div className="order-3 w-full">
          <ImagePlaceholder
            aspect="portrait"
            label={dict.founders.photo}
            className="h-auto w-full md:min-h-[min(100svh,920px)] md:!aspect-auto md:h-full"
          />
        </div>
      </div>
    </section>
  );
}
