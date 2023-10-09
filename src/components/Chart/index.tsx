import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { StockChartProps } from '@/interfaces';


const StockChart: React.FC<StockChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [companies, setCompanies] = useState<string[]>([])

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const ctx = chartRef.current.getContext('2d');

    if (!ctx) {
      console.error('Canvas context is null.');
      return;
    }

    // unique company names
    const uniqueCompanies = Array.from(new Set(data.map((item) => item.company)));
    setCompanies(uniqueCompanies)

    // datasets for each company
    const datasets = uniqueCompanies.map((company) => {
      const companyData = data.filter((item) => item.company === company);

      return {
        label: company,
        data: companyData.map((item) => item.c), // (c : closing price) as data
        fill: false,
        borderColor: getRandomColor(),
        borderWidth: 1,
      };
    });

    const chart = new ChartJS(ctx, {
      type: 'line',
      data: {
        // timestamps as labels
        labels: data.map((item) =>
          new Date(Number(item.timestamp))
        ), 
        datasets: datasets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            // months on the X-axis
            time: {
              unit: 'month', 
            },
          },
          y: {
            title: {
              display: true,
              text: 'Stock Price',
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return <div style={{ height: '400px'}}>
    <h1 style={{ textAlign: "center", borderRadius: 15, margin: 10, padding: 24, backgroundColor: "#d9e7ff" }}>{`Evolution Des Prix Des Actions: ${companies.join(', ')}`}</h1>
    <canvas ref={chartRef} />
  </div>

};

export default StockChart;

