import mongoose, { Document, Schema } from 'mongoose';

export interface IExpenseReportLine {
  lineId: string;
  date: Date;
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
  attachments: Array<{
    fileName: string;
    fileUrl: string;
    fileType: string;
    uploadDate: Date;
    comment?: string;
  }>;
  receiptIncluded: boolean;
  spendAuthorizationLineId?: string;
}

export interface IExpenseReport extends Document {
  reportId: string;
  userId: Schema.Types.ObjectId;
  employeeName: string;
  company: string;
  reportDate: Date;
  businessPurpose: string;
  reimbursementPaymentType: 'check' | 'direct_deposit';
  memo?: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'paid';
  expenseLines: IExpenseReportLine[];
  personalAmount: number;
  cashAdvanceApplied: number;
  reimbursementAmount: number;
  totalAmount: number;
  submittedAt?: Date;
  approvedAt?: Date;
  approvedBy?: Schema.Types.ObjectId;
  rejectedAt?: Date;
  rejectionReason?: string;
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExpenseReportLineSchema: Schema = new Schema({
  lineId: { type: String, required: true },
  date: { type: Date, required: true },
  expenseItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  perUnitAmount: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  memo: { type: String, required: true },
  costCenter: { type: String, required: true },
  fund: { type: String, required: true },
  designee: { type: String },
  grant: { type: String },
  studentOrganization: { type: String },
  detailCode: { type: String },
  additionalWorktags: { type: String },
  businessReason: { type: String, required: true },
  attachments: [{
    fileName: String,
    fileUrl: String,
    fileType: String,
    uploadDate: Date,
    comment: String
  }],
  receiptIncluded: { type: Boolean, default: false },
  spendAuthorizationLineId: { type: String }
});

const ExpenseReportSchema: Schema = new Schema(
  {
    reportId: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    employeeName: { type: String, required: true },
    company: { type: String, default: 'Worcester Polytechnic Institute - WPI' },
    reportDate: { type: Date, required: true },
    businessPurpose: { type: String, required: true },
    reimbursementPaymentType: { type: String, enum: ['check', 'direct_deposit'], required: true },
    memo: { type: String },
    status: { type: String, enum: ['draft', 'submitted', 'approved', 'rejected', 'paid'], default: 'draft' },
    expenseLines: [ExpenseReportLineSchema],
    personalAmount: { type: Number, default: 0 },
    cashAdvanceApplied: { type: Number, default: 0 },
    reimbursementAmount: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    submittedAt: { type: Date },
    approvedAt: { type: Date },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    rejectedAt: { type: Date },
    rejectionReason: { type: String },
    paidAt: { type: Date }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IExpenseReport>('ExpenseReport', ExpenseReportSchema);
