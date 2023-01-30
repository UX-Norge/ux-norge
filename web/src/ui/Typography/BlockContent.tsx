import * as React from "react";
// import PortableText from "react-portable-text";
import { PortableText } from "@portabletext/react";
import { PortableText as BlockContentType } from "@Types";
import { classNames } from "@Lib/helpers";
import { ArticleImage, RelatedArticleInline } from "@Features/article";
import { Youtube } from "@Features/article/components/Youtube";
import { ArticleQuote } from "@Features/article/components/ArticleQuote";
import { BannerAd } from "@Features/ad/components/BannerAd";
import { FactBox } from "@Features/article/components/FactBox";
import { Link } from "gatsby";

interface IProps {
  blocks: BlockContentType | undefined | object[];
  prose?: boolean;
}

export const BlockContent: React.FC<IProps> = ({ prose, blocks }) => {
  if (!blocks) return null;
  return (
    <div className={classNames({ prose: prose })}>
      <PortableText
        value={blocks}
        components={{
          block: {
            blockquote: ArticleQuote,
          },
          marks: {
            link: ({ text, value: { href }, ...props }) => {
              return href.includes("http") ? (
                <Link to={href}>{text}</Link>
              ) : (
                <a href={href}>{text}</a>
              );
            },
          },
          types: {
            articleImage: ({ value }) => <ArticleImage {...value} />,
            youtube: ({ value }) => <Youtube {...value} />,
            inlineRelatedArticle: ({ value }) => (
              <RelatedArticleInline {...value} />
            ),
            bannerAd: ({ value }) => <BannerAd {...value} />,
            factBox: ({ value }) => <FactBox {...value} />,
          },
        }}
      />
    </div>
  );
};
