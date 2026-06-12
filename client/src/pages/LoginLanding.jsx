import { Link } from 'react-router-dom'
import { Shield, User, ArrowRight } from 'lucide-react'
import LoginLeftSide from '../components/LoginLeftSide'

// Configuration array for the portal options
const portalOptions = [
  {
    to: "/login/admin",
    title: "Admin Portal",
    description: "Sign in to manage the organization",
    icon: Shield
  },
  {
    to: "/login/employee",
    title: "Employee Portal",
    description: "Sign in to access your account",
    icon: User
  }
]

const LoginLanding = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side Panel Component */}
      <LoginLeftSide />

      {/* Right Side Panel Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white relative">
        <div className="w-full max-w-md animate-fade-in relative z-10">
          
          {/* Header Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Please select your portal to continue</p>
          </div>

          {/* Portal Selection Buttons */}
          <div className="space-y-4">
            {portalOptions.map((portal) => {
              const IconComponent = portal.icon
              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-600 hover:bg-indigo-50/30 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white border border-slate-200 text-indigo-950 rounded-lg group-hover:text-indigo-600 group-hover:border-indigo-200 transition-colors">
                      <IconComponent size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-slate-900">{portal.title}</h3>
                      <p className="text-sm text-slate-500">{portal.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" size={20} />
                </Link>
              )
            })}
          </div>

          {/* Footer Copyright Section */}
          <div className="mt-12 text-center text-sm text-slate-400">
           <p>© {new Date().getFullYear()} DK DevLabs. All rights reserved.</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default LoginLanding
