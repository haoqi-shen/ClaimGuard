import express from 'express';
import {
  createSpendAuthorization,
  getSpendAuthorizations,
  getSpendAuthorizationById,
  updateSpendAuthorization,
  deleteSpendAuthorization,
  approveSpendAuthorization,
  rejectSpendAuthorization
} from '../controllers/spendAuthorizationController';
import { apiLimiter, writeApiLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Apply rate limiting to all routes
router.use(apiLimiter);

// Write operations get stricter rate limiting
router.post('/authorizations', writeApiLimiter, createSpendAuthorization);
router.get('/authorizations', getSpendAuthorizations);
router.get('/authorizations/:id', getSpendAuthorizationById);
router.put('/authorizations/:id', writeApiLimiter, updateSpendAuthorization);
router.delete('/authorizations/:id', writeApiLimiter, deleteSpendAuthorization);
router.post('/authorizations/:id/approve', writeApiLimiter, approveSpendAuthorization);
router.post('/authorizations/:id/reject', writeApiLimiter, rejectSpendAuthorization);

export default router;
