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

export const BASE_CURRENCY = 'TRY';

export const convertFromBase = (amountBase, currency, rates) => {
  if (currency === BASE_CURRENCY) return amountBase;
  const rate = rates?.[currency];
  if (!rate) return amountBase;
  return amountBase * rate;
};

export const tryPerUnit = (rates, code) => {
  const rate = rates?.[code];
  return rate ? 1 / rate : null;
};

export const formatMoney = (value) =>
  new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value ?? 0);
