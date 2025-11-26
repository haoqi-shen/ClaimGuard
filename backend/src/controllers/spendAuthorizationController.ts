import { Request, Response } from 'express';
import SpendAuthorization from '../models/SpendAuthorization';
import { generateAuthorizationId } from '../utils/helpers';

export const createSpendAuthorization = async (req: Request, res: Response) => {
  try {
    const authData = req.body;
    authData.authorizationId = generateAuthorizationId();
    
    // Calculate totals
    let totalAuthorized = 0;
    let totalUsed = 0;
    if (authData.authorizationLines) {
      authData.authorizationLines.forEach((line: any) => {
        totalAuthorized += line.authorizedAmount;
        totalUsed += line.usedAmount || 0;
        line.remainingAmount = line.authorizedAmount - (line.usedAmount || 0);
      });
    }
    authData.totalAuthorizedAmount = totalAuthorized;
    authData.totalUsedAmount = totalUsed;
    authData.totalRemainingAmount = totalAuthorized - totalUsed;

    const spendAuth = new SpendAuthorization(authData);
    await spendAuth.save();
    
    res.status(201).json(spendAuth);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getSpendAuthorizations = async (req: Request, res: Response) => {
  try {
    const { userId, status } = req.query;
    const filter: any = {};
    
    if (userId) filter.userId = userId;
    if (status) filter.status = status;
    
    const authorizations = await SpendAuthorization.find(filter)
      .populate('userId', 'firstName lastName email')
      .sort({ createdAt: -1 });
    
    res.json(authorizations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSpendAuthorizationById = async (req: Request, res: Response) => {
  try {
    const auth = await SpendAuthorization.findById(req.params.id)
      .populate('userId', 'firstName lastName email');
    
    if (!auth) {
      return res.status(404).json({ message: 'Spend authorization not found' });
    }
    
    res.json(auth);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSpendAuthorization = async (req: Request, res: Response) => {
  try {
    const authData = req.body;
    
    // Recalculate totals if lines are updated
    if (authData.authorizationLines) {
      let totalAuthorized = 0;
      let totalUsed = 0;
      authData.authorizationLines.forEach((line: any) => {
        totalAuthorized += line.authorizedAmount;
        totalUsed += line.usedAmount || 0;
        line.remainingAmount = line.authorizedAmount - (line.usedAmount || 0);
      });
      authData.totalAuthorizedAmount = totalAuthorized;
      authData.totalUsedAmount = totalUsed;
      authData.totalRemainingAmount = totalAuthorized - totalUsed;
    }
    
    const auth = await SpendAuthorization.findByIdAndUpdate(
      req.params.id,
      authData,
      { new: true, runValidators: true }
    );
    
    if (!auth) {
      return res.status(404).json({ message: 'Spend authorization not found' });
    }
    
    res.json(auth);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteSpendAuthorization = async (req: Request, res: Response) => {
  try {
    const auth = await SpendAuthorization.findByIdAndDelete(req.params.id);
    
    if (!auth) {
      return res.status(404).json({ message: 'Spend authorization not found' });
    }
    
    res.json({ message: 'Spend authorization deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const approveSpendAuthorization = async (req: Request, res: Response) => {
  try {
    const { approverId } = req.body;
    const auth = await SpendAuthorization.findById(req.params.id);
    
    if (!auth) {
      return res.status(404).json({ message: 'Spend authorization not found' });
    }
    
    if (auth.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending authorizations can be approved' });
    }
    
    auth.status = 'approved';
    auth.approvedAt = new Date();
    auth.approvedBy = approverId;
    await auth.save();
    
    res.json(auth);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const rejectSpendAuthorization = async (req: Request, res: Response) => {
  try {
    const { reason } = req.body;
    const auth = await SpendAuthorization.findById(req.params.id);
    
    if (!auth) {
      return res.status(404).json({ message: 'Spend authorization not found' });
    }
    
    if (auth.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending authorizations can be rejected' });
    }
    
    auth.status = 'rejected';
    auth.rejectedAt = new Date();
    auth.rejectionReason = reason;
    await auth.save();
    
    res.json(auth);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
