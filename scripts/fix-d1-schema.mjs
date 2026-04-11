import fs from 'fs'
import path from 'path'

/**
 * fix-d1-schema.mjs
 * 
 * This script is used during Cloudflare Pages builds to swap the 
 * Prisma provider from 'mysql' (standard) to 'sqlite' (D1 compatible).
 */

const schemaPath = path.resolve('prisma/schema.prisma')

// Only run the swap if we are on Cloudflare Pages
if (process.env.CF_PAGES === '1' || process.env.CF_PAGES === 'true' || process.env.NITRO_PRESET === 'cloudflare-pages') {
  if (fs.existsSync(schemaPath)) {
    let content = fs.readFileSync(schemaPath, 'utf8')
    
    if (content.includes('provider = "mysql"')) {
      console.log('[Build] detected Cloudflare environment. Swapping Prisma provider to sqlite...')
      content = content.replace('provider = "mysql"', 'provider = "sqlite"')
      fs.writeFileSync(schemaPath, content)
      console.log('[Build] schema.prisma updated successfully for D1.')
    } else {
      console.log('[Build] schema.prisma is already configured for sqlite.')
    }
  } else {
    console.error('[Build] schema.prisma not found!')
    process.exit(1)
  }
} else {
  console.log('[Build] Standard environment detected. Keeping schema as mysql.')
}
