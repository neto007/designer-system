import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Spinner } from '../components/primitives/Spinner'

describe('Spinner', () => {
  it('renders with role status and default aria-label', () => {
    render(<Spinner />)
    expect(screen.getByRole('status', { name: 'Loading...' })).toBeInTheDocument()
  })

  it('custom label is shown as visible text', () => {
    render(<Spinner label="Deploying…" />)
    expect(screen.getByText('Deploying…')).toBeInTheDocument()
  })

  it('custom label is also in aria-label', () => {
    render(<Spinner label="Deploying…" />)
    expect(screen.getByRole('status', { name: 'Deploying…' })).toBeInTheDocument()
  })

  it('applies sm size (h-3 w-3)', () => {
    const { container } = render(<Spinner size="sm" />)
    expect(container.querySelector('[class*="h-3"]')).toBeInTheDocument()
  })

  it('applies lg size (h-6 w-6)', () => {
    const { container } = render(<Spinner size="lg" />)
    expect(container.querySelector('[class*="h-6"]')).toBeInTheDocument()
  })
})
