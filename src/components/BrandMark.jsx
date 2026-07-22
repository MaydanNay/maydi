import { useState } from 'react';

/**
 * maydi wordmark: hover/focus "may" → Maydan, "di" → Diana.
 * Open part covers the other half so names read cleanly.
 */
export default function BrandMark({ className = '', as: Tag = 'h1' }) {
  const [active, setActive] = useState(null);

  const open = (part) => setActive(part);
  const close = () => setActive(null);
  const toggle = (part) => setActive((prev) => (prev === part ? null : part));

  return (
    <Tag
      className={`brand-mark ${className}`.trim()}
      data-open={active || undefined}
      aria-label="maydi — Maydan и Diana"
    >
      <span
        className={`brand-mark__part${active === 'may' ? ' is-open' : ''}`.trim()}
        data-part="may"
        onMouseEnter={() => open('may')}
        onMouseLeave={close}
        onFocus={() => open('may')}
        onBlur={close}
        onClick={() => toggle('may')}
        tabIndex={0}
        role="button"
        aria-expanded={active === 'may'}
        aria-label="Maydan"
      >
        <span className="brand-mark__stem">{active === 'may' ? 'May' : 'may'}</span>
        <span className="brand-mark__tail" aria-hidden="true">
          dan
        </span>
      </span>
      <span
        className={`brand-mark__part${active === 'di' ? ' is-open' : ''}`.trim()}
        data-part="di"
        onMouseEnter={() => open('di')}
        onMouseLeave={close}
        onFocus={() => open('di')}
        onBlur={close}
        onClick={() => toggle('di')}
        tabIndex={0}
        role="button"
        aria-expanded={active === 'di'}
        aria-label="Diana"
      >
        <span className="brand-mark__stem">{active === 'di' ? 'Di' : 'di'}</span>
        <span className="brand-mark__tail" aria-hidden="true">
          ana
        </span>
      </span>
    </Tag>
  );
}
