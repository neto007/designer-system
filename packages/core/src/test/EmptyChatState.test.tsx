import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmptyChatState } from '../components/chat/EmptyChatState'

describe('EmptyChatState', () => {
  it('renders the default title', () => {
    render(<EmptyChatState />)
    expect(screen.getByRole('heading', { name: /start a conversation/i })).toBeInTheDocument()
  })

  it('renders a custom title', () => {
    render(<EmptyChatState title="How can I help?" />)
    expect(screen.getByRole('heading', { name: /how can i help/i })).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<EmptyChatState description="Type a message below." />)
    expect(screen.getByText('Type a message below.')).toBeInTheDocument()
  })

  it('renders suggestion buttons', () => {
    render(<EmptyChatState suggestions={['Deploy agent', 'Show workflows']} />)
    expect(screen.getByRole('button', { name: /deploy agent/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /show workflows/i })).toBeInTheDocument()
  })

  it('calls onSuggestionClick with the suggestion text', async () => {
    const user = userEvent.setup({ delay: null })
    const handler = vi.fn()
    render(
      <EmptyChatState
        suggestions={['Analyze data']}
        onSuggestionClick={handler}
      />
    )
    await user.click(screen.getByRole('button', { name: /analyze data/i }))
    expect(handler).toHaveBeenCalledWith('Analyze data')
  })

  it('renders no suggestion buttons when suggestions array is empty', () => {
    render(<EmptyChatState suggestions={[]} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders default suggestions when not specified', () => {
    render(<EmptyChatState />)
    expect(screen.getByRole('button', { name: /deploy a new agent/i })).toBeInTheDocument()
  })
})
