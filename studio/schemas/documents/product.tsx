import React from 'react';
import { getPriceRange } from '../../utils/getPriceRange';
import { ShopifyDocumentStatus } from '../../components/shopify/ShopifyDocumentStatus';

const GROUPS = [
  {
    name: 'editorial',
    title: 'Editorial',
    default: true,
  },
  {
    name: 'shopifySync',
    title: 'Shopify sync',
  },
  {
    name: 'seo',
    title: 'SEO',
  },
];

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: GROUPS,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      readOnly: true,
      initialValue: 'store.title',
    },
    {
      name: 'store',
      title: 'Shopify',
      type: 'shopifyProduct',
      description: 'Product data from Shopify (read-only)',
      group: 'shopifySync',
    },
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      options: 'store.options',
      previewImageUrl: 'store.previewImageUrl',
      priceRange: 'store.priceRange',
      status: 'store.status',
      title: 'store.title',
      variants: 'store.variants',
    },
    prepare(selection: any) {
      const {
        isDeleted,
        options,
        previewImageUrl,
        priceRange,
        status,
        title,
        variants,
      } = selection;

      const optionCount = options?.length;
      const variantCount = variants?.length;

      let description = [
        variantCount ? variantCount + ' varianter' : 'Ingen varianter',
        optionCount ? optionCount + ' options' : 'No options',
      ];

      let subtitle = getPriceRange(priceRange);
      if (status !== 'active') {
        subtitle = '(Unavailable in Shopify)';
      }
      if (isDeleted) {
        subtitle = '(Deleted from Shopify)';
      }

      return {
        description: description.join(' / '),
        subtitle,
        title,
        media: () => (
          <ShopifyDocumentStatus
            isActive={status === 'active'}
            isDeleted={isDeleted}
            type='product'
            url={previewImageUrl}
            title={title}
          />
        ),
      };
    },
  },
};
