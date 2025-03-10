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

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || 'production-copy';
const token = process.env.SANITY_TOKEN;

console.log('Sanity Config:', {
  projectId,
  dataset,
  hasToken: !!token,
  tokenStart: token ? token.substring(0, 5) + '...' : 'none'
});

if (!projectId) {
  throw new Error('Missing Sanity project configuration. Check your environment variables.');
}

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-03-05',
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
    throw error; // La feilen propagere for bedre feilhåndtering
  }
}; 