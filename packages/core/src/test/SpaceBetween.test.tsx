import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SpaceBetween } from '../components/primitives/SpaceBetween'

describe('SpaceBetween', () => {
  it('renders children', () => {
    render(
      <SpaceBetween>
        <span>A</span>
        <span>B</span>
      </SpaceBetween>
    )
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
  })

  it('renders vertical direction by default', () => {
    const { container } = render(
      <SpaceBetween>
        <span>A</span>
      </SpaceBetween>
    )
    // vertical uses space-y, not flex
    expect((container.firstChild as HTMLElement).className).toContain('space-y')
  })

  it('renders horizontal direction with flex', () => {
    const { container } = render(
      <SpaceBetween direction="horizontal">
        <span>A</span>
      </SpaceBetween>
    )
    expect((container.firstChild as HTMLElement).className).toContain('flex')
  })

  it('applies gap class for horizontal', () => {
    const { container } = render(
      <SpaceBetween direction="horizontal" size="lg">
        <span>A</span>
      </SpaceBetween>
    )
    expect((container.firstChild as HTMLElement).className).toContain('gap-6')
  })

  it('applies space-y class for vertical', () => {
    const { container } = render(
      <SpaceBetween direction="vertical" size="lg">
        <span>A</span>
      </SpaceBetween>
    )
    expect((container.firstChild as HTMLElement).className).toContain('space-y-6')
  })

  it('forwards className', () => {
    const { container } = render(<SpaceBetween className="my-class"><span>x</span></SpaceBetween>)
    expect((container.firstChild as HTMLElement).className).toContain('my-class')
  })
})
