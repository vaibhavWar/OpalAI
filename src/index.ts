import { generateProductDescription, ProductDescriptionParams } from './product-description';

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
      const discoveryResponse = {
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

      return new Response(JSON.stringify(discoveryResponse), {
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
        timestamp: new Date().toISOString()
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
        let params: ProductDescriptionParams;
        
        // Check if parameters are nested under 'parameters' key
        if (body.parameters) {
          params = {
            productName: body.parameters.productName,
            partNumber: body.parameters.partNumber,
            attributes: body.parameters.attributes,
            descriptionType: body.parameters.descriptionType,
            tone: body.parameters.tone,
            maxLength: body.parameters.maxLength
          };
        } 
        // Check if parameters are in 'arguments' key
        else if (body.arguments) {
          params = {
            productName: body.arguments.productName,
            partNumber: body.arguments.partNumber,
            attributes: body.arguments.attributes,
            descriptionType: body.arguments.descriptionType,
            tone: body.arguments.tone,
            maxLength: body.arguments.maxLength
          };
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

        // Generate the product description
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

          return new Response(JSON.stringify({
            success: true,
            description: result.description,
            markdown: markdownResponse,
            metadata: result.metadata
          }), {
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        } else {
          return new Response(JSON.stringify({
            success: false,
            error: result.error
          }), {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              ...corsHeaders,
            },
          });
        }

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
