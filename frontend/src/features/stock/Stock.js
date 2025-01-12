// I have NO idea why, but the arrow emotes seem to take up
// 4 bytes instead of 2, so to compensate, the checkbox emote
// has a whitespace after it. not scuffed LOL
const num_to_emote = {
  "-2": "⬆️",
  "-1": "↗️",
  0: "✅ ",
  1: "↘️",
  2: "⬇️",
};

const shorten_sector = (s) => {
  if (s === "Financial Services") return "Financials";
  else if (s === "Consumer Defensive") return "Consumer Staples";
  else if (s === "Communication Services") return "Communications";
  else if (s === "Basic Materials") return "Materials";
  else return s;
};

const shorten_number = (n) => {
  if (n < 1000000) return n;
  else if (n < 1000000000) return `${Math.floor(n / 10000) / 100}M`;
  else if (n < 1000000000000) return `${Math.floor(n / 10000000) / 100}B`;
  return `${Math.floor(n / 10000000000) / 100}T`;
};

// s1 and s2 are both objects created using createStock
// s1 is today's answer
// s2 is the current guess
const compare = (s1, s2) => {
  return [
    s2.symbol.toUpperCase(),
    compare_sector(s1.sector, s2.sector),
    compare_price(s1.currentPrice, s2.currentPrice),
    compare_cap(s1.marketCap, s2.marketCap),
    compare_revenue(s1.totalRevenue, s2.totalRevenue),
    compare_pe(s1.marketCap, s1.netIncomeToCommon, s2.marketCap, s2.netIncomeToCommon),
  ];
};

const compare_sector = (s1, s2) => {
  if (s1 === s2) return `${shorten_sector(s2)} ✅`;
  return `${shorten_sector(s2)} ❌`;
};

const compare_price = (s1, s2) => {
  var x = 1;
  if (s1 === s2) x = 0;
  if (s2 < s1) x *= -1;
  if (Math.abs(s2 - s1) / s1 > 0.3) x *= 2;
  return `$${s2.toFixed(2)} ${num_to_emote[x]}`;
};

const compare_cap = (s1, s2) => {
  var x = 1;
  if (s1 === s2) x = 0;
  if (s2 < s1) x *= -1;
  if (Math.abs(s2 - s1) / s1 > 0.3) x *= 2;
  return `${shorten_number(s2)} ${num_to_emote[x]}`;
};

const compare_revenue = (s1, s2) => {
  var x = 1;
  if (s1 === s2) x = 0;
  if (s2 < s1) x *= -1;
  if (Math.abs(s2 - s1) / s1 > 0.3) x *= 2;
  return `${shorten_number(s2)} ${num_to_emote[x]}`;
};

const compare_pe = (s1mc, s1ni, s2mc, s2ni) => {
  var s1 = s1mc / s1ni > 0 ? s1mc / s1ni : -1;
  var s2 = s2mc / s2ni > 0 ? s2mc / s2ni : -1;

  if (s1 === -1 && s2 === -1) {
    return `N/A ${num_to_emote[0]}`;
  } else if (s1 === -1) {
    return `${Math.round(s2)} ${num_to_emote[-2]}`;
  } else if (s2 === -1) {
    return `N/A ${num_to_emote[2]}`;
  } else if (Math.round(s1) === Math.round(s2)) {
    return `${Math.round(s2)} ${num_to_emote[0]}`;
  } else {
    var x = 1;
    if (s2 < s1) x *= -1;
    if (Math.abs(s2 - s1) / s1 > 0.3) x *= 2;
    return `${Math.round(s2)} ${num_to_emote[x]}`;
  }
};

