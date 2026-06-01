import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { JSONViewer } from '../components/chat/JSONViewer'

const user = userEvent.setup({ delay: null })

describe('JSONViewer', () => {
  it('renders string value', () => {
    render(<JSONViewer data="hello" />)
    expect(screen.getByText(/"hello"/)).toBeInTheDocument()
  })

  it('renders number value', () => {
    render(<JSONViewer data={42} />)
    expect(screen.getByText('42')).toBeInTheDocument()
  })

  it('renders boolean value', () => {
    render(<JSONViewer data={true} />)
    expect(screen.getByText('true')).toBeInTheDocument()
  })

  it('renders null value', () => {
    render(<JSONViewer data={null} />)
    expect(screen.getByText('null')).toBeInTheDocument()
  })

  it('renders object keys when expanded via initialDepth', () => {
    const { container } = render(
      <JSONViewer data={{ status: 'live', tasks: 5 }} initialDepth={2} />
    )
    // Keys render as text nodes — check the container text content
    expect(container.textContent).toContain('status')
    expect(container.textContent).toContain('tasks')
  })

  it('renders array summary showing length', () => {
    const { container } = render(<JSONViewer data={[1, 2, 3]} />)
    expect(container.textContent).toMatch(/3/)
  })

  it('renders label prop', () => {
    render(<JSONViewer data={{ x: 1 }} label="result" />)
    expect(screen.getByText('result')).toBeInTheDocument()
  })

  it('expands a collapsed node on toggle click', async () => {
    const { container } = render(
      <JSONViewer data={{ nested: { deep: 'value' } }} initialDepth={0} />
    )
    // Toggle is a div with cursor-pointer (not a button)
    const toggle = container.querySelector('.cursor-pointer') as HTMLElement
    expect(toggle).toBeInTheDocument()
    await user.click(toggle)
    expect(container.textContent).toContain('nested')
  })
})
