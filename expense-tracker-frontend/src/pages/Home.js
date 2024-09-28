import React, { useState, useEffect } from 'react';
import axios from '../services/Service';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedExpenses, setSelectedExpenses] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); // For Bulk Upload
  const [uploadMessage, setUploadMessage] = useState('');

  const expensesPerPage = 5;
  const pagesVisited = pageNumber * expensesPerPage;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses');
        setExpenses(response.data);
        setFilteredExpenses(response.data); // Initially display all expenses
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  const handleFilter = () => {
    let updatedExpenses = expenses;

    if (category) {
      updatedExpenses = updatedExpenses.filter((expense) => expense.category === category);
    }

    if (paymentMethod) {
      updatedExpenses = updatedExpenses.filter((expense) => expense.paymentMethod === paymentMethod);
    }

    if (searchTerm) {
      updatedExpenses = updatedExpenses.filter((expense) =>
        expense.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredExpenses(updatedExpenses);
  };

  useEffect(() => {
    handleFilter();
  }, [category, paymentMethod, searchTerm, expenses]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleBulkUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('/api/expenses/bulk-upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadMessage('Bulk upload successful');
      window.location.reload(); // Reload to see updated expenses
    } catch (error) {
      console.error('Bulk upload failed:', error);
      setUploadMessage('Bulk upload failed');
    }
  };

  const displayExpenses = filteredExpenses
    .slice(pagesVisited, pagesVisited + expensesPerPage)
    .map((expense) => (
      <tr key={expense._id}>
        <td className="text-center">
          <input
            type="checkbox"
            className="form-check-input"
            checked={selectedExpenses.includes(expense._id)}
            onChange={() => handleSelectExpense(expense._id)}
          />
        </td>
        <td>{expense.description}</td>
        <td>${expense.amount}</td>
        <td>{expense.category}</td>
        <td>
          {editId === expense._id ? (
            <div className="d-flex">
              <input
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="form-control me-2"
              />
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="form-control me-2"
              />
              <button onClick={() => handleSave(expense._id)} className="btn btn-success me-2">
                Save
              </button>
            </div>
          ) : (
            <>
              <button onClick={() => handleEdit(expense)} className="btn btn-warning me-2">
                Edit
              </button>
              <button onClick={() => handleDelete(expense._id)} className="btn btn-danger">
                Delete
              </button>
            </>
          )}
        </td>
      </tr>
    ));

  const pageCount = Math.ceil(filteredExpenses.length / expensesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleEdit = (expense) => {
    setEditId(expense._id);
    setEditDescription(expense.description);
    setEditAmount(expense.amount);
  };

  const handleSave = async (id) => {
    try {
      await axios.patch(`/api/expenses/${id}`, {
        description: editDescription,
        amount: editAmount,
      });
      setEditId(null);
      window.location.reload(); // Reload page to see the changes
    } catch (error) {
      console.error('Error saving expense:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/expenses/${id}`);
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleSelectExpense = (id) => {
    setSelectedExpenses((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post('/api/expenses/bulk-delete', { ids: selectedExpenses });
      setExpenses((prevExpenses) => prevExpenses.filter((expense) => !selectedExpenses.includes(expense._id)));
      setSelectedExpenses([]);
    } catch (error) {
      console.error('Error deleting expenses:', error);
    }
  };

  return (
    <div className="container mt-5 ">
     
      <h1 className="mb-4">Expenses</h1>

      {/* Filter Section */}
      <div className=" mb-4">
        <div className="col-md-6 mb-4">
          <label htmlFor="" className='text-secondary mb-2 '>Discription</label>
          <input
            type="text"
            placeholder="Search by description"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control text-secondary"
          />
        </div>
        

        <div className="col-md-6 mb-4">
          <label htmlFor="" className='mb-2 text-secondary'>  All Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="form-select w-100 text-secondary">
            <option value="">Categories</option>
            <option value="Food">Insurance</option>
            <option value="Transport">Travelling</option>
            <option value="Transport">Food</option>
            <option value="Transport">Health</option>
          </select>
        </div>

        <div className="col-md-6 ">
          <label htmlFor="" className='mb-2 text-secondary'>Payment</label>
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="form-select w-100 text-secondary">
            <option value="">All Payment Methods</option>
            <option value="cash">Cash</option>
            <option value="credit">Credit</option>
          </select>
        </div>
      </div>

      {/* Bulk Upload Section */}
      <div className="mb-4 col-md-6">
        <h2 className="mb-3"> Upload Expenses</h2>
        <label htmlFor="" className='mb-2'>Select the File </label>
        <input type="file" onChange={handleFileChange} className="form-control " />
        <button onClick={handleBulkUpload} className="btn btn-info text-light mt-2">
          Upload
        </button>
        {uploadMessage && <p className="mt-2 text-danger">{uploadMessage}</p>}
      </div>

      {/* Display Filtered Expenses in Table Format */}
      <table className="table table-striped">
        <thead className="table-success text-secondery">
          <tr>
            <th>Select</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayExpenses.length > 0 ? displayExpenses : (
            <tr>
              <td colSpan="5" className="text-center">No expenses found</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={handleBulkDelete} disabled={selectedExpenses.length === 0} className="btn btn-danger mt-4">
        Delete Selected
      </button>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"pagination justify-content-center mt-4"}
        activeClassName={"page-item active"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
      />
    </div>
  );
};

export default Home;
