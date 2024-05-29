import { StructureBuilder } from 'sanity/desk';
import { ShopifyIcon } from '../components/icons/ShopifyIcon';
import {InfoOutlineIcon} from '@sanity/icons';


function getProductTitle(S, id) {
  let title = S.document().schemaType('product').documentId(id).preview.title;
  return title;
}

export default (S: StructureBuilder) =>
  S.listItem()
    .title('Produkter')
    .icon(ShopifyIcon)
    .schemaType('product')
    .child(
      S.documentTypeList('product')
      .title('Produkt')
      .child(async (id) =>
        S.list()
          .title(id)
          .canHandleIntent(
            (intentName, params) =>
              intentName === 'edit' && params.type === 'product',
          )
          .items([
            S.listItem()
              .title('Detaljer')
              .icon(InfoOutlineIcon)
              .schemaType('product')
              .id(id)
              .child(S.document().schemaType('product').documentId(id)),
            S.listItem()
              .title('Varianter')
              .schemaType('productVariant')
              .child(
                S.documentList()
                  .title('Varianter')
                  .schemaType('productVariant')
                  .filter(
                    `
                    _type == "productVariant"
                    && store.productId == $productId
                  `,
                  )
                  .params({
                    productId: Number(id.replace('shopifyProduct-', '')),
                  })
                  .canHandleIntent(
                    (intentName, params) =>
                      intentName === 'edit' &&
                      params.type === 'productVariant',
                  ),
              )
          ])
      )
    );


    