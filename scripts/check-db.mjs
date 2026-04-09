import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function check() {
  try {
    const sitesCount = await prisma.industrySite.count();
    const newsCount = await prisma.newsContent.count();
    const usersCount = await prisma.user.count();
    const productsCount = await prisma.product.count();

    console.log('Database Counts:');
    console.log('Industry Sites:', sitesCount);
    console.log('News Content:', newsCount);
    console.log('Users:', usersCount);
    console.log('Products:', productsCount);

    if (sitesCount > 0) {
      const sampleSite = await prisma.industrySite.findFirst();
      console.log('Sample Site:', JSON.stringify(sampleSite, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2));
    }
  } catch (e) {
    console.error('Database connection or query error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

check();
