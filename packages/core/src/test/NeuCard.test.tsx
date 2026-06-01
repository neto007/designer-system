import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NeuCard } from '../components/primitives/NeuCard'

describe('NeuCard', () => {
  it('renders children', () => {
    render(<NeuCard>Card content</NeuCard>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders as div by default', () => {
    render(<NeuCard data-testid="card">x</NeuCard>)
    expect(screen.getByTestId('card').tagName).toBe('DIV')
  })

  it('renders as custom element via as prop', () => {
    render(<NeuCard as="article" data-testid="card">x</NeuCard>)
    expect(screen.getByTestId('card').tagName).toBe('ARTICLE')
  })

  it('applies purple variant class', () => {
    render(<NeuCard variant="purple" data-testid="card">x</NeuCard>)
    expect(screen.getByTestId('card').className).toContain('shadow-neu-purple')
  })

  it('forwards className', () => {
    render(<NeuCard className="my-custom" data-testid="card">x</NeuCard>)
    expect(screen.getByTestId('card').className).toContain('my-custom')
  })

  it('applies default variant', () => {
    render(<NeuCard data-testid="card">x</NeuCard>)
    expect(screen.getByTestId('card').className).toContain('shadow-neu')
  })
})
