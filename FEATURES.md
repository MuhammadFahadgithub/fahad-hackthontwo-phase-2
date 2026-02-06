# Feature Extensions Guide

Ideas and implementation guides for extending your todo application beyond Phase 2.

## Overview

Your Phase 2 application is complete with all core features. This guide provides ideas for Phase 3+ enhancements to make your hackathon project stand out.

---

## Quick Wins (1-2 hours each)

### 1. Task Filtering

**What**: Filter tasks by status (All, Active, Completed)

**User Value**: Helps users focus on incomplete tasks or review completed ones

**Implementation**:

**Backend** (No changes needed - already returns all tasks)

**Frontend** (`frontend/components/todos/TodoList.tsx`):
```typescript
const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.completed;
  if (filter === 'completed') return todo.completed;
  return true;
});

// Add filter buttons in UI
<div className="flex gap-2 mb-4">
  <button onClick={() => setFilter('all')}>All</button>
  <button onClick={() => setFilter('active')}>Active</button>
  <button onClick={() => setFilter('completed')}>Completed</button>
</div>
```

**Estimated Time**: 1 hour

---

### 2. Task Sorting

**What**: Sort tasks by date, title, or completion status

**User Value**: Better organization of task lists

**Implementation**:

**Frontend** (`frontend/components/todos/TodoList.tsx`):
```typescript
const [sortBy, setSortBy] = useState<'date' | 'title' | 'status'>('date');

const sortedTodos = [...filteredTodos].sort((a, b) => {
  if (sortBy === 'date') {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  }
  if (sortBy === 'title') {
    return a.title.localeCompare(b.title);
  }
  if (sortBy === 'status') {
    return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
  }
  return 0;
});

// Add sort dropdown
<select onChange={(e) => setSortBy(e.target.value as any)}>
  <option value="date">Sort by Date</option>
  <option value="title">Sort by Title</option>
  <option value="status">Sort by Status</option>
</select>
```

**Estimated Time**: 1 hour

---

### 3. Task Search

**What**: Search tasks by title or description

**User Value**: Quick access to specific tasks

**Implementation**:

**Frontend** (`frontend/components/todos/TodoList.tsx`):
```typescript
const [searchQuery, setSearchQuery] = useState('');

const searchedTodos = sortedTodos.filter(todo =>
  todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  todo.description?.toLowerCase().includes(searchQuery.toLowerCase())
);

// Add search input
<input
  type="text"
  placeholder="Search tasks..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full px-3 py-2 border rounded-md"
/>
```

**Estimated Time**: 1 hour

---

### 4. Dark Mode

**What**: Toggle between light and dark themes

**User Value**: Better user experience, especially at night

**Implementation**:

**Frontend** (`frontend/app/layout.tsx`):
```typescript
'use client';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    setDarkMode(saved === 'true');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <body>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '☀️' : '🌙'}
        </button>
        {children}
      </body>
    </html>
  );
}
```

**Tailwind Config** (`tailwind.config.js`):
```javascript
module.exports = {
  darkMode: 'class',
  // ... rest of config
}
```

**Estimated Time**: 2 hours

---

## Medium Features (3-5 hours each)

### 5. Due Dates

**What**: Add due dates to tasks with visual indicators

**User Value**: Better task prioritization and time management

**Implementation**:

**Backend** (`backend/app/models/todo.py`):
```python
from datetime import date

class Todo(SQLModel, table=True):
    # ... existing fields
    due_date: Optional[date] = Field(default=None)
```

**Migration**:
```bash
alembic revision -m "add due_date to todos"
# Edit migration file to add column
alembic upgrade head
```

**Backend Schema** (`backend/app/schemas/todo.py`):
```python
class TodoCreate(BaseModel):
    # ... existing fields
    due_date: Optional[date] = None

class TodoUpdate(BaseModel):
    # ... existing fields
    due_date: Optional[date] = None
```

**Frontend** (`frontend/lib/api/todos.ts`):
```typescript
export interface Todo {
  // ... existing fields
  due_date: string | null;
}
```

**Frontend UI** (Add date picker to forms):
```typescript
<input
  type="date"
  value={dueDate}
  onChange={(e) => setDueDate(e.target.value)}
  className="w-full px-3 py-2 border rounded-md"
/>
```

**Visual Indicators**:
- Red: Overdue tasks
- Yellow: Due today
- Green: Due in future

**Estimated Time**: 4 hours

---

### 6. Task Priority

**What**: Assign priority levels (Low, Medium, High, Urgent)

**User Value**: Better task organization and focus

**Implementation**:

**Backend** (`backend/app/models/todo.py`):
```python
from enum import Enum

class Priority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"

class Todo(SQLModel, table=True):
    # ... existing fields
    priority: Priority = Field(default=Priority.MEDIUM)
```

