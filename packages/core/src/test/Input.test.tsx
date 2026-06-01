import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../components/primitives/Input'

describe('Input', () => {
  it('renders', () => {
    render(<Input placeholder="Search" />)
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  it('calls onChange on typing', async () => {
    const handler = vi.fn()
    render(<Input onChange={handler} />)
    await userEvent.type(screen.getByRole('textbox'), 'hello')
    expect(handler).toHaveBeenCalled()
  })

  it('reflects controlled value', () => {
    render(<Input value="prefilled" onChange={() => {}} />)
    expect(screen.getByDisplayValue('prefilled')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
  })

  it('has error border class with error variant', () => {
    const { container } = render(<Input variant="error" />)
    const wrapper = container.querySelector('[class*="border-ds-red"]')
    expect(wrapper).toBeInTheDocument()
  })
})
