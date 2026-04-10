import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

const batch3 = [
    "packaging", "printing", "paper", "labeling", "plastic packaging", "chemicals", 
    "plastics", "rubber", "coatings", "adhesives", "pigments", "construction materials", 
    "building supplies", "sanitary products", "ceramics", "stone", "glass", "wood", 
    "ceilings", "walls", "textiles", "fabrics", "garments", "leather", "yarn", "food", 
    "agriculture", "fruits", "vegetables", "grains", "meat", "beverages"
]

const batch4 = [
    "furniture", "household goods", "kitchenware", "gifts", "toys", "jewelry", 
    "automobiles", "auto parts", "vehicles", "tires", "accessories", "medical equipment", 
    "health products", "energy equipment", "solar energy", "wind energy", 
    "environmental protection products"
]

const batch5 = [
    "recycling", "water", "treatment", "metals", "minerals", "steel", "alloys", 
    "mining", "petroleum", "gas", "logistics", "office supplies", "stationery"
]

const allIndustries = [...batch3, ...batch4, ...batch5]

function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // Replace spaces with -
        .replace(/[^\w-]+/g, '')  // Remove all non-word chars
        .replace(/--+/g, '-')     // Replace multiple - with single -
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
}

async function seed() {
    console.log(`🚀 Starting bulk industry seeding (${allIndustries.length} items)...`)
    
    let createdCount = 0
    let updatedCount = 0

    for (const industry of allIndustries) {
        const subdomain = slugify(industry)
        const name = industry.split(' ').map(capitalize).join(' ')
        
        try {
            const site = await prisma.industrySite.upsert({
                where: { sub_domain: subdomain },
                update: {
                   site_name: name,
                   industry_name: industry.toLowerCase(),
                   subdomain: subdomain // updated alias
                },
                create: {
                    site_name: name,
                    site_title: `Intelligence & Strategic Insights for ${name} | b-2b.com`,
                    industry_name: industry.toLowerCase(),
                    sub_domain: subdomain,
                    subdomain: subdomain,
                    meta_description: `Leading global B2B platform for the ${industry} industry. High-impact technical analysis and enterprise-grade intelligence reports.`,
                    site_status: 'active',
                    is_active: true
                }
            })
            
            if (site.createdAt === site.updatedAt) {
                createdCount++
            } else {
                updatedCount++
            }
        } catch (error) {
            console.error(`❌ Failed to seed ${industry}:`, error.message)
        }
    }

    console.log(`\n✅ Seeding completed!`)
    console.log(`📊 Created: ${createdCount}`)
    console.log(`📊 Updated: ${updatedCount}`)
    console.log(`Total: ${allIndustries.length}`)
}

seed()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
