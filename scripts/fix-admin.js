#!/usr/bin/env node

/**
 * Fix Admin Login Script
 * This will reset the admin user with correct credentials
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function fixAdmin() {
  console.log('🔧 Fixing admin login...\n');

  try {
    // Delete existing admin
    const deleted = await prisma.admin.deleteMany({
      where: { email: 'admin@riversoflivingwaterchurch.org' }
    });
    console.log(`🗑️  Deleted ${deleted.count} old admin(s)`);

    // Create fresh admin with correct password
    const hashedPassword = await bcrypt.hash('Amir1355', 12);
    const admin = await prisma.admin.create({
      data: {
        email: 'admin@riversoflivingwaterchurch.org',
        password: hashedPassword,
        name: 'Administrator'
      }
    });

    console.log('\n✅ Admin account created successfully!');
    console.log('━'.repeat(50));
    console.log('📧 Email:', admin.email);
    console.log('🔑 Password: Amir1355');
    console.log('🔗 Login URL: https://church-production-5253.up.railway.app/admin');
    console.log('━'.repeat(50));
    console.log('\n🎉 You can now login to the admin panel!');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

fixAdmin();
