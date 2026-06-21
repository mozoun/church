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
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-center" />

      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Rivers of Living Waters Ministry</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 overflow-x-auto py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {activeTab === 'schedules' && <ManageSchedules />}
          {activeTab === 'events' && <ManageEvents />}
          {activeTab === 'gallery' && <ManageGallery />}
          {activeTab === 'appointments' && <ViewAppointments />}
        </div>
      </main>
    </div>
  );
}
