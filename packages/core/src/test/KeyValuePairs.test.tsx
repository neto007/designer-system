import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { KeyValuePairs } from '../components/primitives/KeyValuePairs'

const ITEMS = [
  { key: 'Region',  value: 'us-east-1' },
  { key: 'Model',   value: 'claude-opus-4-7' },
  { key: 'Status',  value: <span data-testid="status">live</span> },
]

describe('KeyValuePairs', () => {
  it('renders all keys', () => {
    render(<KeyValuePairs items={ITEMS} />)
    expect(screen.getByText('Region')).toBeInTheDocument()
    expect(screen.getByText('Model')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('renders all values', () => {
    render(<KeyValuePairs items={ITEMS} />)
    expect(screen.getByText('us-east-1')).toBeInTheDocument()
    expect(screen.getByText('claude-opus-4-7')).toBeInTheDocument()
    expect(screen.getByTestId('status')).toBeInTheDocument()
  })

  it('renders ReactNode value', () => {
    render(<KeyValuePairs items={[{ key: 'Node', value: <em>italic</em> }]} />)
    expect(screen.getByText('italic').tagName).toBe('EM')
  })

  it('applies columns grid class', () => {
    const { container } = render(<KeyValuePairs items={ITEMS} columns={4} />)
    expect(container.firstChild).toHaveClass('grid')
  })
})
