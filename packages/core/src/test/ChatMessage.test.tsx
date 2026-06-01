import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ChatMessage, ChatMessageSkeleton } from '../components/chat/ChatMessage'

describe('ChatMessage', () => {
  it('renders user message content', () => {
    render(<ChatMessage role="user" content="Hello ShieldAI" />)
    expect(screen.getByText('Hello ShieldAI')).toBeInTheDocument()
  })

  it('renders assistant message content', () => {
    render(<ChatMessage role="assistant" content="I can help with that." />)
    expect(screen.getByText('I can help with that.')).toBeInTheDocument()
  })

  it('shows timestamp when provided', () => {
    render(<ChatMessage role="user" content="Hi" timestamp="12:34" />)
    expect(screen.getByText('12:34')).toBeInTheDocument()
  })

  it('shows agentName for assistant role', () => {
    render(<ChatMessage role="assistant" content="Hi" agentName="Orchestrator" />)
    expect(screen.getByText('Orchestrator')).toBeInTheDocument()
  })

  it('shows toolName for tool role', () => {
    render(<ChatMessage role="tool" content="result" toolName="web_search" />)
    expect(screen.getByText('web_search')).toBeInTheDocument()
  })

  it('renders streaming indicator', () => {
    const { container } = render(<ChatMessage role="assistant" content="" streaming />)
    expect(container.querySelector('[class*="animate"]')).toBeInTheDocument()
  })

  it('renders ChatMessageSkeleton with skeleton elements', () => {
    const { container } = render(<ChatMessageSkeleton />)
    // Skeleton uses animate-shimmer class
    const animated = container.querySelectorAll('[class*="animate"]')
    expect(animated.length).toBeGreaterThan(0)
  })
})
