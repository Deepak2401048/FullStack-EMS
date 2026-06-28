
import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { Menu } from 'lucide-react'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/employees': 'Employees',
  '/attendance': 'Attendance',
  '/leave': 'Leave Management',
  '/payslip': 'Payslips',
  '/setting': 'Settings',
}

const Layout = () => {
  const { pathname } = useLocation()
  const [mobileMenu, setMobileMenu] = useState(false)

  const pageTitle = useMemo(() => {
    const matchedPath = Object.keys(pageTitles).find((path) => pathname.startsWith(path))
    return pageTitles[matchedPath] || 'Employee MS'
  }, [pathname])

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
      <Sidebar
        mobileMenu={mobileMenu}
        onMobileMenuClose={() => setMobileMenu(false)}
      />
      <main className="flex-1 overflow-y-auto lg:pl-64">
        <header className="lg:hidden sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/95 px-4 shadow-sm backdrop-blur">
          <button
            type="button"
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white shadow-sm transition-colors hover:bg-gray-800"
            onClick={() => setMobileMenu(true)}
            aria-label="Open sidebar menu"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-bold text-slate-900">{pageTitle}</h1>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-400 mx-auto [&_.page-title]:hidden lg:[&_.page-title]:block">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Layout;
