import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';

const NAV = [
  { hash: '#why', key: 'manifesto' },
  { hash: '#projects', key: 'ecosystem' },
  { hash: '#studio', key: 'enterprise' },
  { hash: '#masterplan', key: 'masterplan' },
];

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

const PITCH_HREF = 'mailto:partners@maydi.net?subject=Request%3A%20Pitch%20Deck';
const HEADER_OFFSET = 64;

function scrollRoot(top) {
  const root = document.getElementById('root');
  if (root) root.scrollTo({ top, behavior: 'smooth' });
  else window.scrollTo({ top, behavior: 'smooth' });
}

function scrollToHash(hash) {
  const id = hash.replace(/^#/, '');
  const el = document.getElementById(id);
  const root = document.getElementById('root');
  if (!el || !root) return;
  const top =
    el.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop;
  root.scrollTo({ top: Math.max(0, top - HEADER_OFFSET), behavior: 'smooth' });
}

function navHref(pathname, hash) {
  return pathname === '/' ? hash : `/${hash}`;
}

export default function Header() {
  const { locale, setLocale, t } = useLocale();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef(null);

  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return undefined;

    const onScroll = () => setScrolled(root.scrollTop > 16);
    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });
    return () => root.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setLangOpen(false);
  }, [pathname, locale]);

  useEffect(() => {
    if (!langOpen) return undefined;
    const onPointer = (e) => {
      if (!langRef.current?.contains(e.target)) setLangOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setLangOpen(false);
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  const goTop = (e) => {
    e.preventDefault();
    setOpen(false);
    if (pathname !== '/') {
      navigate('/');
      requestAnimationFrame(() => scrollRoot(0));
      return;
    }
    scrollRoot(0);
  };

  const onNavClick = (e, hash) => {
    setOpen(false);
    if (pathname !== '/') return;
    e.preventDefault();
    scrollToHash(hash);
  };

  const chip =
    'font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] transition-colors hover:text-white';

  const currentLang = LANGS.find((l) => l.code === locale)?.label ?? 'EN';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? 'border-b border-white/10 bg-black/50 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto grid h-16 max-w-[var(--max-width)] grid-cols-[1fr_auto_1fr] items-center gap-[var(--space-2)] px-[var(--space-3)] md:px-[var(--space-6)]">
        <div className="justify-self-start">
          <Link
            to="/"
            onClick={goTop}
            className="font-[family-name:var(--font-display)] text-[var(--text-lg)] font-extrabold tracking-tight text-white"
          >
            maydi
          </Link>
        </div>

        <nav
          className="hidden items-center gap-[var(--space-4)] md:flex lg:gap-[var(--space-5)]"
          aria-label={t('nav.aria')}
        >
          {NAV.map((item) => (
            <a
              key={item.key}
              href={navHref(pathname, item.hash)}
              className={chip}
              onClick={(e) => onNavClick(e, item.hash)}
            >
              {t(`nav.${item.key}`)}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-[var(--space-2)] justify-self-end md:gap-[var(--space-3)]">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 border-0 bg-transparent p-0 font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-[0.12em] text-white transition-colors hover:text-white"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              aria-label={t('lang.switch')}
              onClick={() => setLangOpen((v) => !v)}
            >
              {currentLang}
              <span
                className={`text-[18px] leading-none text-white transition-transform ${
                  langOpen ? 'rotate-180' : ''
                }`}
                aria-hidden
              >
                ▾
              </span>
            </button>

            {langOpen ? (
              <ul
                role="listbox"
                aria-label={t('lang.switch')}
                className="absolute right-0 top-full z-50 mt-2 min-w-[56px] border border-white/10 bg-black/90 py-1 backdrop-blur-md"
              >
                {LANGS.map((lang) => (
                  <li key={lang.code} role="option" aria-selected={locale === lang.code}>
                    <button
                      type="button"
                      className={`block w-full border-0 bg-transparent px-3 py-1.5 text-left font-[family-name:var(--font-mono)] text-[8px] uppercase tracking-[0.12em] transition-colors ${
                        locale === lang.code
                          ? 'text-white'
                          : 'text-[var(--color-muted)] hover:text-white'
                      }`}
                      onClick={() => {
                        setLocale(lang.code);
                        setLangOpen(false);
                      }}
                    >
                      {lang.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <a
            href={PITCH_HREF}
            className="hidden border border-black bg-black px-[var(--space-2)] py-[5px] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white hover:!text-black sm:inline-flex"
          >
            {t('nav.pitch')}
          </a>

          <button
            type="button"
            className="inline-flex h-8 w-8 flex-col items-center justify-center gap-[5px] border border-[var(--color-line)] bg-transparent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t('nav.close') : t('nav.menu')}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-px w-3.5 bg-[var(--color-muted)] transition-transform ${
                open ? 'translate-y-[6px] rotate-45' : ''
              }`}
            />
            <span
              className={`block h-px w-3.5 bg-[var(--color-muted)] transition-opacity ${
                open ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-px w-3.5 bg-[var(--color-muted)] transition-transform ${
                open ? '-translate-y-[6px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-white/10 bg-black/80 px-[var(--space-3)] py-[var(--space-3)] backdrop-blur-md md:hidden"
          aria-label={t('nav.aria')}
        >
          <ul className="flex flex-col gap-[var(--space-3)]">
            {NAV.map((item) => (
              <li key={item.key}>
                <a
                  href={navHref(pathname, item.hash)}
                  className={chip}
                  onClick={(e) => onNavClick(e, item.hash)}
                >
                  {t(`nav.${item.key}`)}
                </a>
              </li>
            ))}
            <li>
              <a
                href={PITCH_HREF}
                className="inline-flex border border-black bg-black px-[var(--space-2)] py-[5px] font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-white transition-colors hover:border-white hover:bg-white hover:!text-black"
                onClick={() => setOpen(false)}
              >
                {t('nav.pitch')}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
