import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { getAllCompanies } from '../controllers/companyController';

export async function GET(req: NextRequest, res: NextResponse) {
    return await getAllCompanies(req)
}
