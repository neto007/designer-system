import { useEffect, useState } from 'react'
import { Badge, Button, NeuCard } from '@shieldai/ds'
import { Terminal, Zap, Box, Eye, Layers, Cpu } from 'lucide-react'
import { Link } from 'react-router-dom'

// ─── Grid + scanline background ───────────────────────────────────────────────

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06]">
        <defs>
          <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#bd93f9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dots)" />
      </svg>
      {/* scanline overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)',
        }}
      />
      {/* corner glow */}
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-ds-purple opacity-10 blur-3xl" />
      <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-ds-green opacity-8 blur-3xl" />
    </div>
  )
}

// ─── Terminal line ─────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  'npm install @shieldai/ds',
  "import { AgentNode, Button, Badge } from '@shieldai/ds'",
  'pnpm dev  →  localhost:5173',
  '353 tests passing · build clean',
]

function TerminalLine() {
  const [lineIdx, setLineIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const target = TERMINAL_LINES[lineIdx]!
    if (displayed.length < target.length) {
      const t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 40)
      return () => clearTimeout(t)
    }
    const pause = setTimeout(() => {
      setDisplayed('')
      setLineIdx((i) => (i + 1) % TERMINAL_LINES.length)
    }, 2400)
    return () => clearTimeout(pause)
  }, [displayed, lineIdx])

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="flex items-center gap-2 font-mono text-sm text-ds-comment bg-ds-panel border border-ds-current rounded-ds-md px-4 py-2.5 max-w-md">
      <span className="text-ds-green flex-shrink-0">$</span>
      <span className="text-ds-fg">{displayed}</span>
      <span
        className="inline-block w-2 h-4 bg-ds-purple rounded-sm flex-shrink-0 align-text-bottom"
        style={{ opacity: blink ? 1 : 0, transition: 'opacity 0.1s' }}
      />
    </div>
  )
}

// ─── Stats ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '08',  label: 'Doc sections',  color: 'text-ds-purple' },
  { value: '98',  label: 'Components',    color: 'text-ds-green' },
  { value: '07',  label: 'Agent types',   color: 'text-ds-cyan' },
  { value: '62',  label: 'CSS tokens',    color: 'text-ds-orange' },
]

// ─── Principles ───────────────────────────────────────────────────────────────

const PRINCIPLES = [
  {
    icon: Cpu,
    title: 'Agent-first',
    color: 'text-ds-green',
    border: 'border-ds-green/30',
    desc: 'Every component is designed for autonomous agent UIs — execution views, chat, workflow canvases.',
  },
  {
    icon: Eye,
    title: 'Signal clarity',
    color: 'text-ds-purple',
    border: 'border-ds-purple/30',
    desc: 'Seven agent types, seven colors. Every token is semantic — no arbitrary values, ever.',
  },
  {
    icon: Box,
    title: 'Neobrutalist',
    color: 'text-ds-cyan',
    border: 'border-ds-cyan/30',
    desc: 'Heavy 2px borders, sharp drop-shadows, and high contrast. Structure you can see.',
  },
  {
    icon: Zap,
    title: 'Dark-neon',
    color: 'text-ds-pink',
    border: 'border-ds-pink/30',
    desc: 'Dracula palette for the chrome. Neon glows for live states. Legible in every ambient context.',
  },
  {
    icon: Layers,
    title: 'Composable',
    color: 'text-ds-orange',
    border: 'border-ds-orange/30',
    desc: 'Small primitives, no magic. Compose NeuCard + StatusIndicator + Button into any pattern.',
  },
]

