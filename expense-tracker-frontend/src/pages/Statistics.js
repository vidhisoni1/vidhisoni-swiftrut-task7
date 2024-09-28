import React, { useState, useEffect } from 'react';
import axios from '../services/Service';
import { Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const Statistics = () => {
  const [expenses, setExpenses] = useState([]);
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  // Fetch expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses');
        setExpenses(response.data);
        if (response.data.length > 0) {
          generateLineChart(response.data);
          generatePieChart(response.data);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  // Generate data for Line Chart (Spending over time)
  const generateLineChart = (expenses) => {
    const sortedExpenses = expenses.sort((a, b) => new Date(a.date) - new Date(b.date));
    const dates = sortedExpenses.map((expense) => new Date(expense.date).toLocaleDateString());
    const amounts = sortedExpenses.map((expense) => expense.amount);

    setLineChartData({
      labels: dates,
      datasets: [
        {
          label: 'Total Expenses Over Time',
          data: amounts,
          fill: false,
          backgroundColor: 'rgb(75, 192, 192)',
          borderColor: 'rgba(75, 192, 192, 0.2)',
        },
      ],
    });
  };

  // Generate data for Pie Chart (Expenses by Category)
  const generatePieChart = (expenses) => {
    const categoryAmounts = {};
    expenses.forEach((expense) => {
      categoryAmounts[expense.category] = (categoryAmounts[expense.category] || 0) + expense.amount;
    });

    setPieChartData({
      labels: Object.keys(categoryAmounts),
      datasets: [
        {
          label: 'Expenses by Category',
          data: Object.values(categoryAmounts),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF5722', '#8BC34A'], // Colors for each category
        },
      ],
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5">Expense</h2>

      <div className="row justify-content-center">
        {/* Line Chart - Expenses Over Time */}
        <div className="col-12 col-md-8 mb-5">
          <h3 className="text-center mb-4 text-secondary">Total Expenses Over Time</h3>
          {lineChartData ? (
            <Line data={lineChartData} />
          ) : (
            <p className="text-center text-secondary">Loading Line Chart...</p>
          )}
        </div>

        {/* Pie Chart - Expenses by Category */}
        <div className="col-12 col-md-8">
          <h3 className="text-center mb-4 text-secondary">Expenses by Category</h3>
          {pieChartData ? (
            <Pie data={pieChartData} />
          ) : (
            <p className="text-center text-secondary">Loading Pie Chart...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
