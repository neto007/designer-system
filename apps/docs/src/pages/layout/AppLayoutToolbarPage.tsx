import { useState } from 'react'
import {
  AppLayoutToolbar, ToolbarSeparator, ToolbarGroup,
  Button, Badge, Breadcrumb, Tabs, TabsList, TabsTrigger,
} from '@shieldai/ds'
import { ComponentBlock, DocSection, PreviewRow } from '../../components/docs'
import { Play, Square, Download, RefreshCw, Settings, Bell, Filter } from 'lucide-react'

// ─── Demo data ────────────────────────────────────────────────────────────────

const BREADCRUMB_ITEMS = [
  { label: 'Agents',    href: '#' },
  { label: 'Fleet',     href: '#' },
  { label: 'ml-agent-01' },
]

function FullToolbar() {
  const [running, setRunning] = useState(false)
  return (
    <AppLayoutToolbar
      breadcrumb={
        <Breadcrumb items={BREADCRUMB_ITEMS} />
      }
      title={
        <div className="flex items-center gap-2">
          <span>ml-agent-01</span>
          <Badge variant={running ? 'solid-green' : 'muted'}>
            {running ? 'running' : 'idle'}
          </Badge>
        </div>
      }
      actions={
        <>
          <ToolbarGroup>
            <Button size="sm" variant="outline" leftIcon={<Filter className="h-3.5 w-3.5" />}>
              Filter
            </Button>
            <Button size="sm" variant="outline" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>
              Refresh
            </Button>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <Button size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>
              Export
            </Button>
            <Button
              size="sm"
              variant={running ? 'destructive' : 'neu-green'}
              leftIcon={running
                ? <Square className="h-3.5 w-3.5" />
                : <Play className="h-3.5 w-3.5" />
              }
              onClick={() => setRunning((r) => !r)}
            >
              {running ? 'Stop' : 'Run'}
            </Button>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <Button size="icon" variant="ghost" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" aria-label="Settings">
              <Settings className="h-4 w-4" />
            </Button>
          </ToolbarGroup>
        </>
      }
    />
  )
}

