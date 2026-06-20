'use client';

import { useEffect, useState } from 'react';
import { supabase, type SpecialEvent } from '@/lib/supabase';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function EventsTab() {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const { data, error } = await supabase
        .from('special_events')
        .select('*')
        .eq('is_published', true)
        .gte('event_date', new Date().toISOString().split('T')[0])
        .order('event_date', { ascending: true });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-8 h-8 text-purple-600" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Special Events</h2>
          <p className="text-gray-600">Upcoming celebrations and gatherings</p>
        </div>
      </div>

      <div className="space-y-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-2xl overflow-hidden border border-purple-100 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Event Image */}
              {event.image_url && (
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Event Details */}
              <div className={`p-6 ${event.image_url ? 'md:col-span-2' : 'md:col-span-3'}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{formatDate(event.event_date)}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>
                      {event.start_time}
                      {event.end_time && ` - ${event.end_time}`}
                    </span>
                  </div>

                  {event.location && (
                    <div className="flex items-start gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-purple-600 mt-1" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No upcoming special events at this time.</p>
          <p className="text-sm text-gray-400 mt-2">Check back soon for announcements!</p>
        </div>
      )}
    </div>
  );
}
