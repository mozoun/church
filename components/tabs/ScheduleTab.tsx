'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';
import ServiceCountdown from '@/components/ServiceCountdown';
import FadeIn from '@/components/animations/FadeIn';

interface Schedule {
  id: string;
  dayOfWeek: string;
  serviceName: string;
  startTime: string;
  endTime: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ScheduleTab() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedules();
  }, []);

  async function fetchSchedules() {
    try {
      const response = await fetch('/api/schedules');
      if (!response.ok) throw new Error('Failed to fetch schedules');
      const data = await response.json();
      setSchedules(data || []);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  }

  const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const sortedSchedules = schedules.sort((a, b) =>
    dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek)
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <FadeIn>
        <h2 className="text-3xl font-bold mb-2" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#4C1D95'}}>
          Weekly Schedule
        </h2>
        <p className="mb-8" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#6B21A8'}}>
          Join us for worship and fellowship
        </p>
      </FadeIn>

      {/* Service Countdown */}
      <FadeIn delay={0.2}>
        <div className="mb-8">
          <ServiceCountdown />
        </div>
      </FadeIn>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedSchedules.map((schedule, index) => (
          <FadeIn key={schedule.id} delay={0.3 + (index * 0.1)} direction="up">
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#7C3AED'}}>
                  {schedule.dayOfWeek}
                </h3>
                <Clock className="w-5 h-5 text-purple-600" />
              </div>

              <h4 className="text-lg font-semibold mb-3" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#4C1D95'}}>
                {schedule.serviceName}
              </h4>

              <div className="space-y-2">
                <div className="flex items-center" style={{color: '#6B21A8'}}>
                  <Clock className="w-4 h-4 mr-2 text-purple-600" />
                  <span className="text-sm" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
                    {schedule.startTime} - {schedule.endTime}
                  </span>
                </div>

                {schedule.description && (
                  <p className="text-sm mt-3 italic" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#7C3AED'}}>
                    {schedule.description}
                  </p>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {sortedSchedules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
            No scheduled services at this time.
          </p>
        </div>
      )}

      <FadeIn delay={0.5}>
        <div className="mt-12 bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
          <h3 className="text-xl font-semibold mb-2" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#7C3AED'}}>
            Location
          </h3>
          <div className="flex items-start gap-2" style={{color: '#4C1D95'}}>
            <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
            <div style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
              <p className="font-medium">Slovenian Society</p>
              <p className="text-sm">5762 Sprott St, Burnaby, BC</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
