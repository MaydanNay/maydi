/** @type {import('lenis').default | null} */
let lenisInstance = null;

export function setLenisInstance(instance) {
  lenisInstance = instance;
}

export function getLenisInstance() {
  return lenisInstance;
}

export function getScrollTop() {
  if (lenisInstance) return lenisInstance.scroll;
  return window.scrollY ?? document.documentElement.scrollTop ?? 0;
}

export function getScrollMetrics() {
  if (lenisInstance) {
    return {
      scrollTop: lenisInstance.scroll,
      scrollHeight: lenisInstance.dimensions.scrollHeight,
      clientHeight: lenisInstance.dimensions.height,
    };
  }

  return {
    scrollTop: getScrollTop(),
    scrollHeight: document.documentElement.scrollHeight,
    clientHeight: window.innerHeight,
  };
}

export function scrollToTop(options = {}) {
  const { duration = 1.6, immediate = false } = options;
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { duration, immediate });
    return;
  }
  window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}

export function scrollToTarget(target, options = {}) {
  const { offset = 0, duration = 1.6, immediate = false } = options;
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration, immediate });
    return;
  }

  let top = 0;
  if (typeof target === 'number') {
    top = target;
  } else if (typeof target === 'string') {
    const el = document.querySelector(target.startsWith('#') ? target : `#${target}`);
    if (!el) return;
    top = el.getBoundingClientRect().top + window.scrollY;
  } else if (target instanceof Element) {
    top = target.getBoundingClientRect().top + window.scrollY;
  }

  window.scrollTo({ top: Math.max(0, top + offset), behavior: immediate ? 'auto' : 'smooth' });
}
