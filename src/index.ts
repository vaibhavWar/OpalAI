import { ToolsService, tool } from '@optimizely-opal/opal-tools-sdk';
import { generateProductDescription, ProductDescriptionParams } from './product-description.js';

// Define the product description tool using the SDK decorator
class ProductDescriptionTool {
  @tool({ name: 'generate-product-description', description: 'Generate compelling product descriptions based on product name, part number, and attributes' })
  async generateProductDescriptionTool(parameters: any) {
    const {
      productName,
      partNumber,
      attributes,
      descriptionType = 'marketing',
      tone = 'professional',
      maxLength = 500
    } = parameters;

    // Validate required parameters
    if (!productName || !partNumber || !attributes || attributes.length === 0) {
      throw new Error('Product name, part number, and at least one attribute are required');
    }

    const params: ProductDescriptionParams = {
      productName,
      partNumber,
      attributes,
      descriptionType,
      tone,
      maxLength
    };

    const result = await generateProductDescription(params);

    if (result.success) {
      // Format response for Optimizely Opal consumption
      const markdownResponse = `
## 📝 Product Description Generated

**Product:** ${params.productName}  
**Part Number:** \`${params.partNumber}\`  
**Type:** ${params.descriptionType || 'marketing'}  
**Tone:** ${params.tone || 'professional'}

### Generated Description:

${result.description}

---
*Generated at: ${result.metadata?.generatedAt}*  
*Word count: ${result.metadata?.wordCount} | Character count: ${result.metadata?.characterCount}*
`;

      return {
        success: true,
        description: result.description,
        markdown: markdownResponse,
        metadata: result.metadata
      };
    } else {
      throw new Error(result.error || 'Failed to generate product description');
    }
  }
}

// Initialize the tools service and tool instance
const toolsService = new ToolsService({});
const productDescriptionTool = new ProductDescriptionTool();

export default {
  async fetch(request: Request, env: any, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Add CORS headers to all responses
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Tool discovery endpoint
    if (request.method === 'GET' && url.pathname === '/discovery') {
      // Use manual discovery since SDK methods may vary
        const fallbackDiscovery = {
          functions: [
            {
              name: 'generate-product-description',
              description: 'Generate compelling product descriptions based on product name, part number, and attributes',
              parameters: [
                {
                  name: 'productName',
                  type: 'string',
                  description: 'The name of the product to generate a description for',
                  required: true
                },
                {
                  name: 'partNumber',
                  type: 'string',
                  description: 'The part number or SKU of the product',
                  required: true
                },
                {
                  name: 'attributes',
                  type: 'array',
                  description: 'Array of product attributes with name, value, and optional unit',
                  required: true,
                  items: {
                    type: 'object',
                    properties: {
                      name: { type: 'string', description: 'Attribute name (e.g., "Weight", "Dimensions", "Material")' },
                      value: { type: 'string', description: 'Attribute value' },
                      unit: { type: 'string', description: 'Optional unit of measurement' }
                    }
                  }
                },
                {
                  name: 'descriptionType',
                  type: 'string',
                  description: 'Type of description to generate: marketing, technical, or ecommerce',
                  required: false,
                  enum: ['marketing', 'technical', 'ecommerce']
                },
                {
                  name: 'tone',
                  type: 'string',
                  description: 'Tone of the description: professional, casual, or enthusiastic',
                  required: false,
                  enum: ['professional', 'casual', 'enthusiastic']
                },
                {
                  name: 'maxLength',
                  type: 'number',
                  description: 'Maximum length of the generated description in characters',
                  required: false
                }
              ],
              endpoint: '/',
              http_method: 'POST',
              auth_requirements: []
            }
          ]
        };

      return new Response(JSON.stringify(fallbackDiscovery), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Health check endpoint
    if (request.method === 'GET' && url.pathname === '/health') {
      return new Response(JSON.stringify({
        status: 'healthy',
        tool: 'generate-product-description',
        description: 'Generate compelling product descriptions based on product name, part number, and attributes',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        sdk: '@optimizely-opal/opal-tools-sdk'
      }), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      });
    }

    // Main tool execution endpoint
    if (request.method === 'POST' && url.pathname === '/') {
      try {
        const body = await request.json() as any;
        
        // Handle different possible parameter formats from Optimizely Opal
        let params: any;
        
        // Check if parameters are nested under 'parameters' key
        if (body.parameters) {
          params = body.parameters;
        } 
        // Check if parameters are in 'arguments' key
        else if (body.arguments) {
          params = body.arguments;
        }
        // Check if parameters are directly in the body
        else if (body.productName) {
          params = {
            productName: body.productName,
            partNumber: body.partNumber,
            attributes: body.attributes,
            descriptionType: body.descriptionType,
            tone: body.tone,
            maxLength: body.maxLength
          };
        } else {
          throw new Error('Invalid request format: missing required parameters');
        }

        // Use the SDK-decorated tool function
        const result = await productDescriptionTool.generateProductDescriptionTool(params);

        return new Response(JSON.stringify(result), {
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });

      } catch (error) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Invalid request format',
          details: error instanceof Error ? error.message : 'Unknown error'
        }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...corsHeaders,
          },
        });
      }
    }

    // Default response for unknown endpoints
    return new Response(JSON.stringify({
      error: 'Endpoint not found',
      availableEndpoints: ['/discovery', '/health', '/']
    }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders,
      },
    });
  }
};
