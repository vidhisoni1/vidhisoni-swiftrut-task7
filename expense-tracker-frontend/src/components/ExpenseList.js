import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { ExpenseContext } from '../context/ExpenseContext';

// Table Container
const TableContainer = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  max-width: 1000px;
  margin: 20px auto;
  overflow-x: auto; /* Make table scrollable on small devices */
`;

// Table Styling
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f8f9fa;
    font-weight: bold;
    color: #333;
  }

  tr:hover {
    background-color: #f4f4f4;
  }

  td {
    color: #555;
  }
`;

// Button Styling
const Button = styled.button`
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

// Delete Button
const DeleteButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #c82333;
  }
`;

const ExpenseList = () => {
  const { expenses, deleteExpense } = useContext(ExpenseContext);
  const [editId, setEditId] = useState(null);
  const [editFields, setEditFields] = useState({});

  const handleEdit = (expense) => {
    setEditId(expense._id);
    setEditFields({ ...expense });
  };

  const handleSave = (id) => {
    // Call the update function here once implemented
    setEditId(null);
  };

  return (
    <TableContainer>
      <h2>Expense List</h2>
      <Table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Date</th>
            <th>Category</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{expense.amount}</td>
              <td>{expense.description}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
              <td>{expense.category}</td>
              <td>{expense.paymentMethod}</td>
              <td>
                <Button onClick={() => handleEdit(expense)}>Edit</Button>
                <DeleteButton onClick={() => deleteExpense(expense._id)}>Delete</DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
