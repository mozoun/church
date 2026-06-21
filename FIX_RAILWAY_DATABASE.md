# Fix Railway Database - Quick Guide

Your website is deployed but the database isn't set up yet. Follow these simple steps to fix it!

## ⚡ Quick Fix (2 Methods)

### **Method 1: Using Railway CLI** (Recommended - Fastest)

1. **Open Terminal/Command Prompt** in your project folder

2. **Login to Railway:**
   ```bash
   npx @railway/cli login
   ```

3. **Link to your project:**
   ```bash
   npx @railway/cli link 3badc57d-833c-4ad8-a3ab-832997896bdf
   ```

4. **Run the setup script:**
   ```bash
   npx @railway/cli run node scripts/complete-setup.js
   ```

5. **Done!** Visit your website: https://church-production-5253.up.railway.app

---

### **Method 2: Using Railway Dashboard**

If you prefer to use the web interface:

1. **Go to Railway Dashboard:**
   - Visit: https://railway.app/project/3badc57d-833c-4ad8-a3ab-832997896bdf

2. **Open the Shell:**
   - Click on your service (church)
   - Go to "Settings" tab
   - Scroll to "Deploy" section
   - Click "Shell" or "Terminal"

3. **Run these commands one by one:**
   ```bash
   npx prisma db push --accept-data-loss
   node scripts/complete-setup.js
   ```

4. **Done!** Your database is now ready!

---

## ✅ What This Does

The setup script will:
- ✅ Create all database tables (schedules, events, appointments, gallery, admins)
- ✅ Add 3 sample weekly schedules (Sunday, Wednesday, Friday)
- ✅ Add 1 special event (11th Anniversary - July 12, 2026)
- ✅ Create admin user

---

## 🔐 Admin Login Info

After setup completes:

**URL:** https://church-production-5253.up.railway.app/admin

**Email:** admin@riversoflivingwaterchurch.org

**Password:** Amir1355

---

## 🎯 Verify It Worked

1. **Visit your website:** https://church-production-5253.up.railway.app

2. **Click "Enter"** to go to the About page

3. **You should now see:**
   - ✅ Schedule Tab: 3 weekly services
   - ✅ Special Events Tab: Anniversary celebration
   - ✅ Prayer Request Form: Working
   - ✅ Gallery: 10 church photos

4. **Test Admin Panel:**
   - Go to `/admin`
   - Login with the credentials above
   - You should see the dashboard with all management tabs

---

## ❓ Troubleshooting

### Problem: "DATABASE_URL not found"

**Solution:** Check environment variables in Railway:
1. Go to your Railway project
2. Click on your service
3. Go to "Variables" tab
4. Make sure `DATABASE_URL` exists (should be auto-set by PostgreSQL)

### Problem: "Command not found"

**Solution:** Make sure you're in the correct directory:
```bash
cd g:\church
```

### Problem: Script fails halfway

**Solution:** It's safe to run again! The script checks for existing data and won't duplicate anything.

---

## 🚀 After Setup

Once complete, your website will be fully functional with:
- Beautiful landing page
- Complete About page with all features
- Working admin panel
- Sample data to get started

You can then:
1. Login to admin panel
2. Edit the sample schedules
3. Add more events
4. View prayer requests as they come in
5. Manage your gallery

---

## 📞 Need Help?

If you run into issues:
1. Check Railway logs: Go to your service → "Deployments" → Click latest → "View Logs"
2. Make sure PostgreSQL database is added to your project
3. Verify DATABASE_URL is set in environment variables

---

**Ready? Pick a method above and let's get your website working!** 🎉