// ─── Quick links ──────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { href: '/quick-start',         label: 'Quick Start',      desc: 'Install · configure · first component' },
  { href: '/foundations/colors',  label: 'Tokens',           desc: 'CSS custom properties reference' },
  { href: '/components/button',   label: 'Components',       desc: '98 components with live previews' },
  { href: '/workflow/nodes',      label: 'Workflow',          desc: '7 agent node types · edges · canvas' },
  { href: '/chat/demo',           label: 'Chat',             desc: 'ChatMessage · ChatInput · streaming' },
  { href: '/resources/agents',    label: 'AGENTS.md',        desc: 'Cheatsheet for AI coding agents' },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OverviewPage() {
  return (
    <div className="space-y-16">

      {/* ── Hero ── */}
      <section className="relative rounded-ds-xl overflow-hidden border border-ds-current bg-ds-bg min-h-[340px] flex flex-col justify-center px-8 py-12">
        <GridBackground />
        <div className="relative space-y-6 max-w-2xl">
          {/* eyebrow */}
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-ds-purple" />
            <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">
              system.manifest · v1.0
            </span>
          </div>

          {/* headline */}
          <h1
            className="font-black uppercase tracking-tight leading-[0.9]"
            style={{ fontSize: 'clamp(48px, 7vw, 88px)' }}
          >
            <span
              className="text-ds-purple"
              style={{ textShadow: '0 0 32px rgba(189,147,249,.55), 0 0 64px rgba(189,147,249,.25)' }}
            >
              Shield
            </span>
            <span
              className="text-ds-green"
              style={{ textShadow: '0 0 24px rgba(80,250,123,.45), 0 0 48px rgba(80,250,123,.2)' }}
            >
              AI
            </span>
            <br />
            <span className="text-ds-fg text-[0.55em] font-black tracking-normal normal-case leading-tight">
              Design System
            </span>
          </h1>

          {/* description */}
          <p className="text-ds-comment leading-relaxed max-w-xl">
            Two visual axes —{' '}
            <strong className="text-ds-fg">Dracula-neon</strong> for chrome and signals,{' '}
            <strong className="text-ds-fg">Neobrutalism</strong> for structure and inputs.
            Built for React with Tailwind CSS, Radix UI, and design tokens.
          </p>

          {/* terminal */}
          <TerminalLine />

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 pt-1">
            <Link to="/quick-start">
              <Button variant="default" leftIcon={<Terminal className="h-4 w-4" />}>
                Get Started
              </Button>
            </Link>
            <Link to="/components/button">
              <Button variant="outline">
                Browse Components
              </Button>
            </Link>
            <Link to="/resources/agents">
              <Button variant="ghost">
                AGENTS.md
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STATS.map(({ value, label, color }) => (
          <div
            key={label}
            className="border border-ds-current rounded-ds-lg p-5 text-center bg-ds-panel hover:border-ds-purple/50 transition-colors"
          >
            <div
              className={`text-3xl font-black ${color}`}
              style={{ textShadow: color.includes('purple') ? '0 0 12px rgba(189,147,249,.4)' : undefined }}
            >
              {value}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ds-comment mt-1">
              {label}
            </div>
          </div>
        ))}
      </section>

      {/* ── Agent type coding ── */}
      <section className="space-y-4">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">
          Agent type coding
        </h2>
        <div className="flex flex-wrap gap-2">
          <Badge variant="green"  dot>LLM</Badge>
          <Badge variant="purple" dot>A2A</Badge>
          <Badge variant="yellow" dot>Sequential</Badge>
          <Badge variant="pink"   dot>Parallel</Badge>
          <Badge variant="solid-orange" dot>Loop</Badge>
          <Badge variant="cyan"   dot>Workflow</Badge>
          <Badge variant="solid-red"   dot>Task</Badge>
        </div>
        <p className="text-ds-comment text-sm max-w-xl">
          Each agent type maps to a signal color. Access the full config — hex, icon, class names —
          via <code className="text-ds-cyan font-mono text-xs">AGENT_TYPES</code> from{' '}
          <code className="text-ds-cyan font-mono text-xs">@shieldai/ds</code>.
        </p>
      </section>

      {/* ── Principles ── */}
      <section className="space-y-5">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">
          Design principles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRINCIPLES.map(({ icon: Icon, title, color, border, desc }) => (
            <NeuCard key={title} className={`p-5 border-2 ${border} space-y-3`}>
              <div className={`flex items-center gap-2 ${color}`}>
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span className="font-black uppercase tracking-widest text-xs">{title}</span>
              </div>
              <p className="text-xs text-ds-comment leading-relaxed">{desc}</p>
            </NeuCard>
          ))}
        </div>
      </section>

      {/* ── Quick links ── */}
      <section className="space-y-5">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-ds-comment">
          Explore
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {QUICK_LINKS.map(({ href, label, desc }) => (
            <Link
              key={href}
              to={href}
              className="group flex flex-col gap-1.5 p-4 rounded-ds-lg border border-ds-current bg-ds-panel hover:border-ds-purple hover:bg-ds-purple/5 transition-all duration-fast"
            >
              <span className="font-bold text-ds-fg group-hover:text-ds-purple transition-colors text-sm">
                {label}
              </span>
              <span className="text-ds-comment text-xs">{desc}</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  )
}
