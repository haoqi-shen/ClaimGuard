import React, { useState } from 'react';
import './CreateExpenseReport.css';
import { ExpenseReport, ExpenseReportLine } from '../../types';
import ExpenseLineForm from './ExpenseLineForm';

interface CreateExpenseReportProps {
  onBack: () => void;
  userName: string;
}

const CreateExpenseReport: React.FC<CreateExpenseReportProps> = ({ onBack, userName }) => {
  const [activeTab, setActiveTab] = useState<'lines' | 'attachments'>('lines');
  const [showLineForm, setShowLineForm] = useState(false);
  const [editingLineIndex, setEditingLineIndex] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<Partial<ExpenseReport>>({
    employeeName: userName,
    company: 'Worcester Polytechnic Institute - WPI',
    reportDate: new Date().toISOString().split('T')[0] as any,
    reimbursementPaymentType: 'check',
    status: 'draft',
    expenseLines: [],
    personalAmount: 0,
    cashAdvanceApplied: 0,
    reimbursementAmount: 0,
    totalAmount: 0
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddExpenseLine = (line: ExpenseReportLine) => {
    const lines = [...(formData.expenseLines || [])];
    if (editingLineIndex !== null) {
      lines[editingLineIndex] = line;
      setEditingLineIndex(null);
    } else {
      lines.push(line);
    }
    
    const total = lines.reduce((sum, l) => sum + l.totalAmount, 0);
    setFormData({
      ...formData,
      expenseLines: lines,
      totalAmount: total,
      reimbursementAmount: total - (formData.cashAdvanceApplied || 0) - (formData.personalAmount || 0)
    });
    setShowLineForm(false);
  };

  const handleEditLine = (index: number) => {
    setEditingLineIndex(index);
    setShowLineForm(true);
  };

  const handleDeleteLine = (index: number) => {
    const lines = [...(formData.expenseLines || [])];
    lines.splice(index, 1);
    const total = lines.reduce((sum, l) => sum + l.totalAmount, 0);
    setFormData({
      ...formData,
      expenseLines: lines,
      totalAmount: total,
      reimbursementAmount: total - (formData.cashAdvanceApplied || 0) - (formData.personalAmount || 0)
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.businessPurpose) {
      alert('Business purpose is required');
      return;
    }
    if (!formData.memo) {
      alert('Memo is required');
      return;
    }
    if (!formData.expenseLines || formData.expenseLines.length === 0) {
      alert('At least one expense line is required');
      return;
    }

    // Check receipt requirements
    for (const line of formData.expenseLines) {
      if (line.totalAmount > 75 && !line.receiptIncluded) {
        alert(`Receipt required for ${line.expenseItem} (amount: $${line.totalAmount})`);
        return;
      }
    }

    // Submit the expense report
    alert('Expense report submitted successfully!');
    onBack();
  };

  const handleSaveForLater = () => {
    alert('Expense report saved as draft');
    onBack();
  };

  if (showLineForm) {
    return (
      <ExpenseLineForm
        onSave={handleAddExpenseLine}
        onCancel={() => {
          setShowLineForm(false);
          setEditingLineIndex(null);
        }}
        initialData={editingLineIndex !== null ? formData.expenseLines![editingLineIndex] : undefined}
      />
    );
  }

  return (
    <div className="create-expense-report">
      <header className="expense-report-header">
        <button className="back-button" onClick={onBack}>← Back to Expense Hub</button>
        <h1>Create Expense Report</h1>
      </header>

      <div className="expense-report-content">
        <div className="expense-summary-bar">
          <div className="summary-item">
            <span className="summary-label">Pay To:</span>
            <span className="summary-value">{formData.employeeName}</span>
          </div>
          <div className="summary-totals">
            <div className="summary-item">
              <span className="summary-label">Personal:</span>
              <span className="summary-value">{formData.personalAmount?.toFixed(2)} USD</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Cash Advance Applied:</span>
              <span className="summary-value">{formData.cashAdvanceApplied?.toFixed(2)} USD</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Reimbursement:</span>
              <span className="summary-value">{formData.reimbursementAmount?.toFixed(2)} USD</span>
            </div>
            <div className="summary-item total">
              <span className="summary-label">Total:</span>
              <span className="summary-value">{formData.totalAmount?.toFixed(2)} USD</span>
            </div>
          </div>
        </div>

        <div className="required-notice">
          <strong>Required fields:</strong>
          <ul>
            <li>Business purpose (mandatory)</li>
            <li>Memo (mandatory)</li>
            <li>Attached receipts for expenses over $75 (mandatory)</li>
          </ul>
        </div>

        <div className="form-section">
          <h2>Expense Report Information</h2>
          <div className="form-grid">
            <div className="form-field">
              <label>Company</label>
              <input
                type="text"
                value={formData.company}
                disabled
                className="disabled-input"
              />
            </div>
            <div className="form-field">
              <label>Expense Report Date *</label>
              <input
                type="date"
                value={formData.reportDate as string}
                onChange={(e) => handleInputChange('reportDate', e.target.value)}
                required
              />
            </div>
            <div className="form-field full-width">
              <label>Business Purpose *</label>
              <select
                value={formData.businessPurpose || ''}
                onChange={(e) => handleInputChange('businessPurpose', e.target.value)}
                required
              >
                <option value="">Select business purpose...</option>
                <option value="Conference">Conference</option>
                <option value="Training">Training</option>
                <option value="Business Meeting">Business Meeting</option>
                <option value="Client Visit">Client Visit</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Expense Report Reference Information</h2>
          <div className="form-grid">
            <div className="form-field">
              <label>Reimbursement Payment Type *</label>
              <select
                value={formData.reimbursementPaymentType}
                onChange={(e) => handleInputChange('reimbursementPaymentType', e.target.value)}
                required
              >
                <option value="check">Check</option>
                <option value="direct_deposit">Direct Deposit</option>
              </select>
            </div>
            <div className="form-field full-width">
              <label>Memo *</label>
              <textarea
                value={formData.memo || ''}
                onChange={(e) => handleInputChange('memo', e.target.value)}
                placeholder="Enter additional notes..."
                rows={3}
                required
              />
            </div>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'lines' ? 'active' : ''}`}
            onClick={() => setActiveTab('lines')}
          >
            Expense Report Lines ({formData.expenseLines?.length || 0})
          </button>
          <button
            className={`tab ${activeTab === 'attachments' ? 'active' : ''}`}
            onClick={() => setActiveTab('attachments')}
          >
            Attachments
          </button>
        </div>

        {activeTab === 'lines' && (
          <div className="tab-content">
            <button className="add-line-button" onClick={() => setShowLineForm(true)}>
              + Add Expense Line
            </button>
            {formData.expenseLines && formData.expenseLines.length > 0 ? (
              <div className="expense-lines-list">
                {formData.expenseLines.map((line, index) => (
                  <div key={line.lineId} className="expense-line-item">
                    <div className="line-details">
                      <div className="line-main">
                        <strong>{line.expenseItem}</strong>
                        <span className="line-amount">${line.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="line-info">
                        <span>{new Date(line.date).toLocaleDateString()}</span>
                        <span>{line.memo}</span>
                      </div>
                    </div>
                    <div className="line-actions">
                      <button onClick={() => handleEditLine(index)}>Edit</button>
                      <button onClick={() => handleDeleteLine(index)}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>No expense lines added yet. Click "Add Expense Line" to get started.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="tab-content">
            <p>Attachment functionality coming soon...</p>
          </div>
        )}

        <div className="form-actions">
          <button className="btn-primary" onClick={handleSubmit}>Submit</button>
          <button className="btn-secondary" onClick={handleSaveForLater}>Save for Later</button>
          <button className="btn-cancel" onClick={onBack}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateExpenseReport;
