export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-sm)] tracking-wide transition-colors duration-200 disabled:opacity-40';

  const variants = {
    primary:
      'bg-[var(--color-white)] text-[var(--color-bg-0)] hover:bg-[var(--color-text)]',
    ghost:
      'border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-muted)] hover:bg-[var(--color-bg-2)]',
    link: 'px-0 py-0 text-[var(--color-muted)] hover:text-[var(--color-white)] underline-offset-4 hover:underline',
  };

  return (
    <button type={type} className={`${base} ${variants[variant] ?? variants.primary} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
