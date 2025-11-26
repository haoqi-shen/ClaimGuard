import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import ExpenseHub from './components/ExpenseHub/ExpenseHub';
import CreateExpenseReport from './components/ExpenseReport/CreateExpenseReport';

type Page = 'dashboard' | 'expenses' | 'create-expense' | 'create-authorization' | 
  'edit-expense' | 'edit-authorization' | 'view-reports' | 'view-authorizations' | 
  'payment-elections';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [userName] = useState('Veronica Brandstrader');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userName={userName} onNavigate={handleNavigate} />;
      case 'expenses':
        return (
          <ExpenseHub
            onNavigate={handleNavigate}
            onBack={() => setCurrentPage('dashboard')}
          />
        );
      case 'create-expense':
        return (
          <CreateExpenseReport
            onBack={() => setCurrentPage('expenses')}
            userName={userName}
          />
        );
      default:
        return (
          <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Page: {currentPage}</h1>
            <button onClick={() => setCurrentPage('dashboard')}>Back to Dashboard</button>
          </div>
        );
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
