import React from 'react';
import { GraduationCap, Book, Calendar, Users } from 'lucide-react';

const Sidebar = ({ currentPage, setCurrentPage, darkMode, setDarkMode }) => {
  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: GraduationCap },
    { id: 'subjects', label: 'Subjects', icon: Book },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'batches', label: 'Batches', icon: Calendar },
    { id: 'students', label: 'Students', icon: Users }
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <GraduationCap size={32} />
        <h2>Training Managment</h2>
      </div>
      
      <div className="nav-links">
        {navigation.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
          {darkMode ? '☀️' : '🌙'} {darkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
