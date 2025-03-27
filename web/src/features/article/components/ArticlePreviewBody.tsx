import React from 'react';
import { BlockContent } from '@Ui/Typography';
import { Article } from '@Types';

interface ArticlePreviewBodyProps extends Pick<Article, 'body'> {}

export const ArticlePreviewBody: React.FC<ArticlePreviewBodyProps> = ({ body }) => {
  return (
    <div className="prose mx-auto max-w-prose">
      <BlockContent blocks={body} />
    </div>
  );
}; 