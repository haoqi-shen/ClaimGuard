import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Ticket } from '../types/Ticket';

interface SidebarProps {
  tickets: Ticket[];
  onTicketSelect: (ticketId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ tickets, onTicketSelect }) => {
  const location = useLocation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500';
      case 'not_approved':
        return 'bg-red-500';
      case 'under_review':
        return 'bg-yellow-500';
      case 'pending_approval':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-gray-900 text-white w-80 h-full overflow-y-auto pt-16 fixed left-0 top-0">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">My Claims</h2>
          <Link
            to="/dashboard"
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            Dashboard
          </Link>
        </div>
        <Link
          to="/new"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center mb-4 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Claim
        </Link>
        <div className="space-y-2">
          {tickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/ticket/${ticket.id}`}
              onClick={() => onTicketSelect(ticket.id)}
              className={`block p-3 rounded-lg hover:bg-gray-800 transition-colors ${
                location.pathname === `/ticket/${ticket.id}` ? 'bg-gray-800' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(ticket.status)}`} />
                    <h3 className="text-sm font-medium truncate">{ticket.title}</h3>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{ticket.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-semibold text-blue-400">${ticket.amount.toFixed(2)}</span>
                    <span className="text-xs text-gray-500">{new Date(ticket.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
