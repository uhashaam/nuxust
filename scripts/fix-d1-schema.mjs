import fs from 'fs'
import path from 'path'

/**
 * fix-d1-schema.mjs
 * 
 * This script is used during Cloudflare Pages builds to swap the 
 * Prisma provider from 'mysql' (standard) to 'sqlite' (D1 compatible).
 */

const schemaPath = path.resolve('prisma/schema.prisma')
const d1SchemaPath = path.resolve('prisma/schema.d1.prisma')

// Only run the swap if we are on Cloudflare Pages
if (process.env.CF_PAGES === '1' || process.env.CF_PAGES === 'true' || process.env.NITRO_PRESET === 'cloudflare-pages') {
  if (fs.existsSync(d1SchemaPath)) {
    console.log('[Build] Cloudflare environment detected. SWAPPING to D1 Native Schema...')
    fs.copyFileSync(d1SchemaPath, schemaPath)
    console.log('[Build] schema.prisma has been replaced with schema.d1.prisma.')
  } else {
    console.warn('[Build] schema.d1.prisma not found. Falling back to textual swap...')
    if (fs.existsSync(schemaPath)) {
        let content = fs.readFileSync(schemaPath, 'utf8')
        if (content.includes('provider = "mysql"')) {
            content = content.replace('provider = "mysql"', 'provider = "sqlite"')
            fs.writeFileSync(schemaPath, content)
            console.log('[Build] Textual swap performed on schema.prisma.')
        }
    }
  }
} else {
  console.log('[Build] Standard environment detected. Keeping native MySQL schema.')
}
