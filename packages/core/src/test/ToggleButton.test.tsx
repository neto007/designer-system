import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToggleButton } from '../components/primitives/ToggleButton'

describe('ToggleButton', () => {
  it('renders children', () => {
    render(<ToggleButton>Bold</ToggleButton>)
    expect(screen.getByRole('button', { name: /bold/i })).toBeInTheDocument()
  })

  it('has aria-pressed="false" when not pressed', () => {
    render(<ToggleButton pressed={false}>B</ToggleButton>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('has aria-pressed="true" when pressed', () => {
    render(<ToggleButton pressed={true}>B</ToggleButton>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('calls onChange with toggled value on click', async () => {
    const user = userEvent.setup({ delay: null })
    const onChange = vi.fn()
    render(<ToggleButton pressed={false} onChange={onChange}>B</ToggleButton>)
    await user.click(screen.getByRole('button'))
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('calls onClick handler', async () => {
    const user = userEvent.setup({ delay: null })
    const onClick = vi.fn()
    render(<ToggleButton onClick={onClick}>B</ToggleButton>)
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is set', async () => {
    const user = userEvent.setup({ delay: null })
    const onChange = vi.fn()
    render(<ToggleButton disabled onChange={onChange}>B</ToggleButton>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    await user.click(btn)
    expect(onChange).not.toHaveBeenCalled()
  })
})
