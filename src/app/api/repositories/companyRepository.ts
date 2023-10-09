import prisma from '../services/prismaService';
import { CompanyData } from '../../../types';

export async function getCompanies(companyNames: string[] | null) {
  try {
    const conditions = companyNames && {
      where: {
        company: {
          in: companyNames,
        },
      },
    } || undefined
    return await prisma.companyData.findMany(conditions);
    } catch (error) {
    throw error
  } finally {
    console.log("disconnecting prisma...");
    await prisma.$disconnect()
  }
}


export async function seedCompanies(dataArray: CompanyData[]) {
  try {
    await prisma.companyData.deleteMany({})
    let insertedData: CompanyData[] = []
    await prisma.$transaction(async (transaction) => {
      for (const data of dataArray) {
        const createdData = await transaction.companyData.create({
          data,
        });
        insertedData.push(createdData);
      }
    });
    return insertedData
  } catch (error) {
    throw error
  } finally {
    console.log("disconnecting prisma...");
    await prisma.$disconnect()
  }
}


