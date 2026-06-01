import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Multiselect } from '../components/primitives/Multiselect'

const OPTIONS = [
  { value: 'react',  label: 'React' },
  { value: 'vue',    label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
]

describe('Multiselect', () => {
  it('renders placeholder when no values selected', () => {
    render(<Multiselect options={OPTIONS} placeholder="Pick frameworks" />)
    expect(screen.getByText('Pick frameworks')).toBeInTheDocument()
  })

  it('renders default placeholder when not specified', () => {
    render(<Multiselect options={OPTIONS} />)
    expect(screen.getByText('Select options…')).toBeInTheDocument()
  })

  it('dropdown is closed initially', () => {
    render(<Multiselect options={OPTIONS} />)
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
  })

  it('opens dropdown on click', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Multiselect options={OPTIONS} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows all options when open', async () => {
    const user = userEvent.setup({ delay: null })
    render(<Multiselect options={OPTIONS} />)
    await user.click(screen.getByRole('combobox'))
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Vue')).toBeInTheDocument()
  })

  it('calls onChange when an option is selected', async () => {
    const user = userEvent.setup({ delay: null })
    const onChange = vi.fn()
    render(<Multiselect options={OPTIONS} value={[]} onChange={onChange} />)
    await user.click(screen.getByRole('combobox'))
    await user.click(screen.getByRole('option', { name: /^react$/i }))
    expect(onChange).toHaveBeenCalledWith(['react'])
  })

  it('renders selected token labels', () => {
    render(<Multiselect options={OPTIONS} value={['react']} onChange={vi.fn()} />)
    // selected token renders the label inside the combobox
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('calls onChange to remove a selected option via its X button', async () => {
    const user = userEvent.setup({ delay: null })
    const onChange = vi.fn()
    render(<Multiselect options={OPTIONS} value={['react']} onChange={onChange} />)
    await user.click(screen.getByRole('button', { name: /remove react/i }))
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('is not interactive when disabled', () => {
    render(<Multiselect options={OPTIONS} disabled />)
    const combobox = screen.getByRole('combobox')
    expect(combobox.className).toContain('pointer-events-none')
  })

  it('renders label when label prop is provided', () => {
    render(<Multiselect options={OPTIONS} label="Frameworks" />)
    expect(screen.getByText('Frameworks')).toBeInTheDocument()
  })
})
