# Optimizely Opal Product Description Generator Tool

A custom Optimizely Opal tool for generating compelling product descriptions based on product name, part number, and attributes.

## Features

- **Multiple Description Types**: Generate marketing, technical, or ecommerce descriptions
- **Tone Customization**: Choose between professional, casual, or enthusiastic tones
- **Flexible Attributes**: Support for product attributes with optional units
- **Length Control**: Configurable maximum description length
- **Markdown Output**: Optimized for Optimizely Opal display

## Project Structure

```
optimizely-product-description-tool/
├── src/
│   ├── index.ts              # Main Cloudflare Worker implementation
│   └── product-description.ts # Core description generation logic
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── wrangler.toml             # Cloudflare Worker config
└── README.md                 # This file
```

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy to Cloudflare Workers**:
   ```bash
   npm run deploy
   ```

## API Endpoints

### Discovery Endpoint
- **URL**: `GET /discovery`
- **Description**: Returns tool capabilities for Optimizely Opal integration

### Health Check
- **URL**: `GET /health`
- **Description**: Returns tool status and version information

### Generate Description
- **URL**: `POST /`
- **Description**: Generates product descriptions based on input parameters

## Usage Examples

### Basic Request
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
    },
    {
      "name": "Noise Cancellation",
      "value": "Active"
    }
  ]
}
```

### Advanced Request with Options
```json
{
  "productName": "Professional Camera Lens",
  "partNumber": "EF-70-200mm-f2.8",
  "attributes": [
    {
      "name": "Focal Length",
      "value": "70-200mm"
    },
    {
      "name": "Aperture",
      "value": "f/2.8"
    },
    {
      "name": "Filter Size",
      "value": "77",
      "unit": "mm"
    }
  ],
  "descriptionType": "technical",
  "tone": "professional",
  "maxLength": 300
}
```

## Description Types

### Marketing
Focused on benefits and emotional appeal, perfect for promotional materials.

### Technical
Detailed specifications and technical features, ideal for technical documentation.

### Ecommerce
Optimized for online product listings with emojis and call-to-action elements.

## Tone Options

### Professional
Formal language suitable for B2B and enterprise contexts.

### Casual
Friendly, approachable language for consumer products.

### Enthusiastic
Energetic and exciting language for promotional content.

## Registration with Optimizely Opal

1. Deploy your tool to Cloudflare Workers
2. Navigate to Optimizely Opal tools section: `https://opal.optimizely.com/tools`
3. Add your discovery URL: `https://your-worker-domain.workers.dev/discovery`
4. Test the integration in Optimizely Opal chat

## Development

### Local Development
```bash
npm run dev
```

### Staging Deployment
```bash
npm run deploy:staging
```

### Production Deployment
```bash
npm run deploy
```

## Error Handling

The tool includes comprehensive error handling for:
- Missing required parameters
- Invalid parameter formats
- Network errors
- Generation failures

All errors are returned with appropriate HTTP status codes and detailed error messages.

## Response Format

Successful responses include:
- Generated description text
- Markdown-formatted output for Optimizely Opal
- Metadata (word count, character count, generation timestamp)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the Optimizely Opal documentation
2. Review the Cloudflare Workers documentation
3. Open an issue in this repository

---

Built with ❤️ for Optimizely Opal
