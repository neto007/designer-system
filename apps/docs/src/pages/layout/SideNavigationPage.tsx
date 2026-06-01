import { SideNavigation } from '@shieldai/ds'
import type { SideNavSection } from '@shieldai/ds'
import { LayoutDashboard, Bot, Workflow, Shield, Settings, Bell, Users, FileText, HelpCircle, Zap } from 'lucide-react'
import { ComponentBlock } from '../../components/docs'

const CODE = `import { SideNavigation } from '@shieldai/ds'

<SideNavigation
  width={240}
  header={<span className="font-bold text-ds-purple">ShieldAI</span>}
  sections={[
    {
      label: 'Main',
      items: [
        { label: 'Dashboard', href: '/', icon: <LayoutDashboard />, active: true },
        { label: 'Agents',    href: '/agents', icon: <Bot />, badge: 12 },
        { label: 'Workflow',  href: '/workflow', icon: <Workflow />, children: [
          { label: 'Active pipelines', href: '/workflow/active', active: false },
          { label: 'Templates',        href: '/workflow/templates' },
        ]},
      ],
    },
  ]}
  footer={<span className="text-xs text-ds-comment">v1.0.0</span>}
/>`

const PROPS = [
  { name: 'sections', type: 'SideNavSection[]', default: '—', description: 'Array of { label?, items: SideNavItem[] }' },
  { name: 'header', type: 'ReactNode', default: '—', description: 'Content above the nav (logo, product name)' },
  { name: 'footer', type: 'ReactNode', default: '—', description: 'Content below the nav (version, user info)' },
  { name: 'width', type: 'number | string', default: '240', description: 'Nav width in px or any CSS string' },
  { name: 'className', type: 'string', default: '—', description: 'Additional classes on the nav element' },
]

const SECTIONS: SideNavSection[] = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard',  icon: <LayoutDashboard className="h-4 w-4" />, active: true },
      { label: 'Agents',     icon: <Bot className="h-4 w-4" />, badge: 12 },
      {
        label: 'Workflow',
        icon: <Workflow className="h-4 w-4" />,
        children: [
          { label: 'Active pipelines', active: false },
          { label: 'Templates' },
          { label: 'History' },
        ],
      },
      { label: 'Threat Intel', icon: <Shield className="h-4 w-4" />, badge: 3 },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Team',         icon: <Users className="h-4 w-4" /> },
      { label: 'Notifications',icon: <Bell className="h-4 w-4" />, badge: 5 },
      { label: 'Integrations', icon: <Zap className="h-4 w-4" /> },
      { label: 'Audit Logs',   icon: <FileText className="h-4 w-4" /> },
      { label: 'Settings',     icon: <Settings className="h-4 w-4" /> },
    ],
  },
  {
    label: 'Support',
    items: [
      { label: 'Documentation', icon: <FileText className="h-4 w-4" /> },
      { label: 'Help',          icon: <HelpCircle className="h-4 w-4" /> },
    ],
  },
]

export default function SideNavigationPage() {
  return (
    <ComponentBlock
      num="03.SN"
      title="Side Navigation"
      tag="sections · nested · badge · collapsible"
      description="Vertical app navigation panel with grouped sections, optional labels, badges, and collapsible nested items. Active items show a purple left border. Used as the primary left rail in the App Layout shell."
      preview={
        <div className="w-full border border-ds-current rounded-ds-xl overflow-hidden bg-ds-bg flex" style={{ height: 480 }}>
          <SideNavigation
            sections={SECTIONS}
            header={
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-ds-purple rounded flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-ds-bg" />
                </div>
                <span className="font-bold text-sm text-ds-fg">ShieldAI</span>
              </div>
            }
            footer={
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-ds-comment">v1.0.0</span>
                <span className="w-1.5 h-1.5 rounded-full bg-ds-green animate-pulse-glow" />
              </div>
            }
          />
          <div className="flex-1 flex items-center justify-center text-ds-comment text-sm">
            Main content area
          </div>
        </div>
      }
      code={CODE}
      filename="SideNavigation.tsx"
      props={PROPS}
    />
  )
}
