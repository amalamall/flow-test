import * as CompanyService from '../services/companyService';
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs/promises';

export async function getAllCompanies(request: NextRequest) {
  try {
    const companies_query = request.nextUrl.searchParams.get('companies')
    const companies = companies_query && companies_query.split(',') || null
    const Companies = await CompanyService.getAllCompanies(companies);
    let json_response = {
      status: "success",
      results: Companies.length,
      Companies,
    };
    return NextResponse.json(json_response);
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


export async function seedCompanies(request: NextRequest, res: NextResponse) {
  try {
    const jsonData = await fs.readFile('./src/app/api/seedFile/StockPrices.json', 'utf-8');
    const data = JSON.parse(jsonData);
    const newCompanies = await CompanyService.seedCompanies(data);
    let json_response = {
      status: "success",
      data: {
        newCompanies,
      },
    };
    return new NextResponse(JSON.stringify(json_response), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    let error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/* 
Using JSON.stringify() with any BigInt value will raise a TypeError, as BigInt values aren't serialized in JSON by default
we implement our own toJSON() method
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
*/
declare global {
  interface BigInt {
    toJSON(): string;
  }
}
BigInt.prototype.toJSON = function () {
  return this.toString();
};