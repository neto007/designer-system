import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Select } from '../components/primitives/Select'

const ITEMS = [
  { value: 'llm',        label: 'LLM Agent' },
  { value: 'sequential', label: 'Sequential' },
  { value: 'parallel',   label: 'Parallel' },
]

describe('Select', () => {
  it('renders trigger with placeholder', () => {
    render(<Select items={ITEMS} placeholder="Choose type" />)
    expect(screen.getByText('Choose type')).toBeInTheDocument()
  })

  it('shows selected value when value prop is set', () => {
    render(<Select items={ITEMS} value="llm" onValueChange={() => {}} />)
    expect(screen.getByText('LLM Agent')).toBeInTheDocument()
  })

  it('opens dropdown and shows items on click', async () => {
    render(<Select items={ITEMS} />)
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('Sequential')).toBeInTheDocument()
    expect(screen.getByText('Parallel')).toBeInTheDocument()
  })

  it('calls onValueChange when an item is selected', async () => {
    const handler = vi.fn()
    render(<Select items={ITEMS} onValueChange={handler} />)
    await userEvent.click(screen.getByRole('combobox'))
    await userEvent.click(screen.getByText('Sequential'))
    expect(handler).toHaveBeenCalledWith('sequential')
  })

  it('is disabled when disabled prop is set', () => {
    render(<Select items={ITEMS} disabled />)
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('renders grouped items', async () => {
    render(
      <Select
        groups={[
          { label: 'Models', items: [{ value: 'opus', label: 'Opus' }] },
          { label: 'Tools',  items: [{ value: 'code', label: 'Code' }] },
        ]}
      />
    )
    await userEvent.click(screen.getByRole('combobox'))
    expect(screen.getByText('Models')).toBeInTheDocument()
    expect(screen.getByText('Opus')).toBeInTheDocument()
    expect(screen.getByText('Tools')).toBeInTheDocument()
  })
})