function ToolbarWithTabs() {
  const [tab, setTab] = useState('overview')
  return (
    <AppLayoutToolbar
      title="Agent Fleet"
      actions={
        <Button size="sm" leftIcon={<Play className="h-3.5 w-3.5" />}>
          Deploy
        </Button>
      }
      tabs={
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="border-0 rounded-none bg-transparent p-0 gap-0">
            {['Overview', 'Logs', 'Metrics', 'Config'].map((t) => (
              <TabsTrigger
                key={t}
                value={t.toLowerCase()}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-ds-purple data-[state=active]:text-ds-purple data-[state=active]:bg-transparent px-4 py-2 text-xs font-mono uppercase tracking-widest"
              >
                {t}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      }
    />
  )
}

// ─── Code ─────────────────────────────────────────────────────────────────────

const CODE_BASIC = `import { AppLayoutToolbar, ToolbarGroup, ToolbarSeparator, Button } from '@shieldai/ds'

<AppLayoutToolbar
  breadcrumb={<Breadcrumb items={crumbs} />}
  title="Agent Dashboard"
  actions={
    <>
      <ToolbarGroup>
        <Button size="sm" variant="outline">Filter</Button>
        <Button size="sm" variant="outline">Refresh</Button>
      </ToolbarGroup>
      <ToolbarSeparator />
      <Button size="sm" variant="neu-green">Deploy</Button>
    </>
  }
/>`

const CODE_TABS = `<AppLayoutToolbar
  title="Agent Fleet"
  actions={<Button size="sm">Deploy</Button>}
  tabs={
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="border-0 rounded-none bg-transparent p-0 gap-0">
        {['Overview', 'Logs', 'Metrics'].map((t) => (
          <TabsTrigger
            key={t}
            value={t.toLowerCase()}
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-ds-purple px-4 py-2 text-xs font-mono uppercase"
          >
            {t}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  }
/>`

const PROPS = [
  { name: 'breadcrumb', type: 'ReactNode', default: '—',     description: 'Breadcrumb trail shown above the title' },
  { name: 'title',      type: 'ReactNode', default: '—',     description: 'Page or view title — can include Badge' },
  { name: 'actions',    type: 'ReactNode', default: '—',     description: 'Action area — use ToolbarGroup + ToolbarSeparator' },
  { name: 'tabs',       type: 'ReactNode', default: '—',     description: 'Optional tab bar rendered below the main row' },
  { name: 'className',  type: 'string',    default: '—',     description: 'Additional classes on the toolbar wrapper' },
]

const GROUP_PROPS = [
  { name: 'children',  type: 'ReactNode', default: '—', description: 'Buttons or controls to group with gap-1' },
  { name: 'className', type: 'string',    default: '—', description: 'Additional classes' },
]

export default function AppLayoutToolbarPage() {
  return (
    <div className="space-y-10 max-w-4xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">03.Layout</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">App Layout Toolbar</h1>
        <p className="text-ds-comment text-sm leading-relaxed max-w-xl">
          Secondary toolbar that sits below the top navigation. Provides breadcrumb, page title, contextual actions, and an optional tab bar for view switching.
        </p>
      </div>

      <ComponentBlock
        num="ALT.1"
        title="Full toolbar"
        tag="breadcrumb · title · badge · actions · separator"
        description="Full composition with breadcrumb navigation, titled context, grouped actions, and a live Run/Stop toggle."
        preview={
          <div className="w-full border border-ds-current rounded-ds-lg overflow-hidden">
            <FullToolbar />
            <div className="px-6 py-8 text-center text-ds-comment text-sm bg-ds-bg">
              Page content area
            </div>
          </div>
        }
        code={CODE_BASIC}
        props={PROPS}
      />

      <ComponentBlock
        num="ALT.2"
        title="Toolbar with tabs"
        tag="title · actions · tab bar"
        description="Tabs slot renders a sub-navigation row below the main toolbar row. Style TabsTrigger with bottom-border to match the toolbar aesthetic."
        preview={
          <div className="w-full border border-ds-current rounded-ds-lg overflow-hidden">
            <ToolbarWithTabs />
            <div className="px-6 py-8 text-center text-ds-comment text-sm bg-ds-bg">
              Tab content area
            </div>
          </div>
        }
        code={CODE_TABS}
      />

      <DocSection title="ToolbarGroup &amp; ToolbarSeparator">
        <PreviewRow label="groups + separator">
          <div className="flex items-center gap-2 p-3 bg-ds-panel border border-ds-current rounded-ds-md w-full">
            <ToolbarGroup>
              <Button size="sm" variant="outline" leftIcon={<Filter className="h-3.5 w-3.5" />}>Filter</Button>
              <Button size="sm" variant="outline" leftIcon={<RefreshCw className="h-3.5 w-3.5" />}>Refresh</Button>
            </ToolbarGroup>
            <ToolbarSeparator />
            <ToolbarGroup>
              <Button size="sm" variant="outline" leftIcon={<Download className="h-3.5 w-3.5" />}>Export</Button>
              <Button size="sm" leftIcon={<Play className="h-3.5 w-3.5" />}>Deploy</Button>
            </ToolbarGroup>
          </div>
        </PreviewRow>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-ds-current">
                {['Component', 'Prop', 'Type', 'Description'].map((h) => (
                  <th key={h} className="text-left py-2 pr-4 font-mono text-[10px] uppercase tracking-widest text-ds-comment">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ds-current/30">
              {GROUP_PROPS.map((p) => (
                <tr key={p.name}>
                  <td className="py-2 pr-4 font-mono text-ds-cyan text-[10px]">ToolbarGroup</td>
                  <td className="py-2 pr-4 font-mono text-ds-purple">{p.name}</td>
                  <td className="py-2 pr-4 text-ds-green font-mono">{p.type}</td>
                  <td className="py-2 text-ds-comment">{p.description}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 pr-4 font-mono text-ds-cyan text-[10px]">ToolbarSeparator</td>
                <td className="py-2 pr-4 font-mono text-ds-purple">className</td>
                <td className="py-2 pr-4 text-ds-green font-mono">string</td>
                <td className="py-2 text-ds-comment">Vertical 1px divider between groups</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocSection>

      <DocSection title="Anatomy">
        <div className="space-y-2">
          {[
            { zone: 'Breadcrumb',  desc: 'Path context — optional. Links back to parent sections.',            class: 'font-mono text-[11px] text-ds-comment' },
            { zone: 'Title',       desc: 'Current page or view name. Can include Badge for live status.',       class: 'text-sm font-semibold text-ds-fg' },
            { zone: 'Actions',     desc: 'Right-aligned. Group with ToolbarGroup, separate with ToolbarSeparator.', class: 'flex items-center gap-2' },
            { zone: 'Tabs',        desc: 'Optional secondary nav row. Style with bottom-border active state.', class: 'border-b-2 border-ds-purple' },
          ].map((row) => (
            <div key={row.zone} className="flex items-start gap-4 py-2 border-b border-ds-current/20">
              <span className="w-28 text-xs font-medium text-ds-fg flex-shrink-0">{row.zone}</span>
              <span className="text-xs text-ds-comment">{row.desc}</span>
              <code className="ml-auto text-[10px] text-ds-comment font-mono flex-shrink-0">{row.class}</code>
            </div>
          ))}
        </div>
      </DocSection>
    </div>
  )
}
