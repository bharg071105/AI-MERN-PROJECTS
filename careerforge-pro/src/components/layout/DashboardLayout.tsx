import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar, Header } from './Sidebar'

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen app-surface">
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 min-w-0">
          <Header onMenuClick={() => setSidebarOpen(true)} />
          
          <main className="p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
