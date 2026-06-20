@echo off
REM Complete Railway Setup Script for Windows
REM This script does everything needed to set up your church website on Railway

echo.
echo ========================================
echo    Complete Railway Setup
echo ========================================
echo.

echo Step 1: Linking to Railway project...
echo.
railway link --project caring-benevolence
if errorlevel 1 (
    echo.
    echo ERROR: Failed to link project
    echo Please run: railway link
    echo Then select 'caring-benevolence' from the list
    pause
    exit /b 1
)
echo.
echo [OK] Project linked successfully!
echo.

echo Step 2: Setting environment variables...
echo.
railway variables set RESEND_API_KEY=re_4gCBj7zt_HXneQwcXoLSAf41f5FkmzgAj
railway variables set PASTOR_EMAIL=pastor@riversoflivingwaterchurch.org
railway variables set SESSION_SECRET=b54ffc519c28c11a7b4c30b27451667003620d110ea08e0ee770dcbe4a43ad50
railway variables set NODE_ENV=production
echo.
echo [OK] Environment variables set!
echo.

echo Step 3: Running database migrations...
echo.
railway run npx prisma migrate deploy
if errorlevel 1 (
    echo.
    echo ERROR: Migration failed
    echo Check logs with: railway logs
    pause
    exit /b 1
)
echo.
echo [OK] Migrations completed!
echo.

echo Step 4: Creating admin user...
echo.
railway run node -e "const { PrismaClient } = require('@prisma/client'); const bcrypt = require('bcryptjs'); const prisma = new PrismaClient(); (async () => { try { const existing = await prisma.admin.findUnique({ where: { email: 'admin@riversoflivingwaterchurch.org' } }); if (existing) { console.log('Admin already exists'); await prisma.$disconnect(); return; } const hashedPassword = await bcrypt.hash('Amir1355', 12); const admin = await prisma.admin.create({ data: { email: 'admin@riversoflivingwaterchurch.org', password: hashedPassword, name: 'Admin' } }); console.log('Admin created:', admin.email); await prisma.$disconnect(); } catch (error) { console.error('Error:', error.message); await prisma.$disconnect(); process.exit(1); } })();"
echo.
echo [OK] Admin user ready!
echo.

echo.
echo ========================================
echo    Setup Complete!
echo ========================================
echo.
echo [OK] Project linked to Railway
echo [OK] Environment variables configured
echo [OK] Database migrations completed
echo [OK] Admin user created
echo.
echo Admin Login Credentials:
echo   Email: admin@riversoflivingwaterchurch.org
echo   Password: Amir1355
echo.
echo Next steps:
echo   1. Check deployment: railway status
echo   2. View logs: railway logs
echo   3. Visit your Railway dashboard to get your URL
echo   4. Go to /admin on your site to login
echo.
pause
