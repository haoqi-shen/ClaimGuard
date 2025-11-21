import { useNavigate } from 'react-router-dom';
import { Eye, Download, Trash2 } from 'lucide-react';
import { mockTickets } from '../../data/mockTickets';

export const Dashboard = () => {
  const navigate = useNavigate();

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Not Approved':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Under Agent Review':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Pending Approval':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Pending':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-full">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-gray-900 mb-2">Expense Claims Dashboard</h1>
        <p className="text-base text-gray-600">View and manage all your expense claims</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Claims</div>
          <div className="text-3xl font-normal text-gray-900">{mockTickets.length}</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-gray-600 mb-2">Pending</div>
          <div className="text-3xl font-normal text-gray-900">
            {mockTickets.filter(t => t.status === 'Pending').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-gray-600 mb-2">Approved</div>
          <div className="text-3xl font-normal text-gray-900">
            {mockTickets.filter(t => t.status === 'Approved').length}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="text-sm font-medium text-gray-600 mb-2">Total Amount</div>
          <div className="text-3xl font-normal text-gray-900">
            ${mockTickets.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </div>
        </div>
      </div>

      {/* High-density Table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Claim ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTickets.map((ticket) => (
                <tr 
                  key={ticket.id}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/ticket/${ticket.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-[#1967D2]">{ticket.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{ticket.category}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {ticket.description || '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="text-sm font-medium text-gray-900">
                      ${ticket.amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadgeColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/ticket/${ticket.id}`);
                        }}
                        className="text-[#1967D2] hover:text-[#1557B0] transition-colors"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Download functionality would go here
                        }}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="Download"
                      >
                        <Download size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Delete functionality would go here
                        }}
                        className="text-gray-600 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
