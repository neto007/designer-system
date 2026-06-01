import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Slider } from '../components/primitives/Slider'

beforeAll(() => {
  // Radix Slider uses ResizeObserver internally (via @radix-ui/react-use-size)
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  // Radix Slider needs getBoundingClientRect to work in jsdom
  Element.prototype.getBoundingClientRect = vi.fn(() => ({
    left: 0, right: 100, top: 0, bottom: 10,
    width: 100, height: 10, x: 0, y: 0,
    toJSON: () => {},
  }))
})

describe('Slider', () => {
  it('renders without crashing', () => {
    const { container } = render(<Slider />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('renders the label when label prop is provided', () => {
    render(<Slider label="Volume" />)
    expect(screen.getByText('Volume')).toBeInTheDocument()
  })

  it('renders the current value when showValue is true', () => {
    render(<Slider defaultValue={[40]} showValue />)
    expect(screen.getByText('40')).toBeInTheDocument()
  })

  it('renders slider thumb with accessible label', () => {
    render(<Slider defaultValue={[50]} />)
    expect(screen.getByRole('slider')).toBeInTheDocument()
  })

  it('renders mark labels when marks is true', () => {
    render(<Slider marks min={0} max={100} />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('does not render label section when label and showValue are absent', () => {
    render(<Slider />)
    // no label or value text should appear
    expect(screen.queryByText('Volume')).not.toBeInTheDocument()
  })
})
