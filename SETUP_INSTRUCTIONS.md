# Quick Setup Instructions

Follow these steps to get your church website up and running!

## Step 1: Install Dependencies

```bash
cd g:\church
npm install
```

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project (give it a name like "church-website")
3. Wait for the project to be created (takes ~2 minutes)
4. Go to **SQL Editor** (left sidebar)
5. Click **New Query**
6. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
7. Paste into the SQL editor and click **Run**
8. Go to **Project Settings** > **API**
9. Copy the following values:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key

## Step 3: Configure Environment Variables

1. Open `.env.local` file in the project root
2. Replace these values with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
   ```

## Step 4: Set Up Email (Resend)

1. Go to [resend.com](https://resend.com) and create a free account
2. Click **API Keys** and create a new API key
3. Add the API key to `.env.local`:
   ```env
   RESEND_API_KEY=re_...your-api-key
   ```
4. Update the pastor email:
   ```env
   PASTOR_EMAIL=your-pastor-email@example.com
   ```

**Note:** For domain verification, you'll need to add DNS records. You can use a default Resend sender for testing.

## Step 5: Create Admin User

1. Go to your Supabase project
2. Click **Authentication** in the left sidebar
3. Click **Users** tab
4. Click **Add User** > **Create new user**
5. Enter email and password for admin access
6. Click **Create User**
7. Check the email inbox and verify the email address

## Step 6: Add Background Music

1. Find a peaceful worship instrumental music file (MP3 format)
2. Rename it to `background.mp3`
3. Place it in the `public/music/` folder

**Tip:** You can download royalty-free worship music from sites like:
- YouTube Audio Library
- Free Music Archive
- Incompetech

## Step 7: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website!

## Step 8: Test Everything

### Test Public Features:
1. Visit the landing page - music should play
2. Click "Enter" to go to About page
3. Test each tab (Schedule, Special Events, Prayer Request, Gallery)
4. Submit a test prayer request

### Test Admin Panel:
1. Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
2. Log in with the admin credentials you created
3. Test creating a schedule entry
4. Test creating a special event
5. Check that your test prayer request appears in Appointments

## Step 9: Customize Content

### Update Church Information:
1. Edit `app/page.tsx` - Update church name and scripture verse
2. Edit `app/about/page.tsx` - Update "Welcome to our community" description
3. Edit `components/tabs/ScheduleTab.tsx` - Update location address

### Update Gallery:
1. The gallery currently displays your 10 existing photos
2. To change titles/descriptions, edit `components/tabs/GalleryTab.tsx`
3. Look for the `galleryImages` array and update the text

## Step 10: Deploy to Production

### Option A: Deploy to Vercel (Recommended)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial church website"
   git push
   ```

2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Add New** > **Project**
4. Import your church repository
5. Add all environment variables from `.env.local`
6. Click **Deploy**
7. Once deployed, add your custom domain: `riversoflivingwaterchurch.org`

### Option B: Deploy to Other Platforms

The website can also be deployed to:
- Netlify
- Cloudflare Pages
- AWS Amplify
- Your own server

## Common Issues

### Music doesn't play automatically
- This is browser behavior (autoplay restrictions)
- Users can click the music button to start playback
- Consider this expected behavior

### Images don't load
- Check that image files are in `public/images/`
- Check file names match exactly in the code

### Can't log in to admin
- Verify email is confirmed in Supabase
- Check that environment variables are set correctly
- Try resetting password in Supabase Dashboard

### Appointment emails not sending
- Verify Resend API key is correct
- Check pastor email address is set
- For domain verification, add DNS records in Resend dashboard

## Need Help?

- Check `README_CHURCH.md` for detailed documentation
- Check Supabase logs for database errors
- Check browser console for JavaScript errors
- Check Next.js terminal output for server errors

## Next Steps

1. Add more photos to the gallery
2. Create your weekly schedules in the admin panel
3. Add upcoming special events
4. Test the prayer request form
5. Share the website with your church community!

Congratulations! Your church website is ready! 🎉
