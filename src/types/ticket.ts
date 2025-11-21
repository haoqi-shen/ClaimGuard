export type TicketStatus = 'Pending' | 'Under Agent Review' | 'Pending Approval' | 'Approved' | 'Not Approved';

export interface Ticket {
  id: string;
  date: string;
  category: string;
  amount: number;
  status: TicketStatus;
  receiptImage?: string;
  notes?: string;
  description?: string;
}

export interface TimelineStep {
  status: TicketStatus;
  completed: boolean;
  timestamp?: string;
}
