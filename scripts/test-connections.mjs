/**
 * Simple test script to verify Lark Base and Cloudflare API connectivity
 */

// Test Lark Base Connection
async function testLarkBase() {
    console.log('🔍 Testing Lark Base Connection...\n')

    try {
        const response = await fetch('http://localhost:3000/api/lark/test')
        const data = await response.json()

        if (data.status === 'connected') {
            console.log('✅ Lark Base: CONNECTED')
            console.log(`   App ID: ${data.appId}`)
            console.log(`   Tables configured: ${Object.keys(data.tables).length}`)
            console.log('   Table IDs:')
            for (const [key, value] of Object.entries(data.tables)) {
                console.log(`     - ${key}: ${value}`)
            }
        } else {
            console.log('❌ Lark Base connection failed')
            console.log(`   Error: ${data.message}`)
        }
    } catch (error) {
        console.log('❌ Lark Base test error:', error.message)
    }

    console.log('\n' + '='.repeat(60) + '\n')
}

// Test Cloudflare Connection
async function testCloudflare() {
    console.log('🔍 Testing Cloudflare API Connection...\n')

    const config = {
        apiToken: process.env.CLOUDFLARE_API_TOKEN || 'gU7YlWVEu6k_6wqKlP46XPgHYQRJ9YuxSYkm6xjR',
        accountId: process.env.CLOUDFLARE_ACCOUNT_ID || '87f5f6b3f39e93f52ee7a659803ef731',
        zoneId: process.env.CLOUDFLARE_ZONE_ID || '9a4aa6d0184cec73a86848d7912e6ca3'
    }

    try {
        // Test 1: Verify Token
        const verifyResponse = await fetch('https://api.cloudflare.com/client/v4/user/tokens/verify', {
            headers: {
                'Authorization': `Bearer ${config.apiToken}`,
                'Content-Type': 'application/json'
            }
        })
        const verifyData = await verifyResponse.json()

        if (verifyData.success) {
            console.log('✅ Cloudflare API Token: VALID')
            console.log(`   Status: ${verifyData.result.status}`)
        } else {
            console.log('❌ Cloudflare API Token: INVALID')
            console.log('   Errors:', verifyData.errors)
        }

        // Test 2: Get Zone Info
        const zoneResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${config.zoneId}`, {
            headers: {
                'Authorization': `Bearer ${config.apiToken}`,
                'Content-Type': 'application/json'
            }
        })
        const zoneData = await zoneResponse.json()

        if (zoneData.success) {
            console.log('✅ Zone Access: GRANTED')
            console.log(`   Domain: ${zoneData.result.name}`)
            console.log(`   Status: ${zoneData.result.status}`)
        } else {
            console.log('❌ Zone Access: DENIED')
            console.log('   Errors:', zoneData.errors)
        }

        // Test 3: Check DNS Records
        const dnsResponse = await fetch(`https://api.cloudflare.com/client/v4/zones/${config.zoneId}/dns_records?per_page=5`, {
            headers: {
                'Authorization': `Bearer ${config.apiToken}`,
                'Content-Type': 'application/json'
            }
        })
        const dnsData = await dnsResponse.json()

        if (dnsData.success) {
            console.log('✅ DNS Access: GRANTED')
            console.log(`   Existing DNS records: ${dnsData.result_info.total_count}`)
        } else {
            console.log('❌ DNS Access: DENIED')
            console.log('   Errors:', dnsData.errors)
        }

    } catch (error) {
        console.log('❌ Cloudflare test error:', error.message)
    }

    console.log('\n' + '='.repeat(60) + '\n')
}

// Run all tests
async function runTests() {
    console.log('\n' + '='.repeat(60))
    console.log('  LARK BASE & CLOUDFLARE CONNECTION TEST')
    console.log('='.repeat(60) + '\n')

    await testLarkBase()
    await testCloudflare()

    console.log('✨ All tests completed!\n')
}

// Execute
runTests().catch(console.error)
