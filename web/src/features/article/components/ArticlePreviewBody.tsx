import React from 'react';
import { Article } from '@Types';
import { printDate } from '@Lib/helpers';
import { BlockContent, Overline } from '@Ui/Typography';
import { blockContentToPlainText } from 'react-portable-text';

interface ArticlePreviewBodyProps
  extends Pick<Article, 'body' | 'publishedAt' | 'updatedAt'> {}

export const ArticlePreviewBody: React.FC<ArticlePreviewBodyProps> = ({
  body,
  publishedAt,
  updatedAt,
}) => {
  const readTime = Math.round(
    blockContentToPlainText(body || []).split(' ').filter(Boolean).length / 200
  );

  return (
    <main className="relative mx-auto mt-56 max-w-[950px] px-24">
      <div className="relative mx-auto max-w-prose lg:m-0">
        {publishedAt && (
          <Overline className="text-base text-primary-500">
            {printDate(publishedAt)}
            {updatedAt &&
              `${String.fromCharCode(183)} Oppdatert ${printDate(updatedAt)}`}
          </Overline>
        )}
        {publishedAt && readTime > 0 && <Overline>{readTime} min</Overline>}
        <div className="prose w-prose prose-p:text-base prose-p:leading-relaxed">
          <BlockContent blocks={body} />
        </div>
      </div>
    </main>
  );
};
