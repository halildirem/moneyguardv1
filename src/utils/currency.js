export const CURRENCY_CODE_NAMES = { 840: 'USD', 978: 'EUR', 826: 'GBP', 949: 'TRY' };

export const CURRENCIES = [
  { code: 'TRY', symbol: '₺' },
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
];

export const CURRENCY_SYMBOLS = CURRENCIES.reduce((acc, currency) => {
  acc[currency.code] = currency.symbol;
  return acc;
}, {});

export const rateAgainstUAH = (rates, code) => {
  const rate = rates.find(
    (item) => CURRENCY_CODE_NAMES[item.currencyCodeA] === code,
  );
  if (!rate) return null;
  return {
    buy: rate.rateBuy ?? rate.rateCross,
    sell: rate.rateSell ?? rate.rateCross,
  };
};

export const convertFromUAH = (amountUAH, currency, rates) => {
  const rate = rateAgainstUAH(rates, currency);
  return rate ? amountUAH / rate.sell : amountUAH;
};
