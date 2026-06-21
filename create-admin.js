const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@riversoflivingwaterchurch.org';
  const password = 'Admin123!'; // CHANGE THIS PASSWORD!

  console.log('Creating admin user...');

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const admin = await prisma.admin.create({
      data: {
        email: email,
        password: hashedPassword,
        name: 'Admin',
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('Email:', admin.email);
    console.log('Password:', password);
    console.log('\n⚠️  IMPORTANT: Change your password after first login!');
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️  Admin user already exists!');
    } else {
      console.error('Error:', error);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
