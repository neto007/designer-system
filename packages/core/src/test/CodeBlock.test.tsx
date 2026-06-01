import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CodeBlock } from '../components/primitives/CodeBlock'

// Shiki uses dynamic import (async) — in jsdom it won't load.
// We test only the synchronous fallback rendering.

describe('CodeBlock', () => {
  it('renders the code in the fallback pre block', () => {
    render(<CodeBlock code="const x = 1" />)
    // The fallback <pre> renders the plain code text
    expect(screen.getByText('const x = 1')).toBeInTheDocument()
  })

  it('renders the lang badge', () => {
    render(<CodeBlock code="fn main() {}" lang="rust" />)
    expect(screen.getByText('rust')).toBeInTheDocument()
  })

  it('renders the default lang badge', () => {
    render(<CodeBlock code="<div />" />)
    expect(screen.getByText('tsx')).toBeInTheDocument()
  })

  it('renders the filename when provided', () => {
    render(<CodeBlock code="x = 1" filename="app.py" lang="python" />)
    expect(screen.getByText('app.py')).toBeInTheDocument()
  })

  it('does not render filename when not provided', () => {
    render(<CodeBlock code="x = 1" />)
    // the terminal icon + filename area should not include any file text
    expect(screen.queryByText('app.py')).not.toBeInTheDocument()
  })

  it('renders copy button', () => {
    render(<CodeBlock code="x = 1" />)
    expect(screen.getByRole('button', { name: /copy code/i })).toBeInTheDocument()
  })
})
