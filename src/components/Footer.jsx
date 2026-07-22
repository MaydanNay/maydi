import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';

const SOCIAL = [
  { href: 'https://t.me/', label: 'Telegram' },
  { href: 'https://github.com/', label: 'GitHub' },
];

export default function Footer() {
  const { t } = useLocale();

  const ctas = [
    {
      href: 'mailto:partners@maydi.net?subject=Request%3A%20Pitch%20Deck',
      label: t('footer.pitch'),
    },
    {
      href: 'mailto:partners@maydi.net?subject=Request%3A%20Enterprise%20Demo',
      label: t('footer.demo'),
    },
  ];

  return (
    <footer
      id="contact"
      className="border-t border-[var(--color-line)] bg-[var(--color-bg-0)] px-[var(--space-3)] py-[var(--space-8)] md:px-[var(--space-6)]"
    >
      <div className="mx-auto flex max-w-[var(--max-width)] flex-col gap-[var(--space-6)]">
        <div className="flex flex-col gap-[var(--space-4)] md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[var(--text-xl)] font-semibold text-[var(--color-white)]">maydi</p>
            <p className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
              {t('footer.tagline')}
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-[var(--space-3)]"
            aria-label={t('footer.navAria')}
          >
            <a
              href="/#projects"
              className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-white)]"
            >
              {t('footer.products')}
            </a>
            <Link
              to="/ecosystem"
              className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-white)]"
            >
              {t('footer.ecosystem')}
            </Link>
            {SOCIAL.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-white)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div
          className="flex flex-col gap-[var(--space-2)] sm:flex-row sm:flex-wrap"
          aria-label={t('footer.contactAria')}
        >
          {ctas.map((cta) => (
            <a
              key={cta.label}
              href={cta.href}
              className="inline-flex items-center justify-center border border-[var(--color-white)] bg-transparent px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-sm)] text-[var(--color-white)] transition-colors hover:bg-[var(--color-white)] hover:!text-[#0c0c0d]"
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-[var(--space-6)] max-w-[var(--max-width)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
        © 2026 maydi.
      </p>
    </footer>
  );
}
