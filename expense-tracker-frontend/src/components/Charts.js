import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import { ExpenseContext } from '../context/ExpenseContext';

// Register the chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Chart Wrapper
const ChartWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 1000px;
`;

const Charts = () => {
  const { expenses } = useContext(ExpenseContext);

  // Chart Data
  const data = {
    labels: expenses.map((expense) => new Date(expense.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Expenses Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ChartWrapper>
      <Bar data={data} options={options} />
    </ChartWrapper>
  );
};

export default Charts;
