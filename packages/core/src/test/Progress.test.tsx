import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Progress } from '../components/primitives/Progress'

describe('Progress', () => {
  it('renders without error', () => {
    const { container } = render(<Progress value={50} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it('has progressbar role', () => {
    const { getByRole } = render(<Progress value={40} />)
    expect(getByRole('progressbar')).toBeInTheDocument()
  })

  it('bar width scales with value', () => {
    const { container } = render(<Progress value={75} />)
    const indicator = container.querySelector('[style*="width"]') as HTMLElement
    expect(indicator?.style.width).toBe('75%')
  })

  it('shows percentage when showLabel is set', () => {
    const { getByText } = render(<Progress value={60} showLabel />)
    expect(getByText('60%')).toBeInTheDocument()
  })

  it('applies color class', () => {
    const { container } = render(<Progress value={50} color="green" />)
    expect(container.querySelector('[class*="bg-ds-green"]')).toBeInTheDocument()
  })
})
