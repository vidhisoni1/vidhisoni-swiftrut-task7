// src/context/ExpenseContext.js
import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: '', dateRange: null, paymentMethod: '' });
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch expenses from backend
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await API.get('/expenses', {
          params: {
            page: currentPage,
            limit: 5,
            ...filters,
          },
        });
        setExpenses(res.data.expenses);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [filters, currentPage]);

  // Add expense
  const addExpense = async (expense) => {
    try {
      const res = await API.post('/expenses', expense);
      setExpenses([...expenses, res.data]);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        setExpenses,
        filters,
        setFilters,
        totalPages,
        currentPage,
        setCurrentPage,
        addExpense,  // Ensure addExpense is passed here
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
