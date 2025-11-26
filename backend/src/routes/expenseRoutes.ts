import express from 'express';
import {
  createExpenseReport,
  getExpenseReports,
  getExpenseReportById,
  updateExpenseReport,
  submitExpenseReport,
  deleteExpenseReport,
  approveExpenseReport,
  rejectExpenseReport
} from '../controllers/expenseReportController';

const router = express.Router();

router.post('/reports', createExpenseReport);
router.get('/reports', getExpenseReports);
router.get('/reports/:id', getExpenseReportById);
router.put('/reports/:id', updateExpenseReport);
router.post('/reports/:id/submit', submitExpenseReport);
router.delete('/reports/:id', deleteExpenseReport);
router.post('/reports/:id/approve', approveExpenseReport);
router.post('/reports/:id/reject', rejectExpenseReport);

export default router;