const createStock = (data) => {
  if (
    !data ||
    !data.price ||
    !data.summaryProfile ||
    !data.financialData ||
    !data.defaultKeyStatistics
  ) {
    throw new Error("Invalid data object passed to Stock constructor");
  }

  const stock = {
    id: data.id,

    // Default Key Statistics
    maxAge: data.defaultKeyStatistics.maxAge,
    priceHint: data.defaultKeyStatistics.priceHint,
    enterpriseValue: data.defaultKeyStatistics.enterpriseValue,
    forwardPE: data.defaultKeyStatistics.forwardPE,
    floatShares: data.defaultKeyStatistics.floatShares,
    sharesOutstanding: data.defaultKeyStatistics.sharesOutstanding,
    sharesShort: data.defaultKeyStatistics.sharesShort,
    sharesShortPriorMonth: data.defaultKeyStatistics.sharesShortPriorMonth,
    sharesShortPreviousMonthDate:
      data.defaultKeyStatistics.sharesShortPreviousMonthDate,
    dateShortInterest: data.defaultKeyStatistics.dateShortInterest,
    sharesPercentSharesOut: data.defaultKeyStatistics.sharesPercentSharesOut,
    heldPercentInsiders: data.defaultKeyStatistics.heldPercentInsiders,
    heldPercentInstitutions: data.defaultKeyStatistics.heldPercentInstitutions,
    shortRatio: data.defaultKeyStatistics.shortRatio,
    shortPercentOfFloat: data.defaultKeyStatistics.shortPercentOfFloat,
    beta: data.defaultKeyStatistics.beta,
    impliedSharesOutstanding:
      data.defaultKeyStatistics.impliedSharesOutstanding,
    bookValue: data.defaultKeyStatistics.bookValue,
    priceToBook: data.defaultKeyStatistics.priceToBook,
    lastFiscalYearEnd: data.defaultKeyStatistics.lastFiscalYearEnd,
    nextFiscalYearEnd: data.defaultKeyStatistics.nextFiscalYearEnd,
    mostRecentQuarter: data.defaultKeyStatistics.mostRecentQuarter,
    earningsQuarterlyGrowth: data.defaultKeyStatistics.earningsQuarterlyGrowth,
    netIncomeToCommon: data.defaultKeyStatistics.netIncomeToCommon,
    trailingEps: data.defaultKeyStatistics.trailingEps,
    forwardEps: data.defaultKeyStatistics.forwardEps,
    lastSplitFactor: data.defaultKeyStatistics.lastSplitFactor,
    lastSplitDate: data.defaultKeyStatistics.lastSplitDate,
    enterpriseToRevenue: data.defaultKeyStatistics.enterpriseToRevenue,
    enterpriseToEbitda: data.defaultKeyStatistics.enterpriseToEbitda,
    weekChange52: data.defaultKeyStatistics["52WeekChange"],
    weekChangeSP52: data.defaultKeyStatistics["SandP52WeekChange"],
    lastDividendValue: data.defaultKeyStatistics.lastDividendValue,
    lastDividendDate: data.defaultKeyStatistics.lastDividendDate,
    dividendYield: data.defaultKeyStatistics.lastDividendValue * 4 / data.price.regularMarketPrice,

    // Summary Profile
    address: data.summaryProfile.address1,
    city: data.summaryProfile.city,
    state: data.summaryProfile.state,
    zip: data.summaryProfile.zip,
    country: data.summaryProfile.country,
    phone: data.summaryProfile.phone,
    website: data.summaryProfile.website,
    industry: data.summaryProfile.industry,
    industryKey: data.summaryProfile.industryKey,
    industryDisp: data.summaryProfile.industryDisp,
    sector: data.summaryProfile.sector,
    sectorKey: data.summaryProfile.sectorKey,
    sectorDisp: data.summaryProfile.sectorDisp,
    longBusinessSummary: data.summaryProfile.longBusinessSummary,
    fullTimeEmployees: data.summaryProfile.fullTimeEmployees,

    // Price
    preMarketSource: data.price.preMarketSource,
    postMarketChangePercent: data.price.postMarketChangePercent,
    postMarketChange: data.price.postMarketChange,
    postMarketTime: data.price.postMarketTime,
    postMarketPrice: data.price.postMarketPrice,
    postMarketSource: data.price.postMarketSource,
    regularMarketChangePercent: data.price.regularMarketChangePercent,
    regularMarketChange: data.price.regularMarketChange,
    regularMarketTime: data.price.regularMarketTime,
    regularMarketPrice: data.price.regularMarketPrice,
    regularMarketDayHigh: data.price.regularMarketDayHigh,
    regularMarketDayLow: data.price.regularMarketDayLow,
    regularMarketVolume: data.price.regularMarketVolume,
    averageDailyVolume10Day: data.price.averageDailyVolume10Day,
    averageDailyVolume3Month: data.price.averageDailyVolume3Month,
    regularMarketPreviousClose: data.price.regularMarketPreviousClose,
    regularMarketSource: data.price.regularMarketSource,
    regularMarketOpen: data.price.regularMarketOpen,
    exchange: data.price.exchange,
    exchangeName: data.price.exchangeName,
    exchangeDataDelayedBy: data.price.exchangeDataDelayedBy,
    marketState: data.price.marketState,
    quoteType: data.price.quoteType,
    symbol: data.price.symbol,
    shortName: data.price.shortName,
    longName: data.price.longName,
    currency: data.price.currency,
    quoteSourceName: data.price.quoteSourceName,
    currencySymbol: data.price.currencySymbol,
    fromCurrency: data.price.fromCurrency,
    toCurrency: data.price.toCurrency,
    lastMarket: data.price.lastMarket,
    marketCap: data.price.marketCap,

    // Financial Data
    currentPrice: data.financialData.currentPrice,
    targetHighPrice: data.financialData.targetHighPrice,
    targetLowPrice: data.financialData.targetLowPrice,
    targetMeanPrice: data.financialData.targetMeanPrice,
    targetMedianPrice: data.financialData.targetMedianPrice,
    recommendationKey: data.financialData.recommendationKey,
    numberOfAnalystOpinions: data.financialData.numberOfAnalystOpinions,
    totalCash: data.financialData.totalCash,
    totalCashPerShare: data.financialData.totalCashPerShare,
    ebitda: data.financialData.ebitda,
    totalDebt: data.financialData.totalDebt,
    quickRatio: data.financialData.quickRatio,
    currentRatio: data.financialData.currentRatio,
    totalRevenue: data.financialData.totalRevenue,
    debtToEquity: data.financialData.debtToEquity,
    revenuePerShare: data.financialData.revenuePerShare,
    returnOnAssets: data.financialData.returnOnAssets,
    returnOnEquity: data.financialData.returnOnEquity,
    freeCashflow: data.financialData.freeCashflow,
    operatingCashflow: data.financialData.operatingCashflow,
    earningsGrowth: data.financialData.earningsGrowth,
    revenueGrowth: data.financialData.revenueGrowth,
    grossMargins: data.financialData.grossMargins,
    ebitdaMargins: data.financialData.ebitdaMargins,
    operatingMargins: data.financialData.operatingMargins,
    profitMargins: data.financialData.profitMargins,
    financialCurrency: data.financialData.financialCurrency,
  };

  return stock;
};

export { createStock, compare };
