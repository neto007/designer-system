import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ExpandableSection } from '../components/primitives/ExpandableSection'

const user = userEvent.setup({ delay: null })

describe('ExpandableSection', () => {
  it('content not in DOM when collapsed by default', () => {
    render(<ExpandableSection header="Config"><p>Content</p></ExpandableSection>)
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('renders content when defaultExpanded is true', () => {
    render(<ExpandableSection header="Config" defaultExpanded><p>Content</p></ExpandableSection>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('expands content on header click', async () => {
    render(<ExpandableSection header="Config"><p>Content</p></ExpandableSection>)
    await user.click(screen.getByText('Config'))
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('collapses again on second click', async () => {
    render(<ExpandableSection header="Config"><p>Content</p></ExpandableSection>)
    await user.click(screen.getByText('Config'))
    await user.click(screen.getByText('Config'))
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
  })

  it('calls onToggle with new state', async () => {
    const handler = vi.fn()
    render(
      <ExpandableSection header="Config" onToggle={handler}>
        <p>Content</p>
      </ExpandableSection>
    )
    await user.click(screen.getByText('Config'))
    expect(handler).toHaveBeenCalledWith(true)
  })

  it('toggle button has aria-expanded', () => {
    render(<ExpandableSection header="Config"><p>Content</p></ExpandableSection>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')
  })
})
