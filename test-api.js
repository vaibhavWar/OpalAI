#!/usr/bin/env node

// Simple test script to demonstrate the Product Description Generator API
// Run with: node test-api.js

const API_BASE_URL = 'http://127.0.0.1:8787'; // Change this to your deployed URL

async function testAPI() {
  console.log('🧪 Testing Optimizely Opal Product Description Generator API\n');

  // Test 1: Discovery endpoint
  console.log('1. Testing Discovery Endpoint...');
  try {
    const discoveryResponse = await fetch(`${API_BASE_URL}/discovery`);
    const discoveryData = await discoveryResponse.json();
    console.log('✅ Discovery endpoint working');
    console.log(`   Found ${discoveryData.functions.length} function(s)`);
    console.log(`   Function: ${discoveryData.functions[0].name}`);
    console.log(`   Description: ${discoveryData.functions[0].description}\n`);
  } catch (error) {
    console.log('❌ Discovery endpoint failed:', error.message, '\n');
  }

  // Test 2: Health check
  console.log('2. Testing Health Check...');
  try {
    const healthResponse = await fetch(`${API_BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check working');
    console.log(`   Status: ${healthData.status}`);
    console.log(`   Version: ${healthData.version}\n`);
  } catch (error) {
    console.log('❌ Health check failed:', error.message, '\n');
  }

  // Test 3: Basic product description
  console.log('3. Testing Basic Product Description...');
  const basicRequest = {
    productName: "Wireless Bluetooth Headphones",
    partNumber: "WH-1000XM4",
    attributes: [
      {
        name: "Battery Life",
        value: "30",
        unit: "hours"
      },
      {
        name: "Weight",
        value: "254",
        unit: "grams"
      },
      {
        name: "Noise Cancellation",
        value: "Active"
      }
    ]
  };

  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(basicRequest)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Basic description generated successfully');
      console.log(`   Word count: ${result.metadata.wordCount}`);
      console.log(`   Character count: ${result.metadata.characterCount}`);
      console.log(`   Description preview: ${result.description.substring(0, 100)}...\n`);
    } else {
      console.log('❌ Basic description failed:', result.error, '\n');
    }
  } catch (error) {
    console.log('❌ Basic description request failed:', error.message, '\n');
  }

  // Test 4: Ecommerce description with enthusiastic tone
  console.log('4. Testing Ecommerce Description...');
  const ecommerceRequest = {
    productName: "Smart Fitness Watch",
    partNumber: "SFW-PRO-2024",
    attributes: [
      {
        name: "Display",
        value: "1.4 inch AMOLED"
      },
      {
        name: "Battery Life",
        value: "7",
        unit: "days"
      },
      {
        name: "Water Resistance",
        value: "5ATM"
      }
    ],
    descriptionType: "ecommerce",
    tone: "enthusiastic",
    maxLength: 400
  };

  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ecommerceRequest)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Ecommerce description generated successfully');
      console.log(`   Word count: ${result.metadata.wordCount}`);
      console.log(`   Character count: ${result.metadata.characterCount}`);
      console.log(`   Description preview: ${result.description.substring(0, 100)}...\n`);
    } else {
      console.log('❌ Ecommerce description failed:', result.error, '\n');
    }
  } catch (error) {
    console.log('❌ Ecommerce description request failed:', error.message, '\n');
  }

  // Test 5: Technical description
  console.log('5. Testing Technical Description...');
  const technicalRequest = {
    productName: "Professional Camera Lens",
    partNumber: "EF-70-200mm-f2.8",
    attributes: [
      {
        name: "Focal Length",
        value: "70-200mm"
      },
      {
        name: "Aperture",
        value: "f/2.8"
      },
      {
        name: "Filter Size",
        value: "77",
        unit: "mm"
      }
    ],
    descriptionType: "technical",
    tone: "professional"
  };

  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(technicalRequest)
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Technical description generated successfully');
      console.log(`   Word count: ${result.metadata.wordCount}`);
      console.log(`   Character count: ${result.metadata.characterCount}`);
      console.log(`   Description preview: ${result.description.substring(0, 100)}...\n`);
    } else {
      console.log('❌ Technical description failed:', result.error, '\n');
    }
  } catch (error) {
    console.log('❌ Technical description request failed:', error.message, '\n');
  }

  console.log('🎉 API testing completed!');
  console.log('\nTo use this tool with Optimizely Opal:');
  console.log('1. Deploy to Cloudflare Workers');
  console.log('2. Register at https://opal.optimizely.com/tools');
  console.log('3. Add your discovery URL: https://your-worker-domain.workers.dev/discovery');
}

// Run the tests
testAPI().catch(console.error);
