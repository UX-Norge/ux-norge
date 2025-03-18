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

      const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'https://uxnorge.no'; // 'http://localhost:8000' || 'https://uxnorge.no' || 'https://staging-uxnorge.netlify.app'

      const previewUrl = `${baseUrl}/live-preview?${params.toString()}`;
      window.open(previewUrl, '_blank');
    },
    disabled: !document?.slug?.current,
  };
} 