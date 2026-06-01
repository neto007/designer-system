import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TokenGroup } from '../components/primitives/TokenGroup'

const TOKENS = [
  { value: 'react', label: 'React', variant: 'purple' as const },
  { value: 'ts',    label: 'TypeScript', variant: 'cyan' as const },
  { value: 'vite',  label: 'Vite', variant: 'green' as const },
]

describe('TokenGroup', () => {
  it('renders all token labels', () => {
    render(<TokenGroup tokens={TOKENS} />)
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Vite')).toBeInTheDocument()
  })

  it('renders group label when provided', () => {
    render(<TokenGroup tokens={TOKENS} label="Technologies" />)
    expect(screen.getByText('Technologies')).toBeInTheDocument()
  })

  it('calls onDismiss with token value when dismiss button clicked', async () => {
    const user = userEvent.setup({ delay: null })
    const onDismiss = vi.fn()
    render(<TokenGroup tokens={TOKENS} onDismiss={onDismiss} />)
    await user.click(screen.getByRole('button', { name: /remove react/i }))
    expect(onDismiss).toHaveBeenCalledWith('react')
  })

  it('shows "+N more" button when tokens exceed maxVisible', () => {
    render(<TokenGroup tokens={TOKENS} maxVisible={2} />)
    expect(screen.getByText('+1 more')).toBeInTheDocument()
  })

  it('shows all tokens after clicking "+N more"', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TokenGroup tokens={TOKENS} maxVisible={2} />)
    await user.click(screen.getByText('+1 more'))
    expect(screen.getByText('Vite')).toBeInTheDocument()
  })

  it('shows "Dismiss all" button when label is provided', () => {
    render(<TokenGroup tokens={TOKENS} label="Tags" onDismiss={vi.fn()} />)
    expect(screen.getByText('Dismiss all')).toBeInTheDocument()
  })
})
