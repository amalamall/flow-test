import StockChart from "@/components/Chart";
import type { NextPage } from "next";
import { companyData } from '@/interfaces';
import StockSuggestion from "@/components/Suggestion";

interface HomeProps {
  companyData: companyData[];
}

const Home: NextPage<HomeProps> = ({ companyData }) => {
  return (
    <div style={{ display : 'flex' , flexDirection : 'column' , gap : '100px', justifyContent : 'center'}}>
        <StockChart data={companyData} />
        <StockSuggestion companyData={companyData} />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const response = await fetch('http://localhost:3000/api/companies?companies=GOOGLE,AMAZON'); 
    const data = await response.json();
    if (data.status === 'success') {
      const companyData: companyData[] = data.Companies;
      return {
        props: {
          companyData,
        },
      };
    } else {
      return {
        props: {
          companyData: [],
        },
      };
    }
  } catch (error) {
    console.error('an error occurred while fetching data:', error);
    return {
      props: {
        companyData: [],
      },
    };
  }
}
