import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes';
import spendAuthRoutes from './routes/spendAuthRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/claimguard';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/expenses', expenseRoutes);
app.use('/api/spend', spendAuthRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'ClaimGuard API is running' });
});

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'ClaimGuard - Expense Reporting System API',
    version: '1.0.0',
    endpoints: {
      expenses: '/api/expenses',
      spendAuthorizations: '/api/spend',
      health: '/health'
    }
  });
});

// Connect to MongoDB (optional for now, can work without it)
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.log('MongoDB connection failed (continuing without database):', error);
  }
};

// Start server
if (process.env.NODE_ENV !== 'test') {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
