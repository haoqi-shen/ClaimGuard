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

const router = express.Router();

router.post('/authorizations', createSpendAuthorization);
router.get('/authorizations', getSpendAuthorizations);
router.get('/authorizations/:id', getSpendAuthorizationById);
router.put('/authorizations/:id', updateSpendAuthorization);
router.delete('/authorizations/:id', deleteSpendAuthorization);
router.post('/authorizations/:id/approve', approveSpendAuthorization);
router.post('/authorizations/:id/reject', rejectSpendAuthorization);

export default router;
