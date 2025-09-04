// Test examples for the Optimizely Opal Product Description Generator Tool

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

// Export all examples for testing
export {
  basicRequest,
  technicalRequest,
  ecommerceRequest,
  marketingRequest,
  electronicsRequest,
  minimalRequest,
  complexRequest
};
