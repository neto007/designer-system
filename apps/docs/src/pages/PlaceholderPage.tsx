import { useLocation } from 'react-router-dom'
import { Badge } from '@shieldai/ds'

export default function PlaceholderPage() {
  const { pathname } = useLocation()
  const name = pathname.split('/').pop()?.replace(/-/g, ' ') ?? 'Page'

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-black uppercase tracking-tight text-ds-fg capitalize">{name}</h1>
        <Badge variant="orange">WIP</Badge>
      </div>
      <p className="text-ds-comment text-sm">
        This page is planned and will be documented in a future phase.
      </p>
      <div className="border border-dashed border-ds-current rounded-ds-lg p-8 text-center text-ds-comment font-mono text-xs uppercase tracking-widest">
        coming soon · {pathname}
      </div>
    </div>
  )
}
