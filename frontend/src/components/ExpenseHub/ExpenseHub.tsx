import React, { useState } from 'react';
import './ExpenseHub.css';
import { ExpenseReport } from '../../types';

interface ExpenseHubProps {
  onNavigate: (page: string, data?: any) => void;
  onBack: () => void;
}

const ExpenseHub: React.FC<ExpenseHubProps> = ({ onNavigate, onBack }) => {
  const [recentReports] = useState<Partial<ExpenseReport>[]>([
    {
      reportId: 'ER-2018-001',
      businessPurpose: 'Conference in Glasgow',
      reportDate: new Date('2018-07-09'),
      status: 'approved',
      totalAmount: 1250.00
    },
    {
      reportId: 'ER-2018-002',
      businessPurpose: 'UMASS NERCOMP session',
      reportDate: new Date('2018-07-09'),
      status: 'submitted',
      totalAmount: 350.00
    },
    {
      reportId: 'ER-2018-003',
      businessPurpose: 'Gone to Cambridge',
      reportDate: new Date('2018-07-02'),
      status: 'paid',
      totalAmount: 875.50
    }
  ]);

  const actions = [
    {
      title: 'Create Expense Report',
      icon: '📝',
      description: 'Submit a new expense report for reimbursement',
      onClick: () => onNavigate('create-expense')
    },
    {
      title: 'Create Spend Authorization',
      icon: '✓',
      description: 'Request pre-approval for future expenses',
      onClick: () => onNavigate('create-authorization')
    },
    {
      title: 'Edit Expense Report',
      icon: '✏️',
      description: 'Modify an existing expense report',
      onClick: () => onNavigate('edit-expense')
    },
    {
      title: 'Edit Spend Authorization',
      icon: '📋',
      description: 'Update an existing spend authorization',
      onClick: () => onNavigate('edit-authorization')
    }
  ];

  const views = [
    {
      title: 'Expense Reports',
      icon: '📊',
      description: 'View all submitted expense reports',
      onClick: () => onNavigate('view-reports')
    },
    {
      title: 'Spend Authorizations',
      icon: '💼',
      description: 'View all spend authorizations',
      onClick: () => onNavigate('view-authorizations')
    },
    {
      title: 'Payment Elections',
      icon: '💳',
      description: 'Manage payment method preferences',
      onClick: () => onNavigate('payment-elections')
    }
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'draft': return 'status-draft';
      case 'submitted': return 'status-submitted';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-rejected';
      case 'paid': return 'status-paid';
      default: return '';
    }
  };

  return (
    <div className="expense-hub">
      <header className="expense-hub-header">
        <button className="back-button" onClick={onBack}>← Back to Dashboard</button>
        <h1>Expense Hub</h1>
      </header>

      <div className="expense-hub-content">
        <section className="hub-section">
          <h2>Actions</h2>
          <div className="action-cards">
            {actions.map((action) => (
              <div key={action.title} className="hub-card" onClick={action.onClick}>
                <div className="card-icon">{action.icon}</div>
                <div className="card-content">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="hub-section">
          <h2>View</h2>
          <div className="action-cards">
            {views.map((view) => (
              <div key={view.title} className="hub-card" onClick={view.onClick}>
                <div className="card-icon">{view.icon}</div>
                <div className="card-content">
                  <h3>{view.title}</h3>
                  <p>{view.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="hub-section">
          <h2>Recent Expense Reports</h2>
          <div className="recent-reports">
            {recentReports.map((report) => (
              <div key={report.reportId} className="report-item">
                <div className="report-info">
                  <div className="report-id">{report.reportId}</div>
                  <div className="report-purpose">{report.businessPurpose}</div>
                  <div className="report-date">
                    {report.reportDate && new Date(report.reportDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="report-status">
                  <span className={`status-badge ${getStatusClass(report.status || '')}`}>
                    {report.status?.toUpperCase()}
                  </span>
                  <div className="report-amount">
                    ${report.totalAmount?.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExpenseHub;
