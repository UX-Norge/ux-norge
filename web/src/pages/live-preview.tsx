import React, { useEffect, useState } from 'react';
import { ArticleHeader } from '../features/article/components/ArticleHeader';
import { ArticleBody } from '../features/article/components/ArticleBody';
import { ArticleFooter } from '../features/article/components/ArticleFooter';
import { AdPageHeader } from '../features/ad/components/AdPageHeader';
import { ContactPerson } from '../features/ad/components/ContactPerson';
import { CourseInfo } from '../features/course/CourseInfo';
import { DocumentHeader } from '../features/document/DocumentHeader';
import { AuthorPageHeader } from '../features/author';
import { Article, Author, Ad, Course, Document } from '@Types';
import { BlockContent } from '@Ui/Typography';
import { PageWrapper } from '@Ui/Layout';

interface PreviewParams {
  type: string | null;
  slug: string | null;
}

const getPreviewDocument = async (params: PreviewParams) => {
  try {
    const baseUrl = typeof window !== 'undefined' && (window.location.port === '8000' || window.location.port === '8888')
      ? 'http://localhost:9999'
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

  // Render innhold basert på type
  const renderContent = () => {
    switch (params.type) {
      case 'article':
        return (
          <article className="px-4 py-8">
            <ArticleHeader {...safeDocument} />
            <ArticleBody {...safeDocument} />
            <ArticleFooter {...safeDocument} />
          </article>
        );

      case 'ad':
        return (
          <main className="mx-auto max-w-page pb-128">
            <AdPageHeader {...safeDocument} />
            <div className="mx-auto max-w-prose p-24">
              <ContactPerson {...safeDocument} />
              <BlockContent blocks={safeDocument.body} prose />
            </div>
          </main>
        );

      case 'course':
        return (
          <div className="pt-58 mx-auto flex max-w-prose flex-col gap-24 p-24 pb-24">
            <h2 className="text-2xl font-bold">{safeDocument.title}</h2>
            <p>{safeDocument.description}</p>
            <div>
              <h4 className="text-lg font-semibold">Nøkkelinformasjon</h4>
              <CourseInfo course={safeDocument} />
            </div>
            {safeDocument.signUpLink && (
              <div>
                <a href={safeDocument.signUpLink} className="btn">
                  Kjøp billett
                </a>
              </div>
            )}
            <div className="prose">
              <BlockContent blocks={safeDocument.body} />
            </div>
          </div>
        );

      case 'document':
      case 'doc':
        return (
          <main className="mx-auto max-w-page">
            <DocumentHeader
              title={safeDocument.title}
              description={safeDocument.description}
              cta={safeDocument.cta}
            />
            <div className="prose mx-auto max-w-prose p-24">
              <BlockContent blocks={safeDocument.body} />
            </div>
          </main>
        );

      case 'author':
        return (
          <div className="mx-auto max-w-page p-24">
            <AuthorPageHeader {...safeDocument} />
            <div className="mt-8">
              <BlockContent blocks={safeDocument.bio} />
            </div>
          </div>
        );

      default:
        return (
          <div className="p-8">
            <div className="max-w-3xl mx-auto">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-yellow-600">Ukjent innholdstype: {params.type}</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <PreviewBanner />
      <div className="pt-16">
        <PageWrapper>
          {renderContent()}
        </PageWrapper>
      </div>
    </>
  );
} 