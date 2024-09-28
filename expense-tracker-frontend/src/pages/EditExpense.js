import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ExpenseForm from '../components/Form';

const EditExpense = () => {
  const { id } = useParams();
  const [expense, setExpense] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      const response = await axios.get(`/api/expenses/${id}`);
      setExpense(response.data);
    };

    fetchExpense();
  }, [id]);

  const handleEditExpense = async (updatedExpense) => {
    await axios.patch(`/api/expenses/${id}`, updatedExpense);
    navigate('/');
  };

  if (!expense) return <div className="text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Edit Expense</h1>
      <div className="card p-4 shadow">
        <ExpenseForm onSubmit={handleEditExpense} initialData={expense} />
      </div>
    </div>
  );
};

export default EditExpense;
