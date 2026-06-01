interface PropRow {
  name: string
  type: string
  default?: string
  description: string
  required?: boolean
}

interface PropsTableProps {
  props: PropRow[]
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div className="overflow-x-auto rounded-ds-md border border-ds-current">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-ds-current bg-ds-bg">
            <th className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ds-comment font-black">Prop</th>
            <th className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ds-comment font-black">Type</th>
            <th className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ds-comment font-black">Default</th>
            <th className="text-left px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-ds-comment font-black">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((row, i) => (
            <tr
              key={row.name}
              className={i % 2 === 0 ? 'bg-ds-bg' : 'bg-ds-panel'}
            >
              <td className="px-4 py-2.5 align-top">
                <code className="font-mono text-[12px] text-ds-purple">
                  {row.name}
                  {row.required && <span className="text-ds-red ml-0.5">*</span>}
                </code>
              </td>
              <td className="px-4 py-2.5 align-top">
                <code className="font-mono text-[11px] text-ds-cyan whitespace-nowrap">{row.type}</code>
              </td>
              <td className="px-4 py-2.5 align-top">
                {row.default ? (
                  <code className="font-mono text-[11px] text-ds-orange">{row.default}</code>
                ) : (
                  <span className="text-ds-current">—</span>
                )}
              </td>
              <td className="px-4 py-2.5 align-top text-ds-comment text-[13px] leading-relaxed">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
