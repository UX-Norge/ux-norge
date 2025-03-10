import { createClient } from '@sanity/client';

// Konstanter for Sanity-konfigurasjon
const SANITY_PROJECT_ID = '7ygxjqxr';  // Dette er prosjekt-ID-en som brukes i prod
const SANITY_DATASET = 'production-copy';  // Default dataset for staging/utvikling
const SANITY_API_VERSION = '2024-03-05';

// Logg alle tilgjengelige miljøvariabler som inneholder 'GATSBY'
console.log('Available environment variables:', 
  Object.keys(process.env)
    .filter(key => key.includes('GATSBY'))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: key.includes('TOKEN') ? '***' : process.env[key]
      };
    }, {})
);

// Bruk miljøvariabler hvis tilgjengelig, ellers fall tilbake til defaults
const projectId = process.env.GATSBY_SANITY_PROJECT_ID || SANITY_PROJECT_ID;
const dataset = process.env.GATSBY_SANITY_DATASET || SANITY_DATASET;
const token = process.env.GATSBY_SANITY_TOKEN;

console.log('Sanity Config:', {
  projectId,
  dataset,
  hasToken: !!token,
  tokenStart: token ? token.substring(0, 5) + '...' : 'none'
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
  perspective: 'previewDrafts',
  token,
  withCredentials: true
});

export const getPreviewDocument = async (type: string, slug: string) => {
  const query = `*[_type == $type && slug.current == $slug][0]`;
  const params = { type, slug };
  
  console.log('Executing Sanity query:', { query, params });
  
  try {
    const document = await previewClient.fetch(query, params);
    console.log('Sanity response:', document);
    
    if (!document) {
      console.log('No document found. Checking all documents of this type...');
      const allDocs = await previewClient.fetch('*[_type == $type]{_id,slug,title}', { type });
      console.log('Available documents:', allDocs);
    }
    
    return document;
  } catch (error) {
    console.error('Error fetching preview document:', {
      error,
      config: {
        projectId,
        dataset,
        hasToken: !!token
      }
    });
    throw error;
  }
}; 