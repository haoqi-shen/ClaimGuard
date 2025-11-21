import React from 'react';
import type { TicketStatus } from '../types/Ticket';
import { statusLabels, statusOrder } from '../types/Ticket';

interface StatusTimelineProps {
  currentStatus: TicketStatus;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ currentStatus }) => {
  const getStatusIndex = (status: TicketStatus) => {
    return statusOrder.indexOf(status);
  };

  const currentIndex = getStatusIndex(currentStatus);
  const isRejected = currentStatus === 'not_approved';

  const getStepStatus = (index: number) => {
    if (isRejected) {
      return index <= 2 ? 'completed' : 'inactive';
    }
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'inactive';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'current':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-300 text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Claim Status</h3>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300" />
        
        {/* Steps */}
        <div className="space-y-8">
          {statusOrder.map((status, index) => {
            const stepStatus = getStepStatus(index);
            return (
              <div key={status} className="relative flex items-start">
                {/* Circle indicator */}
                <div
                  className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 border-white ${getStepColor(stepStatus)}`}
                >
                  {stepStatus === 'completed' ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <div className={`w-3 h-3 rounded-full ${stepStatus === 'current' ? 'bg-white' : ''}`} />
                  )}
                </div>
                
                {/* Content */}
                <div className="ml-4">
                  <p className={`text-sm font-medium ${stepStatus === 'inactive' ? 'text-gray-400' : 'text-gray-800'}`}>
                    {statusLabels[status]}
                  </p>
                  <p className={`text-xs ${stepStatus === 'inactive' ? 'text-gray-300' : 'text-gray-500'} mt-1`}>
                    {stepStatus === 'completed' && 'Completed'}
                    {stepStatus === 'current' && 'In Progress'}
                    {stepStatus === 'inactive' && 'Pending'}
                  </p>
                </div>
              </div>
            );
          })}
          
          {/* Rejected status */}
          {isRejected && (
            <div className="relative flex items-start">
              <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-red-500 text-white">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">{statusLabels.not_approved}</p>
                <p className="text-xs text-gray-500 mt-1">Claim rejected</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatusTimeline;
