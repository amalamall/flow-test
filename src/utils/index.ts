import { bestDates, dataByCompany, userNameMap } from "@/types";
import { companyData } from "@/interfaces";

export const calculateBestBuyAndSellDatesForEachCompany = (data: companyData[], userNameMap: userNameMap): bestDates => {
    const bestDates: bestDates = {};
    const dataByCompany: dataByCompany = {};
            data.forEach((item) => {
                if (!dataByCompany[item.company]) {
                    dataByCompany[item.company] = [];
                }
                dataByCompany[item.company].push(item);
            });

    for (const company in dataByCompany) {
        const companyData = dataByCompany[company];
        let bestBuyDate: string | null = null;
        let bestSellDate: string | null = null;
        let maxProfit: number = 0;
        let userName: string | null = null
        let bestBuyPrice: number = 0;
        let bestSellPrice: number = 0;

        for (let i = 0; i < companyData.length - 1; i++) {
            for (let j = i + 1; j < companyData.length; j++) {
                const buyPrice = companyData[i].c; // this is closing price on buy date
                const sellPrice = companyData[j].c; // this is closing price on sell date
                const profit = sellPrice - buyPrice;

                if (profit > maxProfit) {
                    maxProfit = profit
                    bestBuyDate = String(companyData[i].timestamp)
                    bestSellDate = String(companyData[j].timestamp)
                    userName = userNameMap[companyData[i].company]
                    bestBuyPrice = companyData[i].c;
                    bestSellPrice = companyData[j].c;
                }
            }
        }

        bestDates[company] = { bestBuy: bestBuyDate, bestSell: bestSellDate, maxProfit, userName, bestBuyPrice, bestSellPrice };
    }
    return bestDates;
}