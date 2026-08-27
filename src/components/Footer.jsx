import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { ASSETS } from '../data/assets.js';
import { useDataRoomModal } from '../context/DataRoomModalContext';
import { usePingPongVideo } from '../hooks/usePingPongVideo';
import RevealText from './ui/RevealText';

const FOOTER_VIDEO = ASSETS.brandVideo;

const CONTACTS = [
  {
    id: 'maidan',
    name: 'Майдан',
    nameEn: 'Maydan',
    email: 'donttouchegoista@gmail.com',
    telegram: 'MaydanMR',
  },
  {
    id: 'diana',
    name: 'Диана',
    nameEn: 'Diana',
    email: 'diana.bush.bd@gmail.com',
    telegram: 'chmahustle',
  },
];

export default function Footer() {
  const { t, locale } = useLocale();
  const { openDataRoom } = useDataRoomModal();
  const footerRef = useRef(null);
  const videoRef = useRef(null);

  usePingPongVideo(videoRef, footerRef);

  return (
    <footer id="contact" ref={footerRef} className="site-footer relative overflow-hidden">
      <div className="site-footer__video-stage" aria-hidden>
        <video
          ref={videoRef}
          className="site-footer__video"
          src={FOOTER_VIDEO}
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
        />
      </div>

      <div className="site-footer__video-veil" aria-hidden />

      <div className="site-footer__content relative z-10 px-[var(--space-3)] py-[var(--space-16)] md:px-[var(--space-6)]">
        <div className="mx-auto flex max-w-[var(--max-width)] flex-col gap-[var(--space-12)]">
          <div className="flex flex-col gap-[var(--space-4)] md:flex-row md:items-end md:justify-between">
            <div>
              <RevealText
                as="p"
                text="maydi"
                mode="chars"
                stagger={0.045}
                duration={0.7}
                className="text-[var(--text-xl)] font-semibold text-[var(--color-white)]"
              />
              <RevealText
                as="p"
                text={t('footer.tagline')}
                mode="words"
                delay={0.12}
                stagger={0.035}
                duration={0.75}
                className="mt-[var(--space-1)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]"
              />
            </div>

            <nav
              className="flex flex-wrap items-center gap-[var(--space-3)]"
              aria-label={t('footer.navAria')}
            >
              <Link
                to="/ecosystem"
                className="maydi-hover-fill maydi-hover-fill--muted inline-flex px-[var(--space-2)] py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
              >
                <span className="maydi-hover-fill__label">{t('footer.ecosystem')}</span>
              </Link>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noreferrer"
                className="maydi-hover-fill maydi-hover-fill--muted inline-flex px-[var(--space-2)] py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
              >
                <span className="maydi-hover-fill__label">GitHub</span>
              </a>
              <div className="footer-contacts">
                <button
                  type="button"
                  className="maydi-hover-fill maydi-hover-fill--muted footer-contacts__trigger inline-flex px-[var(--space-2)] py-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
                  aria-haspopup="dialog"
                >
                  <span className="maydi-hover-fill__label">{t('footer.contacts')}</span>
                </button>
                <div className="footer-contacts__panel" role="dialog" aria-label={t('footer.contacts')}>
                  <div className="footer-contacts__panel-inner">
                    {CONTACTS.map((person) => (
                      <div key={person.id} className="footer-contacts__person">
                        <p className="footer-contacts__name">
                          {locale === 'en' ? person.nameEn : person.name}
                        </p>
                        <a className="footer-contacts__link" href={`mailto:${person.email}`}>
                          <span className="footer-contacts__kind">{t('footer.mail')}</span>
                          <span>{person.email}</span>
                        </a>
                        <a
                          className="footer-contacts__link"
                          href={`https://t.me/${person.telegram}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="footer-contacts__kind">Telegram</span>
                          <span>@{person.telegram}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </nav>
          </div>

          <div
            className="flex flex-col gap-[var(--space-2)] sm:flex-row sm:flex-wrap"
            aria-label={t('footer.contactAria')}
          >
            <button
              type="button"
              className="maydi-hover-fill maydi-hover-fill--outline inline-flex items-center justify-center px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
              onClick={openDataRoom}
            >
              <span className="maydi-hover-fill__label">{t('footer.dataRoom')}</span>
            </button>
            <a
              href="mailto:partners@maydi.net?subject=Request%3A%20Enterprise%20Demo"
              className="maydi-hover-fill maydi-hover-fill--outline inline-flex items-center justify-center px-[var(--space-3)] py-[var(--space-2)] font-[family-name:var(--font-mono)] text-[var(--text-sm)]"
            >
              <span className="maydi-hover-fill__label">{t('footer.demo')}</span>
            </a>
          </div>
        </div>

        <p className="mx-auto mt-[var(--space-12)] max-w-[var(--max-width)] font-[family-name:var(--font-mono)] text-[var(--text-xs)] text-[var(--color-muted)]">
          © 2026 maydi.
        </p>
      </div>
    </footer>
  );
}
