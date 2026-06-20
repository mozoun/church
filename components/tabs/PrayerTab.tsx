'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Send, CheckCircle } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import toast, { Toaster } from 'react-hot-toast';

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
      // Insert appointment into database
      const { error: dbError } = await supabase.from('appointments').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          preferred_date: formData.preferred_date.toISOString().split('T')[0],
          preferred_time: formData.preferred_time,
          message: formData.message,
          status: 'pending',
        },
      ]);

      if (dbError) throw dbError;

      // Send email notification to pastor
      const emailResponse = await fetch('/api/send-appointment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!emailResponse.ok) {
        console.error('Email notification failed');
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
      <div className="text-center py-12">
        <Toaster position="top-center" />
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Received!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your prayer request. Our pastor will contact you soon.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-center" />
      <div className="flex items-center gap-3 mb-8">
        <Heart className="w-8 h-8 text-red-500" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Prayer Request</h2>
          <p className="text-gray-600">Schedule a time to meet with our pastor</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 mb-8 border border-red-100">
        <p className="text-gray-700 leading-relaxed">
          We believe in the power of prayer. If you need pastoral guidance, prayer support, or just someone to talk to,
          please fill out this form and our pastor will reach out to schedule a time to meet with you.
        </p>
      </div>

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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
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
        </button>
      </form>
    </div>
  );
}
