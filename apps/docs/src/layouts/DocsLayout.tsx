import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Sidebar, MobileSidebarToggle } from './Sidebar'
import { cn } from '@shieldai/ds'

export function DocsLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const location = useLocation()

  // Close mobile sidebar + scroll to top on route change
  useEffect(() => {
    setMobileSidebarOpen(false)
    window.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-ds-bg text-ds-fg flex">

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-[260px] flex-shrink-0 sticky top-0 h-screen">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-overlay flex">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-[280px] h-full flex flex-col">
            <Sidebar onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile toggle */}
      <MobileSidebarToggle onClick={() => setMobileSidebarOpen(true)} />

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div
          className={cn(
            'max-w-4xl mx-auto px-6 lg:px-12 py-12',
            'lg:pl-12'
          )}
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}
