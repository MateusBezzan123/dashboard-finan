import React, { useMemo } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables, CategoryScale } from 'chart.js';

Chart.register(...registerables, CategoryScale);

export default function Charts({ transactions }: { transactions: any[] }) {
  const { barData, lineData } = useMemo(() => {
    const dataByAccount = transactions.reduce((acc, t) => {
      acc[t.account] = (acc[t.account] || 0) + parseFloat(t.amount);
      return acc;
    }, {});

    const barData = {
      labels: Object.keys(dataByAccount),
      datasets: [
        {
          label: 'Valor por Conta',
          data: Object.values(dataByAccount),
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderWidth: 1,
        },
      ],
    };

    const lineData = {
      labels: transactions.map(t => new Date(t.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Transações ao Longo do Tempo',
          data: transactions.map(t => parseFloat(t.amount)),
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    };

    return { barData, lineData };
  }, [transactions]);

  return (
    <div>
      <Bar data={barData} />
      <Line data={lineData} />
    </div>
  );
}