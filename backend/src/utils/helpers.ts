import { IExpenseReportLine } from '../models/ExpenseReport';

export const generateReportId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `ER-${timestamp}-${random}`;
};

export const generateAuthorizationId = (): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `SA-${timestamp}-${random}`;
};

export const calculateExpenseTotals = (expenseLines: IExpenseReportLine[]) => {
  let total = 0;
  let personal = 0;
  let cashAdvance = 0;
  
  expenseLines.forEach(line => {
    total += line.totalAmount;
  });
  
  const reimbursement = total - personal - cashAdvance;
  
  return {
    personal,
    cashAdvance,
    reimbursement,
    total
  };
};

export const calculateMileageAmount = (miles: number, ratePerMile: number = 0.545): number => {
  return Number((miles * ratePerMile).toFixed(2));
};

export const validateReceiptRequirement = (amount: number, hasReceipt: boolean): boolean => {
  if (amount > 75 && !hasReceipt) {
    return false;
  }
  return true;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};
