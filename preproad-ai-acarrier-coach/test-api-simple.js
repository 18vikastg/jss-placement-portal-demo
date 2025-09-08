// Simple test for career guide API
const fetch = require('node-fetch');

async function testCareerGuide() {
  try {
    console.log('Testing career guide API...');
    
    const response = await fetch('http://localhost:3000/api/career-guide', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        careerRole: 'Data Scientist',
        timeframe: '12 months',
        experienceLevel: 'beginner'
      }),
    });

    console.log('Response status:', response.status);
    
    const result = await response.json();
    console.log('Response:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log('✅ Career guide API is working!');
      console.log('Roadmap phases:', result.data.roadmap?.length || 0);
      console.log('Has flowchart:', !!result.data.flowchartOutline);
    } else {
      console.log('❌ API returned error:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testCareerGuide();
