import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ChatInput } from '../components/chat/ChatInput'

const user = userEvent.setup({ delay: null })

describe('ChatInput', () => {
  it('renders with default placeholder', () => {
    render(<ChatInput />)
    expect(screen.getByPlaceholderText('Message ShieldAI…')).toBeInTheDocument()
  })

  it('renders controlled value', () => {
    render(<ChatInput value="hello" onChange={() => {}} />)
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
  })

  it('calls onChange on typing', async () => {
    const handler = vi.fn()
    render(<ChatInput onChange={handler} />)
    await user.type(screen.getByRole('textbox'), 'test')
    expect(handler).toHaveBeenCalled()
  })

  it('calls onSubmit on Enter', async () => {
    const handler = vi.fn()
    render(<ChatInput onSubmit={handler} />)
    await user.type(screen.getByRole('textbox'), 'deploy agent')
    await user.keyboard('{Enter}')
    expect(handler).toHaveBeenCalledWith('deploy agent')
  })

  it('shows stop button when processing', () => {
    render(<ChatInput processing onStop={() => {}} />)
    expect(screen.getByRole('button', { name: /stop/i })).toBeInTheDocument()
  })

  it('calls onStop when stop is clicked', async () => {
    const handler = vi.fn()
    render(<ChatInput processing onStop={handler} />)
    await user.click(screen.getByRole('button', { name: /stop/i }))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('is disabled when prop is set', () => {
    render(<ChatInput disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
