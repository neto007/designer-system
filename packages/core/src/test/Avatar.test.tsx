import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Avatar } from '../components/primitives/Avatar'

describe('Avatar', () => {
  it('renders initials', () => {
    render(<Avatar initials="JD" />)
    expect(screen.getByText('JD')).toBeInTheDocument()
  })

  it('renders img when src is provided', () => {
    render(<Avatar src="https://example.com/avatar.png" alt="User" />)
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://example.com/avatar.png')
  })

  it('applies lg size class (w-14)', () => {
    const { container } = render(<Avatar size="lg" initials="AB" />)
    expect(container.firstChild).toHaveClass('w-14')
  })

  it('applies sm size class (w-7)', () => {
    const { container } = render(<Avatar size="sm" initials="AB" />)
    expect(container.firstChild).toHaveClass('w-7')
  })

  it('renders children as fallback', () => {
    render(<Avatar><span>X</span></Avatar>)
    expect(screen.getByText('X')).toBeInTheDocument()
  })
})
