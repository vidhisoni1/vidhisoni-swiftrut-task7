import React, { useState } from 'react';
import axios from '../services/Service';

const BulkUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('/api/expenses/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Bulk upload successful!');
    } catch (error) {
      console.error('Error during bulk upload:', error);
      alert('Failed to upload expenses.');
    }
  };

  return (
    <div className="container mt-4">
    <div className='col-6'>
      <h2 className="text-center mb-4 text-secondary">Bulk Expenses</h2>

      <form onSubmit={handleBulkUpload}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Select CSV File</label>
          <input
            type="file"
            id="file"
            className="form-control form-control-lg "
            accept=".csv"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-lg btn-success w-100">Upload</button>
      </form>
    </div>
    </div>
  );
};

export default BulkUpload;
