# Training Management System

A component-based React application for managing training programs with subjects, courses, batches, and students.

## 📁 Project Structure

```
training-app/
├── src/
│   ├── components/
│   │   ├── Alert.jsx              # Alert notification component
│   │   ├── ConfirmDialog.jsx      # Confirmation dialog for deletions
│   │   ├── Dashboard.jsx          # Main dashboard with stats cards
│   │   ├── Sidebar.jsx            # Navigation sidebar
│   │   ├── SubjectManagement.jsx  # Subject CRUD operations
│   │   ├── CourseManagement.jsx   # Course CRUD operations
│   │   ├── BatchManagement.jsx    # Batch CRUD operations
│   │   └── StudentManagement.jsx  # Student CRUD operations
│   ├── App.jsx                    # Main app component with state management
│   ├── main.jsx                   # React entry point
│   └── styles.css                 # Global styles with dark mode
├── index.html                     # HTML template
├── package.json                   # Dependencies
└── vite.config.js                 # Vite configuration
```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## ✨ Features

### 1. Subject Management
- Add, edit, and delete subjects
- Duplicate prevention
- Search functionality
- Form validation

### 2. Course Management
- Create courses with multiple subjects
- Minimum 2 subjects required
- Visual subject tags
- Edit and delete functionality

### 3. Batch Management
- Create batches for courses
- Start/End time validation
- Time formatting (12-hour format)
- Course association

### 4. Student Management
- Add students to courses and batches
- Dynamic batch dropdown (filtered by course)
- All fields mandatory
- Full CRUD operations

### 5. Dashboard
- Real-time statistics
- Clickable cards for navigation
- Visual overview of system data

## 🎨 Additional Features

- **LocalStorage Persistence** - Data persists across sessions
- **Dark Mode** - Toggle between light and dark themes
- **Search/Filter** - Search functionality in all modules
- **Confirmation Dialogs** - Safe deletion with confirmations
- **Responsive Design** - Mobile-friendly layout
- **Clean UI** - Modern, professional interface
- **Form Validations** - Comprehensive validation rules

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool
- **Lucide React** - Icon library
- **CSS3** - Styling with dark mode support

## 📋 Component Details

### Alert Component
- Success/Error notifications
- Auto-dismiss after 4 seconds
- Closeable

### ConfirmDialog Component
- Modal confirmation for deletions
- Click outside to cancel
- Clear action buttons

### Dashboard Component
- Displays total counts
- Clickable cards navigate to modules
- Color-coded by category

### Management Components
Each management component includes:
- Form with validation
- List view with search
- Edit functionality
- Delete with confirmation
- Empty states
- Error handling

## 🎯 Key Concepts Demonstrated

- **React Hooks** - useState, useEffect
- **Controlled Components** - Form handling
- **Props & State Management** - Data flow
- **Component Composition** - Reusable components
- **LocalStorage API** - Data persistence
- **Conditional Rendering** - Dynamic UI
- **Event Handling** - User interactions
- **Validation Logic** - Input validation
- **Responsive Design** - Mobile support

## 📝 Usage Notes

1. Start by adding subjects (minimum 2 required for courses)
2. Create courses with multiple subjects
3. Add batches associated with courses
4. Finally, add students to specific course-batch combinations

All data is stored in browser localStorage and persists across sessions.

## 🔄 State Management

The app uses React's built-in state management:
- Central state in `App.jsx`
- Props drilling for data and callbacks
- LocalStorage for persistence
- No external state management library needed

## 🎨 Styling Approach

- Pure CSS with CSS variables for theming
- No CSS frameworks
- Mobile-first responsive design
- Smooth transitions and animations
- Consistent spacing and typography

## 🚦 Form Validations

- Empty field validation
- Duplicate entry prevention
- Minimum selection requirements
- Time constraint validation
- Dynamic field enabling/disabling
- Clear error messages
