import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { usePingPongVideo } from '../hooks/usePingPongVideo';

const FOOTER_VIDEO = '/assets/gen_8b15461d-d1d9-4b37-9ed0-cd05e27c01ca.mp4';

const SOCIAL = [
  { href: 'https://t.me/', label: 'Telegram' },
  { href: 'https://github.com/', label: 'GitHub' },
];

export default function Footer() {
  const { t } = useLocale();
  const footerRef = useRef(null);
  const videoRef = useRef(null);

  usePingPongVideo(videoRef, footerRef);

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
    <footer id="contact" ref={footerRef} className="site-footer relative overflow-hidden">
      <div className="site-footer__video-stage" aria-hidden>
        <video
          ref={videoRef}
          className="site-footer__video"
          src={FOOTER_VIDEO}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      </div>

      <div className="site-footer__video-veil" aria-hidden />

      <div className="site-footer__content relative z-10 px-[var(--space-3)] py-[var(--space-16)] md:px-[var(--space-6)]">
        <div className="mx-auto flex max-w-[var(--max-width)] flex-col gap-[var(--space-12)]">
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
                className="maydi-hover-fill maydi-hover-fill--muted inline-flex px-[var(--space-2)] py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
              >
                <span className="maydi-hover-fill__label">{t('footer.products')}</span>
              </a>
              <Link
                to="/ecosystem"
                className="maydi-hover-fill maydi-hover-fill--muted inline-flex px-[var(--space-2)] py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
              >
                <span className="maydi-hover-fill__label">{t('footer.ecosystem')}</span>
              </Link>
              {SOCIAL.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="maydi-hover-fill maydi-hover-fill--muted inline-flex px-[var(--space-2)] py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
                >
                  <span className="maydi-hover-fill__label">{link.label}</span>
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
                className="maydi-hover-fill maydi-hover-fill--outline inline-flex items-center justify-center px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
              >
                <span className="maydi-hover-fill__label">{cta.label}</span>
              </a>
            ))}
          </div>
        </div>

        <p className="mx-auto mt-[var(--space-12)] max-w-[var(--max-width)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
          © 2026 maydi.
        </p>
      </div>
    </footer>
  );
}
