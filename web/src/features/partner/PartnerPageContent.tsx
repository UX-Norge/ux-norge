import { ArticleThumbnail } from "@Components/ArticleThumbnail";
import { ListAd } from "@Features/ad/components/ListAd";
import { activeFilter } from "@Features/ad/lib/adHelpers";
import { Ad, Article, Company } from "@Types";
import { BlockContent, Heading3 } from "@Ui/Typography";
import * as React from "react";
import { PartnerHeader } from "./PartnerHeader";

interface IProps {
  company: Company;
  ads: Ad[];
  articles: Article[];
}

export const PartnerPageContent: React.FC<IProps> = ({
  company,
  ads,
  articles,
}) => {
  const title = company.partnerTitle || company.name;
  const activeAds = ads.filter(activeFilter);
  const visibleArticles = articles.filter(
    (article) => !article.hideOnPartnerPage && article.slug?.current
  );

  return (
    <article>
      <PartnerHeader
        title={title}
        description={company.partnerDescription}
        mainImage={company.partnerMainImage}
        companyName={company.name}
      />
      <main className="relative mx-auto mt-56 max-w-[950px] grid-cols-[65ch_1fr] gap-24 px-24 lg:grid">
        <div className="relative mx-auto max-w-prose lg:m-0">
          <div className="prose prose-p:text-base prose-p:leading-relaxed prose-a:link w-prose">
            <BlockContent blocks={company.partnerBody} />
          </div>
        </div>
        <div className="mx-auto my-64 w-full max-w-prose space-y-48 lg:my-0">
          {activeAds.length > 0 && (
            <div className="space-y-48">
              <Heading3>Ledige stillinger</Heading3>
              {activeAds.map((ad) => (
                <ListAd {...ad} key={ad._id} />
              ))}
            </div>
          )}
        </div>
      </main>
      {visibleArticles.length > 0 && (
        <div className="bg-primary-100 p-24 lg:p-64">
          <div className="mx-auto max-w-page-sm">
            <Heading3 className="mb-48">Artikler</Heading3>
            <div className="grid gap-48 md:grid-cols-3">
              {visibleArticles.map((article) => (
                <ArticleThumbnail
                  type="small"
                  article={article}
                  key={article._id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
};
