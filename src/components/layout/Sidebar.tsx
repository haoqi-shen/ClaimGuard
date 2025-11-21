import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, LayoutDashboard, Plus } from 'lucide-react';
import { mockTickets } from '../../data/mockTickets';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'text-green-400';
      case 'Not Approved':
        return 'text-red-400';
      case 'Under Agent Review':
        return 'text-yellow-400';
      case 'Pending Approval':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <aside className="w-80 bg-[#2B3E50] text-white h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Navigation Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === '/' 
                ? 'bg-[#354A5F] text-white' 
                : 'hover:bg-[#354A5F]/50 text-gray-300'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          
          <button
            onClick={() => navigate('/ticket/new')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-[#4A90E2] hover:bg-[#357ABD] transition-colors text-white"
          >
            <Plus size={20} />
            <span className="font-medium">New Claim</span>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 pt-4">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Recent Claims
          </h3>
          
          {/* Ticket List */}
          <div className="space-y-2">
            {mockTickets.slice(0, 10).map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => navigate(`/ticket/${ticket.id}`)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  location.pathname === `/ticket/${ticket.id}`
                    ? 'bg-[#354A5F] border-l-4 border-[#4A90E2]'
                    : 'hover:bg-[#354A5F]/50 border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <FileText size={16} className="mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">{ticket.id}</span>
                      <span className="text-xs text-gray-400">${ticket.amount.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-400 truncate mb-1">{ticket.category}</div>
                    <div className={`text-xs ${getStatusColor(ticket.status)} font-medium`}>
                      {ticket.status}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
