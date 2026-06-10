import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react'
import LoginLeftSide from './LoginLeftSide'

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Authentication logic will go here later
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <LoginLeftSide />

      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 bg-white relative">
        <div className="w-full max-w-md animate-fade-in">
          
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm mb-10 transition-colors"
          >
            <ArrowLeft size={16} /> Back to portals
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-slate-900 mb-2">{title}</h1>
            <p className="text-slate-500 text-sm">{subtitle}</p>
          </div>

          {error && (
            <div className='mb-4 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start gap-3'>
              <div className='w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0'/>
              {error}
            </div>
          )}

          <form className='space-y-5' onSubmit={handleSubmit}>
            
            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Email address
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder={role === 'admin' ? "admin@example.com" : "employee@example.com"}
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-slate-900"
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-700 mb-2'>
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full p-3 pr-11 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              Sign in
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default LoginForm