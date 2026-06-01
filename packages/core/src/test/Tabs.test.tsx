import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/primitives/Tabs'

describe('Tabs', () => {
  function TestTabs() {
    return (
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>
    )
  }

  it('shows default tab content', () => {
    render(<TestTabs />)
    expect(screen.getByText('Content A')).toBeVisible()
  })

  it('switches content on click', async () => {
    render(<TestTabs />)
    await userEvent.click(screen.getByText('Tab B'))
    expect(screen.getByText('Content B')).toBeVisible()
  })

  it('tab triggers are accessible', () => {
    render(<TestTabs />)
    expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Tab B' })).toBeInTheDocument()
  })
})