**Frontend UI**:
```typescript
<select value={priority} onChange={(e) => setPriority(e.target.value)}>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
  <option value="urgent">Urgent</option>
</select>
```

**Color Coding**:
- Low: Gray
- Medium: Blue
- High: Orange
- Urgent: Red

**Estimated Time**: 3 hours

---

### 7. Task Categories/Tags

**What**: Organize tasks with custom categories or tags

**User Value**: Better organization for different types of tasks

**Implementation**:

**Backend** (`backend/app/models/todo.py`):
```python
class Todo(SQLModel, table=True):
    # ... existing fields
    category: Optional[str] = Field(default=None, max_length=50)
    tags: Optional[str] = Field(default=None)  # JSON string of tags
```

**Frontend**:
```typescript
// Category dropdown
<select value={category} onChange={(e) => setCategory(e.target.value)}>
  <option value="">No Category</option>
  <option value="work">Work</option>
  <option value="personal">Personal</option>
  <option value="shopping">Shopping</option>
  <option value="health">Health</option>
</select>

// Tags input
<input
  type="text"
  placeholder="Add tags (comma-separated)"
  value={tags}
  onChange={(e) => setTags(e.target.value)}
/>
```

**Estimated Time**: 4 hours

---

### 8. Task Notes/Comments

**What**: Add notes or comments to tasks

**User Value**: More detailed task information and history

**Implementation**:

**Backend** (New model `backend/app/models/note.py`):
```python
class Note(SQLModel, table=True):
    __tablename__ = "notes"

    id: Optional[int] = Field(default=None, primary_key=True)
    todo_id: int = Field(foreign_key="todos.id")
    content: str = Field(max_length=1000)
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

**Backend Endpoints**:
```python
@router.post("/todos/{todo_id}/notes")
async def add_note(todo_id: int, content: str, ...):
    # Create note

@router.get("/todos/{todo_id}/notes")
async def get_notes(todo_id: int, ...):
    # Get all notes for task
```

**Frontend**: Add notes section to task detail page

**Estimated Time**: 5 hours

---

## Advanced Features (6-10 hours each)

### 9. Subtasks

**What**: Break down tasks into smaller subtasks

**User Value**: Better task management for complex projects

**Implementation**:

**Backend** (`backend/app/models/todo.py`):
```python
class Todo(SQLModel, table=True):
    # ... existing fields
    parent_id: Optional[int] = Field(default=None, foreign_key="todos.id")
```

**Backend Logic**:
- Subtasks inherit parent's user_id
- Parent task completion based on subtask completion
- Recursive queries for nested subtasks

**Frontend**:
- Nested task display
- Drag-and-drop to create subtasks
- Progress bar showing subtask completion

**Estimated Time**: 8 hours

---

### 10. Task Sharing/Collaboration

**What**: Share tasks with other users

**User Value**: Team collaboration

**Implementation**:

**Backend** (New model):
```python
class TaskShare(SQLModel, table=True):
    __tablename__ = "task_shares"

    id: Optional[int] = Field(default=None, primary_key=True)
    todo_id: int = Field(foreign_key="todos.id")
    shared_with_user_id: int = Field(foreign_key="users.id")
    permission: str = Field(default="view")  # view, edit
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

**Backend Endpoints**:
```python
@router.post("/todos/{todo_id}/share")
async def share_task(todo_id: int, user_email: str, permission: str, ...):
    # Share task with user

@router.get("/todos/shared")
async def get_shared_tasks(...):
    # Get tasks shared with current user
```

**Frontend**:
- Share dialog with email input
- Shared tasks section
- Permission indicators

**Estimated Time**: 10 hours

---

### 11. Recurring Tasks

**What**: Tasks that repeat on a schedule

**User Value**: Automate repetitive tasks

**Implementation**:

**Backend** (`backend/app/models/todo.py`):
```python
class Todo(SQLModel, table=True):
    # ... existing fields
    is_recurring: bool = Field(default=False)
    recurrence_pattern: Optional[str] = Field(default=None)  # daily, weekly, monthly
    recurrence_end_date: Optional[date] = Field(default=None)
```

**Backend Job**:
- Celery or APScheduler for background jobs
- Check for recurring tasks daily
- Create new instances based on pattern

**Frontend**:
- Recurrence settings in task form
- Visual indicator for recurring tasks

**Estimated Time**: 10 hours

---

### 12. Task Attachments

**What**: Upload files/images to tasks

**User Value**: Attach relevant documents or images

**Implementation**:

**Backend**:
- File upload endpoint
- Store files in S3 or similar
- Link files to tasks

**Backend** (New model):
```python
class Attachment(SQLModel, table=True):
    __tablename__ = "attachments"

    id: Optional[int] = Field(default=None, primary_key=True)
    todo_id: int = Field(foreign_key="todos.id")
    filename: str
    file_url: str
    file_size: int
    created_at: datetime = Field(default_factory=datetime.utcnow)
```

