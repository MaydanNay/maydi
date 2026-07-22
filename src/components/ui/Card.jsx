export function Card({ children, className = '', as: Tag = 'article', ...props }) {
  return (
    <Tag
      className={`border border-[var(--color-line)] bg-[var(--color-bg-1)] p-[var(--space-4)] transition-[border-color,background-color] duration-200 hover:border-[var(--color-muted)] hover:bg-[var(--color-bg-2)] ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
}
