import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Popover, PopoverTrigger, PopoverContent } from '../components/overlay/Popover'

const user = userEvent.setup({ delay: null })

function TestPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button>Open popover</button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Popover body</p>
      </PopoverContent>
    </Popover>
  )
}

describe('Popover', () => {
  it('renders the trigger', () => {
    render(<TestPopover />)
    expect(screen.getByText('Open popover')).toBeInTheDocument()
  })

  it('content is hidden initially', () => {
    render(<TestPopover />)
    expect(screen.queryByText('Popover body')).not.toBeInTheDocument()
  })

  it('opens on trigger click', async () => {
    render(<TestPopover />)
    await user.click(screen.getByText('Open popover'))
    expect(await screen.findByText('Popover body')).toBeInTheDocument()
  })

  it('closes on second trigger click', async () => {
    render(<TestPopover />)
    await user.click(screen.getByText('Open popover'))
    await screen.findByText('Popover body')
    await user.click(screen.getByText('Open popover'))
    expect(screen.queryByText('Popover body')).not.toBeInTheDocument()
  })
})
