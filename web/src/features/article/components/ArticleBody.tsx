import * as React from "react";
import { BlockContent, Heading3, Overline } from "@Ui/Typography";
import { Ad, Article, PortableText } from "@Types";
import { printDate } from "@Lib/helpers";
import { blockContentToPlainText } from "react-portable-text";
import { ReadersLetterDisclaimer } from "./ReadersLetterDisclaimer";
import { ListAd } from "@Features/ad/components/ListAd";
import { DiscussArticle } from "./DiscussArticle";
import { NominateSection } from "./NominateSection";
import { SponsoredContentDisclaimer } from "./sponsoredContentDisclaimer";
import { Button } from "@Ui/Button";

interface IProps {
  articleListAds: Ad[];
  articleBannerAds: Ad[];
  nominateBanner: { title: string; text: PortableText };
  discussInSlack: { title: string; text: PortableText };
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
      | "isSponsoredContent"
      | "category"
      | "slackMessageLink"
    >
> = ({
  isReadersLetter,
  isSponsoredContent,
  category,
  body,
  publishedAt,
  articleListAds,
  articleBannerAds,
  slackMessageLink,
  discussInSlack,
  nominateBanner,
}) => {
  const [bodyWithAds, setBodyWithAds] = React.useState<any[]>([]);

  React.useEffect(() => {
    setBodyWithAds(insertBannerAds(body, articleBannerAds));
  }, [body, articleBannerAds]);

  const readTime = Math.round(
    blockContentToPlainText(body).split(" ").length / 200
  );

  return (
    <main className="relative mx-auto mt-56 max-w-[950px] grid-cols-[65ch_1fr] gap-24 px-24 lg:grid">
      <div className="relative mx-auto max-w-prose lg:m-0">
        <Overline className="text-base text-primary-500">
          {printDate(publishedAt)}
        </Overline>
        <Overline>{readTime} min</Overline>
        {isReadersLetter && <ReadersLetterDisclaimer />}
        {isSponsoredContent && <SponsoredContentDisclaimer />}
        <div className="prose-a:link w-prose prose prose-p:text-base prose-p:leading-relaxed">
          {bodyWithAds && <BlockContent blocks={bodyWithAds} />}
        </div>
        <div className="mb-48 space-y-32">
          <hr className="w-64" />
          <NominateSection category={category} {...nominateBanner} />
          <DiscussArticle {...discussInSlack} />
        </div>
      </div>
      <div className="hidden w-full space-y-48 lg:block">
        {articleListAds.map((ad) => (
          <ListAd {...ad} key={ad._id} />
        ))}
        <div className="block space-y-4 border-2 border-primary-500 py-16 px-16 rounded-sm">
          <Heading3>Tips oss</Heading3>
          <p className="py-16">
            Har du tips eller leserinnlegg?<br />
            Send en e-post til:
          </p>
          <Button href="mailto:tips@uxnorge.no">tips@uxnorge.no</Button>
        </div>
      </div>
    </main>
  );
};
