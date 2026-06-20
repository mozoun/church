'use client';

import { useEffect, useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

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
      <h2 className="text-3xl font-bold text-gray-900 mb-2">Weekly Schedule</h2>
      <p className="text-gray-600 mb-8">Join us for worship and fellowship</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedSchedules.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-blue-900">{schedule.dayOfWeek}</h3>
              <Clock className="w-5 h-5 text-blue-600" />
            </div>

            <h4 className="text-lg font-semibold text-gray-900 mb-3">
              {schedule.serviceName}
            </h4>

            <div className="space-y-2">
              <div className="flex items-center text-gray-700">
                <Clock className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">
                  {schedule.startTime} - {schedule.endTime}
                </span>
              </div>

              {schedule.description && (
                <p className="text-sm text-gray-600 mt-3 italic">
                  {schedule.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {sortedSchedules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No scheduled services at this time.</p>
        </div>
      )}

      <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">Location</h3>
        <div className="flex items-start gap-2 text-gray-700">
          <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium">Slovenian Society</p>
            <p className="text-sm">5762 Sprott St, Burnaby, BC</p>
          </div>
        </div>
      </div>
    </div>
  );
}
