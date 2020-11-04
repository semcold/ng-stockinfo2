export interface StockSymbol {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string;
  currency: string;
  id?: number;
}

export interface CompanyProfile {
  country: string;
  currency: string;
  exchange: string;
  ipo: Date;
  marketCapitalization: number;
  name: string;
  phone: number;
  shareOutstanding: number;
  ticker: string;
  weburl: string;
  logo: string;
  finnhubIndustry: string;
  symbol: string;
}

export interface CompanyProfilesModel {
  companies?: Array<CompanyProfile>;
}

export interface StockCandles {
  c: number;
  h: number;
  l: number;
  o: number;
  s: string;
  t: number;
  v: number;
}

export interface WebSocketList {
  type: string;
  symbol: string;
}
