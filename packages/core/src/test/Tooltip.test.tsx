import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../components/overlay/Tooltip'

const user = userEvent.setup({ delay: null })

function TestTooltip({ content = 'Deploy agent' }) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>Hover me</button>
        </TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

describe('Tooltip', () => {
  it('renders the trigger', () => {
    render(<TestTooltip />)
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  it('tooltip content is not in DOM initially', () => {
    render(<TestTooltip content="unique-tooltip-xyz" />)
    expect(screen.queryByText('unique-tooltip-xyz')).not.toBeInTheDocument()
  })

  it('shows content on hover', async () => {
    render(<TestTooltip content="tooltip-hover-test" />)
    await user.hover(screen.getByText('Hover me'))
    const matches = await screen.findAllByText('tooltip-hover-test', {}, { timeout: 2000 })
    expect(matches.length).toBeGreaterThan(0)
  })

  it('hides content after unhover (no open tooltip)', async () => {
    render(<TestTooltip content="tooltip-unhover-test" />)
    await user.hover(screen.getByText('Hover me'))
    await screen.findAllByText('tooltip-unhover-test', {}, { timeout: 2000 })
    await user.unhover(screen.getByText('Hover me'))
    // After unhover no tooltip should have data-state="open"
    const open = screen.queryAllByText('tooltip-unhover-test').filter(
      (el) => el.closest('[data-state="open"]') !== null
    )
    expect(open).toHaveLength(0)
  })
})
