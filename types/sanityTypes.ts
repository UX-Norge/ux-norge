export interface SanityDocument {
  _id: string;
  _createdAt: string;
  _rev: string;
  _updatedAt: string;
}

// https://www.sanity.io/plugins/gatsby-plugin-sanity-image
export interface SanityImage {
  asset: any;
  hotspot: any;
  crop: any;
}

export type SanitySlug = {
  _type: "slug";
  current: string;
};

export type PortableText = any[] | any;
