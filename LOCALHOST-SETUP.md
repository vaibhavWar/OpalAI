# Running Locally on Localhost

## Quick Start

### Option 1: Using the start script (Recommended)
```powershell
.\start-local.ps1
```

### Option 2: Manual start
```bash
# Build the project
npm run build

# Start the development server
npm run dev
```

### Option 3: Using wrangler directly
```bash
wrangler dev --local --port 8787
```

## Server Information

- **URL:** http://localhost:8787
- **Port:** 8787
- **Mode:** Local development

## Available Endpoints

### 1. Health Check
```bash
GET http://localhost:8787/health
```

**Response:**
```json
{
  "status": "healthy",
  "tool": "generate-product-description",
  "description": "Generate compelling product descriptions...",
  "version": "1.0.0",
  "timestamp": "2025-10-14T...",
  "sdk": "@optimizely-opal/opal-tools-sdk"
}
```

### 2. Discovery Endpoint
```bash
GET http://localhost:8787/discovery
```

**Response:** Returns tool schema and parameters

### 3. Generate Product Description
```bash
POST http://localhost:8787/
Content-Type: application/json
```

**Request Body:**
```json
{
  "productName": "Wireless Bluetooth Headphones",
  "partNumber": "WH-1000XM4",
  "attributes": [
    {
      "name": "Battery Life",
      "value": "30",
      "unit": "hours"
    },
    {
      "name": "Weight",
      "value": "254",
      "unit": "grams"
    }
  ],
  "descriptionType": "marketing",
  "tone": "professional",
  "maxLength": 500
}
```

**Response:**
```json
{
  "success": true,
  "description": "Generated description text...",
  "markdown": "Formatted markdown version...",
  "metadata": {
    "wordCount": 57,
    "characterCount": 432,
    "generatedAt": "2025-10-14T..."
  }
}
```

## Testing the Server

### Using PowerShell
```powershell
# Test health endpoint
Invoke-RestMethod -Uri "http://localhost:8787/health" -Method Get

# Test discovery endpoint
Invoke-RestMethod -Uri "http://localhost:8787/discovery" -Method Get

# Test description generation
$body = @{
    productName = "Test Product"
    partNumber = "TEST-001"
    attributes = @(
        @{ name = "Weight"; value = "1.5"; unit = "kg" }
    )
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8787/" -Method Post -Body $body -ContentType "application/json"
```

### Using cURL
```bash
# Health check
curl http://localhost:8787/health

# Discovery
curl http://localhost:8787/discovery

# Generate description
curl -X POST http://localhost:8787/ \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Test Product",
    "partNumber": "TEST-001",
    "attributes": [
      {"name": "Weight", "value": "1.5", "unit": "kg"}
    ]
  }'
```

## Troubleshooting

### Port Already in Use
If port 8787 is already in use, you can specify a different port:
```bash
wrangler dev --local --port 3000
```

### Module Resolution Errors
Make sure you've built the project first:
```bash
npm run build
```

### SDK Compatibility
Current SDK version: `@optimizely-opal/opal-tools-sdk@0.1.3-dev`

To check for updates:
```bash
npm outdated @optimizely-opal/opal-tools-sdk
```

## Deployment

Once testing is complete, deploy to Cloudflare Workers:

```bash
# Production
npm run deploy

# Staging
npm run deploy:staging
```

## Notes

- The server runs with hot-reload in development mode
- Changes to TypeScript files require a rebuild (`npm run build`)
- Press `Ctrl+C` to stop the server
- Logs will show in the terminal window

