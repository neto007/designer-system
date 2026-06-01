import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from '../components/overlay/Dialog'

function TestDialog({ onClose }: { onClose?: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>Open Dialog</button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deployment</DialogTitle>
          <DialogDescription>This will deploy the agent fleet.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <button onClick={onClose}>Cancel</button>
          </DialogClose>
          <button>Deploy</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

describe('Dialog', () => {
  it('does not show content before open', () => {
    render(<TestDialog />)
    expect(screen.queryByText('Confirm Deployment')).not.toBeInTheDocument()
  })

  it('opens on trigger click', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    expect(screen.getByText('Confirm Deployment')).toBeInTheDocument()
    expect(screen.getByText('This will deploy the agent fleet.')).toBeInTheDocument()
  })

  it('closes via DialogClose button', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    expect(screen.getByText('Confirm Deployment')).toBeInTheDocument()
    await userEvent.click(screen.getByText('Cancel'))
    expect(screen.queryByText('Confirm Deployment')).not.toBeInTheDocument()
  })

  it('calls onClose callback', async () => {
    const handler = vi.fn()
    render(<TestDialog onClose={handler} />)
    await userEvent.click(screen.getByText('Open Dialog'))
    await userEvent.click(screen.getByText('Cancel'))
    expect(handler).toHaveBeenCalledOnce()
  })

  it('closes on Escape key', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    expect(screen.getByText('Confirm Deployment')).toBeInTheDocument()
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByText('Confirm Deployment')).not.toBeInTheDocument()
  })

  it('title has correct role', async () => {
    render(<TestDialog />)
    await userEvent.click(screen.getByText('Open Dialog'))
    expect(screen.getByRole('heading', { name: 'Confirm Deployment' })).toBeInTheDocument()
  })
})
