import React from 'react';
import { AlertCircle } from 'lucide-react';

const ConfirmDialog = ({ message, onConfirm, onCancel }) => (
  <div className="modal-overlay" onClick={onCancel}>
    <div className="confirm-dialog" onClick={e => e.stopPropagation()}>
      <AlertCircle size={48} className="confirm-icon" />
      <h3>Confirm Action</h3>
      <p>{message}</p>
      <div className="confirm-actions">
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
        <button onClick={onConfirm} className="btn-danger">Delete</button>
      </div>
    </div>
  </div>
);

export default ConfirmDialog;
