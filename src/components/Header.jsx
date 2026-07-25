import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { useLenis } from '../lenis/LenisProvider';
import { getScrollTop, scrollToTarget, scrollToTop } from '../lenis/lenisInstance';

const NAV = [
  { hash: '#why', key: 'manifesto' },
  { hash: '#projects', key: 'ecosystem' },
  { hash: '#studio', key: 'enterprise' },
  { hash: '#partners', key: 'partners' },
  { hash: '#masterplan', key: 'masterplan' },
];

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
];

const PITCH_HREF = 'mailto:partners@maydi.net?subject=Request%3A%20Pitch%20Deck';
const HEADER_HEIGHT = 64;
const HEADER_OFFSET = HEADER_HEIGHT;
const HERO_DOCK_BOTTOM = 0;
const HERO_LOGO_FADE_RATIO = 0.1;

function scrollToHash(hash) {
  const id = hash.replace(/^#/, '');
  scrollToTarget(`#${id}`, { offset: -HEADER_OFFSET });
}

function navHref(pathname, hash) {
  return pathname === '/' ? hash : `/${hash}`;
}

function getDockOffset() {
  return Math.max(0, window.innerHeight - HEADER_HEIGHT - HERO_DOCK_BOTTOM);
}

function getHeroHeaderY(scrollTop, dockOffset, forceTop) {
  if (forceTop) return 0;
  return Math.max(0, dockOffset - scrollTop);
}

export default function Header() {
  const { locale, setLocale, t } = useLocale();
  const lenis = useLenis();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === '/';
  const [pinned, setPinned] = useState(!isHome);
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);
  const dockOffsetRef = useRef(getDockOffset());
  const pinnedRef = useRef(!isHome);
  const rafRef = useRef(null);
  const openRef = useRef(false);

  openRef.current = open;

  const syncHeaderLogoOpacity = (forcedOpacity) => {
    const logo = headerRef.current?.querySelector('.site-header__logo');
    if (!logo) return;

    let opacity = forcedOpacity ?? 1;

    if (forcedOpacity === undefined && pathname === '/') {
      const hero = document.querySelector('.hero-below-grid');
      if (hero) {
        const heroHeight = hero.offsetHeight;
        const fadeRange = heroHeight * HERO_LOGO_FADE_RATIO;
        const fadeStart = heroHeight - fadeRange;
        const scroll = getScrollTop();
        opacity = scroll <= fadeStart ? 0 : Math.min(1, (scroll - fadeStart) / fadeRange);
      }
    }

    logo.style.opacity = String(opacity);
  };

  const applyHeaderTransform = (y) => {
    const el = headerRef.current;
    if (!el) return;

    if (!isHome) {
      el.style.transform = '';
      syncHeaderLogoOpacity(1);
      return;
    }

    el.style.transform = y <= 0 ? 'translate3d(0, 0, 0)' : `translate3d(0, ${y}px, 0)`;

    const nextPinned = y <= 0;
    if (nextPinned !== pinnedRef.current) {
      pinnedRef.current = nextPinned;
      setPinned(nextPinned);
    }
  };

  const syncHeaderPosition = () => {
    if (pathname !== '/') {
      applyHeaderTransform(0);
      const nextPinned = getScrollTop() > 16;
      if (nextPinned !== pinnedRef.current) {
        pinnedRef.current = nextPinned;
        setPinned(nextPinned);
      }
      syncHeaderLogoOpacity(1);
      return;
    }

    const y = getHeroHeaderY(getScrollTop(), dockOffsetRef.current, openRef.current);
    applyHeaderTransform(y);
    syncHeaderLogoOpacity();
  };

  const scheduleHeaderSync = () => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      syncHeaderPosition();
    });
  };

  const remeasureAndSync = () => {
    dockOffsetRef.current = getDockOffset();
    syncHeaderPosition();
  };

  useLayoutEffect(() => {
    dockOffsetRef.current = getDockOffset();
    syncHeaderPosition();
  }, [pathname, isHome, open]);

  useEffect(() => {
    remeasureAndSync();

    if (lenis) {
      lenis.on('scroll', scheduleHeaderSync);
    } else {
      window.addEventListener('scroll', scheduleHeaderSync, { passive: true });
    }

    window.addEventListener('resize', remeasureAndSync);

    return () => {
      if (lenis) lenis.off('scroll', scheduleHeaderSync);
      else window.removeEventListener('scroll', scheduleHeaderSync);
      window.removeEventListener('resize', remeasureAndSync);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathname, lenis]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, locale]);

  const goTop = (e) => {
    e.preventDefault();
    setOpen(false);
    if (pathname !== '/') {
      navigate('/');
      requestAnimationFrame(() => scrollToTop());
      return;
    }
    scrollToTop();
  };

  const onNavClick = (e, hash) => {
    setOpen(false);
    if (pathname !== '/') return;
    e.preventDefault();
    scrollToHash(hash);
  };

  const chip = 'header-nav-link';
  const currentLang = LANGS.find((l) => l.code === locale)?.label ?? 'EN';
  const showBar = pinned || open || !isHome;

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ru' : 'en');
  };

  return (
    <header
      ref={headerRef}
      className={`site-header fixed inset-x-0 top-0 z-50 ${showBar ? 'site-header--bar' : 'site-header--clear'}`}
    >
      <div className="mx-auto grid h-16 max-w-[var(--max-width)] grid-cols-[1fr_auto_1fr] items-center gap-[var(--space-2)] px-0 md:px-[var(--space-1)]">
        <div className="justify-self-start">
          <Link
            to="/"
            onClick={goTop}
            className="site-header__logo font-[family-name:var(--font-display)] text-[var(--text-lg)] font-extrabold tracking-tight text-white"
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
              <span className="maydi-hover-fill__label">{t(`nav.${item.key}`)}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-[var(--space-2)] justify-self-end md:gap-[var(--space-3)]">
          <button
            type="button"
            className="header-nav-link header-nav-link--lang"
            aria-label={t('lang.switch')}
            onClick={toggleLocale}
          >
            <span className="maydi-hover-fill__label">{currentLang}</span>
          </button>

          <a
            href={PITCH_HREF}
            className="header-nav-link header-nav-link--pitch hidden sm:inline-flex"
          >
            <span className="maydi-hover-fill__label">{t('nav.pitch')}</span>
          </a>

          <button
            type="button"
            className="site-header__burger inline-flex h-8 w-8 flex-col items-center justify-center gap-[5px] bg-transparent md:hidden"
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
          className="site-header__mobile-nav px-0 py-[var(--space-3)] md:hidden"
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
                  <span className="maydi-hover-fill__label">{t(`nav.${item.key}`)}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={PITCH_HREF} className={`${chip} header-nav-link--pitch`} onClick={() => setOpen(false)}>
                <span className="maydi-hover-fill__label">{t('nav.pitch')}</span>
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
