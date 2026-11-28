// A labeled form input. `as` lets the same component render an input, textarea or select.
// `name` uses the backend's snake_case field name (see docs/DATA_MODEL.md).
// Minimal style: small uppercase label, no box, just a hairline underneath that turns black on focus.
export default function Field({ label, name, as = 'input', className = '', children, ...props }) {
  const Tag = as
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs tracking-label text-muted uppercase">{label}</span>
      <Tag
        name={name}
        className="rounded-none border-0 border-b border-line-strong bg-transparent px-0 py-2 text-base placeholder:text-muted focus:border-ink focus-ring"
        {...props}
      >
        {children}
      </Tag>
    </label>
  )
}
