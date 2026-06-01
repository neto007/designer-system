import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CopyToClipboard } from '../components/primitives/CopyToClipboard'

describe('CopyToClipboard', () => {
  it('renders icon copy button by default', () => {
    render(<CopyToClipboard value="hello" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('has aria-label "Copy to clipboard" initially', () => {
    render(<CopyToClipboard value="hello" />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copy to clipboard')
  })

  it('shows copied state after clicking the icon button', async () => {
    // Verifies click fires the async copy path — aria-label changes to "Copied!"
    const user = userEvent.setup({ delay: null })
    render(<CopyToClipboard value="copy-me" />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Copied!')
  })

  it('shows copied state after click (button variant)', async () => {
    const user = userEvent.setup({ delay: null })
    render(<CopyToClipboard value="text" variant="button" />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Copied!')).toBeInTheDocument()
  })

  it('renders children as display text in inline variant', () => {
    render(<CopyToClipboard value="val" variant="inline">my-value</CopyToClipboard>)
    expect(screen.getByText('my-value')).toBeInTheDocument()
  })

  it('renders value as button label in button variant', () => {
    render(<CopyToClipboard value="text" variant="button" />)
    expect(screen.getByText('Copy')).toBeInTheDocument()
  })
})
