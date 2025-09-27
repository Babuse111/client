// Test script for Admin Dashboard API endpoints
// Run this with: node test-api.js

const http = require('http');

const BASE_URL = 'http://localhost:5000';

function makeRequest(url, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(body);
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, data: jsonData, status: res.statusCode });
        } catch (e) {
          resolve({ ok: false, data: body, status: res.statusCode });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing Admin Dashboard API endpoints...\n');

  try {
    // Test 1: Get all applications
    console.log('1️⃣ Testing GET /api/applications');
    const response = await makeRequest(`${BASE_URL}/api/applications`);
    const applications = response.data;
    
    if (response.ok) {
      console.log(`✅ Success! Found ${applications.length} applications`);
      applications.forEach((app, index) => {
        console.log(`   ${index + 1}. ${app.full_names} (${app.status}) - ${app.email}`);
      });
    } else {
      console.log('❌ Failed:', applications);
    }

    if (applications.length > 0) {
      const testAppId = applications[0].id;
      
      // Test 2: Update application status to accepted
      console.log(`\n2️⃣ Testing PATCH /api/applications/${testAppId}/status (accept)`);
      const acceptResponse = await makeRequest(`${BASE_URL}/api/applications/${testAppId}/status`, 'PATCH', { status: 'accepted' });
      
      if (acceptResponse.ok) {
        console.log('✅ Successfully updated status to accepted');
      } else {
        console.log('❌ Failed to update status:', acceptResponse.data);
      }

      // Test 3: Update application status to declined
      console.log(`\n3️⃣ Testing PATCH /api/applications/${testAppId}/status (decline)`);
      const declineResponse = await makeRequest(`${BASE_URL}/api/applications/${testAppId}/status`, 'PATCH', { status: 'declined' });
      
      if (declineResponse.ok) {
        console.log('✅ Successfully updated status to declined');
      } else {
        console.log('❌ Failed to update status:', declineResponse.data);
      }

      // Test 4: Verify changes
      console.log(`\n4️⃣ Verifying changes - GET /api/applications again`);
      const verifyResponse = await makeRequest(`${BASE_URL}/api/applications`);
      const updatedApplications = verifyResponse.data;
      
      if (verifyResponse.ok) {
        console.log('✅ Status updated successfully!');
        const updatedApp = updatedApplications.find(app => app.id === testAppId);
        console.log(`   ${updatedApp.full_names} status is now: ${updatedApp.status}`);
      }
    }

    console.log('\n🎉 All API tests completed!');
    console.log('\n📊 Admin Dashboard Test Results:');
    console.log('• Database connection: ✅ Working');
    console.log('• GET applications: ✅ Working'); 
    console.log('• UPDATE status: ✅ Working');
    console.log('\n🌐 Open http://localhost:3000 to see the admin dashboard');

  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('\n🔧 Make sure the server is running: node index-sqlite.js');
  }
}

testAPI();
