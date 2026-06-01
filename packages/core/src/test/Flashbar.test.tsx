import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Flashbar } from '../components/feedback/Flashbar'
import type { FlashbarItem } from '../components/feedback/Flashbar'

const user = userEvent.setup({ delay: null })

const ITEMS: FlashbarItem[] = [
  { id: '1', type: 'info',    header: 'Update available', content: 'v2.4.1 ready', dismissible: true },
  { id: '2', type: 'success', header: 'Deploy complete' },
  { id: '3', type: 'error',   header: 'Auth failed',     content: 'Check API key' },
  { id: '4', type: 'warning', header: 'Rate limit close' },
]

describe('Flashbar', () => {
  it('renders all items', () => {
    render(<Flashbar items={ITEMS} />)
    expect(screen.getByText('Update available')).toBeInTheDocument()
    expect(screen.getByText('Deploy complete')).toBeInTheDocument()
    expect(screen.getByText('Auth failed')).toBeInTheDocument()
  })

  it('renders content text', () => {
    render(<Flashbar items={ITEMS} />)
    expect(screen.getByText('v2.4.1 ready')).toBeInTheDocument()
    expect(screen.getByText('Check API key')).toBeInTheDocument()
  })

  it('shows dismiss button for dismissible items', () => {
    render(<Flashbar items={ITEMS} />)
    expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument()
  })

  it('calls onDismiss when X is clicked', async () => {
    const handler = vi.fn()
    render(<Flashbar items={[{ id: '1', type: 'info', header: 'Test', dismissible: true, onDismiss: handler }]} />)
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('renders nothing when items is empty', () => {
    const { container } = render(<Flashbar items={[]} />)
    expect(container.firstChild).toBeNull()
  })
})
