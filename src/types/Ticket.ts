export type TicketStatus = 'pending' | 'under_review' | 'pending_approval' | 'approved' | 'not_approved';

export interface Ticket {
  id: string;
  employeeName: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  description: string;
  receiptUrl?: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
}

export const statusLabels: Record<TicketStatus, string> = {
  pending: 'Pending',
  under_review: 'Under Agent Review',
  pending_approval: 'Pending Approval',
  approved: 'Approved',
  not_approved: 'Not Approved',
};

// Status order for the workflow timeline (not_approved is handled separately as a terminal state)
export const statusOrder: TicketStatus[] = ['pending', 'under_review', 'pending_approval', 'approved'];
