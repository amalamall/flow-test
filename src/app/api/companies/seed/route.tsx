import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { seedCompanies } from '../../controllers/companyController';

export async function POST(req: NextRequest, res: NextResponse) {
    return await seedCompanies(req, res)
}