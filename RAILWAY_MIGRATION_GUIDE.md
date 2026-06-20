# Railway Migration - What Changed

Complete summary of the Supabase → Railway/Prisma conversion.

## What's Been Updated

### ✅ Completed Changes

1. **Prisma Schema** (`prisma/schema.prisma`)
   - Replaces Supabase PostgreSQL client
   - Same database tables (schedules, events, appointments, gallery_images, admins)
   - Auto-migrations with Prisma

2. **Database Client** (`lib/db.ts`)
   - New Prisma database connection
   - Replaces old `lib/supabase.ts`

3. **Authentication** (`lib/auth.ts`)
   - New `iron-session` based auth (replaces Supabase Auth)
   - Password hashing with `bcryptjs`
   - Session management

4. **API Routes Created**
   - `POST /api/auth/login` - Admin login
   - `POST /api/auth/logout` - Admin logout
   - `GET /api/auth/session` - Check session
   - `GET /api/schedules` - Fetch schedules
   - `POST /api/schedules` - Create schedule
   - `GET /api/events` - Fetch events
   - `POST /api/events` - Create event
   - `GET /api/appointments` - Fetch appointments (admin only)
   - `POST /api/appointments` - Create appointment

5. **Admin Login** (`app/admin/page.tsx`)
   - Updated to use new `/api/auth/login`
   - Removed Supabase client

## Components That Still Need Updates

These components still reference the old `supabase` client:

### ScheduleTab (`components/tabs/ScheduleTab.tsx`)
**Current:** Uses `supabase.from('schedules').select()`
**Change to:**
```typescript
const fetchSchedules = async () => {
  try {
    const response = await fetch('/api/schedules');
    const schedules = await response.json();
    setSchedules(schedules);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### EventsTab (`components/tabs/EventsTab.tsx`)
**Current:** Uses `supabase.from('special_events').select()`
**Change to:**
```typescript
const fetchEvents = async () => {
  try {
    const response = await fetch('/api/events');
    const events = await response.json();
    setEvents(events);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### PrayerTab (`components/tabs/PrayerTab.tsx`)
**Status:** ✅ Already updated! Uses API routes.

### Admin Dashboard Components
**ManageSchedules:** Update to use `/api/schedules` and `/api/schedules/[id]`
**ManageEvents:** Update to use `/api/events` and `/api/events/[id]`
**ViewAppointments:** Update to use `/api/appointments`

## Environment Variables

### Old (Supabase)
```env
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### New (Railway)
```env
DATABASE_URL=postgresql://postgres:password@host:port/railway
SESSION_SECRET=your-secret-key
RESEND_API_KEY=your-resend-key
PASTOR_EMAIL=pastor@...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Database Setup

### Local Testing (Optional)

For testing locally without Railway:

1. **Install PostgreSQL locally** (or use Docker)

2. **Create .env.local:**
   ```env
   DATABASE_URL=postgresql://postgres:password@localhost:5432/church
   SESSION_SECRET=dev-secret-key
   RESEND_API_KEY=your-key
   PASTOR_EMAIL=pastor@...
   ```

3. **Run Prisma migrations:**
   ```bash
   npx prisma migrate dev --name init
   ```

4. **Create admin user:**
   ```bash
   node scripts/create-admin.js
   ```

### Production (Railway)

1. Create Railway PostgreSQL database
2. Get DATABASE_URL from Railway dashboard
3. Add to Railway environment variables
4. Push code to GitHub
5. Deploy via Railway
6. Run migrations on deployed database

## File Structure Changes

### New Files Added
```
app/
├── api/
│   ├── auth/
│   │   ├── login/route.ts ✨
│   │   ├── logout/route.ts ✨
│   │   └── session/route.ts ✨
│   ├── schedules/route.ts ✨
│   ├── events/route.ts ✨
│   └── appointments/route.ts ✨

lib/
├── db.ts ✨ (new Prisma client)
├── auth.ts ✨ (new auth system)
└── supabase.ts (deprecated - can remove)

prisma/
├── schema.prisma ✨ (new schema)
└── migrations/ ✨ (auto-generated)
```

### Modified Files
- `.env.local` - New variables
- `app/admin/page.tsx` - New login logic
- `prisma.config.ts` - New Prisma config
- `package.json` - New dependencies

## Migration Checklist

- [x] Install Prisma and dependencies
- [x] Create Prisma schema
- [x] Create database client
- [x] Create auth system
- [x] Create API routes (basic)
- [ ] Update ScheduleTab component
- [ ] Update EventsTab component
- [ ] Create additional API routes for CRUD operations
- [ ] Update admin dashboard components
- [ ] Create seed script for sample data
- [ ] Test locally with Railway PostgreSQL
- [ ] Deploy to Railway
- [ ] Test production

## Next Steps

### Option 1: Complete Migration Now (Recommended)
Follow the component updates above and we'll have a fully working Railway setup.

### Option 2: Keep Using with Old Components
The gallery, landing, and prayer request tabs will still work because:
- Gallery uses static images
- Landing page has no database calls
- Prayer request form now uses the new API routes

The old components will fail when they try to use the Supabase client, but we can fix them as needed.

## Breaking Changes

### For Component Developers

**Old Pattern (Supabase):**
```typescript
const { data, error } = await supabase
  .from('table')
  .select()
  .eq('id', id);
```

**New Pattern (API Routes):**
```typescript
const response = await fetch('/api/endpoint');
const data = await response.json();
```

**Auth Check (Old):**
```typescript
const { data: { user } } = await supabase.auth.getUser();
```

**Auth Check (New):**
```typescript
const response = await fetch('/api/auth/session');
const { isLoggedIn } = await response.json();
```

## Rollback

To go back to Supabase (if needed):
1. Revert `.env.local` to use Supabase credentials
2. Revert components to use `lib/supabase.ts`
3. Keep the old code in git history

But we recommend staying with Railway + Prisma - it's simpler and more cost-effective!

## Questions?

Check:
- `RAILWAY_DEPLOYMENT.md` - Full deployment guide
- `README_CHURCH.md` - General architecture
- Prisma docs: https://www.prisma.io/docs/

---

**Status:** Migration in progress - 60% complete ✅

Components remaining: Schedule, Events, Admin CRUD operations.
