import React, { useState } from 'react';
import './Dashboard.css';
import { InboxItem } from '../../types';

interface DashboardProps {
  userName: string;
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, onNavigate }) => {
  const [inboxItems] = useState<InboxItem[]>([
    {
      id: '1',
      type: 'expense',
      title: 'Expense Report Approved',
      description: 'Conference in Glasgow - Approved',
      date: new Date('2018-07-09'),
      status: 'approved'
    },
    {
      id: '2',
      type: 'authorization',
      title: 'Spend Authorization Pending',
      description: 'Q4 Travel Budget - Awaiting Approval',
      date: new Date(),
      status: 'pending'
    },
    {
      id: '3',
      type: 'notification',
      title: 'Reminder',
      description: 'Receipt required for expense over $75',
      date: new Date(),
      status: 'info'
    }
  ]);

  const applications = [
    { name: 'Favorites', icon: '⭐', onClick: () => {} },
    { name: 'Career', icon: '💼', onClick: () => {} },
    { name: 'Payroll', icon: '💰', onClick: () => {} },
    { name: 'Absence', icon: '📅', onClick: () => {} },
    { name: 'Purchases', icon: '🛒', onClick: () => {} },
    { name: 'Expenses', icon: '📊', onClick: () => onNavigate('expenses') },
    { name: 'Benefits', icon: '🎁', onClick: () => {} }
  ];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="brand-logo">
          <span className="brand-text">Avo.ai</span>
        </div>
        <div className="user-info">
          <span className="welcome-text">Welcome, {userName}</span>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="inbox-section">
          <div className="inbox-widget">
            <div className="inbox-header">
              <h2>Inbox</h2>
              <span className="inbox-count">{inboxItems.length}</span>
            </div>
            <div className="inbox-items">
              {inboxItems.map((item) => (
                <div key={item.id} className="inbox-item">
                  <div className="inbox-item-icon">
                    {item.type === 'expense' && '📋'}
                    {item.type === 'authorization' && '✓'}
                    {item.type === 'notification' && '🔔'}
                  </div>
                  <div className="inbox-item-content">
                    <div className="inbox-item-title">{item.title}</div>
                    <div className="inbox-item-description">{item.description}</div>
                    <div className="inbox-item-date">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="applications-section">
          <h2>Applications</h2>
          <div className="app-tiles">
            {applications.map((app) => (
              <div
                key={app.name}
                className="app-tile"
                onClick={app.onClick}
              >
                <div className="app-icon">{app.icon}</div>
                <div className="app-name">{app.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
