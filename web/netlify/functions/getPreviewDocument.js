const { createClient } = require('@sanity/client');
const path = require('path');

// Last miljøvariabler fra .env i utvikling
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
}

// Opprett Sanity-klient kun hvis alle påkrevde miljøvariabler er tilgjengelige
const createSanityClient = () => {
  const requiredEnvVars = ['SANITY_PROJECT_ID', 'SANITY_DATASET', 'SANITY_TOKEN'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    throw new Error(`Mangler påkrevde miljøvariabler: ${missingEnvVars.join(', ')}`);
  }

  return createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    apiVersion: process.env.SANITY_API_VERSION || '2024-03-05',
    useCdn: false
  });
};

exports.handler = async (event, context) => {
  // Tillatte origins basert på miljø
  const allowedOrigins = [
    'http://localhost:8000',
    'https://staging-uxnorge.netlify.app',
    'https://uxnorge.no'
  ];
  
  const origin = event.headers.origin || event.headers.Origin;
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // CORS headers
  const headers = {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Legg til Access-Control-Allow-Origin kun hvis origin er tillatt
  if (isAllowedOrigin) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  // Håndter OPTIONS request for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Initialiser Sanity-klient
    const client = createSanityClient();

    const { type, slug } = event.queryStringParameters;
    
    if (!type || !slug) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Mangler påkrevde parametere: type og slug' })
      };
    }

    const query = `*[_type == $type && slug.current == $slug][0]`;
    const params = { type, slug };
    
    const document = await client.fetch(query, params);
    
    if (!document) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({ error: 'Dokument ikke funnet' })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(document)
    };
  } catch (error) {
    console.error('Feil ved henting av dokument:', error.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'En feil oppstod ved henting av dokument' })
    };
  }
};