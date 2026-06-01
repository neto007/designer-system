import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toggle } from '../components/primitives/Toggle'

describe('Toggle', () => {
  it('renders with label', () => {
    render(<Toggle label="Enable" />)
    expect(screen.getByText('Enable')).toBeInTheDocument()
  })

  it('starts unchecked by default', () => {
    render(<Toggle />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'unchecked')
  })

  it('calls onCheckedChange when clicked', async () => {
    const handler = vi.fn()
    render(<Toggle onCheckedChange={handler} />)
    await userEvent.click(screen.getByRole('switch'))
    expect(handler).toHaveBeenCalledWith(true)
  })

  it('reflects controlled state', () => {
    render(<Toggle checked={true} />)
    expect(screen.getByRole('switch')).toHaveAttribute('data-state', 'checked')
  })

  it('is disabled when disabled=true', async () => {
    const handler = vi.fn()
    render(<Toggle disabled onCheckedChange={handler} />)
    expect(screen.getByRole('switch')).toBeDisabled()
  })
})
