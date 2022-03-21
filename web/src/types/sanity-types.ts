import type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
} from "sanity-codegen";

export type {
  SanityReference,
  SanityKeyedReference,
  SanityAsset,
  SanityImage,
  SanityFile,
  SanityGeoPoint,
  SanityBlock,
  SanityDocument,
  SanityImageCrop,
  SanityImageHotspot,
  SanityKeyed,
  SanityImageAsset,
  SanityImageMetadata,
  SanityImageDimensions,
  SanityImagePalette,
  SanityImagePaletteSwatch,
};

/**
 * Site settings
 *
 *
 */
export interface SiteSettings extends SanityDocument {
  _type: "siteSettings";

  /**
   * siteName — `string`
   *
   *
   */
  siteName?: string;

  /**
   * siteUrl — `url`
   *
   *
   */
  siteUrl?: string;

  /**
   * description — `text`
   *
   * Beskrivelse av uxnorge.no
   */
  description?: string;
}

/**
 * Article
 *
 *
 */
export interface Article extends SanityDocument {
  _type: "article";

  /**
   * Hovedbilde — `image`
   *
   *
   */
  mainImage?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Tittel — `string`
   *
   *
   */
  title?: string;

  /**
   * Ingress — `text`
   *
   *
   */
  description?: string;

  /**
   * Forfatter — `reference`
   *
   *
   */
  author?: SanityReference<Author>;

  /**
   * Publiseringstidspunkt — `datetime`
   *
   *
   */
  publishedAt?: string;

  /**
   * Brødtekst — `articleContent`
   *
   *
   */
  body?: ArticleContent;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Relaterte artikler — `array`
   *
   *
   */
  relatedArticles?: Array<SanityKeyedReference<Article>>;

  /**
   * Stillingsannonser — `array`
   *
   * Hvis dere ønsker å overskrive annonser, kan det gjøres her
   */
  ads?: Array<SanityKeyedReference<Ad>>;

  /**
   * Kategori — `reference`
   *
   *
   */
  categories?: SanityReference<Category>;
}

/**
 * Author
 *
 *
 */
export interface Author extends SanityDocument {
  _type: "author";

  /**
   * Fullt navn — `string`
   *
   *
   */
  name?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * E-post — `string`
   *
   *
   */
  email?: string;

  /**
   * Portrett — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Bio — `array`
   *
   *
   */
  bio?: Array<SanityKeyed<SanityBlock>>;
}

/**
 * Category
 *
 *
 */
export interface Category extends SanityDocument {
  _type: "category";

  /**
   * Navn — `string`
   *
   *
   */
  name?: string;
}

/**
 * Ad
 *
 *
 */
export interface Ad extends SanityDocument {
  _type: "ad";

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * text — `simpleBlockContent`
   *
   *
   */
  text?: SimpleBlockContent;

  /**
   * image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * fulltime — `boolean`
   *
   *
   */
  fulltime?: boolean;

  /**
   * Sted — `autocomplete`
   *
   *
   */
  location?: Autocomplete;

  /**
   * link — `url`
   *
   *
   */
  link?: string;

  /**
   * Startdato — `date`
   *
   *
   */
  startDate?: string;

  /**
   * Sluttdato — `date`
   *
   *
   */
  endDate?: string;

  /**
   * Pakketype — `reference`
   *
   *
   */
  packageType?: SanityReference<AdPackageType>;

  /**
   * Annonsør — `reference`
   *
   *
   */
  advertiser?: SanityReference<Company>;
}

/**
 * Package type
 *
 *
 */
export interface AdPackageType extends SanityDocument {
  _type: "adPackageType";

  /**
   * name — `string`
   *
   *
   */
  name?: string;

  /**
   * price — `number`
   *
   * Pris oppgitt i NOK ekskl. MVA
   */
  price?: number;
}

/**
 * Company
 *
 *
 */
export interface Company extends SanityDocument {
  _type: "company";

  /**
   * Navn — `string`
   *
   *
   */
  name?: string;

  /**
   * Logo — `image`
   *
   * Helst .svg
   */
  logo?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Er støttespiller — `boolean`
   *
   *
   */
  isPartner?: boolean;
}

/**
 * Document
 *
 *
 */
export interface Doc extends SanityDocument {
  _type: "doc";

  /**
   * title — `string`
   *
   *
   */
  title?: string;

  /**
   * Slug — `slug`
   *
   *
   */
  slug?: { _type: "slug"; current: string };

  /**
   * Innhold — `blockContent`
   *
   *
   */
  body?: BlockContent;
}

/**
 * Social media
 *
 *
 */
export interface SocialMedia extends SanityDocument {
  _type: "socialMedia";

  /**
   * Name — `string`
   *
   *
   */
  name?: string;

  /**
   * Lenke — `url`
   *
   *
   */
  link?: string;

  /**
   * image — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };
}

export type BlockContent = Array<SanityKeyed<SanityBlock>>;

export type SimpleBlockContent = Array<SanityKeyed<SanityBlock>>;

export type ArticleContent = Array<
  | SanityKeyed<SanityBlock>
  | SanityKeyed<ArticleImage>
  | SanityKeyed<RelatedArticle>
>;

export type ArticleImage = {
  _type: "articleImage";
  /**
   * Bilde — `image`
   *
   *
   */
  image?: {
    _type: "image";
    asset: SanityReference<SanityImageAsset>;
    crop?: SanityImageCrop;
    hotspot?: SanityImageHotspot;
  };

  /**
   * Alt-tekst — `string`
   *
   *
   */
  alt?: string;

  /**
   * Bildetekst — `string`
   *
   *
   */
  caption?: string;
};

export type RelatedArticle = {
  _type: "relatedArticle";
  /**
   * Relatert artikkel — `reference`
   *
   *
   */
  article?: SanityReference<Article>;
};

export type Documents =
  | SiteSettings
  | Article
  | Author
  | Category
  | Ad
  | AdPackageType
  | Company
  | Doc
  | SocialMedia;

/**
 * This interface is a stub. It was referenced in your sanity schema but
 * the definition was not actually found. Future versions of
 * sanity-codegen will let you type this explicity.
 */
type Autocomplete = any;
