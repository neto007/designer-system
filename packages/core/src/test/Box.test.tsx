import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Box } from '../components/primitives/Box'

describe('Box', () => {
  it('renders children', () => {
    render(<Box>Hello Box</Box>)
    expect(screen.getByText('Hello Box')).toBeInTheDocument()
  })

  it('renders as div by default', () => {
    render(<Box data-testid="box">content</Box>)
    expect(screen.getByTestId('box').tagName).toBe('DIV')
  })

  it('renders as a custom element via as prop', () => {
    render(<Box as="section" data-testid="box">content</Box>)
    expect(screen.getByTestId('box').tagName).toBe('SECTION')
  })

  it('applies variant class for panel', () => {
    render(<Box variant="panel" data-testid="box">x</Box>)
    expect(screen.getByTestId('box').className).toContain('bg-ds-panel')
  })

  it('applies padding sm class', () => {
    render(<Box padding="sm" data-testid="box">x</Box>)
    expect(screen.getByTestId('box').className).toContain('p-2')
  })

  it('applies padding lg class', () => {
    render(<Box padding="lg" data-testid="box">x</Box>)
    expect(screen.getByTestId('box').className).toContain('p-6')
  })

  it('forwards className', () => {
    render(<Box className="custom-class" data-testid="box">x</Box>)
    expect(screen.getByTestId('box').className).toContain('custom-class')
  })
})
