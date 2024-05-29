import { CopyIcon } from '@sanity/icons';
import React from 'react';
import { ShopifyDocumentStatus } from '../../components/shopify/ShopifyDocumentStatus';

export default {
  name: 'productVariant',
  title: 'Product variant',
  type: 'document',
  __experimental_formPreviewTitle: false,
  icon: CopyIcon,
  groups: [
    {
      name: 'shopifySync',
      title: 'Shopify sync',
    },
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      hidden: true,
      readOnly: true,
      initialValue: 'store.title',
    },
    // Shopify product variant
    {
      name: 'store',
      title: 'Shopify',
      description: 'Variant data from Shopify (read-only)',
      type: 'shopifyProductVariant',
      group: 'shopifySync',
    },
  ],
  preview: {
    select: {
      isDeleted: 'store.isDeleted',
      previewImageUrl: 'store.previewImageUrl',
      sku: 'store.sku',
      status: 'store.status',
      title: 'store.title',
    },
    prepare(selection) {
      const { isDeleted, previewImageUrl, sku, status, title } = selection;

      return {
        subtitle: sku,
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
