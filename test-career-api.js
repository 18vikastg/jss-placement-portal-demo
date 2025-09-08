#!/usr/bin/env node

// Quick test script for career guide API
const https = require('http');

const testData = JSON.stringify({
  careerRole: 'Software Developer'
});

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/career-guide',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(testData)
  }
};

console.log('🧪 Testing Career Guide API...');
console.log('📍 Endpoint: http://localhost:3001/api/career-guide');
console.log('📝 Data:', testData);
console.log('---');

const req = https.request(options, (res) => {
  console.log(`📊 Status Code: ${res.statusCode}`);
  console.log(`📋 Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('---');
    console.log('📤 Response:');
    try {
      const parsed = JSON.parse(data);
      console.log(JSON.stringify(parsed, null, 2));
      
      if (parsed.success) {
        console.log('✅ API Test PASSED - Career guide generated successfully!');
      } else {
        console.log('❌ API Test FAILED - Check error message above');
      }
    } catch (e) {
      console.log('🔴 Raw Response (not JSON):');
      console.log(data);
      console.log('❌ API Test FAILED - Invalid JSON response');
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Request Failed: ${e.message}`);
  console.log('');
  console.log('🔧 Troubleshooting:');
  console.log('1. Make sure AI Career Coach is running on port 3001');
  console.log('2. Check if the service started successfully');
  console.log('3. Try: cd placement-portal && npm run dev');
});

req.write(testData);
req.end();
