
type PriceObject = {
  minVariantPrice: number;
  maxVariantPrice: number;
};

let DEFAULT_LOCALE = {
  country: 'NO',
  currency: 'NOK',
  isoCode: 'no',
  label: 'Norge (NOK)',
  language: 'NO',
  languageLabel: 'Norsk',
  salesChannel: 'hydrogen',
}

const DEFAULT_CURRENCY_CODE = DEFAULT_LOCALE.currency;

const formatNumber = (val: number) => {
  return new Intl.NumberFormat('no', {
    currency: DEFAULT_CURRENCY_CODE,
    style: 'currency',
  }).format(val);
};

export const getPriceRange = (price: PriceObject) => {
  if (!price || typeof price?.minVariantPrice === 'undefined') {
    return 'No price found';
  }
  if (
    price.maxVariantPrice &&
    price.minVariantPrice !== price.maxVariantPrice
  ) {
    return `${formatNumber(price.minVariantPrice)} - ${formatNumber(price.maxVariantPrice)}`;
  }

  return formatNumber(price.minVariantPrice);
};