import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ToastProvider } from '../components/feedback/Toast'
import { useToast } from '../hooks/useToast'

afterEach(() => vi.useRealTimers())

const user = userEvent.setup({ delay: null })

function ToastTrigger({ variant = 'success' as const, duration = 0 }) {
  const { toast } = useToast()
  return (
    <button
      onClick={() => toast({ variant, title: `${variant} toast`, description: 'Test desc', duration })}
    >
      show toast
    </button>
  )
}

describe('Toast / useToast', () => {
  it('adds a toast on trigger', async () => {
    render(<ToastProvider><ToastTrigger /></ToastProvider>)
    await user.click(screen.getByText('show toast'))
    expect(screen.getByText('success toast')).toBeInTheDocument()
    expect(screen.getByText('Test desc')).toBeInTheDocument()
  })

  it('renders all 4 variants', async () => {
    for (const variant of ['success', 'error', 'info', 'warning'] as const) {
      const { unmount } = render(
        <ToastProvider><ToastTrigger variant={variant} /></ToastProvider>
      )
      await user.click(screen.getByText('show toast'))
      expect(screen.getByText(`${variant} toast`)).toBeInTheDocument()
      unmount()
    }
  })

  it('auto-dismisses after duration', async () => {
    render(<ToastProvider><ToastTrigger duration={80} /></ToastProvider>)
    await user.click(screen.getByText('show toast'))
    expect(screen.getByText('success toast')).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.queryByText('success toast'), { timeout: 500 })
  })

  it('dismisses on X button click', async () => {
    render(<ToastProvider><ToastTrigger /></ToastProvider>)
    await user.click(screen.getByText('show toast'))
    expect(screen.getByText('success toast')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /dismiss/i }))
    expect(screen.queryByText('success toast')).not.toBeInTheDocument()
  })

  it('dismiss() removes toast by id', async () => {
    let savedId = ''
    function DismissById() {
      const { toast, dismiss } = useToast()
      return (
        <>
          <button onClick={() => { savedId = toast({ variant: 'info', title: 'info toast', duration: 0 }) }}>add</button>
          <button onClick={() => dismiss(savedId)}>remove</button>
        </>
      )
    }
    render(<ToastProvider><DismissById /></ToastProvider>)
    await user.click(screen.getByText('add'))
    expect(screen.getByText('info toast')).toBeInTheDocument()
    await user.click(screen.getByText('remove'))
    expect(screen.queryByText('info toast')).not.toBeInTheDocument()
  })
})
