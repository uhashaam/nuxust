import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

console.log('🚀 Starting Hostinger Build Process...')

try {
  // 1. Set environment variable for Nitro preset
  console.log('📦 Setting NITRO_PRESET to node-server...')
  
  // 2. Run Nuxt Build
  console.log('🏗️ Building for Node.js server...')
  execSync('npx nuxt build', {
    cwd: rootDir,
    stdio: 'inherit',
    env: {
      ...process.env,
      NITRO_PRESET: 'node-server',
      NODE_ENV: 'production'
    }
  })

  console.log('\n✅ Build Complete!')
  console.log('--------------------------------------------------')
  console.log('📂 Your Hostinger bundle is ready in the ".output" folder.')
  console.log('--------------------------------------------------')
  console.log('💡 To deploy to Hostinger:')
  console.log('1. Upload the ".output" directory to your server.')
  console.log('2. Run "node .output/server/index.mjs" to start the server.')
  console.log('3. Ensure DATABASE_URL is set in your environment variables.')
  console.log('--------------------------------------------------')

} catch (error) {
  console.error('❌ Build failed:', error.message)
  process.exit(1)
}
