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
import { Link } from "@Components/Link";
import { Button } from "@Ui/Button";

interface IProps {
  articleListAds: Ad[];
  articleBannerAds: Ad[];
  nominateBanner: { title: string; text: PortableText };
  discussInSlack: { title: string; text: PortableText };
}

const ArrowLeftIcon: React.FC = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
      <path
      d="M22.7199 12.7319C22.8993 12.5525 23 12.3093 23 12.0556C23 11.802 22.8993 11.5588 22.7199 11.3794L16.6326 5.29202C16.5443 5.20066 16.4388 5.12779 16.3221 5.07766C16.2054 5.02753 16.0799 5.00114 15.9529 5.00004C15.8259 4.99893 15.6999 5.02313 15.5824 5.07123C15.4648 5.11932 15.358 5.19035 15.2682 5.28016C15.1784 5.36997 15.1074 5.47677 15.0593 5.59433C15.0112 5.71188 14.987 5.83783 14.9881 5.96484C14.9892 6.09185 15.0156 6.21737 15.0657 6.33407C15.1158 6.45077 15.1887 6.55631 15.28 6.64455L20.6911 12.0556L15.28 17.4667C15.1058 17.6471 15.0094 17.8888 15.0116 18.1396C15.0138 18.3904 15.1143 18.6303 15.2917 18.8076C15.469 18.985 15.709 19.0856 15.9598 19.0877C16.2106 19.0899 16.4522 18.9935 16.6326 18.8193L22.7199 12.7319ZM1 13.0122H22.0437V11.0991H1V13.0122Z"
      fill="white"
      />
  </svg>
);

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
        <Link
          path="annonse"
          type="page"
          className="block space-y-4 bg-green-600 hover:bg-green-500 text-white py-16 px-16 rounded-sm cursor-pointer"
        >
          <p className="text-sm">Leter du etter designer?</p>
          <div className="flex gap-16">
            <p className="font-bold">Legg ut stillingsannonse</p>
            <ArrowLeftIcon />
          </div>
        </Link>
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
