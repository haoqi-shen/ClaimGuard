import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  company: string;
  password?: string;
  role: 'employee' | 'manager' | 'admin';
  paymentMethod: 'check' | 'direct_deposit';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    employeeId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    company: { type: String, default: 'Worcester Polytechnic Institute - WPI' },
    password: { type: String, select: false },
    role: { type: String, enum: ['employee', 'manager', 'admin'], default: 'employee' },
    paymentMethod: { type: String, enum: ['check', 'direct_deposit'], default: 'check' }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema);