**Frontend**:
- File upload component
- Display attachments with preview
- Download functionality

**Estimated Time**: 8 hours

---

## UI/UX Enhancements (2-4 hours each)

### 13. Drag and Drop Reordering

**What**: Reorder tasks by dragging

**User Value**: Custom task ordering

**Implementation**:
- Use `react-beautiful-dnd` or `@dnd-kit/core`
- Add `order` field to Task model
- Update order on drag end

**Estimated Time**: 4 hours

---

### 14. Keyboard Shortcuts

**What**: Quick actions with keyboard

**User Value**: Power user efficiency

**Implementation**:
```typescript
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'n') {
      e.preventDefault();
      // Open new task form
    }
    if (e.ctrlKey && e.key === 'f') {
      e.preventDefault();
      // Focus search
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

**Shortcuts**:
- `Ctrl+N`: New task
- `Ctrl+F`: Search
- `Ctrl+/`: Show shortcuts help
- `Esc`: Close dialogs

**Estimated Time**: 3 hours

---

### 15. Task Statistics Dashboard

**What**: Visual analytics of tasks

**User Value**: Insights into productivity

**Implementation**:
- Use Chart.js or Recharts
- Show completion rate
- Tasks by category
- Tasks by priority
- Completion trends over time

**Estimated Time**: 4 hours

---

### 16. Notifications

**What**: Browser notifications for due tasks

**User Value**: Reminders for important tasks

**Implementation**:
```typescript
// Request permission
Notification.requestPermission();

// Show notification
new Notification('Task Due', {
  body: 'Your task "Buy groceries" is due today',
  icon: '/icon.png'
});
```

**Estimated Time**: 3 hours

---

## Integration Features (5-8 hours each)

### 17. Email Notifications

**What**: Send email reminders for due tasks

**User Value**: External reminders

**Implementation**:
- Use SendGrid or AWS SES
- Background job to check due tasks
- Send email notifications

**Estimated Time**: 6 hours

---

### 18. Calendar Integration

**What**: Sync tasks with Google Calendar

**User Value**: Unified task/event view

**Implementation**:
- Google Calendar API
- OAuth integration
- Sync tasks with due dates as calendar events

**Estimated Time**: 8 hours

---

### 19. Mobile App (React Native)

**What**: Native mobile app

**User Value**: Mobile access

**Implementation**:
- React Native with Expo
- Reuse API client logic
- Push notifications
- Offline support

**Estimated Time**: 40+ hours (separate project)

---

## Implementation Priority

### For Hackathon Demo (Choose 2-3):
1. ✅ Task Filtering (Quick win, impressive)
2. ✅ Task Search (Quick win, useful)
3. ✅ Dark Mode (Visual appeal)
4. ✅ Due Dates (Shows planning)

### For Portfolio (Choose 3-5):
1. ✅ All hackathon features
2. ✅ Task Priority
3. ✅ Task Categories
4. ✅ Task Statistics Dashboard
5. ✅ Keyboard Shortcuts

### For Production (Long-term):
1. ✅ All portfolio features
2. ✅ Task Sharing/Collaboration
3. ✅ Recurring Tasks
4. ✅ Email Notifications
5. ✅ Mobile App

---

## Testing New Features

For each new feature:

1. **Write Tests First** (if following TDD):
   ```python
   # Backend test
   def test_task_with_due_date():
       # Test creating task with due date
       # Test filtering by due date
       # Test overdue tasks
   ```

2. **Update Documentation**:
   - Update README with new features
   - Update API docs
   - Update user guide

3. **Test User Isolation**:
   - Ensure new features respect user boundaries
   - Test with multiple users

4. **Performance Test**:
   - Test with large datasets
   - Optimize queries if needed

---

## Quick Start Template

To add a new feature:

1. **Plan**:
   - Define user story
   - Design data model
   - Design API endpoints
   - Design UI

2. **Backend**:
   - Update models
   - Create migration
   - Add endpoints
   - Write tests

3. **Frontend**:
   - Update types
   - Add API methods
   - Create UI components
   - Test integration

4. **Deploy**:
   - Push to GitHub
   - Auto-deploy to Vercel/Railway
   - Test in production

---

## Resources

- **UI Components**: shadcn/ui, Headless UI, Radix UI
- **Charts**: Chart.js, Recharts, Victory
- **Drag & Drop**: react-beautiful-dnd, @dnd-kit/core
- **Date Pickers**: react-datepicker, date-fns
- **Icons**: Heroicons, Lucide, React Icons
- **Animations**: Framer Motion, React Spring

---

## Success Metrics

Track these metrics for new features:

- **Usage**: How many users use the feature?
- **Engagement**: Does it increase app usage?
- **Performance**: Does it slow down the app?
- **Errors**: Does it introduce bugs?
- **Feedback**: What do users say?

---

**Choose features that align with your hackathon theme and demo story!**
