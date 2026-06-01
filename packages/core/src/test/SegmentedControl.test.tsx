import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SegmentedControl } from '../components/primitives/SegmentedControl'

const user = userEvent.setup({ delay: null })

const ITEMS = [
  { value: 'day',   label: 'Day' },
  { value: 'week',  label: 'Week' },
  { value: 'month', label: 'Month' },
]

describe('SegmentedControl', () => {
  it('renders all segments', () => {
    render(<SegmentedControl items={ITEMS} />)
    expect(screen.getByText('Day')).toBeInTheDocument()
    expect(screen.getByText('Week')).toBeInTheDocument()
    expect(screen.getByText('Month')).toBeInTheDocument()
  })

  it('marks the active value', () => {
    render(<SegmentedControl items={ITEMS} value="week" />)
    const btn = screen.getByText('Week').closest('[data-state]')
    expect(btn).toHaveAttribute('data-state', 'on')
  })

  it('calls onValueChange on click', async () => {
    const handler = vi.fn()
    render(<SegmentedControl items={ITEMS} value="day" onValueChange={handler} />)
    await user.click(screen.getByText('Month'))
    expect(handler).toHaveBeenCalledWith('month')
  })

  it('applies sm size class', () => {
    const { container } = render(<SegmentedControl items={ITEMS} size="sm" />)
    expect(container.querySelector('[class*="text-[9px]"]')).toBeInTheDocument()
  })
})
