#!/usr/bin/env node

// Demonstration script for the Optimizely Opal Product Description Generator
// This script shows all the different types of descriptions the tool can generate

const API_BASE_URL = 'http://127.0.0.1:8787';

async function demonstrateAPI() {
  console.log('🎯 Optimizely Opal Product Description Generator Demo\n');

  // Test 1: Marketing Description (Professional)
  console.log('📝 1. Marketing Description (Professional Tone)');
  console.log('=' .repeat(50));
  
  const marketingRequest = {
    productName: "Professional Laptop",
    partNumber: "PRO-LAPTOP-2024",
    attributes: [
      { name: "Processor", value: "Intel Core i7-13700H" },
      { name: "RAM", value: "16", unit: "GB DDR5" },
      { name: "Storage", value: "512", unit: "GB NVMe SSD" },
      { name: "Display", value: "14 inch QHD" }
    ],
    descriptionType: "marketing",
    tone: "professional"
  };

  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(marketingRequest)
    });
    const result = await response.json();
    console.log(result.description);
    console.log(`\nWord count: ${result.metadata.wordCount} | Character count: ${result.metadata.characterCount}\n`);
  } catch (error) {
    console.log('❌ Error:', error.message, '\n');
  }

  // Test 2: Technical Description
  console.log('🔧 2. Technical Description');
  console.log('=' .repeat(50));
  
  const technicalRequest = {
    productName: "Industrial Sensor",
    partNumber: "SENSOR-IND-001",
    attributes: [
      { name: "Accuracy", value: "±0.1", unit: "%" },
      { name: "Operating Temperature", value: "-40 to +85", unit: "°C" },
      { name: "Response Time", value: "100", unit: "ms" },
      { name: "IP Rating", value: "IP67" }
    ],
    descriptionType: "technical",
    tone: "professional"
  };

  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(technicalRequest)
    });
    const result = await response.json();
    console.log(result.description);
    console.log(`\nWord count: ${result.metadata.wordCount} | Character count: ${result.metadata.characterCount}\n`);
  } catch (error) {
    console.log('❌ Error:', error.message, '\n');
  }

  // Test 3: Ecommerce Description (Enthusiastic)
  console.log('🛒 3. Ecommerce Description (Enthusiastic Tone)');
  console.log('=' .repeat(50));
  
  const ecommerceRequest = {
    productName: "Wireless Gaming Mouse",
    partNumber: "GAMING-MOUSE-X1",
    attributes: [
      { name: "DPI", value: "25,600" },
      { name: "Battery Life", value: "70", unit: "hours" },
      { name: "RGB Lighting", value: "16.8M colors" },
      { name: "Weight", value: "95", unit: "grams" }
    ],
    descriptionType: "ecommerce",
    tone: "enthusiastic",
    maxLength: 500
  };

  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ecommerceRequest)
    });
    const result = await response.json();
    console.log(result.description);
    console.log(`\nWord count: ${result.metadata.wordCount} | Character count: ${result.metadata.characterCount}\n`);
  } catch (error) {
    console.log('❌ Error:', error.message, '\n');
  }

  // Test 4: Casual Tone
  console.log('😊 4. Marketing Description (Casual Tone)');
  console.log('=' .repeat(50));
  
  const casualRequest = {
    productName: "Portable Bluetooth Speaker",
    partNumber: "SPEAKER-BT-MINI",
    attributes: [
      { name: "Output Power", value: "20", unit: "W" },
      { name: "Battery Life", value: "12", unit: "hours" },
      { name: "Waterproof", value: "IPX4" },
      { name: "Weight", value: "500", unit: "grams" }
    ],
    descriptionType: "marketing",
    tone: "casual"
  };

  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(casualRequest)
    });
    const result = await response.json();
    console.log(result.description);
    console.log(`\nWord count: ${result.metadata.wordCount} | Character count: ${result.metadata.characterCount}\n`);
  } catch (error) {
    console.log('❌ Error:', error.message, '\n');
  }

  console.log('🎉 Demo completed successfully!');
  console.log('\nThe Optimizely Opal Product Description Generator is ready for use.');
  console.log('To deploy to production:');
  console.log('1. Run: npm run deploy');
  console.log('2. Register at https://opal.optimizely.com/tools');
  console.log('3. Add your discovery URL: https://your-worker-domain.workers.dev/discovery');
}

// Run the demonstration
demonstrateAPI().catch(console.error);
