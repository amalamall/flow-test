import React, { useState, useEffect } from 'react';
import { StockSuggestionProps } from '@/interfaces';
import { bestDates, userNameMap } from '@/types';
import { calculateBestBuyAndSellDatesForEachCompany } from '@/utils';

const userNamesWithCompanies: userNameMap = {
    'AMAZON': 'Aymen',
    'GOOGLE': 'Anouar'
}

function StockSuggestion({ companyData }: StockSuggestionProps) {
    const [bestDates, setBestDates] = useState<bestDates>({});
    useEffect(() => {
        const bestDatesByCompany = calculateBestBuyAndSellDatesForEachCompany(companyData, userNamesWithCompanies);
        setBestDates(bestDatesByCompany);
    }, [companyData]);

    return (
        <div style={{ textAlign: "center", borderRadius: 15, margin: 10, padding: 24, backgroundColor: "#ebebeb" }}>
            <h2 >Meilleures dates d’achat et de vente par entreprise</h2>
            <ul style={{ textAlign: "start" }}>
                {Object.keys(bestDates).map((company) => {
                    const companyName = company
                    const userName = bestDates[company].userName
                    const bestBuyDate = new Date(Number(bestDates[company].bestBuy)).toLocaleDateString("fr-FR")
                    const bestBuyPrice = bestDates[company].bestBuyPrice || 1
                    const bestSellDate = new Date(Number(bestDates[company].bestSell)).toLocaleDateString("fr-FR")
                    const bestSellPrice = bestDates[company].bestSellPrice
                    const maxProfit = Number(bestDates[company].maxProfit?.toFixed(2)) *
                        Number((100_000 / bestBuyPrice).toFixed(2))
                    return (
                        <li key={company}>
                            {bestDates[company].bestBuy && bestDates[company].bestSell ? (
                                <h4>
                                    <span style={{ color: "#bf5300" }}>{userName}</span> devrait acheter 100 000 € action <span style={{ color: "#bf5300" }}>{companyName}</span> le <span style={{ color: "#3584f2" }}>{bestBuyDate}</span> au prix de {' '}<span style={{ color: "#3584f2" }}>{bestBuyPrice}</span>{' '}€.
                                    il devrait ensuite vendre ces actions le <span style={{ color: "#bf0040" }}>{bestSellDate}</span> au prix de <span style={{ color: "#bf0040"}}>{bestSellPrice}</span>{' '}€ pour faire un gain de
                                    {' '}<span style={{ color: "#00bf33"}}>{maxProfit}</span>{' '}€.
                                </h4>
                            ) : (
                                <p>No suitable buy/sell dates found for {company}.</p>
                            )}
                        </li>
                    )
                })}
            </ul>

        </div>
    );
}

export default StockSuggestion;


