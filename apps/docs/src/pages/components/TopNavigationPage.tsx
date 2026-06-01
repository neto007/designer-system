import { useState } from 'react'
import { TopNavigation, TopNavSearch, Button, Badge, Avatar } from '@shieldai/ds'
import type { TopNavItem } from '@shieldai/ds'
import { Bell, Settings, Shield } from 'lucide-react'
import { ComponentBlock, DocSection } from '../../components/docs'

const CODE = `import { TopNavigation, TopNavSearch, Button, Avatar } from '@shieldai/ds'
import type { TopNavItem } from '@shieldai/ds'

const items: TopNavItem[] = [
  { id: 'agents',   label: 'Agents',   href: '/agents',   active: true },
  { id: 'workflow', label: 'Workflow',  href: '/workflow' },
  { id: 'chat',     label: 'Chat',     href: '/chat' },
  { id: 'metrics',  label: 'Metrics',  href: '/metrics' },
]

<TopNavigation
  logo={<Shield className="h-5 w-5 text-ds-purple" />}
  title="ShieldAI"
  items={items}
  search={<TopNavSearch placeholder="Search agents…" />}
  utility={
    <>
      <Button variant="ghost" size="icon" aria-label="Notifications">
        <Bell className="h-4 w-4" />
      </Button>
      <Avatar size="sm" />
    </>
  }
/>`

const PROPS = [
  { name: 'logo', type: 'ReactNode', default: 'Shield icon', description: 'Brand logo slot (left)' },
  { name: 'title', type: 'ReactNode', default: '—', description: 'Product name next to logo' },
  { name: 'items', type: 'TopNavItem[]', default: '[]', description: 'Primary navigation links' },
  { name: 'utility', type: 'ReactNode', default: '—', description: 'Right-side utility area (avatar, notifications)' },
  { name: 'search', type: 'ReactNode', default: '—', description: 'Search slot — use TopNavSearch' },
  { name: 'sticky', type: 'boolean', default: 'true', description: 'Fixes the nav to the top on scroll' },
  { name: 'blurred', type: 'boolean', default: 'true', description: 'Applies backdrop-blur and semi-transparent bg' },
]

const NAV_ITEMS: TopNavItem[] = [
  { id: 'agents',   label: 'Agents',   active: true },
  { id: 'workflow', label: 'Workflow' },
  { id: 'chat',     label: 'Chat' },
  { id: 'metrics',  label: 'Metrics' },
]

function Demo() {
  const [active, setActive] = useState('agents')
  const items = NAV_ITEMS.map((i) => ({
    ...i,
    active: i.id === active,
    onClick: () => setActive(i.id),
  }))
  return (
    <div className="w-full border border-ds-current rounded-ds-lg overflow-hidden">
      <TopNavigation
        title="ShieldAI"
        items={items}
        search={<TopNavSearch placeholder="Search agents…" />}
        sticky={false}
        utility={
          <div className="flex items-center gap-1.5">
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
            <Badge color="green" dot>
              <Avatar size="sm" />
            </Badge>
          </div>
        }
      />
      <div className="p-8 text-center text-ds-comment text-sm">
        Active: <span className="text-ds-purple font-mono">{active}</span>
      </div>
    </div>
  )
}

export default function TopNavigationPage() {
  return (
    <ComponentBlock
      num="05.01"
      title="Top Navigation"
      tag="64px · sticky · backdrop-blur · responsive"
      description="Application chrome header. 64px tall, sticky, backdrop-blurred. Contains logo, primary nav links, optional search, and a utility area. Collapses to a hamburger menu on mobile."
      preview={<Demo />}
      code={CODE}
      props={PROPS}
    >
      <DocSection title="Minimal (logo only)">
        <div className="w-full border border-ds-current rounded-ds-lg overflow-hidden">
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
            sticky={false}
          />
        </div>
      </DocSection>

      <DocSection title="Without blur">
        <div className="w-full border border-ds-current rounded-ds-lg overflow-hidden">
          <TopNavigation
            title="ShieldAI"
            items={NAV_ITEMS}
            blurred={false}
            sticky={false}
            utility={<Button size="sm">Sign out</Button>}
          />
        </div>
      </DocSection>
    </ComponentBlock>
  )
}
