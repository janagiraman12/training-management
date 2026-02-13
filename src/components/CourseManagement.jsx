import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Search, AlertCircle } from 'lucide-react';
import ConfirmDialog from './ConfirmDialog';

const CourseManagement = ({ courses, setCourses, subjects, showAlert }) => {
  const [courseName, setCourseName] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubjectToggle = (subjectId) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId)
        ? prev.filter(id => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = courseName.trim();

    if (!trimmedName) {
      showAlert('error', 'Course name is required');
      return;
    }

    if (selectedSubjects.length < 2) {
      showAlert('error', 'Course must have at least 2 subjects');
      return;
    }

    if (editId) {
      setCourses(courses.map(c => c.id === editId ? { ...c, name: trimmedName, subjects: selectedSubjects } : c));
      showAlert('success', 'Course updated successfully');
      setEditId(null);
    } else {
      setCourses([...courses, { id: Date.now(), name: trimmedName, subjects: selectedSubjects }]);
      showAlert('success', 'Course created successfully');
    }
    setCourseName('');
    setSelectedSubjects([]);
  };

  const handleEdit = (course) => {
    setCourseName(course.name);
    setSelectedSubjects(course.subjects);
    setEditId(course.id);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(c => c.id !== id));
    showAlert('success', 'Course deleted successfully');
    setConfirmDelete(null);
  };

  return (
    <div className="module-container">
      <h2>Course Management</h2>

      {subjects.length < 2 ? (
        <div className="alert error">
          <AlertCircle size={18} />
          <span>You need at least 2 subjects to create a course. Please add subjects first.</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-card">
          <div className="form-group">
            <label>Course Name *</label>
            <input
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="Enter course name"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Select Subjects * (minimum 2)</label>
            <div className="checkbox-grid">
              {subjects.map(subject => (
                <label key={subject.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedSubjects.includes(subject.id)}
                    onChange={() => handleSubjectToggle(subject.id)}
                  />
                  <span>{subject.name}</span>
                </label>
              ))}
            </div>
            <small className="form-hint">Selected: {selectedSubjects.length}</small>
          </div>

          <div className="form-actions">
            {editId && (
              <button type="button" onClick={() => { setEditId(null); setCourseName(''); setSelectedSubjects([]); }} className="btn-secondary">
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary">
              <Plus size={18} />
              {editId ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      )}

      {courses.length > 0 && (
        <div className="search-bar">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <div className="list-container">
        {filteredCourses.length === 0 ? (
          <p className="empty-state">
            {searchTerm ? 'No courses found' : 'No courses created yet. Create your first course above.'}
          </p>
        ) : (
          <div className="course-list">
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-header">
                  <h3>{course.name}</h3>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(course)} className="btn-icon" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => setConfirmDelete(course.id)} className="btn-icon btn-danger" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                <div className="course-subjects">
                  <strong>Subjects ({course.subjects.length}):</strong>
                  <div className="subject-tags">
                    {course.subjects.map(subjectId => {
                      const subject = subjects.find(s => s.id === subjectId);
                      return subject ? <span key={subjectId} className="tag">{subject.name}</span> : null;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmDelete && (
        <ConfirmDialog
          message="Are you sure you want to delete this course?"
          onConfirm={() => handleDelete(confirmDelete)}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};

export default CourseManagement;
