import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Shield, Bell, ChevronLeft, Settings, LayoutDashboard,
  Bot, FileSearch, ChevronRight, LogOut,
  type LucideIcon,
} from 'lucide-react'
import { cn, Badge, Avatar, StatusDot } from '@shieldai/ds'

export interface ExampleNavItem {
  label: string
  icon: LucideIcon
  href: string
  badge?: number
}

const NAV_ITEMS: ExampleNavItem[] = [
  { label: 'Dashboard',     icon: LayoutDashboard, href: '/examples/dashboard' },
  { label: 'Agent Monitor', icon: Bot,             href: '/examples/agent-monitor', badge: 3 },
  { label: 'Data Explorer', icon: FileSearch,      href: '/examples/data-explorer' },
  { label: 'Settings',      icon: Settings,        href: '/examples/settings' },
]

interface ExampleShellProps {
  children: React.ReactNode
  title?: string
  actions?: React.ReactNode
}

export function ExampleShell({ children, title, actions }: ExampleShellProps) {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex flex-col h-screen bg-ds-bg text-ds-fg overflow-hidden">

      {/* Top Nav */}
      <header className="h-14 flex-shrink-0 flex items-center px-4 gap-4 border-b border-ds-current bg-ds-panel/80 backdrop-blur z-sticky">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 bg-ds-purple rounded flex items-center justify-center shadow-glow">
            <Shield className="h-4 w-4 text-black" />
          </div>
          <span className="font-black text-sm uppercase tracking-widest text-ds-fg">
            Shield<span className="text-ds-green">AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 ml-4">
          {['Platform', 'Agents', 'Reports', 'Docs'].map((l) => (
            <button key={l}
              className="px-3 py-1.5 text-xs font-mono text-ds-comment hover:text-ds-fg rounded-ds-sm hover:bg-ds-current/50 transition-colors">
              {l}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <StatusDot status="live" label="All systems operational" />
          <button className="relative p-1.5 text-ds-comment hover:text-ds-fg transition-colors">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-ds-red" />
          </button>
          <Avatar initials="JD" />
        </div>

        <button
          onClick={() => navigate('/')}
          className="ml-3 flex items-center gap-1.5 px-2.5 py-1 rounded-ds-sm border border-ds-current text-[11px] font-mono text-ds-comment hover:text-ds-fg hover:border-ds-purple transition-colors"
        >
          <ChevronLeft className="h-3 w-3" />
          Docs
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={cn(
          'flex-shrink-0 flex flex-col border-r border-ds-current bg-ds-bg transition-[width] duration-[250ms] ease-[cubic-bezier(0.05,0.7,0.1,1.0)] overflow-hidden',
          sidebarOpen ? 'w-[220px]' : 'w-[52px]'
        )}>
          <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} to={item.href}
                className={({ isActive }) => cn(
                  'flex items-center gap-2.5 px-2.5 py-2 rounded-ds-md transition-all duration-[150ms] group relative',
                  isActive
                    ? 'bg-ds-purple/15 text-ds-purple'
                    : 'text-ds-comment hover:text-ds-fg hover:bg-ds-current/50'
                )}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-ds-purple rounded-r-full" />}
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {sidebarOpen && (
                      <>
                        <span className="text-[13px] font-medium flex-1 whitespace-nowrap">{item.label}</span>
                        {item.badge && <Badge variant="red">{item.badge}</Badge>}
                      </>
                    )}
                    {!sidebarOpen && item.badge && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-ds-red" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-ds-current p-2 space-y-1">
            <button
              onClick={() => setSidebarOpen(o => !o)}
              className={cn(
                'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-ds-md text-[12px] font-mono text-ds-comment hover:text-ds-fg hover:bg-ds-current/50 transition-colors',
                !sidebarOpen && 'justify-center'
              )}
            >
              <ChevronRight className={cn('h-3.5 w-3.5 transition-transform duration-[200ms]', sidebarOpen && 'rotate-180')} />
              {sidebarOpen && <span>Collapse</span>}
            </button>
            {sidebarOpen && (
              <button className="flex items-center gap-2.5 w-full px-2.5 py-1.5 rounded-ds-md text-[12px] font-mono text-ds-comment hover:text-ds-red transition-colors">
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign out</span>
              </button>
            )}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {(title || actions) && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-ds-current bg-ds-panel/40">
              {title && <h1 className="text-lg font-bold text-ds-fg">{title}</h1>}
              {actions && <div className="flex items-center gap-2">{actions}</div>}
            </div>
          )}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
