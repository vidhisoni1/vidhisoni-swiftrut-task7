import React, { useState } from 'react';

const ExpenseForm = ({ onSubmit, initialData }) => {
  const [amount, setAmount] = useState(initialData ? initialData.amount : '');
  const [description, setDescription] = useState(initialData ? initialData.description : '');
  const [category, setCategory] = useState(initialData ? initialData.category : '');
  const [paymentMethod, setPaymentMethod] = useState(initialData ? initialData.paymentMethod : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, description, category, paymentMethod });
  };

  return (
    <form onSubmit={handleSubmit}>
      
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="number"
          id="amount"
          className="form-control"
          placeholder="Amount"  
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          id="description"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input
          type="text"
          id="category"
          className="form-control"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="paymentMethod" className="form-label">Payment Method</label>
        <select
          id="paymentMethod"
          className="form-select"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="" disabled>Select Payment Method</option>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
