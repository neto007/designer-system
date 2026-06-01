import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../components/primitives/Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('calls onClick', async () => {
    const handler = vi.fn()
    render(<Button onClick={handler}>Go</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is set', async () => {
    const handler = vi.fn()
    render(<Button disabled onClick={handler}>Disabled</Button>)
    const btn = screen.getByRole('button')
    expect(btn).toBeDisabled()
    await userEvent.click(btn)
    expect(handler).not.toHaveBeenCalled()
  })

  it('is disabled when loading', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">S</Button>)
    expect(screen.getByRole('button').className).toContain('h-8')

    rerender(<Button size="lg">L</Button>)
    expect(screen.getByRole('button').className).toContain('h-10')
  })

  it('applies variant shadow classes', () => {
    const { rerender } = render(<Button variant="neu-purple">X</Button>)
    expect(screen.getByRole('button').className).toContain('shadow-neu-purple')

    rerender(<Button variant="neu-green">X</Button>)
    expect(screen.getByRole('button').className).toContain('shadow-neu-green')
  })
})
