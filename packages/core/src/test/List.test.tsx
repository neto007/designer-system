import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { List } from '../components/primitives/List'

const ITEMS = [
  { value: 'apple',  label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
]

describe('List', () => {
  it('renders all item labels', () => {
    render(<List items={ITEMS} />)
    expect(screen.getByText('Apple')).toBeInTheDocument()
    expect(screen.getByText('Banana')).toBeInTheDocument()
    expect(screen.getByText('Cherry')).toBeInTheDocument()
  })

  it('renders as a listbox', () => {
    render(<List items={ITEMS} />)
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('marks selected item with aria-selected="true"', () => {
    render(<List items={ITEMS} selected="apple" />)
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute('aria-selected', 'true')
  })

  it('non-selected items have aria-selected="false"', () => {
    render(<List items={ITEMS} selected="apple" />)
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onSelect with item value when clicked', async () => {
    const user = userEvent.setup({ delay: null })
    const onSelect = vi.fn()
    render(<List items={ITEMS} onSelect={onSelect} />)
    await user.click(screen.getByRole('option', { name: 'Banana' }))
    expect(onSelect).toHaveBeenCalledWith('banana')
  })

  it('does not call onSelect for disabled item', async () => {
    const user = userEvent.setup({ delay: null })
    const onSelect = vi.fn()
    render(<List items={ITEMS} onSelect={onSelect} />)
    await user.click(screen.getByRole('option', { name: 'Cherry' }))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('renders empty state when items array is empty', () => {
    render(<List items={[]} emptyState={<span>Nothing here</span>} />)
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('renders default "No items" text when items is empty and no emptyState prop', () => {
    render(<List items={[]} />)
    expect(screen.getByText('No items')).toBeInTheDocument()
  })
})
