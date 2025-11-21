import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TopNavBar from './components/TopNavBar';
import Sidebar from './components/Sidebar';
import TicketDetailView from './components/TicketDetailView';
import DashboardView from './components/DashboardView';
import NewTicketView from './components/NewTicketView';
import type { Ticket } from './types/Ticket';
import { sampleTickets } from './data/sampleTickets';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>(sampleTickets);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTicketId(ticketId);
  };

  const handleTicketUpdate = (updatedTicket: Ticket) => {
    setTickets(tickets.map(ticket => 
      ticket.id === updatedTicket.id ? { ...updatedTicket, updatedAt: new Date().toISOString() } : ticket
    ));
  };

  const handleCreateTicket = (newTicket: Ticket) => {
    setTickets([newTicket, ...tickets]);
  };

  const selectedTicket = selectedTicketId 
    ? tickets.find(ticket => ticket.id === selectedTicketId) || null
    : null;

  return (
    <Router>
      <div className="h-screen bg-gray-100 overflow-hidden">
        <TopNavBar />
        <div className="flex h-full pt-16">
          <Sidebar tickets={tickets} onTicketSelect={handleTicketSelect} />
          <main className="flex-1 ml-80 overflow-hidden">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardView tickets={tickets} />} />
              <Route 
                path="/ticket/:id" 
                element={<TicketDetailView ticket={selectedTicket} onUpdate={handleTicketUpdate} />} 
              />
              <Route path="/new" element={<NewTicketView onCreateTicket={handleCreateTicket} />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
