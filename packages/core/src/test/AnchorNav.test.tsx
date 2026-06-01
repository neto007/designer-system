import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnchorNav, AnchorHeading } from '../components/primitives/AnchorNav'

const ITEMS = [
  { id: 'intro',   label: 'Introduction' },
  { id: 'usage',   label: 'Usage', level: 2 as const },
  { id: 'api',     label: 'API Reference', level: 2 as const },
]

describe('AnchorNav', () => {
  it('renders all item labels', () => {
    render(<AnchorNav items={ITEMS} />)
    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('Usage')).toBeInTheDocument()
    expect(screen.getByText('API Reference')).toBeInTheDocument()
  })

  it('renders the default title "On this page"', () => {
    render(<AnchorNav items={ITEMS} />)
    expect(screen.getByText('On this page')).toBeInTheDocument()
  })

  it('renders custom title', () => {
    render(<AnchorNav items={ITEMS} title="Contents" />)
    expect(screen.getByText('Contents')).toBeInTheDocument()
  })

  it('renders nav landmark', () => {
    render(<AnchorNav items={ITEMS} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('first item is active by default', () => {
    render(<AnchorNav items={ITEMS} />)
    // The active item renders a bullet dot before it
    const introBtn = screen.getByRole('button', { name: /introduction/i })
    expect(introBtn.className).toContain('text-ds-purple')
  })
})

describe('AnchorHeading', () => {
  it('renders as h2 by default', () => {
    render(<AnchorHeading id="section-1">Section 1</AnchorHeading>)
    expect(screen.getByRole('heading', { level: 2, name: 'Section 1' })).toBeInTheDocument()
  })

  it('renders as specified heading level', () => {
    render(<AnchorHeading id="section-2" as="h3">Section 2</AnchorHeading>)
    expect(screen.getByRole('heading', { level: 3, name: 'Section 2' })).toBeInTheDocument()
  })

  it('sets the id attribute', () => {
    render(<AnchorHeading id="my-section">Title</AnchorHeading>)
    expect(screen.getByRole('heading')).toHaveAttribute('id', 'my-section')
  })
})
