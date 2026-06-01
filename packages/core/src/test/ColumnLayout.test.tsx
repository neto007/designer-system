import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ColumnLayout } from '../components/primitives/ColumnLayout'

describe('ColumnLayout', () => {
  it('renders children', () => {
    render(
      <ColumnLayout>
        <div>Item 1</div>
        <div>Item 2</div>
      </ColumnLayout>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('renders as a grid', () => {
    const { container } = render(<ColumnLayout><div>x</div></ColumnLayout>)
    expect((container.firstChild as HTMLElement).className).toContain('grid')
  })

  it('applies grid-cols-1 for single column', () => {
    const { container } = render(<ColumnLayout columns={1}><div>x</div></ColumnLayout>)
    expect((container.firstChild as HTMLElement).className).toContain('grid-cols-1')
  })

  it('applies gap-2 for sm gap', () => {
    const { container } = render(<ColumnLayout gap="sm"><div>x</div></ColumnLayout>)
    expect((container.firstChild as HTMLElement).className).toContain('gap-2')
  })

  it('applies gap-8 for lg gap', () => {
    const { container } = render(<ColumnLayout gap="lg"><div>x</div></ColumnLayout>)
    expect((container.firstChild as HTMLElement).className).toContain('gap-8')
  })

  it('forwards className', () => {
    const { container } = render(<ColumnLayout className="custom"><div>x</div></ColumnLayout>)
    expect((container.firstChild as HTMLElement).className).toContain('custom')
  })
})
