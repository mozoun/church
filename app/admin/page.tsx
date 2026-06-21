'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export const dynamic = 'force-dynamic';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      toast.success('Login successful!');
      router.push('/admin/dashboard');
      router.refresh();
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Invalid login credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-900 to-purple-950 flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-center" />

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-5 bg-gradient-to-br from-amber-400/20 to-purple-600/20 backdrop-blur-md rounded-full mb-6 border-2 border-amber-300/30 shadow-2xl shadow-amber-500/20">
            <div className="text-6xl text-amber-200" style={{textShadow: '0 0 25px rgba(251, 191, 36, 0.5)'}}>✟</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', textShadow: '0 2px 15px rgba(0, 0, 0, 0.4)'}}>
            Admin Panel
          </h1>
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400/70" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
          <p className="text-purple-200 text-lg" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
            Rivers of Living Waters Ministry
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-purple-200/30">
          <h2 className="text-2xl font-bold mb-8" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#4C1D95'}}>
            Sign In
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#4C1D95'}}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#A78BFA'}} />
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200"
                  style={{
                    borderColor: '#DDD6FE',
                    fontFamily: 'Crimson Pro, Georgia, serif',
                    color: '#4C1D95'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                  onBlur={(e) => e.target.style.borderColor = '#DDD6FE'}
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#4C1D95'}}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{color: '#A78BFA'}} />
                <input
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border-2 rounded-xl transition-all duration-200"
                  style={{
                    borderColor: '#DDD6FE',
                    fontFamily: 'Crimson Pro, Georgia, serif',
                    color: '#4C1D95'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                  onBlur={(e) => e.target.style.borderColor = '#DDD6FE'}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full mt-8"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold text-lg shadow-xl transform transition-all duration-300 group-hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </div>
            </button>
          </form>

          {/* Info */}
          <div className="mt-8 text-center text-sm" style={{color: '#A78BFA', fontFamily: 'Crimson Pro, Georgia, serif'}}>
            <p>Protected admin area</p>
          </div>
        </div>
      </div>
    </div>
  );
}
