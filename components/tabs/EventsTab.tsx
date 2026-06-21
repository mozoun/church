'use client';

import { useEffect, useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import Image from 'next/image';
import FadeIn from '@/components/animations/FadeIn';

interface SpecialEvent {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string | null;
  location: string | null;
  imageUrl: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function EventsTab() {
  const [events, setEvents] = useState<SpecialEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    try {
      const response = await fetch('/api/events');
      if (!response.ok) throw new Error('Failed to fetch events');
      let data = await response.json();
      // Filter future events on client side
      const today = new Date().toISOString().split('T')[0];
      data = data.filter((event: SpecialEvent) => event.eventDate >= today);
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
      <FadeIn>
        <div className="flex items-center gap-3 mb-8">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-3xl font-bold" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#4C1D95'}}>
              Special Events
            </h2>
            <p style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#6B21A8'}}>
              Upcoming celebrations and gatherings
            </p>
          </div>
        </div>
      </FadeIn>

      <div className="space-y-8">
        {events.map((event, index) => (
          <FadeIn key={event.id} delay={0.2 + (index * 0.1)} direction="up">
            <div className="bg-gradient-to-br from-purple-50 via-white to-violet-50 rounded-2xl overflow-hidden border border-purple-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01]"
            >
            <div className="grid md:grid-cols-3 gap-6">
              {/* Event Image */}
              {event.imageUrl && (
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Event Details */}
              <div className={`p-6 ${event.imageUrl ? 'md:col-span-2' : 'md:col-span-3'}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">{formatDate(event.eventDate)}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <span>
                      {event.startTime}
                      {event.endTime && ` - ${event.endTime}`}
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
          </FadeIn>
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
