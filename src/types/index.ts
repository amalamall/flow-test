import { companyData } from "@/interfaces"

export type CompanyData = {
  company: string,
  v: number,
  vw: number,
  o: number,
  c: number,
  highestPriceOfTheDay: number,
  lowestPriceOfTheDay: number,
  timestamp: bigint,
  n: number
}
export type bestDates = {
  [company: string]: {
    bestBuy: string | null,
    bestSell: string | null,
    maxProfit: number,
    userName: string | null,
    bestSellPrice: number,
    bestBuyPrice: number ,
  }
} 

export type dataByCompany = { [company: string]: companyData[] }

export type userNameMap = { [company: string]: string }
