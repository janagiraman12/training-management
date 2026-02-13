import React from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

const Alert = ({ type, message, onClose }) => (
  <div className={`alert ${type}`}>
    {type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
    <span>{message}</span>
    <button onClick={onClose} className="alert-close">
      <X size={16} />
    </button>
  </div>
);

export default Alert;
