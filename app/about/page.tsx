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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-lavender-50 to-violet-50" style={{backgroundColor: '#FAF5FF'}}>
      {/* Header Section with Spiritual Design */}
      <header className="relative bg-gradient-to-br from-purple-900 via-violet-800 to-purple-900 shadow-2xl">
        <div className="absolute inset-0 bg-[url('/images/WhatsApp%20Image%202026-06-04%20at%204.50.37%20PM.jpeg')] opacity-10 bg-cover bg-center" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Golden Cross Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400/30 to-purple-600/20 backdrop-blur-sm flex items-center justify-center border-2 border-amber-300/40 shadow-xl shadow-amber-500/30">
                <div className="text-5xl text-amber-200" style={{textShadow: '0 0 20px rgba(251, 191, 36, 0.6)'}}>✟</div>
              </div>
            </div>
            {/* Church Name */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'}}>
              Rivers of Living Waters Ministry
            </h1>
            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>
            {/* Description */}
            <p className="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-6" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
              Welcome to our community! We are a vibrant church family dedicated to worship, fellowship, and spreading the love of Christ.
            </p>

            {/* Inspirational Verse */}
            <div className="mt-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-amber-300/30">
              <p className="text-lg italic text-amber-100 mb-2" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
                "I am the way and the truth and the life. No one comes to the Father except through me."
              </p>
              <p className="text-sm font-semibold text-amber-300" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
                — JOHN 14:6
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation with Spiritual Theme */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-50/95 via-lavender-50/95 to-violet-50/95 backdrop-blur-md shadow-lg border-b border-purple-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-2 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group relative flex items-center gap-2 px-7 py-3.5 rounded-xl font-medium transition-all duration-300 whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/40 scale-105'
                        : 'text-purple-900 hover:bg-purple-100/70 hover:scale-102'
                    }
                  `}
                  style={{fontFamily: 'Crimson Pro, Georgia, serif'}}
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

      {/* Tab Content with Beautiful Card */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-purple-50/95 via-lavender-50/95 to-violet-50/95 backdrop-blur-sm rounded-3xl shadow-2xl shadow-purple-900/10 p-8 md:p-12 border border-purple-200/30">
          {activeTab === 'schedule' && <ScheduleTab />}
          {activeTab === 'events' && <EventsTab />}
          {activeTab === 'prayer' && <PrayerTab />}
          {activeTab === 'gallery' && <GalleryTab />}
        </div>
      </main>

      {/* Footer with Spiritual Theme */}
      <footer className="relative bg-gradient-to-br from-purple-950 via-violet-900 to-purple-950 text-white mt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Footer Cross */}
            <div className="flex justify-center mb-6">
              <div className="text-3xl text-amber-300/80">✟</div>
            </div>
            {/* Footer Title */}
            <h3 className="text-3xl font-bold mb-4" style={{fontFamily: 'Cormorant Garamond, Georgia, serif'}}>
              Rivers of Living Waters Ministry
            </h3>
            {/* Decorative Divider */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/40" />
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/40" />
            </div>
            <p className="text-purple-200 mb-6 text-lg" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
              Join us as we worship together and grow in faith
            </p>

            {/* Contact Information */}
            <div className="mb-8 max-w-md mx-auto">
              <h4 className="text-xl font-semibold mb-4 text-amber-300" style={{fontFamily: 'Cormorant Garamond, Georgia, serif'}}>
                Connect With Us
              </h4>
              <div className="flex items-center justify-center gap-2 text-purple-200">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a
                  href="mailto:riversoflivingwatersb@gmail.com"
                  className="hover:text-amber-300 transition-colors duration-200"
                  style={{fontFamily: 'Crimson Pro, Georgia, serif'}}
                >
                  riversoflivingwatersb@gmail.com
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-purple-200 mt-3">
                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <a
                  href="https://www.facebook.com/profile.php?id=61591346543545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 transition-colors duration-200"
                  style={{fontFamily: 'Crimson Pro, Georgia, serif'}}
                >
                  Follow us on Facebook
                </a>
              </div>
            </div>

            <p className="text-sm text-purple-400/80">
              © 2026 Rivers of Living Waters Ministry. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <MusicPlayer />
    </div>
  );
}
