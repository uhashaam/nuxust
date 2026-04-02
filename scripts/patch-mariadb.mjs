import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) return

  try {
    let content = fs.readFileSync(filePath, 'utf8')
    let modified = false

    // 1. Fix .hasOwnProperty(...) errors
    // Specifically target the pattern: obj.hasOwnProperty(prop)
    // and replace it with: Object.prototype.hasOwnProperty.call(obj, prop)
    if (content.includes('.hasOwnProperty(')) {
      content = content.replace(/([a-zA-Z0-9_$]+)\.hasOwnProperty\(/g, 'Object.prototype.hasOwnProperty.call($1, ')
      modified = true
    }

    // 2. Fix EventEmitter [object Module] error (Localhost/Vite)
    // and potentially other Node.js built-ins
    // Replace: const EventEmitter = require('events')
    // with:    const EventEmitter = require('events').EventEmitter || require('events')
    if (content.includes("require('events')") || content.includes('require("events")')) {
        content = content.replace(/require\(['"]events['"]\)/g, "(require('events').EventEmitter || require('events'))")
        modified = true
    }

    if (modified) {
      fs.writeFileSync(filePath, content)
      console.log(`[Patch] Success: ${path.relative(rootDir, filePath)}`)
    }
  } catch (err) {
    console.error(`[Patch] Error patching ${filePath}:`, err.message)
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return
  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const fullPath = path.join(dir, file)
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath)
    } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
      patchFile(fullPath)
    }
  })
}

console.log('[Patch] Starting MariaDB & Dependencies Edge/Vite compatibility patch...')

// Targets: mariadb and potential dependencies that might use restricted APIs
const targetDirs = [
  'node_modules/mariadb',
  'node_modules/mysql2',
  'node_modules/denque',
  'node_modules/sqlstring',
  'node_modules/safer-buffer'
]

targetDirs.forEach(dir => {
  const fullPath = path.resolve(rootDir, dir)
  if (fs.existsSync(fullPath)) {
    console.log(`[Patch] Scanning: ${dir}...`)
    walkDir(fullPath)
  } else {
    console.warn(`[Patch] Skip (Not Found): ${dir}`)
  }
})

console.log('[Patch] MariaDB/Dependencies patch completed.')
