
import fetch from 'node-fetch';

async function verify() {
    try {
        console.log('Testing /api/products/all on localhost...');
        const res = await fetch('http://localhost:3000/api/products/all', {
            headers: { 'Host': 'b-2b.com' }
        });
        const data = await res.json();
        console.log('Main domain response:', JSON.stringify(data, null, 2));

        console.log('\nTesting /api/products/all on subdomain...');
        const resSub = await fetch('http://localhost:3000/api/products/all', {
            headers: { 'Host': 'laserwelder.b-2b.com' }
        });
        const dataSub = await resSub.json();
        console.log('Subdomain response (should be empty products):', dataSub.products?.length === 0 ? 'SUCCESS' : 'FAILURE');

    } catch (e) {
        console.log('Could not test via fetch (server might not be running). Manual verification needed.');
    }
}

verify();
