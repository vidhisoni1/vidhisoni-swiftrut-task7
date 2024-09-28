import React, { useState } from 'react';
import axios from '../services/Service';

const AddExpense = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handleAddExpense = async () => {
    try {
      const expenseData = { description, amount, category, paymentMethod };
      await axios.post('/api/expenses', expenseData);
      alert('Expense added successfully');
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <div className="container mt-4 col-6">
      <h1 className="text-center mb-4">Add Expense</h1>

      <div className="mb-4">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          id="amount"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="form-label">Category</label>
        <input
          type="text"
          id="category"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="form-select"
        >
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </select>
      </div>

      <button
        onClick={handleAddExpense}
        className="btn btn-success "
      >
        Add Expense
      </button>
    </div>
  );
};

export default AddExpense;
