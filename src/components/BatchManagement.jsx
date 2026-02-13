import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Search, AlertCircle } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const BatchManagement = ({ batches, setBatches, courses, showAlert }) => {
  const [batchName, setBatchName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filteredBatches = batches.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = batchName.trim();

    if (!trimmedName) {
      showAlert('error', 'Batch name is required');
      return;
    }

    if (!selectedCourse) {
      showAlert('error', 'Please select a course');
      return;
    }

    if (!startTime || !endTime) {
      showAlert('error', 'Start and end times are required');
      return;
    }

    if (startTime >= endTime) {
      showAlert('error', 'Start time must be before end time');
      return;
    }

    const batchData = {
      id: editId || Date.now(),
      name: trimmedName,
      courseId: parseInt(selectedCourse),
      startTime,
      endTime
    };

    if (editId) {
      setBatches(batches.map(b => b.id === editId ? batchData : b));
      showAlert('success', 'Batch updated successfully');
      setEditId(null);
    } else {
      setBatches([...batches, batchData]);
      showAlert('success', 'Batch created successfully');
    }

    setBatchName('');
    setSelectedCourse('');
    setStartTime('');
    setEndTime('');
  };

  const handleEdit = (batch) => {
    setBatchName(batch.name);
    setSelectedCourse(batch.courseId.toString());
    setStartTime(batch.startTime);
    setEndTime(batch.endTime);
    setEditId(batch.id);
  };

  const handleDelete = (id) => {
    setBatches(batches.filter(b => b.id !== id));
    showAlert('success', 'Batch deleted successfully');
    setConfirmDelete(null);
  };

  const getCourseName = (courseId) => {
    return courses.find(c => c.id === courseId)?.name || 'Unknown Course';
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="module-container">
      <h2>Batch Management</h2>

      {courses.length === 0 ? (
        <div className="alert error">
          <AlertCircle size={18} />
          <span>You need at least one course to create a batch. Please create a course first.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-group">
            <label>Batch Name *</label>
            <input
              type="text"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              placeholder="Enter batch name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Course *</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="form-input"
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Time *</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>End Time *</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-actions">
            {editId && (
              <button type="button" onClick={() => { 
                setEditId(null); 
                setBatchName(''); 
                setSelectedCourse(''); 
                setStartTime(''); 
                setEndTime(''); 
              }} className="btn-secondary">
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary">
              <Plus size={18} />
              {editId ? 'Update Batch' : 'Create Batch'}
            </button>
          </div>
        </form>
      )}

      {batches.length > 0 && (
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search batches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="list-container">
        {filteredBatches.length === 0 ? (
          <p className="empty-state">
            {searchTerm ? 'No batches found' : 'No batches created yet. Create your first batch above.'}
          </p>
        ) : (
          <div className="batch-list">
            {filteredBatches.map(batch => (
              <div key={batch.id} className="batch-card">
                <div className="batch-header">
                  <h3>{batch.name}</h3>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(batch)} className="btn-icon" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => setConfirmDelete(batch.id)} className="btn-icon btn-danger" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="batch-info">
                  <div className="info-row">
                    <strong>Course:</strong>
                    <span className="tag">{getCourseName(batch.courseId)}</span>
                  </div>
                  <div className="info-row">
                    <strong>Timing:</strong>
                    <span className="time-display">
                      {formatTime(batch.startTime)} - {formatTime(batch.endTime)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this batch?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default BatchManagement;
