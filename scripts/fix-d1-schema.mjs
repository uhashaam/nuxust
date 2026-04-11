import fs from 'fs'
import path from 'path'

/**
 * fix-d1-schema.mjs
 * 
 * This script is used during Cloudflare Pages builds to swap the 
 * Prisma provider from 'mysql' (standard) to 'sqlite' (D1 compatible).
 */

const schemaPath = path.resolve('prisma/schema.prisma')

if (fs.existsSync(schemaPath)) {
  let content = fs.readFileSync(schemaPath, 'utf8')
  
  if (content.includes('provider = "mysql"')) {
    console.log('[Build] Swapping Prisma provider to sqlite for D1 compatibility...')
    content = content.replace('provider = "mysql"', 'provider = "sqlite"')
    fs.writeFileSync(schemaPath, content)
    console.log('[Build] schema.prisma updated successfully.')
  } else {
    console.log('[Build] schema.prisma is already configured for sqlite or not mysql.')
  }
} else {
  console.error('[Build] schema.prisma not found!')
  process.exit(1)
}
