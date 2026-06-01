import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup } from '../components/primitives/RadioGroup'

const user = userEvent.setup({ delay: null })

const ITEMS = [
  { value: 'llm',  label: 'LLM Agent' },
  { value: 'task', label: 'Task Agent' },
  { value: 'loop', label: 'Loop Agent', disabled: true },
]

describe('RadioGroup', () => {
  it('renders all items', () => {
    render(<RadioGroup items={ITEMS} />)
    expect(screen.getByText('LLM Agent')).toBeInTheDocument()
    expect(screen.getByText('Task Agent')).toBeInTheDocument()
    expect(screen.getByText('Loop Agent')).toBeInTheDocument()
  })

  it('shows selected item via defaultValue', () => {
    render(<RadioGroup items={ITEMS} defaultValue="llm" />)
    const radio = screen.getByRole('radio', { name: 'LLM Agent' })
    expect(radio).toBeChecked()
  })

  it('calls onValueChange on selection', async () => {
    const handler = vi.fn()
    render(<RadioGroup items={ITEMS} onValueChange={handler} />)
    await user.click(screen.getByRole('radio', { name: 'Task Agent' }))
    expect(handler).toHaveBeenCalledWith('task')
  })

  it('disabled item cannot be clicked', () => {
    render(<RadioGroup items={ITEMS} />)
    expect(screen.getByRole('radio', { name: 'Loop Agent' })).toBeDisabled()
  })

  it('entire group disabled when prop set', () => {
    render(<RadioGroup items={ITEMS} disabled />)
    screen.getAllByRole('radio').forEach((r) => expect(r).toBeDisabled())
  })
})
