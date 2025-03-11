import { DocumentActionProps } from "sanity";

interface SanityDocument {
  _type: string;
  slug?: {
    current: string;
  };
}

export function livePreviewAction(props: DocumentActionProps) {
  const { draft, published } = props;
  const document = (draft || published) as SanityDocument | undefined;

  return {
    label: 'Live Preview',
    icon: () => '👁️',
    onHandle: () => {
      if (!document?._type || !document?.slug?.current) {
        return;
      }

      const params = new URLSearchParams({
        type: document._type,
        slug: document.slug.current
      });

      // Velg riktig base URL basert på miljø
      const isDevelopment = process.env.NODE_ENV === 'development';
      const dataset = process.env.SANITY_STUDIO_DATASET;
      
      console.log('Current environment:', {
        NODE_ENV: process.env.NODE_ENV,
        DATASET: dataset,
        isDevelopment
      });
      
      let baseUrl = 'https://uxnorge.no'; // prod default
      
      if (isDevelopment) {
        baseUrl = 'http://localhost:8000';
      } else if (dataset === 'staging' || dataset === 'production-copy') {
        baseUrl = 'https://staging-uxnorge.netlify.app';
      }

      console.log('Selected baseUrl:', baseUrl);

      const previewUrl = `${baseUrl}/live-preview?${params.toString()}`;
      window.open(previewUrl, '_blank');
    },
    disabled: !document?.slug?.current,
  };
} 