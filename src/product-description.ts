import { tool } from '@optimizely-opal/opal-tools-sdk';

// TypeScript interfaces for the product description generator tool

interface ProductDescriptionParams {
  productName: string;
  partNumber: string;
  attributes: ProductAttribute[];
  descriptionType?: 'marketing' | 'technical' | 'ecommerce';
  tone?: 'professional' | 'casual' | 'enthusiastic';
  maxLength?: number;
}

interface ProductAttribute {
  name: string;
  value: string;
  unit?: string;
}

interface ProductDescriptionResult {
  success: boolean;
  description: string;
  metadata?: {
    wordCount: number;
    characterCount: number;
    generatedAt: string;
  };
  error?: string;
}

// Product description generation function
async function generateProductDescription(params: ProductDescriptionParams): Promise<ProductDescriptionResult> {
  try {
    const {
      productName,
      partNumber,
      attributes,
      descriptionType = 'marketing',
      tone = 'professional',
      maxLength = 500
    } = params;

    // Validate required parameters
    if (!productName || !partNumber || !attributes || attributes.length === 0) {
      throw new Error('Product name, part number, and at least one attribute are required');
    }

    // Format attributes for description generation
    const formattedAttributes = attributes.map(attr => {
      const unit = attr.unit ? ` ${attr.unit}` : '';
      return `${attr.name}: ${attr.value}${unit}`;
    }).join(', ');

    // Generate description based on type and tone
    let description = '';
    
    switch (descriptionType) {
      case 'marketing':
        description = generateMarketingDescription(productName, partNumber, formattedAttributes, tone);
        break;
      case 'technical':
        description = generateTechnicalDescription(productName, partNumber, formattedAttributes, tone);
        break;
      case 'ecommerce':
        description = generateEcommerceDescription(productName, partNumber, formattedAttributes, tone);
        break;
      default:
        description = generateMarketingDescription(productName, partNumber, formattedAttributes, tone);
    }

    // Truncate if necessary
    if (description.length > maxLength) {
      description = description.substring(0, maxLength - 3) + '...';
    }

    return {
      success: true,
      description,
      metadata: {
        wordCount: description.split(' ').length,
        characterCount: description.length,
        generatedAt: new Date().toISOString()
      }
    };

  } catch (error) {
    return {
      success: false,
      description: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

function generateMarketingDescription(
  productName: string, 
  partNumber: string, 
  attributes: string, 
  tone: string
): string {
  const toneWords = {
    professional: ['premium', 'high-quality', 'reliable', 'advanced'],
    casual: ['awesome', 'great', 'cool', 'handy'],
    enthusiastic: ['amazing', 'incredible', 'fantastic', 'outstanding']
  };

  const selectedTone = toneWords[tone as keyof typeof toneWords] || toneWords.professional;
  const toneWord = selectedTone[Math.floor(Math.random() * selectedTone.length)];

  return `Introducing the ${toneWord} ${productName} (Part #${partNumber}) - a cutting-edge solution designed to meet your needs. This ${toneWord.toLowerCase()} product features ${attributes}, ensuring optimal performance and reliability. Perfect for professionals who demand excellence, the ${productName} delivers exceptional quality and innovative design. Experience the difference with this advanced solution that combines functionality with style.`;
}

function generateTechnicalDescription(
  productName: string, 
  partNumber: string, 
  attributes: string, 
  tone: string
): string {
  return `The ${productName} (Part Number: ${partNumber}) is engineered with precision to deliver consistent performance. Technical specifications include: ${attributes}. This component is designed for integration into complex systems requiring high reliability and exacting standards. The ${productName} meets industry specifications and is suitable for professional applications where accuracy and durability are paramount.`;
}

function generateEcommerceDescription(
  productName: string, 
  partNumber: string, 
  attributes: string, 
  tone: string
): string {
  const toneWords = {
    professional: ['premium', 'high-quality', 'reliable'],
    casual: ['awesome', 'great', 'cool'],
    enthusiastic: ['amazing', 'incredible', 'fantastic']
  };

  const selectedTone = toneWords[tone as keyof typeof toneWords] || toneWords.professional;
  const toneWord = selectedTone[Math.floor(Math.random() * selectedTone.length)];

  return `🚀 ${toneWord.charAt(0).toUpperCase() + toneWord.slice(1)} ${productName} - Part #${partNumber}

✨ Key Features:
• ${attributes.replace(/, /g, '\n• ')}

💡 Why Choose This Product?
This ${toneWord.toLowerCase()} ${productName} is perfect for anyone looking for quality and reliability. With its impressive specifications including ${attributes}, you can trust this product to deliver exceptional results.

🛒 Ready to ship! Order now and experience the difference.`;
}

export { generateProductDescription, ProductDescriptionParams, ProductDescriptionResult, ProductAttribute };
