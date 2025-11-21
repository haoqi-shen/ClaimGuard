import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Check, Clock, X, AlertCircle } from 'lucide-react';
import { mockTickets } from '../../data/mockTickets';
import type { Ticket, TicketStatus } from '../../types/ticket';

const getInitialTicket = (id: string | undefined): Ticket | null => {
  if (id === 'new') {
    return {
      id: `CLM-${String(mockTickets.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      category: 'Travel',
      amount: 0,
      status: 'Pending',
      notes: '',
      description: '',
    };
  }
  return mockTickets.find(t => t.id === id) || null;
};

export const TicketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<Ticket | null>(() => getInitialTicket(id));
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    setTicket(getInitialTicket(id));
  }, [id]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result as string);
        if (ticket) {
          setTicket({ ...ticket, receiptImage: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getTimelineSteps = (currentStatus: TicketStatus) => {
    const allStatuses: TicketStatus[] = ['Pending', 'Under Agent Review', 'Pending Approval', 'Approved'];
    
    if (currentStatus === 'Not Approved') {
      return [
        { status: 'Pending' as TicketStatus, completed: true },
        { status: 'Under Agent Review' as TicketStatus, completed: true },
        { status: 'Not Approved' as TicketStatus, completed: true, isFinal: true },
      ];
    }

    const currentIndex = allStatuses.indexOf(currentStatus);
    return allStatuses.map((status, index) => ({
      status,
      completed: index <= currentIndex,
      isFinal: status === 'Approved' && currentStatus === 'Approved',
    }));
  };

  const getStepIcon = (step: { status: TicketStatus; completed: boolean; isFinal?: boolean }) => {
    if (step.status === 'Not Approved') {
      return <X size={20} className="text-white" />;
    }
    if (step.isFinal) {
      return <Check size={20} className="text-white" />;
    }
    if (step.completed) {
      return <Check size={20} className="text-white" />;
    }
    return <Clock size={20} className="text-white" />;
  };

  const getStepColor = (step: { status: TicketStatus; completed: boolean; isFinal?: boolean }) => {
    if (step.status === 'Not Approved') {
      return 'bg-red-500';
    }
    if (step.isFinal) {
      return 'bg-green-600';
    }
    if (step.completed) {
      return 'bg-[#1967D2]';
    }
    return 'bg-gray-300';
  };

  if (!ticket) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Ticket not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-[#1967D2] text-white rounded hover:bg-[#1557B0] transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const timelineSteps = getTimelineSteps(ticket.status);

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-white rounded-full"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl font-normal text-gray-900">{ticket.id}</h1>
            <p className="text-gray-600 text-sm">Expense Claim Details</p>
          </div>
        </div>
        {id === 'new' && (
          <button
            className="px-6 py-2.5 bg-[#1967D2] text-white rounded hover:bg-[#1557B0] transition-colors font-medium"
            onClick={() => {
              // Save functionality would go here
              // In a real application, this would send data to backend
              navigate('/');
            }}
          >
            Submit Claim
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Claim Details */}
        <div className="col-span-2 space-y-6">
          {/* Receipt Upload */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Receipt</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1967D2] transition-colors">
              {selectedFile || ticket.receiptImage ? (
                <div className="space-y-4">
                  <img
                    src={selectedFile || ticket.receiptImage}
                    alt="Receipt"
                    className="max-h-64 mx-auto rounded"
                  />
                  <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    <Upload size={18} />
                    <span>Change Receipt</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer">
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload receipt image</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Claim Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Claim Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={ticket.date}
                  onChange={(e) => setTicket({ ...ticket, date: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={id !== 'new'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={ticket.category}
                  onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={id !== 'new'}
                >
                  <option value="Travel">Travel</option>
                  <option value="Meals">Meals</option>
                  <option value="Accommodation">Accommodation</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Transport">Transport</option>
                  <option value="Training">Training</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={ticket.amount}
                    onChange={(e) => setTicket({ ...ticket, amount: parseFloat(e.target.value) || 0 })}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={id !== 'new'}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Claim ID
                </label>
                <input
                  type="text"
                  value={ticket.id}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={ticket.description || ''}
                onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1967D2] focus:border-transparent"
                placeholder="Brief description of the expense"
                disabled={id !== 'new'}
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={ticket.notes || ''}
                onChange={(e) => setTicket({ ...ticket, notes: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#1967D2] focus:border-transparent resize-none"
                placeholder="Add any additional notes or comments..."
                disabled={id !== 'new'}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Status Timeline */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Claim Status</h2>
            
            {/* Vertical Timeline */}
            <div className="relative">
              {timelineSteps.map((step, index) => (
                <div key={step.status} className="relative pb-8 last:pb-0">
                  {/* Connecting Line */}
                  {index < timelineSteps.length - 1 && (
                    <div
                      className={`absolute left-5 top-11 w-0.5 h-full -ml-px ${
                        step.completed ? 'bg-[#1967D2]' : 'bg-gray-300'
                      }`}
                    />
                  )}
                  
                  {/* Timeline Node */}
                  <div className="relative flex items-start">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${getStepColor(step)} flex-shrink-0`}
                    >
                      {getStepIcon(step)}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </p>
                      {step.completed && ticket.status === step.status && (
                        <p className="text-xs text-gray-500 mt-1">Current Status</p>
                      )}
                      {step.isFinal && (
                        <p className="text-xs text-green-700 mt-1 font-medium">Completed</p>
                      )}
                      {step.status === 'Not Approved' && (
                        <p className="text-xs text-red-700 mt-1 font-medium">Rejected</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Status Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Submitted:</span>
                  <span className="font-medium text-gray-900">{ticket.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">${ticket.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{ticket.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
