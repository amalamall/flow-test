import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import * as CompanyService from '../services/companyService';
import { getAllCompanies, seedCompanies } from './companyController';
import { CompanyData } from '@/types';

jest.mock('../services/companyService', () => ({
    getAllCompanies: jest.fn(),
    seedCompanies: jest.fn(),
}));

jest.mock('fs/promises');

describe('Company Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    test('getAllCompanies should return a JSON response with status error', async () => {
        // we dont mock CompanyService.getAllCompanies function so it throw an error
        const nextRequest = new NextRequest('http://localhost:3000/api/companies/?companies=GOOGLE');
        const response = await getAllCompanies(nextRequest);
        const response_json = await response.json()
        expect(response.status).toBe(500);
        expect(response_json.status).toBe("error");
    });

    test('getAllCompanies with query should return a JSON response with status, results, and companies', async () => {
        const nextRequest = new NextRequest('http://localhost:3000/api/companies/?companies=GOOGLE');
        // We Mock the CompanyService.getAllCompanies function to return an array of 251 items
        const mockCompanies = Array(251).fill({
            "id": 4523,
            "company": "GOOGLE",
            "v": 25224500,
            "vw": 144.8282,
            "o": 144.4755,
            "c": 145.0745,
            "highestPriceOfTheDay": 145.55,
            "lowestPriceOfTheDay": 143.5025,
            "timestamp": "1641186000000",
            "n": 78529
        });
        (CompanyService.getAllCompanies as jest.Mock).mockResolvedValue(mockCompanies);
        const response = await getAllCompanies(nextRequest);
        const response_json = await response.json()
        expect(response.status).toBe(200);
        expect(Array.isArray(response_json.Companies)).toBe(true);
        expect(response_json.status).toBe("success");
    });

    test('getAllCompanies with no query should return a JSON response with status, results, and all companies', async () => {
        const nextRequest = new NextRequest('http://localhost:3000/api/companies/');
        // We Mock the CompanyService.getAllCompanies function to return an array of 753 items
        const mockCompanies = Array(753).fill({
            "id": 4523,
            "company": "GOOGLE",
            "v": 25224500,
            "vw": 144.8282,
            "o": 144.4755,
            "c": 145.0745,
            "highestPriceOfTheDay": 145.55,
            "lowestPriceOfTheDay": 143.5025,
            "timestamp": "1641186000000",
            "n": 78529
        });
        (CompanyService.getAllCompanies as jest.Mock).mockResolvedValue(mockCompanies);
        const response = await getAllCompanies(nextRequest);
        const response_json = await response.json()
        expect(response.status).toBe(200);
        expect(Array.isArray(response_json.Companies)).toBe(true);
        expect(response_json.status).toBe("success");
    });

    test('seedCompanies should return a error response with a error status', async () => {
        // we dont mock fs.readfile so it throw an error
        const nextRequest = new NextRequest('http://localhost:3000/api/companies/seed');
        const nextResponse = new NextResponse();
        const response = await seedCompanies(nextRequest, nextResponse);
        const response_json = await response.json()
        expect(response.status).toBe(500);
        expect(response_json.status).toBe("error");
    });

    test('seedCompanies should return a JSON response with a success status', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify({ companies: [] }));
        const sampleNewCompanies: CompanyData[] = [
            {
                company: 'Company1',
                v: 1000,
                vw: 500,
                o: 200,
                c: 300,
                highestPriceOfTheDay: 400,
                lowestPriceOfTheDay: 150,
                timestamp: BigInt('1641186000000'),
                n: 10000,
            },
            {
                company: 'Company2',
                v: 2000,
                vw: 600,
                o: 300,
                c: 400,
                highestPriceOfTheDay: 450,
                lowestPriceOfTheDay: 250,
                timestamp: BigInt('1641187000000'),
                n: 20000,
            },
        ];
        (CompanyService.seedCompanies as jest.Mock).mockResolvedValue(sampleNewCompanies);
        const nextRequest = new NextRequest('http://localhost:3000/api/companies/seed');
        const nextResponse = new NextResponse();
        const response = await seedCompanies(nextRequest, nextResponse);
        const response_json = await response.json()
        expect(response.status).toBe(201);
        expect(response_json.status).toBe("success");
        expect(Array.isArray(response_json.data.newCompanies)).toBe(true);
    });

});


