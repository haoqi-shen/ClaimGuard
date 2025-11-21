import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, LayoutDashboard, Plus } from 'lucide-react';
import { mockTickets } from '../../data/mockTickets';

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'text-green-600';
      case 'Not Approved':
        return 'text-red-600';
      case 'Under Agent Review':
        return 'text-orange-600';
      case 'Pending Approval':
        return 'text-blue-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 space-y-3">
        {/* Navigation Buttons */}
        <div className="space-y-1">
          <button
            onClick={() => navigate('/')}
            className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
              location.pathname === '/' 
                ? 'bg-blue-50 text-[#1967D2]' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          
          <button
            onClick={() => navigate('/ticket/new')}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-[#1967D2] hover:bg-[#1557B0] transition-colors text-white text-sm font-medium"
          >
            <Plus size={18} />
            <span>New Claim</span>
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-3">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">
            Recent Claims
          </h3>
          
          {/* Ticket List */}
          <div className="space-y-1">
            {mockTickets.slice(0, 10).map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => navigate(`/ticket/${ticket.id}`)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  location.pathname === `/ticket/${ticket.id}`
                    ? 'bg-blue-50 border-l-3 border-[#1967D2]'
                    : 'hover:bg-gray-50 border-l-3 border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <FileText size={16} className="mt-1 flex-shrink-0 text-gray-500" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900 truncate">{ticket.id}</span>
                      <span className="text-xs text-gray-500">${ticket.amount.toFixed(2)}</span>
                    </div>
                    <div className="text-xs text-gray-600 truncate mb-1">{ticket.category}</div>
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
