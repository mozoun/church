'use client';

import { useState } from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import ScheduleTab from '@/components/tabs/ScheduleTab';
import EventsTab from '@/components/tabs/EventsTab';
import PrayerTab from '@/components/tabs/PrayerTab';
import GalleryTab from '@/components/tabs/GalleryTab';
import { Calendar, Sparkles, Heart, ImageIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

type TabType = 'schedule' | 'events' | 'prayer' | 'gallery';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabType>('schedule');

  const tabs = [
    { id: 'schedule' as TabType, label: 'Schedule', icon: Calendar },
    { id: 'events' as TabType, label: 'Special Events', icon: Sparkles },
    { id: 'prayer' as TabType, label: 'Prayer Request', icon: Heart },
    { id: 'gallery' as TabType, label: 'Gallery', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="text-4xl text-blue-600">✟</div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Rivers of Living Waters Ministry
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Welcome to our community! We are a vibrant church family dedicated to worship, fellowship, and spreading the love of Christ.
            </p>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-sm">
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

      {/* Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {activeTab === 'schedule' && <ScheduleTab />}
          {activeTab === 'events' && <EventsTab />}
          {activeTab === 'prayer' && <PrayerTab />}
          {activeTab === 'gallery' && <GalleryTab />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Rivers of Living Waters Ministry</h3>
            <p className="text-gray-400 mb-4">
              Join us as we worship together and grow in faith
            </p>
            <p className="text-sm text-gray-500">
              © 2026 Rivers of Living Waters Ministry. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <MusicPlayer />
    </div>
  );
}
