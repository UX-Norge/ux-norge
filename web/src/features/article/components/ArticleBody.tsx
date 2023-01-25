import * as React from "react";
import { BlockContent, Heading4, Overline } from "@Ui/Typography";
import { ArticleImage, RelatedArticleInline } from "@Features/article";
import { Ad, Article } from "@Types";
import { ArticleQuote } from "./ArticleQuote";
import { printDate } from "@Lib/helpers";
import { blockContentToPlainText } from "react-portable-text";
import { BannerAd } from "@Features/ad/components/BannerAd";
import { FactBox } from "./FactBox";
import { ReadersLetterDisclaimer } from "./ReadersLetterDisclaimer";
import { ListAd } from "@Features/ad/components/ListAd";
import { Youtube } from "@Features/article/components/Youtube";
import { Button } from "@Ui/Button";
import { graphql, useStaticQuery } from "gatsby";
import { SlackBannerType } from "@Types";
import { DiscussArticle } from "./DiscussArticle";
import { NominateSection } from "./NominateSection";

interface IProps {
  articleListAds: Ad[];
  articleBannerAds: Ad[];
}

const insertBannerAds = (blocks: any[], bannerAds: Ad[]) => {
  const bannerAdLength = bannerAds.length;
  const titleIndexes = blocks
    .reduce(
      (out, item, index) =>
        item.style?.includes("h2") ? out.concat(index) : out,
      []
    )
    .splice(1) // Removes the first headline
    .filter((_, index: number) => index % 2 === 0); // Every other title

  for (let i = 0; i < bannerAdLength && i < titleIndexes.length; i++) {
    const ad = {
      _key: `ad-${i}`,
      _type: "bannerAd",
      ...bannerAds[i],
    };
    const newIndex = titleIndexes[i];
    const shift = i; // Shift the index by the number of banner ads previously inserted
    newIndex && blocks.splice(newIndex + shift, 0, ad);
  }
  return blocks;
};

export const ArticleBody: React.FC<
  IProps &
    Pick<
      Article,
      | "publishedAt"
      | "body"
      | "isReadersLetter"
      | "category"
      | "slackMessageLink"
    >
> = ({
  isReadersLetter,
  category,
  body,
  publishedAt,
  articleListAds,
  articleBannerAds,
  slackMessageLink,
}) => {
  const [bodyWithAds, setBodyWithAds] = React.useState<any[]>([]);
  const {
    sanitySlackBanner: { invitationLink },
  } = useStaticQuery<{
    sanitySlackBanner: SlackBannerType;
  }>(graphql`
    query {
      sanitySlackBanner(_id: { eq: "slackBanner" }) {
        invitationLink
      }
    }
  `);

  React.useEffect(() => {
    setBodyWithAds(insertBannerAds(body, articleBannerAds));
  }, [body, articleBannerAds]);

  const articleSerializers = {};

  const readTime = Math.round(
    blockContentToPlainText(body).split(" ").length / 200
  );

  return (
    <main className="relative mx-auto mt-56 max-w-[950px] grid-cols-[65ch_1fr] gap-24 lg:grid">
      <div className="relative mx-auto max-w-prose lg:m-0">
        <Overline className="text-base text-primary-500">
          {printDate(publishedAt)}
        </Overline>
        <Overline>{readTime} min</Overline>
        {isReadersLetter && <ReadersLetterDisclaimer />}
        <div className="prose-a:link w-prose prose prose-p:text-base prose-p:leading-relaxed">
          {bodyWithAds && (
            <BlockContent
              blocks={bodyWithAds}
              serializers={articleSerializers}
            />
          )}
        </div>
        <div>
          <hr className="w-64" />
          <NominateSection category={category} />
          <DiscussArticle
            invitationLink={invitationLink}
            slackMessageLink={slackMessageLink}
          />
        </div>
      </div>
      <div className="hidden w-full space-y-48 lg:block">
        {articleListAds.map((ad) => (
          <ListAd {...ad} key={ad._id} />
        ))}
      </div>
    </main>
  );
};
