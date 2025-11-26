import { Request, Response } from 'express';
import ExpenseReport from '../models/ExpenseReport';
import { generateReportId, calculateExpenseTotals } from '../utils/helpers';

export const createExpenseReport = async (req: Request, res: Response) => {
  try {
    const reportData = req.body;
    reportData.reportId = generateReportId();
    
    // Calculate totals
    const totals = calculateExpenseTotals(reportData.expenseLines || []);
    reportData.reimbursementAmount = totals.reimbursement;
    reportData.totalAmount = totals.total;

    const expenseReport = new ExpenseReport(reportData);
    await expenseReport.save();
    
    res.status(201).json(expenseReport);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getExpenseReports = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.query;
    const filter: any = {};
    
    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    
    const reports = await ExpenseReport.find(filter)
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(reports);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getExpenseReportById = async (req: Request, res: Response) => {
  try {
    const report = await ExpenseReport.findById(req.params.id)
      .populate('userId', 'firstName lastName email');
    
    if (!report) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    
    res.json(report);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateExpenseReport = async (req: Request, res: Response) => {
  try {
    const reportData = req.body;
    
    // Recalculate totals if expense lines are updated
    if (reportData.expenseLines) {
      const totals = calculateExpenseTotals(reportData.expenseLines);
      reportData.reimbursementAmount = totals.reimbursement;
      reportData.totalAmount = totals.total;
    }
    
    const report = await ExpenseReport.findByIdAndUpdate(
      req.params.id,
      reportData,
      { new: true, runValidators: true }
    );
    
    if (!report) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    
    res.json(report);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const submitExpenseReport = async (req: Request, res: Response) => {
  try {
    const report = await ExpenseReport.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    
    if (report.status !== 'draft') {
      return res.status(400).json({ message: 'Only draft reports can be submitted' });
    }
    
    // Validate required fields
    if (!report.businessPurpose || !report.memo) {
      return res.status(400).json({ message: 'Business purpose and memo are required' });
    }
    
    // Check for receipts on expenses over $75
    for (const line of report.expenseLines) {
      if (line.totalAmount > 75 && !line.receiptIncluded) {
        return res.status(400).json({ 
          message: `Receipt required for expense over $75: ${line.expenseItem}` 
        });
      }
    }
    
    report.status = 'submitted';
    report.submittedAt = new Date();
    await report.save();
    
    res.json(report);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteExpenseReport = async (req: Request, res: Response) => {
  try {
    const report = await ExpenseReport.findByIdAndDelete(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    
    res.json({ message: 'Expense report deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const approveExpenseReport = async (req: Request, res: Response) => {
  try {
    const { approverId } = req.body;
    const report = await ExpenseReport.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    
    if (report.status !== 'submitted') {
      return res.status(400).json({ message: 'Only submitted reports can be approved' });
    }
    
    report.status = 'approved';
    report.approvedAt = new Date();
    report.approvedBy = approverId;
    await report.save();
    
    res.json(report);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const rejectExpenseReport = async (req: Request, res: Response) => {
  try {
    const { reason } = req.body;
    const report = await ExpenseReport.findById(req.params.id);
    
    if (!report) {
      return res.status(404).json({ message: 'Expense report not found' });
    }
    
    if (report.status !== 'submitted') {
      return res.status(400).json({ message: 'Only submitted reports can be rejected' });
    }
    
    report.status = 'rejected';
    report.rejectedAt = new Date();
    report.rejectionReason = reason;
    await report.save();
    
    res.json(report);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
