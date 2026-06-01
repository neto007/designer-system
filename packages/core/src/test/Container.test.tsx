import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Container } from '../components/primitives/Container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Main content</Container>)
    expect(screen.getByText('Main content')).toBeInTheDocument()
  })

  it('renders header when provided', () => {
    render(<Container header={<div>My Header</div>}>body</Container>)
    expect(screen.getByText('My Header')).toBeInTheDocument()
  })

  it('renders footer when provided', () => {
    render(<Container footer={<div>My Footer</div>}>body</Container>)
    expect(screen.getByText('My Footer')).toBeInTheDocument()
  })

  it('does not render header when not provided', () => {
    render(<Container>body</Container>)
    expect(screen.queryByText('My Header')).not.toBeInTheDocument()
  })

  it('does not render footer when not provided', () => {
    render(<Container>body</Container>)
    expect(screen.queryByText('My Footer')).not.toBeInTheDocument()
  })

  it('renders media slot when provided', () => {
    render(<Container media={<img alt="cover" src="/img.png" />}>body</Container>)
    expect(screen.getByRole('img', { name: 'cover' })).toBeInTheDocument()
  })

  it('applies neu variant class', () => {
    const { container } = render(<Container variant="neu">x</Container>)
    expect((container.firstChild as HTMLElement).className).toContain('shadow-neu')
  })
})
