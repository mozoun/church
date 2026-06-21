# Rivers of Living Waters Church Website - Complete Information

## ✅ IMPORTANT: Your Website is Hosted on Railway
**YES - Your website will work even when your computer is OFF!**

Your website is hosted on **Railway's cloud servers**, not on your local computer. Once properly deployed, it runs 24/7 on Railway's infrastructure.

---

## Website URLs

### Main Website
- **Custom Domain:** https://riversoflivingwaterchurch.org
- **Railway URL:** https://ouve7bi3.up.railway.app

### Admin Panel
- **Login Page:** https://riversoflivingwaterchurch.org/admin
- **Dashboard:** https://riversoflivingwaterchurch.org/admin/dashboard

---

## Current Status

### ⚠️ Domain Issue (NEEDS FIX)
Your domain `riversoflivingwaterchurch.org` is currently showing **Namecheap parking page** instead of your website.

**DNS is configured correctly in Namecheap**, but you need to add the domain in Railway:

### How to Fix Domain Issue:

1. **Go to Railway Dashboard:** https://railway.app/dashboard
2. **Find your church project** (one of these):
   - caring-benevolence
   - vigilant-wonder
   - earnest-intuition
   - just-ambition
   - aware-nourishment

3. **Click on your Next.js service** (not PostgreSQL)
4. **Go to Settings → Domains**
5. **Click "Add Domain"**
6. **Enter:** `riversoflivingwaterchurch.org`
7. **Click "Add"**
8. **Repeat for:** `www.riversoflivingwaterchurch.org`

**After this, wait 5-10 minutes for DNS to propagate.**

---

## Admin Panel Access

### Creating Admin User

You need to create an admin user in Railway's PostgreSQL database:

1. **Go to Railway Dashboard:** https://railway.app/dashboard
2. **Click on your church project**
3. **Click on PostgreSQL database**
4. **Click "Query" tab**
5. **Run this SQL:**

```sql
INSERT INTO admins (id, email, password, name, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@riversoflivingwaterchurch.org',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYPNXxHxIYe',
  'Admin',
  NOW(),
  NOW()
);
```

### Admin Login Credentials
- **Email:** admin@riversoflivingwaterchurch.org
- **Password:** Admin123!

⚠️ **IMPORTANT:** Change this password after first login!

---

## What You Can Manage in Admin Panel

1. **📅 Weekly Schedules** - Add/edit Sunday services, Bible studies
2. **✨ Special Events** - Create church events, anniversaries, celebrations
3. **🖼️ Gallery** - Upload photos from church events
4. **💜 Prayer Requests** - View appointment submissions from website

---

## Contact Information on Website

### Email Addresses
- **Prayer Requests sent to:** rexoquendo@gmail.com
- **Facebook Email in Footer:** riversoflivingwatersb@gmail.com
- **Email "From" Address:** noreply@riversoflivingwaterchurch.org

### Location
- **Venue:** Slovenian Society
- **Address:** 5762 Sprott St, Burnaby, BC

---

## Website Features

### Public Pages (Main Website)
1. **Home Tab** - Welcome message, church introduction
2. **About Tab** - Church history, mission, vision
3. **Schedule Tab** - Weekly service times with countdown timer
4. **Events Tab** - Special events and celebrations
5. **Prayer Tab** - Prayer request form with appointment booking
6. **Gallery Tab** - Photo gallery with lightbox viewer

### Design Theme
- **Primary Colors:** Purple, Violet, Lavender
- **Accent Colors:** Amber, Gold
- **Fonts:**
  - Headings: Cormorant Garamond
  - Body: Crimson Pro
- **Style:** Spiritual, elegant, modern with gradients
- **Features:**
  - Background music player
  - Animated transitions
  - Bible verses on each tab
  - Responsive design (mobile-friendly)

---

## Railway Deployment

### Your Railway Account
- **Email:** mozoun@yahoo.com
- **Dashboard:** https://railway.app/dashboard

### Services Running
1. **Next.js Application** - Your website
2. **PostgreSQL Database** - Stores schedules, events, appointments, photos

### Environment Variables (Set in Railway)
```
DATABASE_URL=postgresql://... (Auto-configured by Railway)
SESSION_SECRET=your-secret
RESEND_API_KEY=your-resend-api-key
PASTOR_EMAIL=rexoquendo@gmail.com
NEXT_PUBLIC_SITE_URL=https://riversoflivingwaterchurch.org
NODE_ENV=production
```

---

## Database Schema

### Tables
1. **admins** - Admin user accounts
2. **schedules** - Weekly service schedules
3. **special_events** - Special church events
4. **appointments** - Prayer request submissions
5. **gallery_images** - Photo gallery

---

## Local Development (Optional)

If you want to make changes:

### Start Development Server
```bash
cd g:\church
npm run dev
```

Visit: http://localhost:3000

### Push Changes to Railway
```bash
git add .
git commit -m "Your change description"
git push origin main
```

Railway will automatically deploy your changes.

---

## Email Setup (Resend)

### Current Configuration
- **Service:** Resend (https://resend.com)
- **From Email:** noreply@riversoflivingwaterchurch.org
- **To Email:** rexoquendo@gmail.com
- **Use Case:** Prayer request notifications

### For Production Email (Optional)
To send from your domain:
1. Go to Resend Dashboard → Domains
2. Add `riversoflivingwaterchurch.org`
3. Add DNS records as instructed
4. Verify domain

---

## Important Files Location

### Local Computer: `g:\church\`
- **Main Website Code:** `app/`, `components/`
- **Database Schema:** `prisma/schema.prisma`
- **Images:** `public/images/`
- **Configuration:** `.env` (local), `.env.local`

### Reference Documents
- **RAILWAY_DEPLOYMENT.md** - Full deployment guide
- **WEBSITE_INFO.md** - This file
- **README.md** - Next.js documentation

---

## Troubleshooting

### Website Not Loading
1. Check Railway deployment status in dashboard
2. Check Railway logs for errors
3. Verify environment variables are set

### Admin Login Not Working
1. Verify admin user exists in database (run SQL query)
2. Check browser console for errors
3. Try different browser or incognito mode

### Domain Not Working
1. Check domain is added in Railway Settings → Domains
2. Verify DNS records in Namecheap
3. Wait for DNS propagation (up to 24 hours)

### Railway CLI Commands
```bash
# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Check status
railway status
```

---

## Next Steps

### To Make Website Live:
1. ✅ Code is saved and committed
2. ⚠️ Add custom domain in Railway (see "How to Fix Domain Issue" above)
3. ⚠️ Create admin user in Railway database (see "Creating Admin User" above)
4. ✅ Website will work 24/7 once domain is configured

### After Domain is Working:
1. Login to admin panel
2. Add your church schedules
3. Create special events
4. Upload gallery photos
5. Test prayer request form

---

## Support Resources

- **Railway Docs:** https://docs.railway.app
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Resend Docs:** https://resend.com/docs

---

## Summary

✅ **Your website is hosted on Railway cloud servers**
✅ **Your code is saved and backed up on GitHub**
✅ **Website will work 24/7 even when your computer is off**
⚠️ **You need to add custom domain in Railway dashboard**
⚠️ **You need to create admin user in Railway database**

**After these two steps, your website will be fully live!**

---

**Created:** June 21, 2026
**Website:** Rivers of Living Waters Ministry
**Location:** Burnaby, BC, Canada
