import { createClient } from '@sanity/client';

// Logg alle tilgjengelige miljøvariabler som inneholder 'SANITY'
console.log('Available environment variables:', 
  Object.keys(process.env)
    .filter(key => key.includes('SANITY'))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: key.includes('TOKEN') ? '***' : process.env[key]
      };
    }, {})
);

// Hent nødvendige miljøvariabler
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.SANITY_DATASET;
const SANITY_TOKEN = process.env.SANITY_TOKEN;
const SANITY_API_VERSION = process.env.SANITY_API_VERSION || '2024-03-05';

// Valider at nødvendige variabler er satt
if (!SANITY_PROJECT_ID) {
  throw new Error('SANITY_PROJECT_ID må være satt i miljøvariabler');
}
if (!SANITY_DATASET) {
  throw new Error('SANITY_DATASET må være satt i miljøvariabler');
}

console.log('Sanity Config:', {
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  hasToken: !!SANITY_TOKEN,
  tokenStart: SANITY_TOKEN ? SANITY_TOKEN.substring(0, 5) + '...' : 'none',
  apiVersion: SANITY_API_VERSION
});

export const previewClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  perspective: 'previewDrafts',
  token: SANITY_TOKEN,
  withCredentials: false
});

export const getPreviewDocument = async (type: string, slug: string) => {
  const query = `*[_type == $type && slug.current == $slug][0]`;
  const params = { type, slug };
  
  console.log('Executing Sanity query:', { query, params });
  
  if (!SANITY_TOKEN) {
    console.error('No preview token available. Make sure SANITY_TOKEN is set.');
    throw new Error('Preview token is required for accessing draft content');
  }
  
  try {
    const document = await previewClient.fetch(query, params);
    console.log('Sanity response:', document);
    
    if (!document) {
      console.log('No document found. Checking all documents of this type...');
      const allDocs = await previewClient.fetch('*[_type == $type]{_id,slug,title}', { type });
      console.log('Available documents:', allDocs);
    }
    
    return document;
  } catch (err: any) {
    console.error('Error fetching preview document:', {
      error: err,
      config: {
        projectId: SANITY_PROJECT_ID,
        dataset: SANITY_DATASET,
        hasToken: !!SANITY_TOKEN
      }
    });
    
    // Mer detaljert feilmelding
    if (err.message?.includes('CORS')) {
      throw new Error(`CORS error: ${window.location.origin} må legges til som tillatt domene i Sanity-prosjektet`);
    } else if (err.message?.includes('401')) {
      throw new Error('Unauthorized: Sjekk at SANITY_TOKEN er satt og gyldig');
    }
    
    throw err;
  }
}; 