import { CodeBlock } from '@shieldai/ds'
import {
  Shield, Bot, Wrench, User, Copy, Trash2,
  Info, CheckCircle, AlertTriangle, XCircle, ChevronRight, ChevronDown,
  Menu, X, Search, Plus, Minus, Edit, Eye, EyeOff, Lock, Unlock,
  Play, Pause, Square, RotateCcw, RefreshCw, Download, Upload, ExternalLink,
  Code, Database, Globe, Server, Cpu, Activity,
  Link, Bell, Flag,
} from 'lucide-react'

const ICON_GROUPS = [
  {
    label: 'Agent & AI',
    icons: [
      { icon: Bot,      name: 'Bot' },
      { icon: Wrench,   name: 'Wrench' },
      { icon: Cpu,      name: 'Cpu' },
      { icon: Activity, name: 'Activity' },
      { icon: Code,     name: 'Code' },
      { icon: Database, name: 'Database' },
      { icon: Server,   name: 'Server' },
      { icon: Globe,    name: 'Globe' },
    ],
  },
  {
    label: 'Actions',
    icons: [
      { icon: Play,       name: 'Play' },
      { icon: Pause,      name: 'Pause' },
      { icon: Square,     name: 'Square' },
      { icon: RotateCcw,  name: 'RotateCcw' },
      { icon: RefreshCw,  name: 'RefreshCw' },
      { icon: Download,   name: 'Download' },
      { icon: Upload,     name: 'Upload' },
      { icon: Copy,       name: 'Copy' },
      { icon: Edit,       name: 'Edit' },
      { icon: Trash2,     name: 'Trash2' },
      { icon: Plus,       name: 'Plus' },
      { icon: Minus,      name: 'Minus' },
    ],
  },
  {
    label: 'Navigation',
    icons: [
      { icon: ChevronRight, name: 'ChevronRight' },
      { icon: ChevronDown,  name: 'ChevronDown' },
      { icon: Menu,         name: 'Menu' },
      { icon: X,            name: 'X' },
      { icon: Search,       name: 'Search' },
      { icon: ExternalLink, name: 'ExternalLink' },
      { icon: Link,         name: 'Link' },
    ],
  },
  {
    label: 'Status & Feedback',
    icons: [
      { icon: CheckCircle,   name: 'CheckCircle' },
      { icon: AlertTriangle, name: 'AlertTriangle' },
      { icon: XCircle,       name: 'XCircle' },
      { icon: Info,          name: 'Info' },
      { icon: Bell,          name: 'Bell' },
      { icon: Flag,          name: 'Flag' },
    ],
  },
  {
    label: 'Auth & Security',
    icons: [
      { icon: Shield,  name: 'Shield' },
      { icon: Lock,    name: 'Lock' },
      { icon: Unlock,  name: 'Unlock' },
      { icon: Eye,     name: 'Eye' },
      { icon: EyeOff,  name: 'EyeOff' },
      { icon: User,    name: 'User' },
    ],
  },
]

const USAGE = `import { Bot, Shield, Zap } from 'lucide-react'

// Standard size — always use h-4 w-4 (16px) as default
<Bot className="h-4 w-4 text-ds-green" />

// Inline with text
<Button leftIcon={<Zap className="h-4 w-4" />}>Run Agent</Button>

// Sizes
<Shield className="h-3 w-3" />   {/* 12px — badge/label context */}
<Shield className="h-4 w-4" />   {/* 16px — default */}
<Shield className="h-5 w-5" />   {/* 20px — section header */}`

export default function IconographyPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">01.06</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Iconography</h1>
        <p className="text-ds-comment text-sm max-w-2xl">
          Icons come from <strong className="text-ds-fg">Lucide React</strong>. Default size is{' '}
          <code className="font-mono text-ds-cyan text-xs">h-4 w-4</code> (16px). Always pass size via className, never hardcode.
        </p>
      </div>

      {ICON_GROUPS.map(({ label, icons }) => (
        <section key={label} className="space-y-4">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">{label}</h2>
          <div className="flex flex-wrap gap-3">
            {icons.map(({ icon: Icon, name }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2 p-3 rounded-ds-lg border border-ds-current bg-ds-panel hover:border-ds-purple hover:bg-ds-purple/5 transition-colors group w-20"
              >
                <Icon className="h-5 w-5 text-ds-comment group-hover:text-ds-purple transition-colors" />
                <code className="font-mono text-[9px] text-ds-current group-hover:text-ds-comment transition-colors text-center leading-tight">{name}</code>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">Usage</h2>
        <CodeBlock code={USAGE} lang="tsx" />
      </section>
    </div>
  )
}
