import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type ReactNode } from 'react'
import { ErrorBoundary } from '../components/feedback/ErrorBoundary'

const user = userEvent.setup({ delay: null })

function Bomb(): ReactNode {
  throw new Error('Agent crashed')
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(<ErrorBoundary><p>All good</p></ErrorBoundary>)
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  it('shows default fallback on error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<ErrorBoundary><Bomb /></ErrorBoundary>)
    expect(screen.getByText(/agent crashed/i)).toBeInTheDocument()
    spy.mockRestore()
  })

  it('renders custom ReactNode fallback', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary fallback={<div>Custom fallback</div>}>
        <Bomb />
      </ErrorBoundary>
    )
    expect(screen.getByText('Custom fallback')).toBeInTheDocument()
    spy.mockRestore()
  })

  it('renders render-prop fallback with error message', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary fallback={(err) => <div>{err.message}</div>}>
        <Bomb />
      </ErrorBoundary>
    )
    expect(screen.getByText('Agent crashed')).toBeInTheDocument()
    spy.mockRestore()
  })

  it('calls onError callback', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const onError = vi.fn()
    render(<ErrorBoundary onError={onError}><Bomb /></ErrorBoundary>)
    expect(onError).toHaveBeenCalledWith(expect.any(Error), expect.anything())
    spy.mockRestore()
  })

  it('resets on "Try again" click', async () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(<ErrorBoundary><Bomb /></ErrorBoundary>)
    expect(screen.getByText('Agent crashed')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /try again/i }))
    spy.mockRestore()
  })
})
