// Test examples for the Optimizely Opal Product Description Generator Tool
// Updated to demonstrate @optimizely-opal/opal-tools-sdk integration

import { generateProductDescription } from './product-description.js';

// Example 1: Basic product description request
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
    },
    {
      name: "Connectivity",
      value: "Bluetooth 5.0"
    }
  ]
};

// Example 2: Technical description for professional audience
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
    },
    {
      name: "Minimum Focus Distance",
      value: "1.2",
      unit: "meters"
    },
    {
      name: "Elements",
      value: "23"
    }
  ],
  descriptionType: "technical",
  tone: "professional"
};

// Example 3: Ecommerce description with enthusiastic tone
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
    },
    {
      name: "GPS",
      value: "Built-in"
    },
    {
      name: "Heart Rate Monitor",
      value: "24/7"
    }
  ],
  descriptionType: "ecommerce",
  tone: "enthusiastic",
  maxLength: 400
};

// Example 4: Marketing description for casual tone
const marketingRequest = {
  productName: "Portable Coffee Maker",
  partNumber: "PCM-2000",
  attributes: [
    {
      name: "Capacity",
      value: "12",
      unit: "ounces"
    },
    {
      name: "Brew Time",
      value: "3",
      unit: "minutes"
    },
    {
      name: "Material",
      value: "Stainless Steel"
    },
    {
      name: "Portable",
      value: "Yes"
    }
  ],
  descriptionType: "marketing",
  tone: "casual"
};

// Example 5: Electronics product with multiple attributes
const electronicsRequest = {
  productName: "4K Ultra HD Smart TV",
  partNumber: "TV-65-4K-SMART",
  attributes: [
    {
      name: "Screen Size",
      value: "65",
      unit: "inches"
    },
    {
      name: "Resolution",
      value: "3840x2160"
    },
    {
      name: "HDR",
      value: "Dolby Vision"
    },
    {
      name: "Smart Features",
      value: "Android TV"
    },
    {
      name: "Connectivity",
      value: "WiFi, Bluetooth, HDMI"
    },
    {
      name: "Refresh Rate",
      value: "120",
      unit: "Hz"
    }
  ],
  descriptionType: "ecommerce",
  tone: "enthusiastic"
};

// Example 6: Minimal request with just required fields
const minimalRequest = {
  productName: "Basic Notebook",
  partNumber: "NB-001",
  attributes: [
    {
      name: "Pages",
      value: "100"
    },
    {
      name: "Size",
      value: "A5"
    }
  ]
};

// Example 7: Complex product with many attributes
const complexRequest = {
  productName: "Professional Gaming Laptop",
  partNumber: "GAMER-PRO-2024",
  attributes: [
    {
      name: "Processor",
      value: "Intel Core i9-13900H"
    },
    {
      name: "Graphics",
      value: "NVIDIA RTX 4080"
    },
    {
      name: "RAM",
      value: "32",
      unit: "GB DDR5"
    },
    {
      name: "Storage",
      value: "2",
      unit: "TB NVMe SSD"
    },
    {
      name: "Display",
      value: "17.3 inch QHD 240Hz"
    },
    {
      name: "Battery Life",
      value: "6",
      unit: "hours"
    },
    {
      name: "Weight",
      value: "2.8",
      unit: "kg"
    },
    {
      name: "Keyboard",
      value: "RGB Mechanical"
    }
  ],
  descriptionType: "marketing",
  tone: "enthusiastic",
  maxLength: 600
};

// SDK Integration Examples

// Example function to test the SDK-decorated tool
async function testSDKIntegration() {
  console.log('Testing @optimizely-opal/opal-tools-sdk integration...');
  
  try {
    // Test with basic request
    const result = await generateProductDescription(basicRequest);
    console.log('✅ SDK Integration Test Result:', result);
    
    if (result.success) {
      console.log('📝 Generated Description:', result.description);
      console.log('📊 Metadata:', result.metadata);
    } else {
      console.error('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ SDK Integration Test Failed:', error);
  }
}

// Example function to demonstrate different description types
async function demonstrateDescriptionTypes() {
  const examples = [
    { name: 'Marketing', request: marketingRequest },
    { name: 'Technical', request: technicalRequest },
    { name: 'Ecommerce', request: ecommerceRequest }
  ];

  for (const example of examples) {
    console.log(`\n🔄 Testing ${example.name} Description Type:`);
    try {
      const result = await generateProductDescription(example.request as any);
      if (result.success) {
        console.log(`✅ ${example.name} Description Generated Successfully`);
        console.log(`📝 Preview: ${result.description.substring(0, 100)}...`);
      } else {
        console.error(`❌ ${example.name} Description Failed:`, result.error);
      }
    } catch (error) {
      console.error(`❌ ${example.name} Description Error:`, error);
    }
  }
}

// Example function to test parameter validation
async function testParameterValidation() {
  console.log('\n🧪 Testing Parameter Validation...');
  
  const invalidRequests = [
    { name: 'Missing productName', request: { partNumber: 'TEST-001', attributes: [{ name: 'Test', value: 'Value' }] } },
    { name: 'Missing partNumber', request: { productName: 'Test Product', attributes: [{ name: 'Test', value: 'Value' }] } },
    { name: 'Empty attributes', request: { productName: 'Test Product', partNumber: 'TEST-001', attributes: [] } }
  ];

  for (const test of invalidRequests) {
    console.log(`\n🔍 Testing: ${test.name}`);
    try {
      const result = await generateProductDescription(test.request as any);
      if (!result.success) {
        console.log(`✅ Validation Working: ${result.error}`);
      } else {
        console.log(`❌ Validation Failed: Should have rejected invalid request`);
      }
    } catch (error) {
      console.log(`✅ Validation Working: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export all examples for testing
export {
  basicRequest,
  technicalRequest,
  ecommerceRequest,
  marketingRequest,
  electronicsRequest,
  minimalRequest,
  complexRequest,
  testSDKIntegration,
  demonstrateDescriptionTypes,
  testParameterValidation
};
