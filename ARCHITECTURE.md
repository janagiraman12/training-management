# Component Architecture

## Component Hierarchy

```
App.jsx (Main Container)
├── State Management (subjects, courses, batches, students)
├── LocalStorage Persistence
│
├── Sidebar.jsx
│   ├── Navigation Links
│   └── Dark Mode Toggle
│
├── Alert.jsx (Global Notifications)
│
└── Main Content Area (Conditional Rendering)
    │
    ├── Dashboard.jsx
    │   └── Stats Cards (clickable)
    │
    ├── SubjectManagement.jsx
    │   ├── Form Component
    │   ├── Search Bar
    │   ├── List Grid
    │   └── ConfirmDialog.jsx
    │
    ├── CourseManagement.jsx
    │   ├── Form Component
    │   ├── Checkbox Grid (Subjects)
    │   ├── Course Cards
    │   └── ConfirmDialog.jsx
    │
    ├── BatchManagement.jsx
    │   ├── Form Component
    │   ├── Time Inputs
    │   ├── Batch Cards
    │   └── ConfirmDialog.jsx
    │
    └── StudentManagement.jsx
        ├── Form Component
        ├── Dynamic Dropdowns
        ├── Student Cards
        └── ConfirmDialog.jsx
```

## Data Flow

```
App.jsx (Parent)
    │
    ├─── State: subjects [] ────────┐
    ├─── State: courses []  ────────┤
    ├─── State: batches []  ────────┤
    ├─── State: students [] ────────┤
    │                               │
    ├─── showAlert() ───────────────┤
    ├─── setCurrentPage() ──────────┤
    │                               │
    └─── Props Down ────────────────┘
            │
            ▼
    Child Components
    (Dashboard, SubjectManagement, etc.)
            │
            ▼
    User Actions (Add, Edit, Delete)
            │
            ▼
    Callbacks Back to App.jsx
            │
            ▼
    State Updates
            │
            ▼
    LocalStorage Sync
            │
            ▼
    Re-render with New Data
```

## Component Responsibilities

### App.jsx
- **Purpose**: Root component, state container
- **State**: All application data
- **Effects**: LocalStorage sync, dark mode
- **Renders**: Sidebar + Current Page

### Sidebar.jsx
- **Purpose**: Navigation menu
- **Props**: currentPage, setCurrentPage, darkMode, setDarkMode
- **Features**: Active page highlighting, theme toggle

### Alert.jsx
- **Purpose**: Notification system
- **Props**: type, message, onClose
- **Variants**: Success, Error
- **Auto-dismiss**: 4 seconds

### ConfirmDialog.jsx
- **Purpose**: Deletion confirmation
- **Props**: message, onConfirm, onCancel
- **Modal**: Click outside to cancel

### Dashboard.jsx
- **Purpose**: Overview statistics
- **Props**: subjects, courses, batches, students, onNavigate
- **Features**: Clickable cards with counts

### SubjectManagement.jsx
- **Purpose**: Subject CRUD
- **Props**: subjects, setSubjects, showAlert
- **State**: Local form state, search, edit mode
- **Features**: Add, Edit, Delete, Search, Validation

### CourseManagement.jsx
- **Purpose**: Course CRUD
- **Props**: courses, setCourses, subjects, showAlert
- **State**: Local form state, selected subjects
- **Features**: Multi-select subjects, minimum 2 required

### BatchManagement.jsx
- **Purpose**: Batch CRUD
- **Props**: batches, setBatches, courses, showAlert
- **State**: Local form state, time inputs
- **Features**: Time validation, 12-hour format display

### StudentManagement.jsx
- **Purpose**: Student CRUD
- **Props**: students, setStudents, courses, batches, showAlert
- **State**: Local form state, dynamic batch filtering
- **Features**: Dependent dropdowns, all fields required

## Props Interface

### Management Components Pattern
```javascript
{
  // Data array from parent
  items: Array,
  
  // Setter function from parent
  setItems: Function,
  
  // Alert callback from parent
  showAlert: Function(type, message),
  
  // Optional: Related data
  subjects?: Array,
  courses?: Array,
  batches?: Array
}
```

## Reusable Patterns

### Form Handling
- Controlled inputs with useState
- Submit handler with validation
- Edit mode toggle
- Clear form on success

### List Rendering
- Map over filtered data
- Empty state messages
- Hover effects
- Action buttons (Edit, Delete)

### Validation Flow
1. User submits form
2. Trim whitespace
3. Check required fields
4. Check business rules
5. Show error or success
6. Update state
7. Clear form

## Styling Architecture

### CSS Organization
- Global resets and base styles
- Component-specific classes
- Dark mode variants (.app.dark)
- Responsive breakpoints
- Reusable utility patterns

### Naming Convention
- `.component-name` - Main container
- `.component-name-element` - Child element
- `.btn-variant` - Button variants
- `.form-*` - Form related
- `.list-*` - List related

## State Persistence

```javascript
useEffect(() => {
  // Load from localStorage on mount
  const saved = localStorage.getItem('key');
  if (saved) setState(JSON.parse(saved));
}, []);

useEffect(() => {
  // Save to localStorage on change
  localStorage.setItem('key', JSON.stringify(state));
}, [state]);
```

## Best Practices Implemented

✅ Single Responsibility Principle
✅ Props drilling (simple app, no context needed)
✅ Controlled components
✅ Validation at component level
✅ User feedback (alerts, confirmations)
✅ Error handling
✅ Accessibility (labels, semantic HTML)
✅ Responsive design
✅ Clean code structure
✅ Consistent naming conventions
