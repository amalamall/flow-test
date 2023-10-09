import { calculateBestBuyAndSellDatesForEachCompany } from "./index";
import { bestDates, userNameMap } from "@/types";
import { companyData } from "@/interfaces";


describe("calculateBestBuyAndSellDatesForEachCompany", () => {
  test("calculates best buy and sell dates price from 10 to 40", () => {
    const data: companyData[] = [
      {
        "id": 7535,
        "company": "GOOGLE",
        "v": 25224500,
        "vw": 144.8282,
        "o": 144.4755,
        "c": 10,
        "highestPriceOfTheDay": 145.55,
        "lowestPriceOfTheDay": 143.5025,
        "timestamp": Number("1641186000000"),
        "n": 78529
    },
    {
        "id": 7536,
        "company": "GOOGLE",
        "v": 22927780,
        "vw": 144.816,
        "o": 145.5505,
        "c": 20,
        "highestPriceOfTheDay": 146.61,
        "lowestPriceOfTheDay": 143.8161,
        "timestamp": Number("1641272400000"),
        "n": 78069
    },
    {
        "id": 7537,
        "company": "GOOGLE",
        "v": 49641520,
        "vw": 139.9301,
        "o": 144.181,
        "c": 30,
        "highestPriceOfTheDay": 144.298,
        "lowestPriceOfTheDay": 137.5235,
        "timestamp": Number("1641358800000"),
        "n": 155209
    },
    {
        "id": 7538,
        "company": "GOOGLE",
        "v": 29049040,
        "vw": 138.1496,
        "o": 137.4975,
        "c": 40,
        "highestPriceOfTheDay": 139.686,
        "lowestPriceOfTheDay": 136.7635,
        "timestamp": Number("1641445200000"),
        "n": 94828
    },
    ];
    const users: userNameMap = {
      'GOOGLE': 'Aymane'
    };
    const result: bestDates = calculateBestBuyAndSellDatesForEachCompany(data, users);
    expect(result).toEqual({
        GOOGLE: {
          bestBuy: '1641186000000',
          bestSell: '1641445200000',
          maxProfit: 30,
          userName: 'Aymane',
          bestBuyPrice: 10, // first array element cheapest price 10 euros
          bestSellPrice: 40, // last array element highest price 40 euros
        }
      });
  });

  test("calculates best buy and sell dates price from 40 to 10", () => {
    const data: companyData[] = [
        {
            "id": 7535,
            "company": "GOOGLE",
            "v": 25224500,
            "vw": 144.8282,
            "o": 144.4755,
            "c": 40,
            "highestPriceOfTheDay": 145.55,
            "lowestPriceOfTheDay": 143.5025,
            "timestamp": Number("1641186000000"),
            "n": 78529
        },
        {
            "id": 7536,
            "company": "GOOGLE",
            "v": 22927780,
            "vw": 144.816,
            "o": 145.5505,
            "c": 20,
            "highestPriceOfTheDay": 146.61,
            "lowestPriceOfTheDay": 143.8161,
            "timestamp": Number("1641272400000"),
            "n": 78069
        },
        {
            "id": 7537,
            "company": "GOOGLE",
            "v": 49641520,
            "vw": 139.9301,
            "o": 144.181,
            "c": 30,
            "highestPriceOfTheDay": 144.298,
            "lowestPriceOfTheDay": 137.5235,
            "timestamp": Number("1641358800000"),
            "n": 155209
        },
        {
            "id": 7538,
            "company": "GOOGLE",
            "v": 29049040,
            "vw": 138.1496,
            "o": 137.4975,
            "c": 10,
            "highestPriceOfTheDay": 139.686,
            "lowestPriceOfTheDay": 136.7635,
            "timestamp": Number("1641445200000"),
            "n": 94828
        },
    ];
    const users: userNameMap = {
      'GOOGLE': 'Aymane'
    };
    const result: bestDates = calculateBestBuyAndSellDatesForEachCompany(data, users);
    expect(result).toEqual({
            GOOGLE: {
              bestBuy: '1641272400000',
              bestSell: '1641358800000',
              maxProfit: 10,
              userName: 'Aymane',
              bestBuyPrice: 20,
              bestSellPrice: 30
            }
      });
  });

});
