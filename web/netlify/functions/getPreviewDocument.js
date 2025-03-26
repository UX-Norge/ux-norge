const { createClient } = require('@sanity/client');
const path = require('path');

// Last miljøvariabler fra .env i utvikling
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
}

// Opprett Sanity-klient kun hvis alle påkrevde miljøvariabler er tilgjengelige
const createSanityClient = () => {
  const config = {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    apiVersion: '2024-03-05',
    useCdn: false,
    perspective: 'previewDrafts'
  };

  // Sjekk at vi har de nødvendige verdiene (ikke inkluder useCdn og apiVersion)
  const requiredKeys = ['projectId', 'dataset', 'token'];
  const missingKeys = requiredKeys.filter(key => !config[key]);

  if (missingKeys.length > 0) {
    throw new Error(`Mangler påkrevde miljøvariabler: ${missingKeys.map(key => key.toUpperCase()).join(', ')}`);
  }

  return createClient(config);
};

exports.handler = async (event, context) => {
  // Tillatte origins basert på miljø
  const allowedOrigins = [
    'http://localhost:8000',
    'http://localhost:8888',
    'http://127.0.0.1:8000',
    'http://127.0.0.1:8888',
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

    // Hent både publisert og draft versjon, prioriter draft hvis den finnes
    const query = `*[_type == $type && slug.current == $slug && (_id in path("drafts.**") || !defined(*[_id == "drafts." + ^._id][0]._id))][0]`;
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