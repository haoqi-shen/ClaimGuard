# ClaimGuard

A multi-agent, multi-source grounded audit engine for reliable extraction and policy-aware validation of expense claims.

## Overview

ClaimGuard is a modern SAP Fiori-inspired expense management system built with React, TypeScript, and TailwindCSS. It provides employees with an intuitive interface to submit, track, and manage their expense claims with a comprehensive workflow approval system.

## Features

- **Dashboard View**: High-density table displaying all expense claims with summary metrics
- **Ticket Detail View**: Comprehensive claim management with receipt upload and approval workflow
- **Workflow Timeline**: Visual representation of claim status through the approval process
- **Receipt Management**: Easy upload and management of receipt images
- **Status Tracking**: Real-time tracking of claims through multiple approval stages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── dashboard/       # Dashboard with claims table
│   ├── layout/          # Layout components (TopNav, Sidebar, MainLayout)
│   └── ticket/          # Ticket detail view with workflow timeline
├── data/                # Mock data for development
├── types/               # TypeScript type definitions
├── App.tsx              # Main application with routing
└── main.tsx             # Application entry point
```

## Technology Stack

- **React 18**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **TailwindCSS v4**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Lucide React**: Icon library

## License

MIT
