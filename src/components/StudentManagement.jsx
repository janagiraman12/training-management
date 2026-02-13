import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Search, AlertCircle } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const StudentManagement = ({ students, setStudents, courses, batches, showAlert }) => {
  const [studentName, setStudentName] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableBatches = selectedCourse 
    ? batches.filter(b => b.courseId === parseInt(selectedCourse))
    : [];

  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    setSelectedBatch('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = studentName.trim();

    if (!trimmedName) {
      showAlert('error', 'Student name is required');
      return;
    }

    if (!selectedCourse) {
      showAlert('error', 'Please select a course');
      return;
    }

    if (!selectedBatch) {
      showAlert('error', 'Please select a batch');
      return;
    }

    const studentData = {
      id: editId || Date.now(),
      name: trimmedName,
      courseId: parseInt(selectedCourse),
      batchId: parseInt(selectedBatch)
    };

    if (editId) {
      setStudents(students.map(s => s.id === editId ? studentData : s));
      showAlert('success', 'Student updated successfully');
      setEditId(null);
    } else {
      setStudents([...students, studentData]);
      showAlert('success', 'Student added successfully');
    }

    setStudentName('');
    setSelectedCourse('');
    setSelectedBatch('');
  };

  const handleEdit = (student) => {
    setStudentName(student.name);
    setSelectedCourse(student.courseId.toString());
    setSelectedBatch(student.batchId.toString());
    setEditId(student.id);
  };

  const handleDelete = (id) => {
    setStudents(students.filter(s => s.id !== id));
    showAlert('success', 'Student deleted successfully');
    setConfirmDelete(null);
  };

  const getCourseName = (courseId) => {
    return courses.find(c => c.id === courseId)?.name || 'Unknown';
  };

  const getBatchName = (batchId) => {
    return batches.find(b => b.id === batchId)?.name || 'Unknown';
  };

  return (
    <div className="module-container">
      <h2>Student Management</h2>

      {courses.length === 0 ? (
        <div className="alert error">
          <AlertCircle size={18} />
          <span>You need at least one course to add students. Please create a course first.</span>
        </div>
      ) : batches.length === 0 ? (
        <div className="alert error">
          <AlertCircle size={18} />
          <span>You need at least one batch to add students. Please create a batch first.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-group">
            <label>Student Name *</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Course *</label>
            <select
              value={selectedCourse}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="form-input"
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Batch *</label>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="form-input"
              disabled={!selectedCourse}
            >
              <option value="">
                {selectedCourse ? 'Select a batch' : 'Select a course first'}
              </option>
              {availableBatches.map(batch => (
                <option key={batch.id} value={batch.id}>{batch.name}</option>
              ))}
            </select>
            {selectedCourse && availableBatches.length === 0 && (
              <small className="form-hint error">No batches available for this course</small>
            )}
          </div>

          <div className="form-actions">
            {editId && (
              <button type="button" onClick={() => { 
                setEditId(null); 
                setStudentName(''); 
                setSelectedCourse(''); 
                setSelectedBatch(''); 
              }} className="btn-secondary">
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary">
              <Plus size={18} />
              {editId ? 'Update Student' : 'Add Student'}
            </button>
          </div>
        </form>
      )}

      {students.length > 0 && (
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="list-container">
        {filteredStudents.length === 0 ? (
          <p className="empty-state">
            {searchTerm ? 'No students found' : 'No students added yet. Add your first student above.'}
          </p>
        ) : (
          <div className="student-list">
            {filteredStudents.map(student => (
              <div key={student.id} className="student-card">
                <div className="student-header">
                  <h3>{student.name}</h3>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(student)} className="btn-icon" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => setConfirmDelete(student.id)} className="btn-icon btn-danger" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="student-info">
                  <div className="info-item">
                    <strong>Course:</strong>
                    <span className="tag">{getCourseName(student.courseId)}</span>
                  </div>
                  <div className="info-item">
                    <strong>Batch:</strong>
                    <span className="tag batch-tag">{getBatchName(student.batchId)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this student?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default StudentManagement;
