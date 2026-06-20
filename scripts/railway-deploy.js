#!/usr/bin/env node

/**
 * Complete Railway Deployment Script
 * Run with: node scripts/railway-deploy.js
 */

const { execSync } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

function runCommand(command, description) {
  console.log(`\n📦 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} - Done!`);
    return true;
  } catch (error) {
    console.error(`❌ ${description} - Failed!`);
    return false;
  }
}

async function createAdmin() {
  console.log('\n👤 Creating admin user...');
  const prisma = new PrismaClient();

  try {
    const existing = await prisma.admin.findUnique({
      where: { email: 'admin@riversoflivingwaterchurch.org' }
    });

    if (existing) {
      console.log('⚠️  Admin user already exists - skipping');
      await prisma.$disconnect();
      return true;
    }

    const hashedPassword = await bcrypt.hash('Amir1355', 12);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@riversoflivingwaterchurch.org',
        password: hashedPassword,
        name: 'Admin',
      },
    });

    console.log('✅ Admin user created!');
    console.log(`   Email: ${admin.email}`);
    console.log('   Password: Amir1355');
    await prisma.$disconnect();
    return true;
  } catch (error) {
    console.error('❌ Failed to create admin:', error.message);
    await prisma.$disconnect();
    return false;
  }
}

async function main() {
  console.log('\n🚀 Starting Complete Railway Deployment\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  // Check if in Railway environment
  const isRailway = process.env.RAILWAY_ENVIRONMENT;

  if (!isRailway) {
    console.log('\n⚠️  This script must be run via Railway CLI');
    console.log('   Use: railway run node scripts/railway-deploy.js');
    process.exit(1);
  }

  let success = true;

  // Step 1: Generate Prisma Client
  success = runCommand('npx prisma generate', 'Generating Prisma Client') && success;

  // Step 2: Run migrations
  success = runCommand('npx prisma migrate deploy', 'Running database migrations') && success;

  // Step 3: Create admin user
  success = await createAdmin() && success;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (success) {
    console.log('\n✨ Deployment Complete! ✨\n');
    console.log('📋 What\'s Ready:');
    console.log('   ✅ Database tables created');
    console.log('   ✅ Admin user configured');
    console.log('\n🔐 Admin Login:');
    console.log('   Email: admin@riversoflivingwaterchurch.org');
    console.log('   Password: Amir1355');
    console.log('\n🌐 Next Steps:');
    console.log('   1. Get your Railway URL from the dashboard');
    console.log('   2. Visit yoururl.railway.app/admin');
    console.log('   3. Login with credentials above');
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } else {
    console.log('\n❌ Deployment had errors\n');
    console.log('Check the errors above and try again.');
    console.log('For help, run: railway logs\n');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('\n💥 Unexpected error:', error);
  process.exit(1);
});
