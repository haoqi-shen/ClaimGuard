# ClaimGuard

A comprehensive enterprise expense management system built on the Workday platform for Worcester Polytechnic Institute (WPI). ClaimGuard follows a multi-tier workflow design for submitting, tracking, and processing employee expense reimbursements.

## Overview

ClaimGuard is a full-stack expense reporting system that provides:

- **Multi-tier Workflow**: Complete expense submission and approval process
- **Financial Controls**: Multi-dimensional expense allocation using cost centers, funds, and worktags
- **Audit Compliance**: Required fields and receipt thresholds ensure regulatory compliance
- **User-Friendly Interface**: Clean, intuitive design with progressive disclosure
- **Real-Time Validation**: Automated checks for receipt requirements and financial coding

## Key Features

### 1. Dashboard/Home Screen
- Personalized welcome interface
- Inbox widget with pending tasks and notifications
- Quick-access application launcher with tiles (Favorites, Career, Payroll, Absence, Purchases, Expenses, Benefits)
- WPI institutional branding

### 2. Expense Hub
- **Actions**: Create/Edit Expense Reports and Spend Authorizations
- **Views**: Access to all reports, authorizations, and payment preferences
- **Recent Activity**: Historical expense reports with status tracking

### 3. Create Expense Report
- Comprehensive expense report form with real-time totals
- Required fields validation (Business Purpose, Memo, Receipts for $75+)
- Support for multiple expense lines
- Draft saving capability
- Tab-based interface for expense lines and attachments

### 4. Expense Line Detail
- Granular expense item tracking with automatic calculations
- Mileage calculation with standard IRS rates ($0.545/mile)
- Financial allocation with cost centers, funds, and worktags
- Receipt attachment support (file upload)
- Business reason documentation

## Technology Stack

### Backend
- **Node.js** with **Express** - REST API server
- **TypeScript** - Type-safe backend code
- **MongoDB** with **Mongoose** - Data persistence (optional)
- **JWT** - Authentication tokens
- **Multer** - File upload handling

### Frontend
- **React** with **TypeScript** - Component-based UI
- **React Hooks** - State management
- **CSS Modules** - Component styling
- **Responsive Design** - Mobile and desktop support

## Quick Start

See [SETUP.md](./SETUP.md) for detailed installation instructions.

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in another terminal)
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` to access the application.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Dashboard  │  │ Expense Hub  │  │ Expense Reports  │   │
│  └─────────────┘  └──────────────┘  └──────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │ REST API
┌────────────────────────────┴────────────────────────────────┐
│                      Backend (Node.js)                       │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────────┐  │
│  │  Controllers │  │    Routes     │  │   Middleware    │  │
│  └──────────────┘  └───────────────┘  └─────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Models (Mongoose)                    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │
┌────────────────────────────┴────────────────────────────────┐
│                      Database (MongoDB)                      │
│     Expense Reports  •  Spend Authorizations  •  Users      │
└─────────────────────────────────────────────────────────────┘
```

## Business Rules

### Expense Validation
- Business purpose is mandatory
- Memo is mandatory for all reports
- Receipts required for expenses over $75
- All expense lines must have valid financial coding

### Financial Coding
- **Cost Center** (required) - Department or unit identifier
- **Fund** (required) - Funding source classification
- **Worktags** (required) - Additional program/project allocation
- **Grant**, **Designee**, **Detail Code**, **Student Organization** (optional)

### Workflow States
1. **Draft** - Initial state, editable by employee
2. **Submitted** - Sent for approval, locked for editing
3. **Approved** - Manager approved, ready for payment
4. **Rejected** - Denied with reason, can be revised
5. **Paid** - Payment processed

## API Documentation

### Expense Reports API

#### Create Expense Report
```http
POST /api/expenses/reports
Content-Type: application/json

{
  "userId": "user_id",
  "employeeName": "John Doe",
  "reportDate": "2024-01-15",
  "businessPurpose": "Conference",
  "reimbursementPaymentType": "check",
  "memo": "Annual tech conference",
  "expenseLines": [...]
}
```

#### Submit Expense Report
```http
POST /api/expenses/reports/:id/submit
```

### Spend Authorization API

Similar endpoints for spend authorizations at `/api/spend/authorizations/*`

## Security Features

- **Rate Limiting**: API endpoints protected with configurable rate limits
  - General API: 100 requests per 15 minutes
  - Write operations: 20 requests per 15 minutes
  - Authentication: 5 attempts per 15 minutes
- **Input Validation**: Server-side validation for all data inputs
- **Receipt Enforcement**: Mandatory receipts for expenses over $75
- **Audit Trail**: Complete logging of all state changes
- **Financial Validation**: Multi-dimensional expense allocation checks
- **Secure File Uploads**: Type validation and secure storage handling

## Development

### Project Structure
```
ClaimGuard/
├── backend/              # Node.js backend
│   ├── src/
│   │   ├── models/      # Mongoose schemas
│   │   ├── controllers/ # Business logic
│   │   ├── routes/      # API endpoints
│   │   └── utils/       # Helper functions
│   └── package.json
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── types/       # TypeScript definitions
│   │   └── App.tsx      # Main application
│   └── package.json
├── README.md
└── SETUP.md
```

### Code Style
- TypeScript strict mode enabled
- ESLint for code quality
- Functional React components with hooks
- RESTful API design patterns

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is part of the ClaimGuard expense management system.

## Support

For issues and questions:
- Create an issue in the repository
- Contact the development team
- Refer to [SETUP.md](./SETUP.md) for troubleshooting

## Acknowledgments

Built for Worcester Polytechnic Institute (WPI) based on Workday expense management workflows.
