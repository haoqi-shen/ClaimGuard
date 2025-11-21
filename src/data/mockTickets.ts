import type { Ticket } from '../types/ticket';

// Helper function to get date relative to today
const getRelativeDate = (daysAgo: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

export const mockTickets: Ticket[] = [
  {
    id: 'CLM-001',
    date: getRelativeDate(6),
    category: 'Travel',
    amount: 450.00,
    status: 'Approved',
    description: 'Flight ticket to San Francisco',
    notes: 'Business trip for client meeting',
  },
  {
    id: 'CLM-002',
    date: getRelativeDate(3),
    category: 'Meals',
    amount: 85.50,
    status: 'Under Agent Review',
    description: 'Team dinner',
    notes: 'Quarterly team celebration',
  },
  {
    id: 'CLM-003',
    date: getRelativeDate(2),
    category: 'Accommodation',
    amount: 320.00,
    status: 'Pending Approval',
    description: 'Hotel stay - 2 nights',
    notes: 'Conference accommodation',
  },
  {
    id: 'CLM-004',
    date: getRelativeDate(1),
    category: 'Office Supplies',
    amount: 125.75,
    status: 'Pending',
    description: 'Laptop accessories',
    notes: 'New external monitor and keyboard',
  },
  {
    id: 'CLM-005',
    date: getRelativeDate(4),
    category: 'Transport',
    amount: 45.00,
    status: 'Not Approved',
    description: 'Taxi fare',
    notes: 'Missing receipt',
  },
  {
    id: 'CLM-006',
    date: getRelativeDate(5),
    category: 'Training',
    amount: 1200.00,
    status: 'Approved',
    description: 'Online course subscription',
    notes: 'AWS Certification course',
  },
  {
    id: 'CLM-007',
    date: getRelativeDate(0),
    category: 'Meals',
    amount: 32.50,
    status: 'Pending',
    description: 'Client lunch',
    notes: 'Discussion about new project',
  },
];
