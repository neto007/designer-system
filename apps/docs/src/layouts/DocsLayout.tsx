import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Sidebar, MobileSidebarToggle } from './Sidebar'
import { CommandPalette } from '../components/docs/CommandPalette'
import { cn } from '@shieldai/ds'

const MINI_KEY = 'ds-sidebar-mini'

export function DocsLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [mini, setMini] = useState(() => {
    try { return localStorage.getItem(MINI_KEY) === 'true' } catch { return false }
  })
  const location = useLocation()

  // Close mobile sidebar + scroll to top on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  // Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const toggleMini = () => {
    setMini(m => {
      const next = !m
      try { localStorage.setItem(MINI_KEY, String(next)) } catch {}
      return next
    })
  }

  return (
    <div className="min-h-screen bg-ds-bg text-ds-fg flex">

      {/* Command Palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Desktop sidebar — full or mini */}
      <div className={cn(
        'hidden lg:flex flex-col flex-shrink-0 sticky top-0 h-screen transition-[width] duration-[250ms] ease-[cubic-bezier(0.05,0.7,0.1,1.0)]',
        mini ? 'w-[60px]' : 'w-[260px]'
      )}>
        <Sidebar mini={mini} onToggleMini={toggleMini} onOpenPalette={() => setPaletteOpen(true)} />
      </div>

      {/* Mobile sidebar — full overlay drawer */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-overlay flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-[280px] h-full flex flex-col">
            <Sidebar onClose={() => setMobileSidebarOpen(false)} onOpenPalette={() => { setMobileSidebarOpen(false); setPaletteOpen(true) }} />
          </div>
        </div>
      )}

      {/* Mobile toggle */}
      <MobileSidebarToggle onClick={() => setMobileSidebarOpen(true)} />

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
