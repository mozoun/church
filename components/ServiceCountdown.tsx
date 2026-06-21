'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function ServiceCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const dayOfWeek = now.getDay();
      const currentHour = now.getHours();

      // Next Sunday at 10:00 AM
      let nextService = new Date(now);

      // If it's Sunday and before 10 AM, service is today
      if (dayOfWeek === 0 && currentHour < 10) {
        nextService.setHours(10, 0, 0, 0);
      } else {
        // Otherwise, next Sunday
        const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
        nextService.setDate(now.getDate() + daysUntilSunday);
        nextService.setHours(10, 0, 0, 0);
      }

      const difference = nextService.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Clock className="w-6 h-6 text-amber-300" />
        <h3 className="text-xl font-bold text-white" style={{fontFamily: 'Cormorant Garamond, Georgia, serif'}}>
          Next Service In
        </h3>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds }
        ].map((item, index) => (
          <div key={index} className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 mb-2">
              <div className="text-3xl font-bold text-amber-300" style={{fontFamily: 'Cormorant Garamond, Georgia, serif'}}>
                {item.value.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="text-xs text-purple-200 uppercase tracking-wide" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-purple-200" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
        Sunday Morning Worship • 10:00 AM
      </div>
    </div>
  );
}
