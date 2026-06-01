import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Icon } from '../components/primitives/Icon'

describe('Icon', () => {
  it('renders the icon content', () => {
    render(<Icon icon={<span data-testid="inner-icon">★</span>} />)
    expect(screen.getByTestId('inner-icon')).toBeInTheDocument()
  })

  it('applies sm size class', () => {
    const { container } = render(<Icon icon={<span>★</span>} size="sm" />)
    expect(container.firstChild as HTMLElement).toHaveClass('h-3', 'w-3')
  })

  it('applies md size class by default', () => {
    const { container } = render(<Icon icon={<span>★</span>} />)
    expect(container.firstChild as HTMLElement).toHaveClass('h-4', 'w-4')
  })

  it('applies lg size class', () => {
    const { container } = render(<Icon icon={<span>★</span>} size="lg" />)
    expect(container.firstChild as HTMLElement).toHaveClass('h-5', 'w-5')
  })

  it('applies xl size class', () => {
    const { container } = render(<Icon icon={<span>★</span>} size="xl" />)
    expect(container.firstChild as HTMLElement).toHaveClass('h-6', 'w-6')
  })

  it('forwards className', () => {
    const { container } = render(<Icon icon={<span>★</span>} className="extra" />)
    expect(container.firstChild as HTMLElement).toHaveClass('extra')
  })
})
