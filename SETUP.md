# ClaimGuard - Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (optional, for data persistence)

## Installation

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your environment variables in `.env`:
   - `PORT`: Server port (default: 5000)
   - `MONGODB_URI`: MongoDB connection string (optional)
   - `JWT_SECRET`: Secret key for JWT tokens

5. Build the backend:
   ```bash
   npm run build
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

   Or start the production server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

   The application will open in your browser at `http://localhost:3000`

4. Build for production:
   ```bash
   npm run build
   ```

## Running the Full Stack

To run both backend and frontend simultaneously:

1. In one terminal, start the backend:
   ```bash
   cd backend && npm run dev
   ```

2. In another terminal, start the frontend:
   ```bash
   cd frontend && npm start
   ```

## Default User

The application uses a demo user:
- Name: Veronica Brandstrader
- Company: Worcester Polytechnic Institute - WPI

## Features Implemented

- ✅ Dashboard/Home Screen with inbox and quick-access tiles
- ✅ Expense Hub with actions and recent reports
- ✅ Create Expense Report form with validation
- ✅ Expense Line Detail form with financial coding
- ✅ Mileage calculation (automatic at $0.545/mile)
- ✅ Receipt requirement enforcement ($75+ threshold)
- ✅ Multi-dimensional expense allocation (Cost Center, Fund, Worktags)
- ✅ Draft saving capability
- ✅ WPI branding and styling

## Project Structure

```
ClaimGuard/
├── backend/
│   ├── src/
│   │   ├── models/         # Database models
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Helper functions
│   │   └── index.ts        # Entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Dashboard/
│   │   │   ├── ExpenseHub/
│   │   │   └── ExpenseReport/
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx         # Main app component
│   │   └── index.tsx       # Entry point
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## API Endpoints

### Expense Reports
- `POST /api/expenses/reports` - Create expense report
- `GET /api/expenses/reports` - Get all expense reports
- `GET /api/expenses/reports/:id` - Get specific report
- `PUT /api/expenses/reports/:id` - Update report
- `POST /api/expenses/reports/:id/submit` - Submit report
- `POST /api/expenses/reports/:id/approve` - Approve report
- `POST /api/expenses/reports/:id/reject` - Reject report

### Spend Authorizations
- `POST /api/spend/authorizations` - Create authorization
- `GET /api/spend/authorizations` - Get all authorizations
- `GET /api/spend/authorizations/:id` - Get specific authorization
- `PUT /api/spend/authorizations/:id` - Update authorization
- `POST /api/spend/authorizations/:id/approve` - Approve authorization
- `POST /api/spend/authorizations/:id/reject` - Reject authorization

## Testing

Currently, the application runs without a database for demonstration purposes. To enable full database functionality:

1. Install and start MongoDB
2. Update the `MONGODB_URI` in your `.env` file
3. Restart the backend server

## Troubleshooting

### Port Already in Use

If port 5000 (backend) or 3000 (frontend) is already in use, you can change them:
- Backend: Update `PORT` in `.env`
- Frontend: Create `.env` file with `PORT=3001`

### MongoDB Connection Failed

The backend will continue to run even if MongoDB connection fails. Some features may be limited without database persistence.

## Next Steps

Future enhancements could include:
- User authentication and authorization
- Email notifications for approvals/rejections
- Advanced reporting and analytics
- Mobile application for receipt capture
- Integration with payroll systems
- Multi-currency support
