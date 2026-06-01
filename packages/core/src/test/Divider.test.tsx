import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Divider } from '../components/primitives/Divider'

describe('Divider', () => {
  it('renders a horizontal separator by default', () => {
    render(<Divider />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })

  it('renders as hr for plain horizontal', () => {
    const { container } = render(<Divider />)
    expect(container.querySelector('hr')).toBeInTheDocument()
  })

  it('renders vertical orientation with aria-orientation', () => {
    render(<Divider orientation="vertical" />)
    const sep = screen.getByRole('separator')
    expect(sep).toHaveAttribute('aria-orientation', 'vertical')
  })

  it('renders label text when label prop is provided', () => {
    render(<Divider label="OR" />)
    expect(screen.getByText('OR')).toBeInTheDocument()
  })

  it('still has separator role when label is provided', () => {
    render(<Divider label="Section" />)
    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
