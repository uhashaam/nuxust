import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding dummy data...')

  // 1. Get existing sites
  const sites = await prisma.industrySite.findMany()
  if (sites.length === 0) {
    console.log('No sites found. Please run migrate.mjs first to at least get the sites.')
    return
  }

  const siteId = sites[0].id
  console.log(`Linking news to site: ${sites[0].site_name} (${siteId})`)

  // 2. Create Dummy News
  const newsTitles = [
    'Revolutionizing the Industry with AI Technology',
    'Top 10 Trends to Watch in 2026',
    'How Global Markets are Shifting Post-2025',
    'Innovation in Sustainable Manufacturing',
    'The Future of Automation and Robotics'
  ]

  for (let i = 0; i < newsTitles.length; i++) {
    const title = newsTitles[i]
    const slug = title.toLowerCase().replace(/ /g, '-') + '-' + Date.now()
    
    await prisma.newsContent.upsert({
      where: { slug: slug },
      update: {},
      create: {
        title: title,
        content: `<p>This is a dummy news article content for ${title}. It explores the latest developments and provides expert analysis.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>`,
        industry: siteId,
        publication_time: BigInt(Date.now()),
        summary: `Summary of ${title}`,
        status: 'Published',
        slug: slug,
        is_featured: i === 0
      }
    }).catch(e => console.error(`Error seeding news ${i}:`, e.message))
  }
  console.log(`Seeded ${newsTitles.length} news items.`)

  // 3. Create Dummy Products
  const productNames = [
    'Professional Laser Marker X1',
    'Industrial Grade Fiber Laser',
    'Precision Cutting System V2',
    'Automated Quality Control Unit',
    'High-Speed Packaging Machine'
  ]

  for (let i = 0; i < productNames.length; i++) {
    const name = productNames[i]
    const slug = name.toLowerCase().replace(/ /g, '-') + '-' + Date.now()

    await prisma.product.upsert({
      where: { slug: slug },
      update: {},
      create: {
        name: name,
        description: `High-quality ${name} designed for professional industrial use. Features include high precision, durability, and easy integration.`,
        short_description: `Reliable ${name} for modern industry.`,
        price: 1500 + (i * 500),
        category: 'Equipment',
        slug: slug,
        is_featured: i < 2
      }
    }).catch(e => console.error(`Error seeding product ${i}:`, e.message))
  }
  console.log(`Seeded ${productNames.length} products.`)

  // 4. Create Dummy Users
  const usersData = [
    { username: 'admin', email: 'admin@example.com', role: 'admin' },
    { username: 'user1', email: 'user1@example.com', role: 'user' }
  ]

  for (const userData of usersData) {
    await prisma.user.upsert({
      where: { username: userData.username },
      update: {},
      create: {
        username: userData.username,
        email: userData.email,
        password_hash: 'dummy-hash', // In a real app, use bcrypt or similar
        user_type: userData.role,
        registration_time: BigInt(Date.now()),
        remaining_posts: 100,
        user_status: 'active'
      }
    }).catch(e => console.error(`Error seeding user ${userData.username}:`, e.message))
  }
  console.log(`Seeded ${usersData.length} users.`)

  console.log('Seeding completed!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
