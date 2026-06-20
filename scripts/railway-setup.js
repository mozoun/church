#!/usr/bin/env node

/**
 * Railway Database Setup Script
 *
 * This script:
 * 1. Runs Prisma migrations
 * 2. Creates the admin user
 *
 * Run with: railway run node scripts/railway-setup.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function runMigrations() {
  console.log('📦 Running database migrations...');
  const { execSync } = require('child_process');

  try {
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    console.log('✅ Migrations completed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    return false;
  }
}

async function createAdminUser() {
  console.log('\n👤 Creating admin user...');

  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { email: 'admin@riversoflivingwaterchurch.org' }
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists. Skipping creation.');
      return true;
    }

    // Create new admin
    const hashedPassword = await bcrypt.hash('Amir1355', 12);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@riversoflivingwaterchurch.org',
        password: hashedPassword,
        name: 'Admin',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('   Email:', admin.email);
    console.log('   Password: Amir1355');
    return true;
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Railway Database Setup...\n');

  try {
    // Step 1: Run migrations
    const migrationsSuccess = await runMigrations();
    if (!migrationsSuccess) {
      throw new Error('Migrations failed');
    }

    // Step 2: Create admin user
    const adminSuccess = await createAdminUser();
    if (!adminSuccess) {
      throw new Error('Admin user creation failed');
    }

    console.log('\n✨ Setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Visit your Railway deployment URL');
    console.log('2. Go to /admin to login');
    console.log('3. Use: admin@riversoflivingwaterchurch.org / Amir1355');

  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
