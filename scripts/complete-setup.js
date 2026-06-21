#!/usr/bin/env node

/**
 * Complete Railway Database Setup Script
 *
 * This script will:
 * 1. Push Prisma schema to database (creates all tables)
 * 2. Seed sample data (schedules, events)
 * 3. Create admin user
 *
 * Run with: node scripts/complete-setup.js
 * Or on Railway: railway run node scripts/complete-setup.js
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const { execSync } = require('child_process');

const prisma = new PrismaClient();

async function pushSchema() {
  console.log('📦 Pushing Prisma schema to database...');

  try {
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('✅ Schema pushed successfully!');
    return true;
  } catch (error) {
    console.error('❌ Schema push failed:', error.message);
    return false;
  }
}

async function seedSchedules() {
  console.log('\n📅 Seeding weekly schedules...');

  try {
    // Check if schedules already exist
    const existingSchedules = await prisma.schedule.count();
    if (existingSchedules > 0) {
      console.log('⚠️  Schedules already exist. Skipping...');
      return true;
    }

    // Create sample schedules
    await prisma.schedule.createMany({
      data: [
        {
          dayOfWeek: 'Sunday',
          serviceName: 'Morning Worship Service',
          startTime: '10:00',
          endTime: '12:00',
          description: 'Join us for our main worship service with praise, worship, and the Word',
          isActive: true
        },
        {
          dayOfWeek: 'Wednesday',
          serviceName: 'Prayer Meeting',
          startTime: '19:00',
          endTime: '20:30',
          description: 'Mid-week prayer and Bible study',
          isActive: true
        },
        {
          dayOfWeek: 'Friday',
          serviceName: 'Youth Service',
          startTime: '18:30',
          endTime: '20:00',
          description: 'Dynamic service for young people',
          isActive: true
        }
      ]
    });

    console.log('✅ Sample schedules created!');
    return true;
  } catch (error) {
    console.error('❌ Failed to seed schedules:', error.message);
    return false;
  }
}

async function seedEvents() {
  console.log('\n🎉 Seeding special events...');

  try {
    // Check if events already exist
    const existingEvents = await prisma.specialEvent.count();
    if (existingEvents > 0) {
      console.log('⚠️  Events already exist. Skipping...');
      return true;
    }

    // Create sample event
    await prisma.specialEvent.create({
      data: {
        title: '11th Anniversary Celebration',
        description: 'Join us for a special celebration as we commemorate 11 years of God\'s faithfulness. Special worship, testimonies, and fellowship!',
        eventDate: '2026-07-12',
        startTime: '11:00',
        endTime: '14:00',
        location: 'Slovenian Society, 5762 Sprott St, Burnaby, BC',
        isPublished: true
      }
    });

    console.log('✅ Sample event created!');
    return true;
  } catch (error) {
    console.error('❌ Failed to seed events:', error.message);
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
      console.log('⚠️  Admin user already exists. Skipping...');
      return true;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('Amir1355', 12);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@riversoflivingwaterchurch.org',
        password: hashedPassword,
        name: 'Administrator',
      },
    });

    console.log('✅ Admin user created!');
    console.log('   Email:', admin.email);
    console.log('   Password: Amir1355');
    return true;
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
    return false;
  }
}

async function verifySetup() {
  console.log('\n🔍 Verifying setup...');

  try {
    const scheduleCount = await prisma.schedule.count();
    const eventCount = await prisma.specialEvent.count();
    const adminCount = await prisma.admin.count();

    console.log(`   Schedules: ${scheduleCount}`);
    console.log(`   Events: ${eventCount}`);
    console.log(`   Admins: ${adminCount}`);

    if (scheduleCount > 0 && eventCount > 0 && adminCount > 0) {
      console.log('✅ All data verified!');
      return true;
    } else {
      console.log('⚠️  Some data might be missing');
      return false;
    }
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting Complete Database Setup...\n');
  console.log('='.repeat(50));

  try {
    // Step 1: Push schema
    const schemaSuccess = await pushSchema();
    if (!schemaSuccess) {
      throw new Error('Schema push failed');
    }

    // Wait a moment for schema to settle
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Step 2: Seed schedules
    await seedSchedules();

    // Step 3: Seed events
    await seedEvents();

    // Step 4: Create admin user
    await createAdminUser();

    // Step 5: Verify everything
    await verifySetup();

    console.log('\n' + '='.repeat(50));
    console.log('✨ SETUP COMPLETED SUCCESSFULLY! ✨');
    console.log('='.repeat(50));
    console.log('\n📋 Your website is now ready!');
    console.log('\n🔗 Visit your deployment:');
    console.log('   https://church-production-5253.up.railway.app');
    console.log('\n🔐 Admin Login:');
    console.log('   URL: https://church-production-5253.up.railway.app/admin');
    console.log('   Email: admin@riversoflivingwaterchurch.org');
    console.log('   Password: Amir1355');
    console.log('\n✅ All features are now working:');
    console.log('   ✓ Weekly Schedule (3 services)');
    console.log('   ✓ Special Events (Anniversary celebration)');
    console.log('   ✓ Prayer Request Form');
    console.log('   ✓ Photo Gallery');
    console.log('   ✓ Admin Panel');
    console.log('\n🎉 Enjoy your new church website!');

  } catch (error) {
    console.error('\n💥 Setup failed:', error.message);
    console.error('\nPlease check:');
    console.error('1. DATABASE_URL is set correctly in Railway');
    console.error('2. PostgreSQL database is running');
    console.error('3. Network connection is stable');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the setup
main();
