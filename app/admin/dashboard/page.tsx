'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Sparkles, ImageIcon, Heart, LogOut, Loader2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import ManageSchedules from '@/components/admin/ManageSchedules';
import ManageEvents from '@/components/admin/ManageEvents';
import ManageGallery from '@/components/admin/ManageGallery';
import ViewAppointments from '@/components/admin/ViewAppointments';

export const dynamic = 'force-dynamic';

type TabType = 'schedules' | 'events' | 'gallery' | 'appointments';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('schedules');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();

      if (!response.ok || !data.isLoggedIn) {
        router.push('/admin');
        return;
      }

      setUser(data.user);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  }

  const tabs = [
    { id: 'schedules' as TabType, label: 'Schedules', icon: Calendar },
    { id: 'events' as TabType, label: 'Special Events', icon: Sparkles },
    { id: 'gallery' as TabType, label: 'Gallery', icon: ImageIcon },
    { id: 'appointments' as TabType, label: 'Appointments', icon: Heart },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#FAF5FF'}}>
      <Toaster position="top-center" />

      {/* Header with Spiritual Theme */}
      <header className="bg-gradient-to-r from-purple-900 via-violet-800 to-purple-900 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white" style={{fontFamily: 'Cormorant Garamond, Georgia, serif'}}>
                Admin Dashboard
              </h1>
              <p className="text-purple-200 mt-1" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
                Rivers of Living Waters Ministry
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300 border border-white/20"
              style={{fontFamily: 'Crimson Pro, Georgia, serif'}}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation with Spiritual Theme */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/40 scale-105'
                        : 'hover:bg-purple-100/70 hover:scale-102'
                    }
                  `}
                  style={{fontFamily: 'Crimson Pro, Georgia, serif', color: activeTab === tab.id ? 'white' : '#4C1D95'}}
                >
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-400/20 to-transparent opacity-50" />
                  )}
                  <Icon className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content with Beautiful Card */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl shadow-purple-900/10 p-8 md:p-10 border border-purple-200/30">
          {activeTab === 'schedules' && <ManageSchedules />}
          {activeTab === 'events' && <ManageEvents />}
          {activeTab === 'gallery' && <ManageGallery />}
          {activeTab === 'appointments' && <ViewAppointments />}
        </div>
      </main>
    </div>
  );
}
