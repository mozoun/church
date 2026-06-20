# Rivers of Living Waters Ministry Website

A modern, beautiful church website built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

## Features

### Public Features
- **Landing Page**: Beautiful welcome page with background music and church branding
- **About Page**: Church introduction with tabbed navigation
- **Weekly Schedule**: Display of regular worship services and meetings
- **Special Events**: Upcoming church events and celebrations
- **Prayer Request**: Online appointment booking form with date/time selection
- **Photo Gallery**: Interactive gallery with lightbox viewer
- **Background Music**: Peaceful worship music throughout the site

### Admin Features
- **Secure Login**: Authentication via Supabase Auth
- **Schedule Management**: Create, edit, and delete weekly service schedules
- **Event Management**: Manage special events with full CRUD operations
- **Appointment Viewing**: View and manage prayer request appointments
- **Gallery Management**: Instructions for managing church photos

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Email**: Resend API
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A Resend account for email notifications (free tier works)

### 1. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Email Configuration (Resend)
RESEND_API_KEY=your_resend_api_key_here
PASTOR_EMAIL=pastor@riversoflivingwaterchurch.org

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the migration file: `supabase/migrations/001_initial_schema.sql`
3. Go to Project Settings > API to get your URL and keys
4. Copy the URL and keys to `.env.local`

### 3. Create Admin User

In Supabase SQL Editor, run:

```sql
-- Create admin user via Supabase Dashboard:
-- Go to Authentication > Users > Invite User
-- Or sign up through the admin login page and verify email
```

### 4. Resend Setup (Email Notifications)

1. Create account at [resend.com](https://resend.com)
2. Add and verify your domain `riversoflivingwaterchurch.org`
3. Create an API key
4. Add the API key to `.env.local`

### 5. Background Music

Place your background worship music file in `public/music/background.mp3`

Recommended specs:
- Format: MP3
- Duration: 3-5 minutes (loops automatically)
- Bitrate: 128-192 kbps
- Volume: Pre-normalized to prevent sudden loudness

### 6. Install Dependencies & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
church/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── about/page.tsx           # Main website (About page)
│   ├── admin/
│   │   ├── page.tsx             # Admin login
│   │   └── dashboard/page.tsx   # Admin dashboard
│   ├── api/
│   │   └── send-appointment-email/route.ts  # Email API
│   └── globals.css              # Global styles
├── components/
│   ├── MusicPlayer.tsx          # Background music player
│   ├── tabs/                    # Public-facing tab components
│   │   ├── ScheduleTab.tsx
│   │   ├── EventsTab.tsx
│   │   ├── PrayerTab.tsx
│   │   └── GalleryTab.tsx
│   └── admin/                   # Admin components
│       ├── ManageSchedules.tsx
│       ├── ManageEvents.tsx
│       ├── ManageGallery.tsx
│       └── ViewAppointments.tsx
├── lib/
│   └── supabase.ts              # Supabase client & types
├── public/
│   ├── images/                  # Church photos (10 images)
│   └── music/                   # Background music
└── supabase/
    └── migrations/              # Database schema
        └── 001_initial_schema.sql
```

## Usage Guide

### For Website Visitors

1. **Landing Page**: Click "Enter" to visit the main website
2. **Navigation**: Use tabs to explore Schedule, Events, Prayer Request, and Gallery
3. **Prayer Request**: Fill out the form to schedule an appointment with the pastor
4. **Music Control**: Use the music button (bottom-right) to mute/unmute

### For Administrators

1. **Login**: Navigate to `/admin` and sign in with your credentials
2. **Manage Schedules**: Add/edit weekly service times
3. **Manage Events**: Create special events with details
4. **View Appointments**: See all prayer requests and mark them as confirmed/cancelled
5. **Gallery**: Follow instructions to add/remove photos

## Database Tables

### schedules
- Weekly church service schedule
- Fields: day_of_week, service_name, start_time, end_time, description, is_active

### special_events
- Upcoming special events
- Fields: title, description, event_date, start_time, end_time, location, image_url, is_published

### appointments
- Prayer request appointments
- Fields: name, email, subject, preferred_date, preferred_time, message, status

### gallery_images
- Gallery photos metadata (currently using static files from public/images)

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

### Domain Setup

1. Add your custom domain in Vercel settings: `riversoflivingwaterchurch.org`
2. Update DNS records as instructed by Vercel
3. Update `NEXT_PUBLIC_SITE_URL` in production environment variables

### Post-Deployment

1. Update Resend domain verification
2. Create admin user in Supabase
3. Upload background music file
4. Test all features

## Customization

### Colors & Branding

Edit `app/globals.css` and Tailwind classes to match your church branding.

### Content

- **Church Name**: Update in landing page and about page
- **Location**: Update in ScheduleTab component
- **Photos**: Replace images in `public/images/`
- **Scripture**: Update verse in landing page

## Support & Maintenance

### Adding New Photos

1. Place JPEG files in `public/images/`
2. Update the `galleryImages` array in `components/tabs/GalleryTab.tsx`
3. Add title and description for each photo

### Email Template

Customize the email template in `app/api/send-appointment-email/route.ts`

### Troubleshooting

**Music not playing:**
- Check browser autoplay settings
- Ensure music file exists at `public/music/background.mp3`
- Check browser console for errors

**Appointments not saving:**
- Verify Supabase connection in `.env.local`
- Check Supabase table permissions
- Check browser console and network tab

**Admin can't login:**
- Verify user exists in Supabase Authentication
- Check email is verified
- Verify Supabase keys in `.env.local`

## License

© 2026 Rivers of Living Waters Ministry. All rights reserved.

## Credits

Built with Next.js, Supabase, Tailwind CSS, and love.
