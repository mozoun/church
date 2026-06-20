'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Mail, User, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

interface Appointment {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string | null;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export default function ViewAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  async function fetchAppointments() {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: 'confirmed' | 'cancelled') {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update appointment');
      toast.success(`Appointment ${status}`);
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
      toast.error('Failed to update appointment');
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };

    return (
      <span className={`text-xs px-2 py-1 rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Prayer Request Appointments</h2>

      <div className="space-y-4">
        {appointments.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No appointments yet</p>
          </div>
        )}

        {appointments.map((appointment) => (
          <div key={appointment.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  {appointment.subject}
                  {getStatusBadge(appointment.status)}
                </h4>
                <p className="text-sm text-gray-500">
                  Submitted on {new Date(appointment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{appointment.name}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${appointment.email}`} className="text-sm text-blue-600 hover:underline">
                  {appointment.email}
                </a>
              </div>

              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm">
                  {new Date(appointment.preferredDate).toLocaleDateString()} at {appointment.preferredTime}
                </span>
              </div>
            </div>

            {appointment.message && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{appointment.message}</p>
              </div>
            )}

            {appointment.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(appointment.id, 'confirmed')}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <CheckCircle className="w-4 h-4" />
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(appointment.id, 'cancelled')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
