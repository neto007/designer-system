import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SideNavigation } from '../components/primitives/SideNavigation'

const SECTIONS = [
  {
    label: 'Main',
    items: [
      { label: 'Dashboard', href: '/dashboard', active: true },
      { label: 'Settings',  onClick: vi.fn() },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Users', href: '/users' },
    ],
  },
]

describe('SideNavigation', () => {
  it('renders a nav landmark', () => {
    render(<SideNavigation sections={SECTIONS} />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders all item labels', () => {
    render(<SideNavigation sections={SECTIONS} />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
    expect(screen.getByText('Users')).toBeInTheDocument()
  })

  it('renders section headers', () => {
    render(<SideNavigation sections={SECTIONS} />)
    expect(screen.getByText('Main')).toBeInTheDocument()
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('active item has active styling class', () => {
    render(<SideNavigation sections={SECTIONS} />)
    const dashboardLink = screen.getByRole('link', { name: /dashboard/i })
    expect(dashboardLink.className).toContain('text-ds-purple')
  })

  it('renders header slot when provided', () => {
    render(<SideNavigation sections={SECTIONS} header={<div>My App</div>} />)
    expect(screen.getByText('My App')).toBeInTheDocument()
  })

  it('renders footer slot when provided', () => {
    render(<SideNavigation sections={SECTIONS} footer={<div>v1.0.0</div>} />)
    expect(screen.getByText('v1.0.0')).toBeInTheDocument()
  })

  it('calls onClick when a button item is clicked', async () => {
    const user = userEvent.setup({ delay: null })
    const onClick = vi.fn()
    render(<SideNavigation sections={[{
      items: [{ label: 'Action', onClick }],
    }]} />)
    await user.click(screen.getByRole('button', { name: /action/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders items with href as anchor elements', () => {
    render(<SideNavigation sections={SECTIONS} />)
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/dashboard')
  })

  it('renders child items when parent has children and is expanded', async () => {
    const user = userEvent.setup({ delay: null })
    render(<SideNavigation sections={[{
      items: [{
        label: 'Parent',
        children: [{ label: 'Child Item' }],
      }],
    }]} />)
    await user.click(screen.getByRole('button', { name: /parent/i }))
    expect(screen.getByText('Child Item')).toBeInTheDocument()
  })
})
