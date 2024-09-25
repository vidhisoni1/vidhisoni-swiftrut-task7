import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ExpenseContext } from '../context/ExpenseContext'; // Import the context

// Form Wrapper
const FormWrapper = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  max-width: 600px;
  margin: 20px auto;
`;

// Form Title
const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

// Form Fields
const FormField = styled.div`
  margin-bottom: 15px;

  label {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }

  input, select {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-top: 5px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }
`;

// Submit Button
const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ExpenseForm = () => {
  const { addExpense } = useContext(ExpenseContext);  // Get addExpense from context
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount && description && date && category) {
      const newExpense = { amount, description, date, category, paymentMethod };
      addExpense(newExpense); // Call addExpense
      setAmount('');
      setDescription('');
      setDate('');
      setCategory('');
    }
  };

  return (
    <FormWrapper>
      <FormTitle>Add New Expense</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <label>Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </FormField>
        
        <FormField>
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </FormField>

        <FormField>
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
          </select>
        </FormField>

        <SubmitButton type="submit">Add Expense</SubmitButton>
      </form>
    </FormWrapper>
  );
};

export default ExpenseForm;
