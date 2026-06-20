import { createClient } from '@supabase/supabase-js';

// Get environment variables and validate them
const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if the values are actual URLs/keys or just placeholder text
const isValidUrl = envUrl && envUrl.startsWith('https://') && !envUrl.includes('your_supabase');
const isValidKey = envKey && envKey.startsWith('eyJ') && !envKey.includes('your_supabase');

// Use valid credentials or fallback to demo values
const supabaseUrl = isValidUrl ? envUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = isValidKey ? envKey : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDE3NjkyMDAsImV4cCI6MTk1NzM0NTIwMH0.dc6udFa8FRIdtr6Y4FLGRhDZ1gpLjBLYPoTBiCGDUzs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export type Schedule = {
  id: string;
  day_of_week: string;
  service_name: string;
  start_time: string;
  end_time: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type SpecialEvent = {
  id: string;
  title: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string | null;
  location: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Appointment = {
  id: string;
  name: string;
  email: string;
  subject: string;
  preferred_date: string;
  preferred_time: string;
  message: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  updated_at: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};
