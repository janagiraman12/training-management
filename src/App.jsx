import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Alert from './components/Alert';
import Dashboard from './components/Dashboard';
import SubjectManagement from './components/SubjectManagement';
import CourseManagement from './components/CourseManagement';
import BatchManagement from './components/BatchManagement';
import StudentManagement from './components/StudentManagement';
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [alert, setAlert] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // LocalStorage persistence
  useEffect(() => {
    const savedSubjects = localStorage.getItem('subjects');
    const savedCourses = localStorage.getItem('courses');
    const savedBatches = localStorage.getItem('batches');
    const savedStudents = localStorage.getItem('students');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedSubjects) setSubjects(JSON.parse(savedSubjects));
    if (savedCourses) setCourses(JSON.parse(savedCourses));
    if (savedBatches) setBatches(JSON.parse(savedBatches));
    if (savedStudents) setStudents(JSON.parse(savedStudents));
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode));
  }, []);

  useEffect(() => {
    localStorage.setItem('subjects', JSON.stringify(subjects));
  }, [subjects]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main className="main-content">
        {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}

        {currentPage === 'dashboard' && (
          <Dashboard 
            subjects={subjects} 
            courses={courses} 
            batches={batches} 
            students={students}
            onNavigate={setCurrentPage}
          />
        )}

        {currentPage === 'subjects' && (
          <SubjectManagement 
            subjects={subjects} 
            setSubjects={setSubjects} 
            showAlert={showAlert}
          />
        )}

        {currentPage === 'courses' && (
          <CourseManagement 
            courses={courses} 
            setCourses={setCourses} 
            subjects={subjects}
            showAlert={showAlert}
          />
        )}

        {currentPage === 'batches' && (
          <BatchManagement 
            batches={batches} 
            setBatches={setBatches} 
            courses={courses}
            showAlert={showAlert}
          />
        )}

        {currentPage === 'students' && (
          <StudentManagement 
            students={students} 
            setStudents={setStudents} 
            courses={courses}
            batches={batches}
            showAlert={showAlert}
          />
        )}
      </main>
    </div>
  );
}

export default App;
