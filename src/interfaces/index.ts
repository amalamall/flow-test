export interface companyData {
  id: number,
  company: string;
  v: number;
  vw: number;
  o: number;
  c: number;
  highestPriceOfTheDay: number;
  lowestPriceOfTheDay: number;
  timestamp: number;
  n: number;
}

export interface StockChartProps {
  data: companyData[];
}

export interface StockSuggestionProps {
  companyData: companyData[];
}

