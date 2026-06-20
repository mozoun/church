'use client';

import { useState, useEffect } from 'react';
import { Edit2, Trash2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

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

export default function ManageSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    dayOfWeek: 'Sunday',
    serviceName: '',
    startTime: '',
    endTime: '',
    description: '',
    isActive: true,
  });

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
      toast.error('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (editing) {
        // Update existing
        const response = await fetch(`/api/schedules/${editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to update schedule');
        toast.success('Schedule updated successfully');
      } else {
        // Create new
        const response = await fetch('/api/schedules', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to create schedule');
        toast.success('Schedule created successfully');
      }

      resetForm();
      fetchSchedules();
    } catch (error) {
      console.error('Error saving schedule:', error);
      toast.error('Failed to save schedule');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this schedule?')) return;

    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete schedule');
      toast.success('Schedule deleted');
      fetchSchedules();
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast.error('Failed to delete schedule');
    }
  }

  function handleEdit(schedule: Schedule) {
    setEditing(schedule.id);
    setFormData({
      dayOfWeek: schedule.dayOfWeek,
      serviceName: schedule.serviceName,
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      description: schedule.description || '',
      isActive: schedule.isActive,
    });
  }

  function resetForm() {
    setEditing(null);
    setFormData({
      dayOfWeek: 'Sunday',
      serviceName: '',
      startTime: '',
      endTime: '',
      description: '',
      isActive: true,
    });
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Manage Weekly Schedule</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">
          {editing ? 'Edit Schedule' : 'Add New Schedule'}
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week</label>
            <select
              required
              value={formData.dayOfWeek}
              onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
            <input
              type="text"
              required
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Morning Worship"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <input
              type="time"
              required
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <input
              type="time"
              required
              value={formData.endTime}
              onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
            placeholder="Join us for worship..."
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Active</span>
          </label>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Save className="w-4 h-4" />
            {editing ? 'Update' : 'Create'}
          </button>
          {editing && (
            <button
              type="button"
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-4">
        {schedules.map((schedule) => (
          <div key={schedule.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-blue-600">{schedule.dayOfWeek}</span>
                {!schedule.isActive && (
                  <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded">Inactive</span>
                )}
              </div>
              <h4 className="font-semibold text-gray-900">{schedule.serviceName}</h4>
              <p className="text-sm text-gray-600">{schedule.startTime} - {schedule.endTime}</p>
              {schedule.description && (
                <p className="text-sm text-gray-500 mt-1">{schedule.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(schedule)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(schedule.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
