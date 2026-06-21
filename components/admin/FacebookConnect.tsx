'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

interface Status {
  connected: boolean;
  pageName?: string;
  expiresAt?: string;
}

async function loadStatus(): Promise<Status | null> {
  try {
    const response = await fetch('/api/facebook/status');
    return await response.json();
  } catch (error) {
    console.error('Error fetching Facebook status:', error);
    return null;
  }
}

export default function FacebookConnect() {
  const [status, setStatus] = useState<Status | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    loadStatus().then((data) => {
      setStatus(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const fb = searchParams.get('fb');
    if (fb === 'connected') {
      toast.success(`Connected to Facebook Page: ${searchParams.get('fb_msg') || ''}`);
    } else if (fb === 'error') {
      toast.error(`Facebook connection failed: ${searchParams.get('fb_msg') || 'Unknown error'}`);
    }
  }, [searchParams]);

  async function disconnect() {
    if (!confirm('Disconnect this Facebook Page? New gallery uploads will stop posting to Facebook.')) return;

    try {
      const response = await fetch('/api/facebook/disconnect', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to disconnect');
      toast.success('Facebook Page disconnected');
      const data = await loadStatus();
      setStatus(data);
    } catch (error) {
      console.error('Error disconnecting Facebook:', error);
      toast.error('Failed to disconnect');
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Facebook Page Connection</h2>

      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <FacebookIcon className="w-8 h-8 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {status?.connected ? 'Connected' : 'Not Connected'}
            </h3>
            {status?.connected && (
              <p className="text-sm text-gray-600">Page: {status.pageName}</p>
            )}
          </div>
          {status?.connected ? (
            <CheckCircle className="w-6 h-6 text-green-600 ml-auto" />
          ) : (
            <XCircle className="w-6 h-6 text-gray-400 ml-auto" />
          )}
        </div>

        {status?.connected ? (
          <>
            <p className="text-gray-700 mb-4">
              New photos you upload to the Gallery will automatically be posted to your
              Facebook Page as well.
            </p>
            {status.expiresAt && (
              <p className="text-sm text-gray-500 mb-4">
                Connection valid until {new Date(status.expiresAt).toLocaleDateString()}.
                You&apos;ll need to reconnect after this date.
              </p>
            )}
            <button
              onClick={disconnect}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Disconnect
            </button>
          </>
        ) : (
          <>
            <p className="text-gray-700 mb-4">
              Connect your church&apos;s Facebook Page so that new gallery photo uploads are
              automatically posted there too. You&apos;ll be redirected to Facebook to log in
              and approve access to your Page.
            </p>
            <a
              href="/api/facebook/connect"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <FacebookIcon className="w-4 h-4" />
              Connect to Facebook
            </a>
          </>
        )}
      </div>
    </div>
  );
}
