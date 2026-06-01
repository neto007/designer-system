import { Divider } from '@shieldai/ds'

interface Entry {
  version: string
  date: string
  type: 'major' | 'minor' | 'patch'
  changes: { type: 'added' | 'changed' | 'fixed' | 'removed'; items: string[] }[]
}

const CHANGELOG: Entry[] = [
  {
    version: '1.0.0',
    date: 'May 2026',
    type: 'major',
    changes: [
      {
        type: 'added',
        items: [
          '46+ components across primitives, forms, feedback, overlays, navigation, and data display',
          'ChatMessage, ChatInput, JSONViewer — AI-native chat components',
          'Table with sorting, multi-select, and loading skeleton',
          'Slider, Multiselect, ButtonGroup, ButtonDropdown',
          'Form, FormField, FormSection, FormActions',
          'Cards (ItemCard + ActionCard + collection)',
          'TopNavigation with responsive mobile menu',
          'Full Dracula-neon × Neobrutalism design language',
          '62 CSS custom property tokens + Tailwind preset',
          '7 agent types with color + icon mapping',
          'TypeScript-first — all components fully typed',
          'Radix UI primitives for a11y-correct overlays',
        ],
      },
    ],
  },
  {
    version: '0.9.0',
    date: 'April 2026',
    type: 'minor',
    changes: [
      {
        type: 'added',
        items: [
          'Flashbar, Steps, Breadcrumb, Pagination',
          'Expandable Section, Key-Value Pairs, Status Indicator',
          'Drawer, CopyToClipboard, Spinner, Divider',
          'Checkbox, RadioGroup, Toggle, SegmentedControl',
        ],
      },
      {
        type: 'changed',
        items: ['Button now supports 10 variants across two visual axes'],
      },
    ],
  },
  {
    version: '0.8.0',
    date: 'March 2026',
    type: 'minor',
    changes: [
      {
        type: 'added',
        items: [
          'Button, Badge, Avatar, NeuCard',
          'Input, Textarea, Select, Progress, Skeleton',
          'Tabs, Alert, Toast with useToast hook',
          'Tooltip, Popover, Dialog',
          'CodeBlock with Shiki Dracula theme',
          'Monorepo scaffold: packages/core + apps/docs',
        ],
      },
    ],
  },
]

const typeColor = {
  major: 'bg-ds-purple text-black',
  minor: 'bg-ds-green/20 text-ds-green border border-ds-green/30',
  patch: 'bg-ds-cyan/10 text-ds-cyan border border-ds-cyan/20',
} as const

const changeIcon = {
  added:   { icon: '+', color: 'text-ds-green' },
  changed: { icon: '~', color: 'text-ds-cyan' },
  fixed:   { icon: '✓', color: 'text-ds-orange' },
  removed: { icon: '−', color: 'text-ds-red' },
} as const

export default function ChangelogPage() {
  return (
    <div className="space-y-10 max-w-2xl">
      <div className="space-y-2 pb-6 border-b border-ds-current">
        <span className="font-mono text-[10px] text-ds-purple uppercase tracking-widest">08.03</span>
        <h1 className="text-3xl font-black uppercase tracking-tight text-ds-fg">Changelog</h1>
        <p className="text-ds-comment text-sm">Full history of releases for @shieldai/ds.</p>
      </div>

      <div className="space-y-10">
        {CHANGELOG.map((entry, i) => (
          <div key={entry.version} className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-black font-mono text-xl text-ds-fg">v{entry.version}</span>
              <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${typeColor[entry.type]}`}>
                {entry.type}
              </span>
              <span className="text-xs text-ds-comment">{entry.date}</span>
            </div>

            {entry.changes.map((section) => {
              const cfg = changeIcon[section.type]
              return (
                <div key={section.type} className="space-y-1.5">
                  <h3 className={`text-[10px] font-black uppercase tracking-widest font-mono ${cfg.color}`}>
                    {section.type}
                  </h3>
                  <ul className="space-y-1">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-ds-comment">
                        <span className={`flex-shrink-0 font-mono font-bold ${cfg.color}`}>{cfg.icon}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {i < CHANGELOG.length - 1 && <Divider className="mt-6" />}
          </div>
        ))}
      </div>
    </div>
  )
}
