import React, { useEffect, useState } from 'react';
import { ArticleHeader } from '../features/article/components/ArticleHeader';
import { ArticleBody } from '../features/article/components/ArticleBody';
import { ArticleFooter } from '../features/article/components/ArticleFooter';
import { Article, Author } from '@Types';

interface PreviewParams {
  type: string | null;
  slug: string | null;
}

const getPreviewDocument = async (params: PreviewParams) => {
  try {
    const baseUrl = typeof window !== 'undefined' && window.location.port === '8000'
      ? 'http://localhost:8888'
      : '';

    const response = await fetch(
      `${baseUrl}/.netlify/functions/getPreviewDocument?type=${params.type}&slug=${params.slug}&_t=${Date.now()}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching preview:", error);
    throw error;
  }
};

export default function LivePreviewPage() {
  const [params, setParams] = useState<PreviewParams>({ type: null, slug: null });
  const [document, setDocument] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const newParams = {
        type: searchParams.get('type'),
        slug: searchParams.get('slug')
      };
      console.log('URL Parameters:', newParams);
      setParams(newParams);
    }
  }, []);

  useEffect(() => {
    async function fetchDocument() {
      if (!params.type || !params.slug) {
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching document with params:', params);
        const doc = await getPreviewDocument(params);
        console.log('Received document:', doc);
        setDocument(doc);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Kunne ikke hente dokumentet');
        console.error('Error fetching document:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchDocument();
  }, [params.type, params.slug]);

  if (loading) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-600">Laster innhold...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="p-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-600">Ingen data funnet</p>
          </div>
        </div>
      </div>
    );
  }

  // Vis preview-banner
  const PreviewBanner = () => (
    <div className="bg-blue-500 text-white p-4 fixed top-0 left-0 right-0 z-50 text-center">
      <p className="text-sm font-medium">
        Preview Modus - Endringer i Sanity vil vises her umiddelbart
      </p>
    </div>
  );

  // Ensure required properties exist with defaults
  const safeDocument = {
    ...document,
    authors: (document.authors || []).map((author: Partial<Author>) => ({
      _id: author?._id || '',
      name: author?.name || '',
      slug: { current: author?.slug?.current || '' },
      company: author?.company || null
    })),
    category: document.category || { name: '', slug: { current: '' } },
    company: document.company || { name: '', slug: { current: '' } },
    slug: document.slug || { current: '' },
    mainImage: document.mainImage || null,
    body: document.body || [],
    isSponsoredContent: document.isSponsoredContent || false,
    publishedAt: document.publishedAt || new Date().toISOString(),
    relatedArticles: (document.relatedArticles || []).map((article: Partial<Article>) => ({
      _id: article?._id || '',
      title: article?.title || '',
      slug: { current: article?.slug?.current || '' },
      mainImage: article?.mainImage || null
    }))
  };

  // Hent ut nødvendige props for ArticleHeader
  const headerProps = {
    title: safeDocument.title || '',
    authors: safeDocument.authors,
    company: safeDocument.company,
    category: safeDocument.category,
    description: safeDocument.description || '',
    mainImage: safeDocument.mainImage,
    isSponsoredContent: safeDocument.isSponsoredContent
  };

  // Mock data for banners og annonser
  const mockBanners = {
    nominateBanner: {
      title: '',
      text: []
    },
    discussInSlack: {
      title: '',
      text: []
    }
  };

  const mockAds = {
    articleListAds: [],
    articleBannerAds: []
  };

  // Props for ArticleBody
  const bodyProps = {
    ...safeDocument,
    ...mockAds,
    ...mockBanners
  };

  return (
    <>
      <PreviewBanner />
      <div className="pt-16"> {/* Legg til padding-top for å kompensere for preview-banneret */}
        <article className="px-4 py-8">
          <ArticleHeader {...headerProps} />
          <ArticleBody {...bodyProps} />
          <ArticleFooter {...safeDocument} />
        </article>
      </div>
    </>
  );
} 