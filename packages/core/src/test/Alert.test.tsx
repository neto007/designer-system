import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AlertTriangle } from 'lucide-react'
import { Alert } from '../components/feedback/Alert'

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Something went wrong</Alert>)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('has role alert', () => {
    render(<Alert>msg</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('applies info variant by default', () => {
    const { container } = render(<Alert>info</Alert>)
    expect(container.firstChild).toHaveClass('border-ds-cyan')
  })

  it('applies error variant', () => {
    const { container } = render(<Alert variant="error">error</Alert>)
    expect(container.firstChild).toHaveClass('border-ds-red')
  })

  it('applies success variant', () => {
    const { container } = render(<Alert variant="success">ok</Alert>)
    expect(container.firstChild).toHaveClass('border-ds-green')
  })

  it('applies warning variant', () => {
    const { container } = render(<Alert variant="warning">warn</Alert>)
    expect(container.firstChild).toHaveClass('border-ds-orange')
  })

  it('renders icon slot', () => {
    render(<Alert icon={<AlertTriangle data-testid="icon" />}>msg</Alert>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
