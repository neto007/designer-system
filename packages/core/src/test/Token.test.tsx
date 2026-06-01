import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Token } from '../components/primitives/Token'

describe('Token', () => {
  it('renders the label text', () => {
    render(<Token label="react" />)
    expect(screen.getByText('react')).toBeInTheDocument()
  })

  it('does not render a dismiss button when onDismiss is not provided', () => {
    render(<Token label="react" />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders a dismiss button when onDismiss is provided', () => {
    render(<Token label="react" onDismiss={vi.fn()} />)
    expect(screen.getByRole('button', { name: /remove react/i })).toBeInTheDocument()
  })

  it('calls onDismiss when dismiss button is clicked', async () => {
    const user = userEvent.setup({ delay: null })
    const onDismiss = vi.fn()
    render(<Token label="react" onDismiss={onDismiss} />)
    await user.click(screen.getByRole('button', { name: /remove react/i }))
    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('applies green variant class', () => {
    const { container } = render(<Token label="active" variant="green" />)
    expect((container.firstChild as HTMLElement).className).toContain('text-ds-green')
  })

  it('applies cyan variant class', () => {
    const { container } = render(<Token label="tag" variant="cyan" />)
    expect((container.firstChild as HTMLElement).className).toContain('text-ds-cyan')
  })
})
