import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../components/primitives/Checkbox'

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox label="Enable logging" />)
    expect(screen.getByLabelText('Enable logging')).toBeInTheDocument()
  })

  it('starts unchecked by default', () => {
    render(<Checkbox label="Test" />)
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('calls onCheckedChange on click', async () => {
    const handler = vi.fn()
    render(<Checkbox label="Test" onCheckedChange={handler} />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(handler).toHaveBeenCalledWith(true)
  })

  it('is disabled when disabled prop is set', async () => {
    const handler = vi.fn()
    render(<Checkbox label="Test" disabled onCheckedChange={handler} />)
    const cb = screen.getByRole('checkbox')
    expect(cb).toBeDisabled()
    await userEvent.click(cb)
    expect(handler).not.toHaveBeenCalled()
  })

  it('reflects controlled checked state', () => {
    render(<Checkbox label="Test" checked={true} />)
    expect(screen.getByRole('checkbox')).toBeChecked()
  })
})
