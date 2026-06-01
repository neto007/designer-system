import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Drawer, DrawerHeader, DrawerTitle, DrawerBody } from '../components/overlay/Drawer'

const user = userEvent.setup({ delay: null })

function TestDrawer({ side = 'right' as const }) {
  return (
    <Drawer
      open={false}
      onOpenChange={() => {}}
      side={side}
      trigger={<button>Open drawer</button>}
    >
      <DrawerHeader>
        <DrawerTitle>Agent Config</DrawerTitle>
      </DrawerHeader>
      <DrawerBody>
        <p>Drawer body content</p>
      </DrawerBody>
    </Drawer>
  )
}

function OpenDrawer() {
  return (
    <Drawer
      open={true}
      onOpenChange={() => {}}
      trigger={<button>Open</button>}
    >
      <DrawerBody><p>Content</p></DrawerBody>
    </Drawer>
  )
}

describe('Drawer', () => {
  it('renders trigger', () => {
    render(<TestDrawer />)
    expect(screen.getByText('Open drawer')).toBeInTheDocument()
  })

  it('content hidden when open=false', () => {
    render(<TestDrawer />)
    expect(screen.queryByText('Drawer body content')).not.toBeInTheDocument()
  })

  it('shows content when open=true', () => {
    render(<OpenDrawer />)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('shows title when open=true', () => {
    render(
      <Drawer open={true} onOpenChange={() => {}} trigger={<button>x</button>}>
        <DrawerHeader><DrawerTitle>Settings</DrawerTitle></DrawerHeader>
        <DrawerBody><p>body</p></DrawerBody>
      </Drawer>
    )
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})
