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
import { apiLimiter, writeApiLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Apply rate limiting to all routes
router.use(apiLimiter);

// Write operations get stricter rate limiting
router.post('/reports', writeApiLimiter, createExpenseReport);
router.get('/reports', getExpenseReports);
router.get('/reports/:id', getExpenseReportById);
router.put('/reports/:id', writeApiLimiter, updateExpenseReport);
router.post('/reports/:id/submit', writeApiLimiter, submitExpenseReport);
router.delete('/reports/:id', writeApiLimiter, deleteExpenseReport);
router.post('/reports/:id/approve', writeApiLimiter, approveExpenseReport);
router.post('/reports/:id/reject', writeApiLimiter, rejectExpenseReport);

export default router;
