import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Breadcrumb } from '../components/primitives/Breadcrumb'

const ITEMS = [
  { label: 'Home',   href: '/' },
  { label: 'Agents', href: '/agents' },
  { label: 'Deploy' },
]

describe('Breadcrumb', () => {
  it('renders all labels', () => {
    render(<Breadcrumb items={ITEMS} />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Agents')).toBeInTheDocument()
    expect(screen.getByText('Deploy')).toBeInTheDocument()
  })

  it('renders links for items with href', () => {
    render(<Breadcrumb items={ITEMS} />)
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Agents' })).toHaveAttribute('href', '/agents')
  })

  it('last item without href is not a link', () => {
    render(<Breadcrumb items={ITEMS} />)
    expect(screen.queryByRole('link', { name: 'Deploy' })).not.toBeInTheDocument()
  })

  it('renders nav landmark', () => {
    render(<Breadcrumb items={ITEMS} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
