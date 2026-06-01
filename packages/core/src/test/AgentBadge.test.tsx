import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AgentBadge } from '../components/agent/AgentComponents'
import { AGENT_TYPES } from '../tokens/agentTypes'
import type { AgentType } from '../tokens/agentTypes'

describe('AgentBadge', () => {
  const types = Object.keys(AGENT_TYPES) as AgentType[]

  types.forEach((agentType) => {
    it(`renders ${agentType} badge with correct label`, () => {
      render(<AgentBadge agentType={agentType} />)
      const cfg = AGENT_TYPES[agentType]
      expect(screen.getByText(cfg.label)).toBeInTheDocument()
    })
  })

  it('hides label when showLabel=false', () => {
    render(<AgentBadge agentType="llm" showLabel={false} />)
    expect(screen.queryByText('LLM')).not.toBeInTheDocument()
  })

  it('applies sm size class', () => {
    const { container } = render(<AgentBadge agentType="llm" size="sm" />)
    expect(container.firstChild).toHaveClass('text-[9px]')
  })

  it('applies correct color class per type', () => {
    const { container } = render(<AgentBadge agentType="llm" />)
    expect(container.firstChild).toHaveClass('text-ds-green')
  })
})
