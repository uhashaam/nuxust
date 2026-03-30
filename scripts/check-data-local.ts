import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

async function checkData() {
  const url = process.env.DATABASE_URL || ''
  if (!url) {
    console.error('DATABASE_URL not found')
    return
  }

  const match = url.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
  if (!match) {
    console.error('Invalid DATABASE_URL format')
    return
  }

  const config = {
    host: match[3],
    user: decodeURIComponent(match[1]),
    password: decodeURIComponent(match[2]),
    port: parseInt(match[4]),
    database: match[5]
  }

  const adapter = new PrismaMariaDb(config)
  const prisma = new PrismaClient({ adapter } as any)

  try {
    const sitesCount = await prisma.industrySite.count()
    const newsCount = await prisma.newsContent.count()
    const productsCount = await prisma.product.count()

    console.log(`Sites: ${sitesCount}`)
    console.log(`News: ${newsCount}`)
    console.log(`Products: ${productsCount}`)

    if (sitesCount > 0) {
      const firstSite = await prisma.industrySite.findFirst()
      console.log('Sample Site:', JSON.stringify(firstSite, null, 2))
    }

  } catch (error) {
    console.error('Error querying database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkData()
