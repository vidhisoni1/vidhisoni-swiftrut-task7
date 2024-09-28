import React, { useState } from 'react';
import axios from '../services/Service';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, password };
      const response = await axios.post('/api/users/register', userData); // Assuming the backend endpoint
      localStorage.setItem('authToken', response.data.token); // Store token
      navigate('/'); // Redirect to home
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Error registering. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow w-100 bg-secondary" style={{ maxWidth: '400px' }}>
        <h1 className="text-center mb-4 text-light">Register</h1>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label text-light">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
