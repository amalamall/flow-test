import * as companyRepository from '../repositories/companyRepository';
import { CompanyData } from '../../../types';

export async function getAllCompanies(companies: string[] | null) {
  return await companyRepository.getCompanies(companies);
}

export async function seedCompanies(companiesArray: CompanyData[]) {
  return await companyRepository.seedCompanies(companiesArray);
}
