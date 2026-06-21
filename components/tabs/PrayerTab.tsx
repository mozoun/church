'use client';

import { useState } from 'react';
import { Heart, Send, CheckCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';
import FadeIn from '@/components/animations/FadeIn';

export default function PrayerTab() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    preferred_date: new Date(),
    preferred_time: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM',
    '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Submit appointment via API (handles both database and email)
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          preferred_date: formData.preferred_date.toISOString().split('T')[0],
          preferred_time: formData.preferred_time,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit appointment');
      }

      setSubmitted(true);
      toast.success('Prayer request submitted successfully!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        preferred_date: new Date(),
        preferred_time: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <FadeIn>
        <div className="text-center py-12">
          <Toaster position="top-center" />
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#4C1D95'}}>
            Request Received!
          </h3>
          <p className="mb-6" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#6B21A8'}}>
            Thank you for your prayer request. Our pastor will contact you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            style={{fontFamily: 'Crimson Pro, Georgia, serif'}}
          >
            Submit Another Request
          </button>
        </div>
      </FadeIn>
    );
  }

  return (
    <div>
      <Toaster position="top-center" />
      <FadeIn>
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-purple-600" />
          <div>
            <h2 className="text-3xl font-bold" style={{fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#4C1D95'}}>
              Prayer Request
            </h2>
            <p style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#6B21A8'}}>
              Schedule a time to meet with our pastor
            </p>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 mb-8 border border-purple-200">
          <p className="leading-relaxed" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#4C1D95'}}>
            We believe in the power of prayer. If you need pastoral guidance, prayer support, or just someone to talk to,
            please fill out this form and our pastor will reach out to schedule a time to meet with you.
          </p>
        </div>
      </FadeIn>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              placeholder="john@example.com"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Prayer request, counseling, etc."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date *
            </label>
            <DatePicker
              selected={formData.preferred_date}
              onChange={(date: Date | null) => setFormData({ ...formData, preferred_date: date || new Date() })}
              minDate={new Date()}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              dateFormat="MMMM d, yyyy"
            />
          </div>

          {/* Time Picker */}
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Time *
            </label>
            <select
              id="time"
              required
              value={formData.preferred_time}
              onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
              className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
            >
              <option value="">Select a time</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Share any additional details or prayer requests..."
          />
        </div>

        {/* Submit Button */}
        <FadeIn delay={0.4}>
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full md:w-auto"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold shadow-xl transform transition-all duration-300 group-hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2" style={{fontFamily: 'Crimson Pro, Georgia, serif'}}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Submit Request
                </>
              )}
            </div>
          </button>
        </FadeIn>

        {/* Bible Verse */}
        <FadeIn delay={0.5}>
          <div className="mt-8 bg-gradient-to-br from-amber-50 to-purple-50 rounded-2xl p-6 border-2 border-amber-200/50 shadow-lg">
            <div className="text-center">
              <p className="text-lg italic mb-2" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#7C3AED'}}>
                "Ask and it will be given to you; seek and you will find; knock and the door will be opened to you."
              </p>
              <p className="text-sm font-semibold" style={{fontFamily: 'Crimson Pro, Georgia, serif', color: '#A16207'}}>
                — MATTHEW 7:7
              </p>
            </div>
          </div>
        </FadeIn>
      </form>
    </div>
  );
}
