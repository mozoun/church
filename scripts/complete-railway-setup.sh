#!/bin/bash

# Complete Railway Setup Script
# This script does everything needed to set up your church website on Railway

echo "🚀 Starting Complete Railway Setup..."
echo ""

# Step 1: Link to the Railway project
echo "📦 Step 1: Linking to Railway project..."
railway link --project caring-benevolence
if [ $? -ne 0 ]; then
    echo "❌ Failed to link project. Please run: railway link"
    echo "   Then select 'caring-benevolence' from the list"
    exit 1
fi
echo "✅ Project linked successfully!"
echo ""

# Step 2: Set environment variables
echo "🔧 Step 2: Setting environment variables..."
railway variables set RESEND_API_KEY="re_4gCBj7zt_HXneQwcXoLSAf41f5FkmzgAj"
railway variables set PASTOR_EMAIL="pastor@riversoflivingwaterchurch.org"
railway variables set SESSION_SECRET="b54ffc519c28c11a7b4c30b27451667003620d110ea08e0ee770dcbe4a43ad50"
railway variables set NODE_ENV="production"
echo "✅ Environment variables set!"
echo ""

# Step 3: Run database migrations
echo "📊 Step 3: Running database migrations..."
railway run npx prisma migrate deploy
if [ $? -ne 0 ]; then
    echo "❌ Migration failed. Check Railway logs with: railway logs"
    exit 1
fi
echo "✅ Migrations completed!"
echo ""

# Step 4: Create admin user
echo "👤 Step 4: Creating admin user..."
railway run node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

(async () => {
  try {
    const existing = await prisma.admin.findUnique({
      where: { email: 'admin@riversoflivingwaterchurch.org' }
    });

    if (existing) {
      console.log('⚠️  Admin already exists');
      await prisma.\$disconnect();
      return;
    }

    const hashedPassword = await bcrypt.hash('Amir1355', 12);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@riversoflivingwaterchurch.org',
        password: hashedPassword,
        name: 'Admin',
      },
    });
    console.log('✅ Admin created:', admin.email);
    await prisma.\$disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    await prisma.\$disconnect();
    process.exit(1);
  }
})();
"
echo ""

# Step 5: Get deployment URL
echo "🌐 Step 5: Getting deployment URL..."
DEPLOYMENT_URL=$(railway status | grep -oP 'https://[^\s]+' | head -1)
if [ -z "$DEPLOYMENT_URL" ]; then
    echo "⚠️  Could not auto-detect URL. Check Railway dashboard for your deployment URL."
else
    echo "✅ Deployment URL: $DEPLOYMENT_URL"
    railway variables set NEXT_PUBLIC_SITE_URL="$DEPLOYMENT_URL"
fi
echo ""

# Final summary
echo "✨ Setup Complete! ✨"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Project linked to Railway"
echo "✅ Environment variables configured"
echo "✅ Database migrations completed"
echo "✅ Admin user created"
echo ""
echo "🔐 Admin Login Credentials:"
echo "   Email: admin@riversoflivingwaterchurch.org"
echo "   Password: Amir1355"
echo ""
if [ ! -z "$DEPLOYMENT_URL" ]; then
    echo "🌐 Your website: $DEPLOYMENT_URL"
    echo "🔑 Admin panel: $DEPLOYMENT_URL/admin"
fi
echo ""
echo "📊 View logs: railway logs"
echo "📈 View status: railway status"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
