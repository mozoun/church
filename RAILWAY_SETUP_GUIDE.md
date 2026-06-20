# Railway Setup Guide - Quick Start

## Step 1: Link Your Project (You're here now!)

In your Railway CLI, select the church project from the list:
- Use arrow keys to navigate
- Press Enter to select
- It's likely one of: caring-benevolence, vigilant-wonder, etc.

## Step 2: Run the Automated Setup

After linking, run this single command to set up everything:

```bash
railway run node scripts/railway-setup.js
```

This will:
- ✅ Run all database migrations
- ✅ Create admin user (admin@riversoflivingwaterchurch.org / Amir1355)

## Step 3: Verify Environment Variables

Check Railway dashboard Variables tab has:
- `DATABASE_URL` (should be auto-set by Railway PostgreSQL)
- `SESSION_SECRET`: `b54ffc519c28c11a7b4c30b27451667003620d110ea08e0ee770dcbe4a43ad50`
- `RESEND_API_KEY`: `re_4gCBj7zt_HXneQwcXoLSAf41f5FkmzgAj`
- `PASTOR_EMAIL`: `pastor@riversoflivingwaterchurch.org`
- `NODE_ENV`: `production`
- `NEXT_PUBLIC_SITE_URL`: (your Railway URL, e.g., https://yourapp.up.railway.app)

## Step 4: Test Your Website

1. Visit your Railway deployment URL
2. Test the landing page and all tabs
3. Login to admin at `/admin` with:
   - Email: admin@riversoflivingwaterchurch.org
   - Password: Amir1355

## Troubleshooting

If setup script fails, you can run commands manually:

```bash
# Run migrations
railway run npx prisma migrate deploy

# Create admin (if needed)
railway run node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

(async () => {
  const hashedPassword = await bcrypt.hash('Amir1355', 12);
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@riversoflivingwaterchurch.org',
      password: hashedPassword,
      name: 'Admin',
    },
  });
  console.log('Admin created:', admin.email);
  await prisma.\$disconnect();
})();
"
```

## Need Help?

Check Railway logs:
```bash
railway logs
```

View deployment status:
```bash
railway status
```
