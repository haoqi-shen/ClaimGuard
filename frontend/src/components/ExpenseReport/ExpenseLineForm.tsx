import React, { useState, useEffect } from 'react';
import './ExpenseLineForm.css';
import { ExpenseReportLine } from '../../types';
import Toast, { ToastType } from '../Common/Toast';

interface ExpenseLineFormProps {
  onSave: (line: ExpenseReportLine) => void;
  onCancel: () => void;
  initialData?: ExpenseReportLine;
}

const ExpenseLineForm: React.FC<ExpenseLineFormProps> = ({ onSave, onCancel, initialData }) => {
  const [lineData, setLineData] = useState<Partial<ExpenseReportLine>>(
    initialData || {
      lineId: `LINE-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      quantity: 1,
      perUnitAmount: 0,
      totalAmount: 0,
      attachments: [],
      receiptIncluded: false
    }
  );

  const [attachmentFile, setAttachmentFile] = useState<File | null>(null);
  const [attachmentComment, setAttachmentComment] = useState('');
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  // Expense items with default rates
  const expenseItems = [
    { name: 'Mileage', defaultRate: 0.545, unit: 'miles' },
    { name: 'Meals', defaultRate: 0, unit: 'count' },
    { name: 'Lodging', defaultRate: 0, unit: 'nights' },
    { name: 'Airfare', defaultRate: 0, unit: 'tickets' },
    { name: 'Transportation', defaultRate: 0, unit: 'count' },
    { name: 'Conference Fee', defaultRate: 0, unit: 'count' },
    { name: 'Office Supplies', defaultRate: 0, unit: 'count' },
    { name: 'Other', defaultRate: 0, unit: 'count' }
  ];

  const costCenters = [
    '1043-CC Information Technology',
    '1001-CC Administration',
    '1020-CC Human Resources',
    '1030-CC Finance',
    '1050-CC Marketing'
  ];

  const funds = [
    '110-FD Unrestricted',
    '120-FD Restricted',
    '130-FD Capital',
    '140-FD Endowment'
  ];

  const worktags = [
    'Program 400 Academic Support',
    'Program 500 Student Services',
    'Program 600 Research',
    'Program 700 Instruction'
  ];

  useEffect(() => {
    // Auto-calculate total when quantity or per unit amount changes
    if (lineData.quantity && lineData.perUnitAmount !== undefined) {
      const total = Number((lineData.quantity * lineData.perUnitAmount).toFixed(2));
      setLineData(prev => ({ ...prev, totalAmount: total }));
    }
  }, [lineData.quantity, lineData.perUnitAmount]);

  const handleInputChange = (field: string, value: any) => {
    setLineData({ ...lineData, [field]: value });
  };

  const handleExpenseItemChange = (itemName: string) => {
    const item = expenseItems.find(i => i.name === itemName);
    if (item && item.defaultRate > 0) {
      setLineData({
        ...lineData,
        expenseItem: itemName,
        perUnitAmount: item.defaultRate
      });
    } else {
      setLineData({ ...lineData, expenseItem: itemName });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachmentFile(e.target.files[0]);
    }
  };

  const handleAddAttachment = () => {
    if (attachmentFile) {
      const newAttachment = {
        fileName: attachmentFile.name,
        fileUrl: URL.createObjectURL(attachmentFile),
        fileType: attachmentFile.type,
        uploadDate: new Date(),
        comment: attachmentComment
      };
      
      setLineData({
        ...lineData,
        attachments: [...(lineData.attachments || []), newAttachment],
        receiptIncluded: true
      });
      
      setAttachmentFile(null);
      setAttachmentComment('');
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const attachments = [...(lineData.attachments || [])];
    attachments.splice(index, 1);
    setLineData({
      ...lineData,
      attachments,
      receiptIncluded: attachments.length > 0
    });
  };

  const handleSave = () => {
    // Validate required fields
    if (!lineData.date) {
      setToast({ message: 'Date is required', type: 'error' });
      return;
    }
    if (!lineData.expenseItem) {
      setToast({ message: 'Expense item is required', type: 'error' });
      return;
    }
    if (!lineData.quantity || lineData.quantity <= 0) {
      setToast({ message: 'Quantity must be greater than 0', type: 'error' });
      return;
    }
    if (!lineData.memo) {
      setToast({ message: 'Memo is required', type: 'error' });
      return;
    }
    if (!lineData.costCenter) {
      setToast({ message: 'Cost center is required', type: 'error' });
      return;
    }
    if (!lineData.fund) {
      setToast({ message: 'Fund is required', type: 'error' });
      return;
    }
    if (!lineData.businessReason) {
      setToast({ message: 'Business reason is required', type: 'error' });
      return;
    }

    onSave(lineData as ExpenseReportLine);
  };

  return (
    <div className="expense-line-form">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <header className="form-header">
        <button className="back-button" onClick={onCancel}>← Back</button>
        <h1>{initialData ? 'Edit' : 'Add'} Expense Line</h1>
      </header>

      <div className="form-content">
        <div className="form-columns">
          <div className="left-panel">
            <div className="form-section">
              <h2>Expense Report Line</h2>
              <div className="form-field">
                <label>Date *</label>
                <input
                  type="date"
                  value={lineData.date as string}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
              
              <div className="form-field">
                <label>Expense Item *</label>
                <select
                  value={lineData.expenseItem || ''}
                  onChange={(e) => handleExpenseItemChange(e.target.value)}
                  required
                >
                  <option value="">Select expense item...</option>
                  {expenseItems.map(item => (
                    <option key={item.name} value={item.name}>{item.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Quantity *</label>
                <input
                  type="number"
                  value={lineData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-field">
                <label>Per Unit Amount *</label>
                <input
                  type="number"
                  value={lineData.perUnitAmount}
                  onChange={(e) => handleInputChange('perUnitAmount', parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-field">
                <label>Total Amount</label>
                <input
                  type="number"
                  value={lineData.totalAmount}
                  disabled
                  className="disabled-input"
                />
              </div>

              <div className="form-field">
                <label>Memo *</label>
                <input
                  type="text"
                  value={lineData.memo || ''}
                  onChange={(e) => handleInputChange('memo', e.target.value)}
                  placeholder="e.g., Worcester to Amherst"
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Financial Allocation</h2>
              <div className="form-field">
                <label>Cost Center *</label>
                <select
                  value={lineData.costCenter || ''}
                  onChange={(e) => handleInputChange('costCenter', e.target.value)}
                  required
                >
                  <option value="">Select cost center...</option>
                  {costCenters.map(cc => (
                    <option key={cc} value={cc}>{cc}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Fund *</label>
                <select
                  value={lineData.fund || ''}
                  onChange={(e) => handleInputChange('fund', e.target.value)}
                  required
                >
                  <option value="">Select fund...</option>
                  {funds.map(fund => (
                    <option key={fund} value={fund}>{fund}</option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label>Designee</label>
                <input
                  type="text"
                  value={lineData.designee || ''}
                  onChange={(e) => handleInputChange('designee', e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="form-field">
                <label>Grant</label>
                <input
                  type="text"
                  value={lineData.grant || ''}
                  onChange={(e) => handleInputChange('grant', e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="form-field">
                <label>Student Organization</label>
                <input
                  type="text"
                  value={lineData.studentOrganization || ''}
                  onChange={(e) => handleInputChange('studentOrganization', e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="form-field">
                <label>Detail Code</label>
                <input
                  type="text"
                  value={lineData.detailCode || ''}
                  onChange={(e) => handleInputChange('detailCode', e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="form-field">
                <label>Additional Worktags *</label>
                <select
                  value={lineData.additionalWorktags || ''}
                  onChange={(e) => handleInputChange('additionalWorktags', e.target.value)}
                  required
                >
                  <option value="">Select worktag...</option>
                  {worktags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-section">
              <h2>Item Details</h2>
              <div className="form-field">
                <label>Business Reason *</label>
                <textarea
                  value={lineData.businessReason || ''}
                  onChange={(e) => handleInputChange('businessReason', e.target.value)}
                  placeholder="e.g., went to conference"
                  rows={3}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2>Attachments</h2>
              <div className="attachment-upload">
                <label className="file-input-label">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept="image/*,.pdf"
                  />
                  {attachmentFile ? attachmentFile.name : 'Choose file...'}
                </label>
                <input
                  type="text"
                  value={attachmentComment}
                  onChange={(e) => setAttachmentComment(e.target.value)}
                  placeholder="Add comment (optional)"
                  className="attachment-comment"
                />
                <button
                  type="button"
                  onClick={handleAddAttachment}
                  disabled={!attachmentFile}
                  className="add-attachment-btn"
                >
                  Add Attachment
                </button>
              </div>

              {lineData.attachments && lineData.attachments.length > 0 && (
                <div className="attachments-list">
                  {lineData.attachments.map((att, index) => (
                    <div key={index} className="attachment-item">
                      <div className="attachment-info">
                        <span className="attachment-name">{att.fileName}</span>
                        {att.comment && <span className="attachment-comment">{att.comment}</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveAttachment(index)}
                        className="remove-attachment-btn"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="form-field checkbox-field">
                <label>
                  <input
                    type="checkbox"
                    checked={lineData.receiptIncluded}
                    onChange={(e) => handleInputChange('receiptIncluded', e.target.checked)}
                  />
                  Receipt Included
                </label>
              </div>
            </div>
          </div>

          <div className="right-panel">
            <div className="form-section">
              <h2>Spend Authorization Line</h2>
              <p className="info-text">
                Select a pre-approved spend authorization line if applicable
              </p>
              <button type="button" className="btn-secondary">
                Select Authorization
              </button>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button className="btn-primary" onClick={handleSave}>Save Line</button>
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseLineForm;
