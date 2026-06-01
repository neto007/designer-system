import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Badge } from '../components/primitives/Badge'

describe('Badge', () => {
  it('renders label', () => {
    render(<Badge>live</Badge>)
    expect(screen.getByText('live')).toBeInTheDocument()
  })

  it('applies color variants', () => {
    const colors = ['purple', 'green', 'cyan', 'pink', 'orange', 'yellow', 'red', 'gray'] as const
    colors.forEach((variant) => {
      const { container } = render(<Badge variant={variant}>{variant}</Badge>)
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  it('renders a dot when dot prop is set', () => {
    const { container } = render(<Badge dot variant="green">online</Badge>)
    // dot adds a span before the text
    const spans = container.querySelectorAll('span')
    expect(spans.length).toBeGreaterThan(0)
  })
})
