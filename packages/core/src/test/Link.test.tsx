import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Link } from '../components/primitives/Link'

describe('Link', () => {
  it('renders an anchor element', () => {
    render(<Link href="/home">Go home</Link>)
    expect(screen.getByRole('link', { name: /go home/i })).toBeInTheDocument()
  })

  it('renders with href', () => {
    render(<Link href="/about">About</Link>)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/about')
  })

  it('external variant adds target="_blank"', () => {
    render(<Link href="https://example.com" variant="external">External</Link>)
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
  })

  it('external variant adds rel="noopener noreferrer"', () => {
    render(<Link href="https://example.com" variant="external">External</Link>)
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('inline variant does not add target="_blank"', () => {
    render(<Link href="/page" variant="inline">Inline</Link>)
    expect(screen.getByRole('link')).not.toHaveAttribute('target')
  })

  it('disabled state sets aria-disabled', () => {
    render(<Link href="/page" disabled>Disabled</Link>)
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true')
  })

  it('disabled state sets tabIndex to -1', () => {
    render(<Link href="/page" disabled>Disabled</Link>)
    expect(screen.getByRole('link')).toHaveAttribute('tabindex', '-1')
  })

  it('renders children text', () => {
    render(<Link href="/">Home</Link>)
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})
