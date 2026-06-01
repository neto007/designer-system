import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextFilter } from '../components/primitives/TextFilter'

const user = userEvent.setup({ delay: null })

describe('TextFilter', () => {
  it('renders with default placeholder', () => {
    render(<TextFilter />)
    expect(screen.getByPlaceholderText('Filter…')).toBeInTheDocument()
  })

  it('renders custom placeholder', () => {
    render(<TextFilter placeholder="Search agents…" />)
    expect(screen.getByPlaceholderText('Search agents…')).toBeInTheDocument()
  })

  it('shows controlled value', () => {
    render(<TextFilter value="hello" onChange={() => {}} />)
    expect(screen.getByDisplayValue('hello')).toBeInTheDocument()
  })

  it('calls onChange after typing (debounced)', async () => {
    const handler = vi.fn()
    render(<TextFilter onChange={handler} debounceMs={0} />)
    await user.type(screen.getByRole('textbox'), 'abc')
    expect(handler).toHaveBeenCalled()
  })

  it('shows match count when provided', () => {
    render(<TextFilter matchCount={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('shows clear button when value is set', async () => {
    render(<TextFilter value="test" onChange={() => {}} />)
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  it('is disabled when prop is set', () => {
    render(<TextFilter disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })
})
