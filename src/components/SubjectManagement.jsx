import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Search } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const SubjectManagement = ({ subjects, setSubjects, showAlert }) => {
  const [subjectName, setSubjectName] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = subjectName.trim();

    if (!trimmedName) {
      showAlert('error', 'Subject name cannot be empty');
      return;
    }

    const duplicate = subjects.find(s => 
      s.name.toLowerCase() === trimmedName.toLowerCase() && s.id !== editId
    );

    if (duplicate) {
      showAlert('error', 'Subject already exists');
      return;
    }

    if (editId) {
      setSubjects(subjects.map(s => s.id === editId ? { ...s, name: trimmedName } : s));
      showAlert('success', 'Subject updated successfully');
      setEditId(null);
    } else {
      setSubjects([...subjects, { id: Date.now(), name: trimmedName }]);
      showAlert('success', 'Subject added successfully');
    }
    setSubjectName('');
  };

  const handleEdit = (subject) => {
    setSubjectName(subject.name);
    setEditId(subject.id);
  };

  const handleDelete = (id) => {
    setSubjects(subjects.filter(s => s.id !== id));
    showAlert('success', 'Subject deleted successfully');
    setConfirmDelete(null);
  };

  return (
    <div className="module-container">
      <h2>Subject Management</h2>
      
      <form onSubmit={handleSubmit} className="form-card">
        <div className="form-group">
          <label>Subject Name *</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Enter subject name"
            className="form-input"
          />
        </div>
        <div className="form-actions">
          {editId && (
            <button type="button" onClick={() => { setEditId(null); setSubjectName(''); }} className="btn-secondary">
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary">
            <Plus size={18} />
            {editId ? 'Update Subject' : 'Add Subject'}
          </button>
        </div>
      </form>

      {subjects.length > 0 && (
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search subjects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="list-container">
        {filteredSubjects.length === 0 ? (
          <p className="empty-state">
            {searchTerm ? 'No subjects found' : 'No subjects added yet. Add your first subject above.'}
          </p>
        ) : (
          <div className="list-grid">
            {filteredSubjects.map(subject => (
              <div key={subject.id} className="list-item">
                <span className="item-name">{subject.name}</span>
                <div className="item-actions">
                  <button onClick={() => handleEdit(subject)} className="btn-icon" title="Edit">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => setConfirmDelete(subject.id)} className="btn-icon btn-danger" title="Delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this subject?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default SubjectManagement;
