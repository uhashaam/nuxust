import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const targets = [
  'node_modules/mariadb/lib/pool-connection.js',
  'node_modules/mariadb/lib/pool.js',
  'node_modules/mariadb/lib/connection.js'
]

console.log('[Patch] Starting MariaDB Edge compatibility patch...')

targets.forEach(target => {
  const fullPath = path.resolve(rootDir, target)
  if (fs.existsSync(fullPath)) {
    try {
      let content = fs.readFileSync(fullPath, 'utf8')
      const original = content
      
      // Specifically target the pattern: obj.hasOwnProperty(prop)
      // and replace it with: Object.prototype.hasOwnProperty.call(obj, prop)
      content = content.replace(/([a-zA-Z0-9_$]+)\.hasOwnProperty\(/g, 'Object.prototype.hasOwnProperty.call($1, ')

      if (content !== original) {
        fs.writeFileSync(fullPath, content)
        console.log(`[Patch] Success: ${target}`)
      } else {
        console.log(`[Patch] Skip (no match): ${target}`)
      }
    } catch (err) {
      console.error(`[Patch] Error patching ${target}:`, err.message)
    }
  } else {
    console.warn(`[Patch] Warning: File not found: ${target}`)
  }
})

console.log('[Patch] MariaDB patch completed.')
