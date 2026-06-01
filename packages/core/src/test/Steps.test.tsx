import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Steps } from '../components/primitives/Steps'

const STEPS = [
  { label: 'Config' },
  { label: 'Deploy' },
  { label: 'Verify' },
]

describe('Steps', () => {
  it('renders all step labels', () => {
    render(<Steps steps={STEPS} />)
    expect(screen.getByText('Config')).toBeInTheDocument()
    expect(screen.getByText('Deploy')).toBeInTheDocument()
    expect(screen.getByText('Verify')).toBeInTheDocument()
  })

  it('current step defaults to 0', () => {
    const { container } = render(<Steps steps={STEPS} />)
    expect(container.querySelector('[class*="border-ds-purple"]')).toBeInTheDocument()
  })

  it('marks past steps as completed', () => {
    const { container } = render(<Steps steps={STEPS} current={2} />)
    expect(container.querySelectorAll('[class*="bg-ds-green"]').length).toBeGreaterThan(0)
  })

  it('renders vertical orientation', () => {
    const { container } = render(<Steps steps={STEPS} orientation="vertical" />)
    expect(container.querySelector('ol')).toHaveClass('flex-col')
  })

  it('uses explicit step status', () => {
    const stepsWithStatus = [
      { label: 'Done', status: 'completed' as const },
      { label: 'Now',  status: 'current'   as const },
      { label: 'Soon', status: 'pending'   as const },
    ]
    const { container } = render(<Steps steps={stepsWithStatus} />)
    expect(container.querySelector('[class*="bg-ds-green"]')).toBeInTheDocument()
  })
})
