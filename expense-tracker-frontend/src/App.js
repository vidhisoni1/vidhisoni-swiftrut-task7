import React from 'react';
import GlobalStyle from './styles/GlobalStyles';
import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Charts from './components/Charts';

function App() {
  return (
    <ExpenseProvider>
      <GlobalStyle />
      <div className="container">
        <h1>Expense Tracker</h1>
        <ExpenseForm />
        <ExpenseList />
        <Charts />
      </div>
    </ExpenseProvider>
  );
}

export default App;
