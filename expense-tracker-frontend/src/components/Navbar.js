import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken'); // Get the token to check if the user is logged in

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear token on logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-info">
      <div className="container">
        <Link className="navbar-brand" to="/">TRACKER</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/add-expense">Add Expense</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-secondary" to="/statistics">Comparision</Link>
                </li>
              </>
            )}
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {token ? (
              <li className="nav-item">
                <button 
                  onClick={handleLogout} 
                  className="btn btn-primary"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link  text-secondary" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link  text-secondary" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
