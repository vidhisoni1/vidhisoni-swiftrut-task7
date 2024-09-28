import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('https://swifrut-task-7-expense-tracker.onrender.com/api/users/login', { email, password });
      localStorage.setItem('authToken', data.token); // Store the token in localStorage
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow w-100 bg-secondary border-0" style={{ maxWidth: '500px'}}>
        <h1 className="text-center mb-4 text-light ">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="" className='text-light mb-2'>Email</label>
            <input
              type="email"
             
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="" className='text-light mb-2'>password</label>
            <input
              type="password"
             
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
