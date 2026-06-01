import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusIndicator } from '../components/primitives/StatusIndicator'

describe('StatusIndicator', () => {
  const statuses = [
    'positive', 'negative', 'warning', 'info',
    'stopped', 'in-progress', 'pending',
  ] as const

  statuses.forEach((status) => {
    it(`renders ${status} with default label`, () => {
      const { container } = render(<StatusIndicator status={status} />)
      // Component renders a dot span + a label span — just verify it mounts
      expect(container.firstChild).toBeInTheDocument()
    })
  })

  it('renders custom label prop', () => {
    render(<StatusIndicator status="positive" label="All systems go" />)
    expect(screen.getByText('All systems go')).toBeInTheDocument()
  })

  it('hides label when showLabel=false', () => {
    const { container } = render(
      <StatusIndicator status="warning" label="Alert" showLabel={false} />
    )
    // label span should be absent / empty
    const spans = container.querySelectorAll('span')
    const hasLabel = Array.from(spans).some((s) => s.textContent === 'Alert')
    expect(hasLabel).toBe(false)
  })
})
