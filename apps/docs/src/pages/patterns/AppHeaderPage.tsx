import { useState } from 'react'
import { TopNavigation, TopNavSearch, Button, Avatar, ButtonDropdown } from '@shieldai/ds'
import type { TopNavItem } from '@shieldai/ds'
import { Bell, Settings, Shield, ChevronDown } from 'lucide-react'
import { DocSection } from '../../components/docs'

const CODE = `import { TopNavigation, TopNavSearch, Button, Badge, Avatar, ButtonDropdown } from '@shieldai/ds'

// Full app header pattern
<TopNavigation
  logo={
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 bg-ds-purple rounded flex items-center justify-center shadow-glow">
        <Shield className="h-3.5 w-3.5 text-black" />
      </div>
      <span className="font-black uppercase tracking-widest italic text-sm">
        Shield<em className="not-italic text-ds-green">AI</em>
      </span>
    </div>
  }
  items={navItems}
  search={<TopNavSearch placeholder="Search (⌘K)" />}
  utility={
    <div className="flex items-center gap-1.5">
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </Button>
      <ButtonDropdown label={<Avatar type="user" size="sm" />} items={userMenuItems} />
    </div>
  }
/>`

const NAV_ITEMS: TopNavItem[] = [
  { id: 'agents',   label: 'Agents' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'chat',     label: 'Chat' },
  { id: 'metrics',  label: 'Metrics' },
  { id: 'docs',     label: 'Docs' },
]

const USER_MENU = [
  { id: 'profile',  label: 'Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'billing',  label: 'Billing' },
  { id: 'logout',   label: 'Sign out', danger: true },
]

function FullHeader({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const items = NAV_ITEMS.map((i) => ({ ...i, active: i.id === active, onClick: () => setActive(i.id) }))
  return (
    <TopNavigation
      logo={
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-ds-purple rounded flex items-center justify-center shadow-glow">
            <Shield className="h-3.5 w-3.5 text-black" />
          </div>
          <span className="font-black uppercase tracking-widest italic text-sm">
            Shield<em className="not-italic text-ds-green">AI</em>
          </span>
        </div>
      }
      items={items}
      search={<TopNavSearch placeholder="Search (⌘K)" />}
      sticky={false}
      utility={
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <div className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-ds-red rounded-full" />
            </div>
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <ButtonDropdown
            label={
              <div className="flex items-center gap-1.5">
                <Avatar size="sm" />
                <ChevronDown className="h-3 w-3 text-ds-comment" />
              </div>
            }
            items={USER_MENU}
            placement="bottom-end"
            variant="ghost"
          />
        </div>
      }
    />
  )
}

export default function AppHeaderPage() {
  const [active, setActive] = useState('agents')

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">04.01</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">App Header</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Full application header composition. Built from TopNavigation + TopNavSearch + ButtonDropdown for the user menu. 64px, sticky, backdrop-blurred.
        </p>
      </div>

      <DocSection title="Full header — interactive">
        <div className="border border-ds-current rounded-ds-lg overflow-hidden">
          <FullHeader active={active} setActive={setActive} />
          <div className="px-8 py-10 text-center text-ds-comment text-sm bg-ds-bg">
            <span className="font-mono text-ds-purple">{active}</span> page content
          </div>
        </div>
      </DocSection>

      <DocSection title="Anatomy">
        <div className="space-y-2">
          {[
            { zone: 'Logo',    width: '≈ 160px', desc: 'Brand mark + product name. Links to home.' },
            { zone: 'Primary nav', width: 'flex-1', desc: '3–6 top-level sections. Active state: purple text + bg.' },
            { zone: 'Search',  width: '≈ 240px', desc: 'TopNavSearch. Hidden on mobile, ⌘K shortcut.' },
            { zone: 'Utility', width: 'auto',   desc: 'Notifications, settings, user avatar + menu.' },
          ].map((row) => (
            <div key={row.zone} className="grid grid-cols-3 gap-3 py-2 border-b border-ds-current/20 text-sm">
              <span className="font-medium text-ds-fg text-xs">{row.zone}</span>
              <code className="text-ds-cyan text-[11px]">{row.width}</code>
              <span className="text-ds-comment text-[12px]">{row.desc}</span>
            </div>
          ))}
        </div>
      </DocSection>

      <DocSection title="Implementation">
        <pre className="text-[11px] font-mono text-ds-comment leading-relaxed whitespace-pre overflow-x-auto">{CODE}</pre>
      </DocSection>
    </div>
  )
}
