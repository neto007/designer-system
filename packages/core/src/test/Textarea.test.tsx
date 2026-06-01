import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Textarea } from '../components/primitives/Textarea'

const user = userEvent.setup({ delay: null })

describe('Textarea', () => {
  it('renders with placeholder', () => {
    render(<Textarea placeholder="Enter prompt…" />)
    expect(screen.getByPlaceholderText('Enter prompt…')).toBeInTheDocument()
  })

  it('shows controlled value', () => {
    render(<Textarea value="hello world" onChange={() => {}} />)
    expect(screen.getByDisplayValue('hello world')).toBeInTheDocument()
  })

  it('calls onChange on typing', async () => {
    const handler = vi.fn()
    render(<Textarea onChange={handler} />)
    await user.type(screen.getByRole('textbox'), 'abc')
    expect(handler).toHaveBeenCalled()
  })

  it('is disabled when prop is set', () => {
    render(<Textarea disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled()
  })

  it('forwards rows prop', () => {
    render(<Textarea rows={6} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '6')
  })
})
