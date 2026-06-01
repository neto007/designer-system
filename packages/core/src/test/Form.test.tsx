import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, FormField, FormSection, FormActions } from '../components/primitives/Form'
import { Button } from '../components/primitives/Button'

describe('Form', () => {
  it('renders children', () => {
    render(<Form><span>form content</span></Form>)
    expect(screen.getByText('form content')).toBeInTheDocument()
  })

  it('renders a form element', () => {
    const { container } = render(<Form><span>x</span></Form>)
    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('calls onSubmit when form is submitted', async () => {
    const user = userEvent.setup({ delay: null })
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <Form onSubmit={onSubmit}>
        <Button type="submit">Submit</Button>
      </Form>
    )
    await user.click(screen.getByRole('button', { name: /submit/i }))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})

describe('FormField', () => {
  it('renders the label', () => {
    render(
      <FormField id="name" label="Full Name">
        <input id="name" />
      </FormField>
    )
    expect(screen.getByText('Full Name')).toBeInTheDocument()
  })

  it('label is associated with the input via htmlFor', () => {
    render(
      <FormField id="email" label="Email">
        <input id="email" />
      </FormField>
    )
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
  })

  it('renders required indicator when required is true', () => {
    render(
      <FormField id="req" label="Required Field" required>
        <input id="req" />
      </FormField>
    )
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders error message when error prop is provided', () => {
    render(
      <FormField id="bad" label="Name" error="This field is required">
        <input id="bad" />
      </FormField>
    )
    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <FormField id="desc" label="Name" description="Your full name">
        <input id="desc" />
      </FormField>
    )
    expect(screen.getByText('Your full name')).toBeInTheDocument()
  })
})

describe('FormSection', () => {
  it('renders title when provided', () => {
    render(<FormSection title="Personal Info"><input /></FormSection>)
    expect(screen.getByText('Personal Info')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<FormSection title="Info" description="Fill in your details"><input /></FormSection>)
    expect(screen.getByText('Fill in your details')).toBeInTheDocument()
  })

  it('renders children', () => {
    render(<FormSection><span>field here</span></FormSection>)
    expect(screen.getByText('field here')).toBeInTheDocument()
  })
})

describe('FormActions', () => {
  it('renders children buttons', () => {
    render(
      <FormActions>
        <Button>Save</Button>
        <Button>Cancel</Button>
      </FormActions>
    )
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })
})
