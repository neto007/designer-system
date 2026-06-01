import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TagEditor } from '../components/primitives/TagEditor'

describe('TagEditor', () => {
  it('renders the initial empty row inputs', () => {
    render(<TagEditor />)
    expect(screen.getAllByPlaceholderText('key')).toHaveLength(1)
    expect(screen.getAllByPlaceholderText('value')).toHaveLength(1)
  })

  it('renders custom key and value placeholders', () => {
    render(<TagEditor keyPlaceholder="Tag name" valuePlaceholder="Tag value" />)
    expect(screen.getByPlaceholderText('Tag name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tag value')).toBeInTheDocument()
  })

  it('adds a new row when "Add row" is clicked', async () => {
    const user = userEvent.setup({ delay: null })
    render(<TagEditor />)
    await user.click(screen.getByText('Add row'))
    expect(screen.getAllByPlaceholderText('key')).toHaveLength(2)
  })

  it('calls onChange when a key input is changed', async () => {
    const user = userEvent.setup({ delay: null })
    const onChange = vi.fn()
    render(<TagEditor onChange={onChange} />)
    await user.type(screen.getByPlaceholderText('key'), 'env')
    expect(onChange).toHaveBeenCalled()
    const lastCall = onChange.mock.calls[onChange.mock.calls.length - 1][0]
    expect(lastCall[0].key).toBe('env')
  })

  it('remove button is disabled for the only empty row', () => {
    render(<TagEditor />)
    expect(screen.getByRole('button', { name: /remove row/i })).toBeDisabled()
  })

  it('renders controlled value rows', () => {
    render(<TagEditor value={[{ key: 'Name', value: 'Alice' }]} />)
    expect(screen.getByDisplayValue('Name')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Alice')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<TagEditor disabled />)
    const inputs = screen.getAllByRole('textbox')
    inputs.forEach(input => expect(input).toBeDisabled())
  })
})
