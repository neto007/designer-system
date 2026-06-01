import { useState } from 'react'
import { SideNavigation, Button, Badge, StatusDot } from '@shieldai/ds'
import type { SideNavSection } from '@shieldai/ds'
import { LayoutDashboard, Bot, Workflow, Shield, Settings, Bell } from 'lucide-react'
import { DocSection } from '../../components/docs'

const CODE = `// App Layout is a composition pattern — not a single component.
// Combine TopNavigation + SideNavigation + content area:

import { TopNavigation, SideNavigation } from '@shieldai/ds'

function AppLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-ds-bg">
      {/* 64px top bar */}
      <TopNavigation ... />

      {/* Below top bar */}
      <div className="flex flex-1 overflow-hidden">
        <SideNavigation sections={sections} width={240} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}`

const SECTIONS: SideNavSection[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard',   icon: <LayoutDashboard className="h-4 w-4" />, active: true },
      { label: 'Agents',      icon: <Bot className="h-4 w-4" />, badge: 12 },
      { label: 'Workflow',    icon: <Workflow className="h-4 w-4" />, children: [
        { label: 'Active pipelines' },
        { label: 'Templates' },
      ]},
      { label: 'Threat Intel',icon: <Shield className="h-4 w-4" />, badge: 3 },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Notifications', icon: <Bell className="h-4 w-4" />, badge: 5 },
      { label: 'Settings',      icon: <Settings className="h-4 w-4" /> },
    ],
  },
]

export default function AppLayoutPage() {
  const [page, setPage] = useState('Dashboard')

  const sections = SECTIONS.map((s) => ({
    ...s,
    items: s.items.map((item) => ({
      ...item,
      active: item.label === page,
      onClick: () => setPage(item.label),
    })),
  }))

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-widest text-ds-purple mb-1">03 · Layout</div>
        <h1 className="text-3xl font-bold text-ds-fg mb-3">App Layout</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          App Layout is a composition pattern — combine TopNavigation, SideNavigation, and a scrollable content area inside a flex container.
        </p>
      </div>

      <DocSection title="Live Preview — Full Shell">
        <div className="w-full border border-ds-current rounded-ds-xl overflow-hidden bg-ds-bg flex flex-col" style={{ height: 460 }}>
          {/* Top bar */}
          <div className="h-14 flex-shrink-0 flex items-center px-4 gap-4 border-b border-ds-current bg-ds-panel/80 backdrop-blur">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-ds-purple rounded flex items-center justify-center">
                <Shield className="h-3.5 w-3.5 text-ds-bg" />
              </div>
              <span className="font-bold text-sm text-ds-fg">ShieldAI</span>
            </div>
            <nav className="flex items-center gap-1 ml-4">
              {['Platform', 'Agents', 'Reports'].map((l) => (
                <button key={l} className="px-3 py-1 text-xs text-ds-fg/60 hover:text-ds-fg rounded-ds-sm transition-colors">{l}</button>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <StatusDot status="live" label="All systems operational" />
              <Button size="sm" variant="neu-purple">Deploy</Button>
            </div>
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-hidden">
            <SideNavigation
              sections={sections}
              width={200}
              footer={
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-ds-comment">v1.0.0</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-ds-green animate-pulse-glow" />
                </div>
              }
            />
            <main className="flex-1 overflow-y-auto p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-ds-fg">{page}</h2>
                <Badge variant="green">live</Badge>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Agents active', 'Threats blocked', 'Pipelines'].map((label, i) => (
                  <div key={label} className="bg-ds-panel border border-ds-current rounded-ds-lg p-3">
                    <div className="text-[10px] font-mono text-ds-comment mb-1">{label}</div>
                    <div className="text-xl font-bold text-ds-fg">{[12, 847, 6][i]}</div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </DocSection>

      <DocSection title="Usage">
        <pre className="bg-ds-panel border border-ds-current rounded-ds-md p-4 text-xs text-ds-fg font-mono overflow-x-auto whitespace-pre">
          {CODE}
        </pre>
      </DocSection>
    </div>
  )
}
