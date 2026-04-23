import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Target,
  Mail,
  Palette,
  CreditCard,
  Settings,
  LogOut,
  Menu,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Resume Builder', path: '/dashboard/resume' },
  { icon: Briefcase, label: 'Job Matcher', path: '/dashboard/jobs' },
  { icon: Target, label: 'ATS Score', path: '/dashboard/ats' },
  { icon: Mail, label: 'Cover Letter', path: '/dashboard/cover-letter' },
  { icon: Palette, label: 'Templates', path: '/dashboard/templates' },
  { icon: CreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
]

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation()
  const { user, logout } = useAuth()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50',
          'w-64 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-r border-slate-200/60 dark:border-slate-700/60',
          'transform transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-slate-200/60 dark:border-slate-700/60">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/25">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100">CareerForge</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Pro</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                    'group relative overflow-hidden',
                    isActive
                      ? 'bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 text-primary-700 dark:text-primary-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-primary-50 to-primary-100/50 rounded-xl"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                  <Icon className={cn('w-5 h-5 relative z-10', isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300')} />
                  <span className="font-medium relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="px-4 py-4 border-t border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50/50 dark:bg-slate-800/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{user?.plan} Plan</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60">
      <div className="flex items-center justify-between px-4 lg:px-8 py-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Menu className="w-6 h-6 text-slate-600 dark:text-slate-400" />
        </button>

        <div className="flex-1 lg:flex-none" />

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Mail className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/60 dark:border-amber-800/60">
            <span className="text-xs font-medium text-amber-700 dark:text-amber-300">Upgrade to Pro</span>
          </div>
        </div>
      </div>
    </header>
  )
}
