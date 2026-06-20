# Railway Deployment Guide

Complete setup for deploying your church website to Railway with PostgreSQL.

## Step 1: Set Up Railway PostgreSQL Database

1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Create a new project
4. Click **"+ Create"** and select **"Database"**
5. Choose **"PostgreSQL"**
6. Wait for the database to spin up (2-3 minutes)
7. Go to the PostgreSQL instance and click **"Connect"**
8. Copy the **DATABASE_URL** - it looks like:
   ```
   postgresql://postgres:PASSWORD@HOST:PORT/railway
   ```

## Step 2: Update Environment Variables

### Locally (for testing):
Add to `.env.local`:
```env
DATABASE_URL=postgresql://postgres:PASSWORD@HOST:PORT/railway
SESSION_SECRET=generate-a-random-secret-here
RESEND_API_KEY=your_resend_api_key
PASTOR_EMAIL=pastor@riversoflivingwaterchurch.org
NEXT_PUBLIC_SITE_URL=https://your-domain.railway.app
```

To generate a good SESSION_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Run Prisma Migrations

Create and apply the database schema:

```bash
# Generate Prisma Client
npx prisma generate

# Create migration
npx prisma migrate dev --name init

# This will:
# 1. Create the database tables
# 2. Seed sample data (optional)
```

## Step 4: Create Admin User

```bash
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('your-admin-password', 12);
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@riversoflivingwaterchurch.org',
      password: hashedPassword,
      name: 'Admin',
    },
  });
  console.log('Admin created:', admin.email);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
"
```

Or create manually in Railway dashboard using psql.

## Step 5: Push to GitHub

```bash
cd g:\church
git add .
git commit -m "Convert to Railway PostgreSQL"
git push origin main
```

## Step 6: Deploy to Railway

### Option A: Connect GitHub (Recommended)

1. In Railway dashboard, click **"+ Create"** → **"GitHub Repo"**
2. Select your church repository
3. Railway will auto-detect it's a Next.js project
4. Configure variables:
   - Click **"Variables"** tab
   - Add all from `.env.local`:
     ```
     DATABASE_URL=postgresql://...
     SESSION_SECRET=your-secret
     RESEND_API_KEY=your-key
     PASTOR_EMAIL=pastor@...
     NEXT_PUBLIC_SITE_URL=https://your-app.railway.app
     NODE_ENV=production
     ```
5. Click **"Deploy"**

### Option B: CLI Deploy

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Set variables
railway variables set DATABASE_URL="postgresql://..."
railway variables set SESSION_SECRET="..."
railway variables set RESEND_API_KEY="..."
railway variables set PASTOR_EMAIL="..."

# Deploy
railway up
```

## Step 7: Configure Custom Domain

1. In Railway project dashboard
2. Click **"Settings"** → **"Domains"**
3. Add your domain: `riversoflivingwaterchurch.org`
4. Update DNS records:
   - Type: CNAME
   - Name: `www` (or root @)
   - Value: Railway's domain (provided in UI)
5. Wait 5-10 minutes for DNS to propagate

## Step 8: Test Your Deployment

1. Visit your domain: `https://riversoflivingwaterchurch.org`
2. Test landing page
3. Test all tabs
4. Test admin login at `/admin`
5. Create test appointment
6. Check if email was sent (Resend requires domain verification for production)

## Step 9: Set Up Email Domain (Optional but Recommended)

For Resend emails to show "from" your domain:

### In Resend Dashboard:
1. Go to **"Domains"**
2. Add `noreply@riversoflivingwaterchurch.org`
3. Add DNS records as instructed
4. Verify domain
5. Update `RESEND_FROM` in Railway variables

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
npx prisma db execute --stdin < test.sql

# Check migrations
npx prisma migrate status

# Reset database (CAUTION - deletes all data)
npx prisma migrate reset
```

### Deployment Logs
```bash
# View Railway logs
railway logs

# Tail logs in real-time
railway logs --follow
```

### Common Issues

**"Connection timeout"**
- Check DATABASE_URL is correct
- Verify Railway PostgreSQL is running
- Check firewall/network settings

**"Prisma Client generation failed"**
- Run `npx prisma generate` locally
- Commit generated files
- Push to GitHub

**"Admin login not working"**
- Create admin user: use script above
- Check SESSION_SECRET is set
- Verify database has admins table

**"Emails not sending"**
- Check RESEND_API_KEY is valid
- Verify PASTOR_EMAIL is set
- Check Resend dashboard for errors
- Domain verification needed for production

## Database Management

### Connect to Database Remotely
```bash
psql postgresql://postgres:PASSWORD@HOST:PORT/railway
```

Or use Railway dashboard SQL editor.

### View Data
```sql
SELECT * FROM admins;
SELECT * FROM schedules;
SELECT * FROM appointments;
SELECT * FROM special_events;
```

### Create Sample Data
```sql
INSERT INTO schedules (day_of_week, service_name, start_time, end_time, description, is_active)
VALUES ('Sunday', 'Morning Worship', '10:00', '12:00', 'Main worship service', true);

INSERT INTO special_events (title, description, event_date, start_time, location, is_published)
VALUES ('Church Anniversary', '11th Year Celebration', '2026-07-12', '11:00', 'Slovenian Society', true);
```

## Monitoring & Maintenance

### Check Deployment Status
- Visit Railway dashboard
- Green status = all good
- Red status = check logs

### Database Backups
Railway automatically backs up:
- Daily
- Stored for 7 days (free tier)
- Access in Railway > PostgreSQL > Backups

### Monitor Metrics
- Railway dashboard shows:
  - CPU usage
  - Memory usage
  - Requests/sec
  - Response time

## Scaling

As your church grows:

**Free Tier Limits:**
- Database: 5GB storage
- Deployment: Shared CPU
- Bandwidth: Unlimited

**Upgrade when needed:**
1. Click **"Upgrade"** in Railway dashboard
2. Choose plan (CPU, RAM, storage)
3. Instant upgrade - no downtime!

## Production Checklist

- [ ] Database created and connected
- [ ] All environment variables set
- [ ] Admin user created
- [ ] Prisma migrations applied
- [ ] Site deployed and running
- [ ] Custom domain configured
- [ ] SSL/HTTPS working
- [ ] Admin login works
- [ ] Create test schedule/event
- [ ] Test prayer request form
- [ ] Resend API working
- [ ] Background music playing
- [ ] All photos display
- [ ] Mobile responsive tested

## Support

**Railway Docs:** https://railway.app/docs
**Prisma Docs:** https://www.prisma.io/docs/
**Resend Docs:** https://resend.com/docs

---

Your church website is now live on Railway! 🚀⛪
