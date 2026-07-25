export function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const base =
    'maydi-hover-fill inline-flex items-center justify-center gap-2 px-[var(--space-3)] py-[var(--space-2)] text-[var(--text-sm)] tracking-wide disabled:opacity-40';

  const variants = {
    primary: 'maydi-hover-fill--outline font-[family-name:var(--font-mono)] uppercase tracking-[0.12em]',
    ghost: 'maydi-hover-fill--ghost',
    link: 'maydi-hover-fill--muted px-[var(--space-2)] py-1',
  };

  return (
    <button type={type} className={`${base} ${variants[variant] ?? variants.primary} ${className}`.trim()} {...props}>
      <span className="maydi-hover-fill__label">{children}</span>
    </button>
  );
}
