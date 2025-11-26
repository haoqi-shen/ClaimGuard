export interface User {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  company: string;
  role: 'employee' | 'manager' | 'admin';
  paymentMethod: 'check' | 'direct_deposit';
}

export interface ExpenseReportLine {
  lineId: string;
  date: Date | string;
  expenseItem: string;
  quantity: number;
  perUnitAmount: number;
  totalAmount: number;
  memo: string;
  costCenter: string;
  fund: string;
  designee?: string;
  grant?: string;
  studentOrganization?: string;
  detailCode?: string;
  additionalWorktags?: string;
  businessReason: string;
  attachments: Attachment[];
  receiptIncluded: boolean;
  spendAuthorizationLineId?: string;
}

export interface Attachment {
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadDate: Date | string;
  comment?: string;
}

export interface ExpenseReport {
  _id?: string;
  reportId: string;
  userId: string;
  employeeName: string;
  company: string;
  reportDate: Date | string;
  businessPurpose: string;
  reimbursementPaymentType: 'check' | 'direct_deposit';
  memo?: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'paid';
  expenseLines: ExpenseReportLine[];
  personalAmount: number;
  cashAdvanceApplied: number;
  reimbursementAmount: number;
  totalAmount: number;
  submittedAt?: Date | string;
  approvedAt?: Date | string;
  approvedBy?: string;
  rejectedAt?: Date | string;
  rejectionReason?: string;
  paidAt?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface SpendAuthorizationLine {
  lineId: string;
  description: string;
  authorizedAmount: number;
  usedAmount: number;
  remainingAmount: number;
  costCenter: string;
  fund: string;
  additionalWorktags?: string;
}

export interface SpendAuthorization {
  _id?: string;
  authorizationId: string;
  userId: string;
  employeeName: string;
  company: string;
  authorizationDate: Date | string;
  businessPurpose: string;
  memo?: string;
  status: 'pending' | 'approved' | 'rejected' | 'closed';
  authorizationLines: SpendAuthorizationLine[];
  totalAuthorizedAmount: number;
  totalUsedAmount: number;
  totalRemainingAmount: number;
  approvedAt?: Date | string;
  approvedBy?: string;
  rejectedAt?: Date | string;
  rejectionReason?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export interface InboxItem {
  id: string;
  type: 'expense' | 'authorization' | 'notification';
  title: string;
  description: string;
  date: Date | string;
  status: string;
}
