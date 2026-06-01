import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from '../components/primitives/Pagination'

const user = userEvent.setup({ delay: null })

describe('Pagination', () => {
  it('renders page numbers', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />)
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('disables prev button on first page', () => {
    render(<Pagination page={1} totalPages={5} onPageChange={() => {}} />)
    // First button is Prev (ChevronLeft)
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()
  })

  it('disables next button on last page', () => {
    render(<Pagination page={5} totalPages={5} onPageChange={() => {}} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[buttons.length - 1]).toBeDisabled()
  })

  it('calls onPageChange with page+1 on next click', async () => {
    const handler = vi.fn()
    render(<Pagination page={2} totalPages={5} onPageChange={handler} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[buttons.length - 1])
    expect(handler).toHaveBeenCalledWith(3)
  })

  it('calls onPageChange with page-1 on prev click', async () => {
    const handler = vi.fn()
    render(<Pagination page={3} totalPages={5} onPageChange={handler} />)
    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    expect(handler).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when clicking a page number', async () => {
    const handler = vi.fn()
    render(<Pagination page={1} totalPages={3} onPageChange={handler} />)
    await user.click(screen.getByText('3'))
    expect(handler).toHaveBeenCalledWith(3)
  })
})
