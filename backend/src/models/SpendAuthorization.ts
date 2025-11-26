import mongoose, { Document, Schema } from 'mongoose';

export interface ISpendAuthorizationLine {
  lineId: string;
  description: string;
  authorizedAmount: number;
  usedAmount: number;
  remainingAmount: number;
  costCenter: string;
  fund: string;
  additionalWorktags?: string;
}

export interface ISpendAuthorization extends Document {
  authorizationId: string;
  userId: Schema.Types.ObjectId;
  employeeName: string;
  company: string;
  authorizationDate: Date;
  businessPurpose: string;
  memo?: string;
  status: 'pending' | 'approved' | 'rejected' | 'closed';
  authorizationLines: ISpendAuthorizationLine[];
  totalAuthorizedAmount: number;
  totalUsedAmount: number;
  totalRemainingAmount: number;
  approvedAt?: Date;
  approvedBy?: Schema.Types.ObjectId;
  rejectedAt?: Date;
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SpendAuthorizationLineSchema: Schema = new Schema({
  lineId: { type: String, required: true },
  description: { type: String, required: true },
  authorizedAmount: { type: Number, required: true },
  usedAmount: { type: Number, default: 0 },
  remainingAmount: { type: Number, required: true },
  costCenter: { type: String, required: true },
  fund: { type: String, required: true },
  additionalWorktags: { type: String }
});

const SpendAuthorizationSchema: Schema = new Schema(
  {
    authorizationId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employeeName: { type: String, required: true },
    company: { type: String, default: 'Avo.ai' },
    authorizationDate: { type: Date, required: true },
    businessPurpose: { type: String, required: true },
    memo: { type: String },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'closed'], default: 'pending' },
    authorizationLines: [SpendAuthorizationLineSchema],
    totalAuthorizedAmount: { type: Number, default: 0 },
    totalUsedAmount: { type: Number, default: 0 },
    totalRemainingAmount: { type: Number, default: 0 },
    approvedAt: { type: Date },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    rejectedAt: { type: Date },
    rejectionReason: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ISpendAuthorization>('SpendAuthorization', SpendAuthorizationSchema);
