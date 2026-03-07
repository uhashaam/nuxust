const http = require('http');

const data = JSON.stringify({ email: 'test@b-2b.com' });

const req = http.request('http://127.0.0.1:3000/api/auth/send-registration-code', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
}, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log('STATUS:', res.statusCode);
        console.log('BODY:', body);
    });
});

req.on('error', console.error);
req.write(data);
req.end();
