import {
  Code,
  ExternalLink,
  ArrowRight,
  GitBranch,
  RefreshCw,
  Workflow,
  BookOpenCheck,
  type LucideIcon,
} from 'lucide-react'

export interface AgentTypeConfig {
  readonly color: string        // Tailwind text color class
  readonly borderColor: string  // Tailwind border color class
  readonly shadowClass: string  // Tailwind shadow class
  readonly hex: string          // raw hex for inline SVG etc.
  readonly icon: LucideIcon
  readonly label: string
  readonly description: string
}

export const AGENT_TYPES = {
  llm: {
    color:       'text-ds-green',
    borderColor: 'border-ds-green',
    shadowClass: 'shadow-glow-green',
    hex:         '#50fa7b',
    icon:        Code,
    label:       'LLM',
    description: 'Language model node',
  },
  a2a: {
    color:       'text-ds-purple',
    borderColor: 'border-ds-purple',
    shadowClass: 'shadow-glow',
    hex:         '#bd93f9',
    icon:        ExternalLink,
    label:       'A2A',
    description: 'Agent-to-agent call',
  },
  sequential: {
    color:       'text-ds-yellow',
    borderColor: 'border-ds-yellow',
    shadowClass: 'shadow-glow-yellow',
    hex:         '#f1fa8c',
    icon:        ArrowRight,
    label:       'Sequential',
    description: 'Step-by-step execution',
  },
  parallel: {
    color:       'text-ds-pink',
    borderColor: 'border-ds-pink',
    shadowClass: 'shadow-glow-pink',
    hex:         '#ff79c6',
    icon:        GitBranch,
    label:       'Parallel',
    description: 'Concurrent branches',
  },
  loop: {
    color:       'text-ds-orange',
    borderColor: 'border-ds-orange',
    shadowClass: 'shadow-glow-orange',
    hex:         '#ffb86c',
    icon:        RefreshCw,
    label:       'Loop',
    description: 'Iterative execution',
  },
  workflow: {
    color:       'text-ds-cyan',
    borderColor: 'border-ds-cyan',
    shadowClass: 'shadow-glow-cyan',
    hex:         '#8be9fd',
    icon:        Workflow,
    label:       'Workflow',
    description: 'Orchestrated pipeline',
  },
  task: {
    color:       'text-ds-red',
    borderColor: 'border-ds-red',
    shadowClass: 'shadow-glow-red',
    hex:         '#ff5555',
    icon:        BookOpenCheck,
    label:       'Task',
    description: 'Discrete unit of work',
  },
} as const satisfies Record<string, AgentTypeConfig>

export type AgentType = keyof typeof AGENT_TYPES
