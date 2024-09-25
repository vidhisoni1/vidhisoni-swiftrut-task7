import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ExpenseContext } from '../context/ExpenseContext';

const FilterWrapper = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Filters = () => {
  const { setFilters } = useContext(ExpenseContext);
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFilter = () => {
    setFilters({ category, paymentMethod, dateRange: [startDate, endDate] });
  };

  return (
    <FilterWrapper>
      <h3>Filters</h3>
      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">All</option>
          <option value="cash">Cash</option>
          <option value="credit">Credit</option>
        </select>
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button onClick={handleFilter}>Apply Filters</button>
    </FilterWrapper>
  );
};

export default Filters;
