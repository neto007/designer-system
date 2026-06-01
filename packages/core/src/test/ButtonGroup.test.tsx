import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ButtonGroup } from '../components/primitives/ButtonGroup'
import { Button } from '../components/primitives/Button'

describe('ButtonGroup', () => {
  it('renders children buttons', () => {
    render(
      <ButtonGroup>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('has role="group"', () => {
    render(
      <ButtonGroup aria-label="actions">
        <Button>A</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group', { name: 'actions' })).toBeInTheDocument()
  })

  it('horizontal orientation renders inline-flex flex-row', () => {
    const { container } = render(
      <ButtonGroup orientation="horizontal">
        <Button>A</Button>
      </ButtonGroup>
    )
    const group = container.firstChild as HTMLElement
    expect(group.className).toContain('inline-flex')
    expect(group.className).not.toContain('flex-col')
  })

  it('vertical orientation renders flex-col', () => {
    const { container } = render(
      <ButtonGroup orientation="vertical">
        <Button>A</Button>
      </ButtonGroup>
    )
    expect((container.firstChild as HTMLElement).className).toContain('flex-col')
  })

  it('forwards aria-label', () => {
    render(
      <ButtonGroup aria-label="toolbar">
        <Button>X</Button>
      </ButtonGroup>
    )
    expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'toolbar')
  })
})
