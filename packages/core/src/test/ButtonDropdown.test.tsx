import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ButtonDropdown } from '../components/primitives/ButtonDropdown'

const ITEMS = [
  { id: 'edit',   label: 'Edit' },
  { id: 'delete', label: 'Delete', danger: true },
  { id: 'share',  label: 'Share', disabled: true },
]

describe('ButtonDropdown', () => {
  it('renders the trigger label', () => {
    render(<ButtonDropdown label="Actions" items={ITEMS} />)
    expect(screen.getByRole('button', { name: /actions/i })).toBeInTheDocument()
  })

  it('dropdown is closed initially', () => {
    render(<ButtonDropdown label="Actions" items={ITEMS} />)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('opens dropdown on trigger click', async () => {
    const user = userEvent.setup({ delay: null })
    render(<ButtonDropdown label="Actions" items={ITEMS} />)
    await user.click(screen.getByRole('button', { name: /actions/i }))
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })

  it('shows item labels when open', async () => {
    const user = userEvent.setup({ delay: null })
    render(<ButtonDropdown label="Actions" items={ITEMS} />)
    await user.click(screen.getByRole('button', { name: /actions/i }))
    expect(screen.getByText('Edit')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
  })

  it('calls onItemClick when enabled item is clicked', async () => {
    const user = userEvent.setup({ delay: null })
    const onItemClick = vi.fn()
    render(<ButtonDropdown label="Actions" items={ITEMS} onItemClick={onItemClick} />)
    await user.click(screen.getByRole('button', { name: /actions/i }))
    await user.click(screen.getByText('Edit'))
    expect(onItemClick).toHaveBeenCalledWith(expect.objectContaining({ id: 'edit' }))
  })

  it('does not call onItemClick for disabled item', async () => {
    const user = userEvent.setup({ delay: null })
    const onItemClick = vi.fn()
    render(<ButtonDropdown label="Actions" items={ITEMS} onItemClick={onItemClick} />)
    await user.click(screen.getByRole('button', { name: /actions/i }))
    await user.click(screen.getByText('Share'))
    expect(onItemClick).not.toHaveBeenCalled()
  })

  it('closes dropdown after selecting an item', async () => {
    const user = userEvent.setup({ delay: null })
    render(<ButtonDropdown label="Actions" items={ITEMS} />)
    await user.click(screen.getByRole('button', { name: /actions/i }))
    await user.click(screen.getByText('Edit'))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<ButtonDropdown label="Actions" items={ITEMS} disabled />)
    expect(screen.getByRole('button', { name: /actions/i })).toBeDisabled()
  })
})
