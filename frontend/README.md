# Frontend - Next.js Todo Application

Next.js 14 frontend with Better Auth, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Authentication**: Better Auth 0.1.0
- **State Management**: React hooks
- **HTTP Client**: Fetch API with custom wrapper

## Project Structure

```
frontend/
├── app/
│   ├── (auth)/                  # Public auth routes
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   └── signup/
│   │       └── page.tsx         # Signup page
│   ├── (protected)/             # Protected routes (require auth)
│   │   └── tasks/
│   │       ├── page.tsx         # Task list page
│   │       ├── new/
│   │       │   └── page.tsx     # Create task page
│   │       └── [id]/
│   │           ├── page.tsx     # Task detail page
│   │           └── edit/
│   │               └── page.tsx # Edit task page
│   ├── api/
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts     # Better Auth API routes
│   ├── dashboard/
│   │   └── page.tsx             # Legacy dashboard (use /tasks instead)
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home/landing page
│   └── globals.css              # Global styles
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx        # Login form component
│   │   └── SignUpForm.tsx       # Signup form component
│   ├── todos/
│   │   ├── TodoList.tsx         # Task list component
│   │   └── TodoItem.tsx         # Individual task component
│   └── ui/
│       ├── Button.tsx           # Button component
│       ├── Card.tsx             # Card component
│       └── Input.tsx            # Input component
├── lib/
│   ├── api/
│   │   ├── client.ts            # Base API client with JWT
│   │   └── todos.ts             # Todo API methods
│   ├── auth/
│   │   ├── AuthProvider.tsx     # Auth context provider
│   │   └── better-auth.ts       # Better Auth configuration
│   └── utils/
│       └── cn.ts                # Utility functions
├── types/
│   └── index.ts                 # TypeScript type definitions
├── middleware.ts                # Next.js middleware for auth
├── .env.local                   # Environment variables (gitignored)
├── .env.local.example           # Environment template
├── package.json                 # Dependencies
├── tailwind.config.js           # Tailwind configuration
└── tsconfig.json                # TypeScript configuration
```

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see backend/README.md)

### Installation

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**:
   ```bash
   # Copy example file
   copy .env.local.example .env.local  # Windows
   cp .env.local.example .env.local    # macOS/Linux

   # Edit .env.local with your values:
   # - NEXT_PUBLIC_API_URL: Backend API URL (http://localhost:8000)
   # - BETTER_AUTH_SECRET: Shared secret with backend (min 32 chars)
   # - BETTER_AUTH_URL: Frontend URL (http://localhost:3000)
   # - DATABASE_URL: Neon connection string (for Better Auth)
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

Application will be available at http://localhost:3000

## Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

## Pages & Routes

### Public Routes

**`/` - Home Page**
- Landing page with signup/login links
- Redirects authenticated users to /tasks

**`/signup` - Signup Page**
- User registration form
- Email and password validation
- Redirects to /tasks on success

**`/login` - Login Page**
- User authentication form
- JWT token generation
- Redirects to /tasks on success

### Protected Routes (Require Authentication)

**`/tasks` - Task List Page**
- Displays all user's tasks
- Inline create, edit, delete functionality
- Toggle task completion
- Empty state for no tasks
- Maps to User Story 2: View Personal Task List

**`/tasks/new` - Create Task Page**
- Form for creating new task
- Title (required, max 255 chars)
- Description (optional, max 1000 chars)
- Validation and error handling
- Maps to User Story 3: Create New Task

**`/tasks/[id]` - Task Detail Page**
- Full task information display
- Completion toggle
- Edit and delete buttons
- Metadata (created, updated, ID)
- Maps to User Story 4: View Single Task Details

**`/tasks/[id]/edit` - Edit Task Page**
- Pre-populated form with existing data
- Character counters
- Save/cancel actions
- Maps to User Story 5: Update Existing Task

## Components

### Authentication Components

**`LoginForm`**
- Email and password inputs
- Form validation
- Error handling
- JWT token storage

**`SignUpForm`**
- Email, password, and name inputs
- Password strength validation
- Duplicate email handling

**`AuthProvider`**
- React context for auth state
- JWT token management
- User information
- Login/logout methods

### Task Components

**`TodoList`**
- Displays array of tasks
- Inline create form
- Empty state
- Task statistics (total, completed, active)

**`TodoItem`**
- Individual task display
- Inline edit mode
- Completion checkbox
- Edit and delete buttons
- Confirmation dialogs

### UI Components

**`Button`**
- Variants: primary, secondary, danger
- Disabled state
- Loading state

**`Card`**
- Container component
- Header and content sections
- Consistent styling

**`Input`**
- Text input with label
- Validation states
- Error messages
- Character limits

## API Integration

### API Client (`lib/api/client.ts`)

Base API client with automatic JWT token attachment:

```typescript
// GET request
const data = await apiGet<Todo>('/api/v1/todos/1');

// POST request
const newTodo = await apiPost<Todo>('/api/v1/todos', { title: 'New task' });

// PUT request
const updated = await apiPut<Todo>('/api/v1/todos/1', { completed: true });

// DELETE request
await apiDelete('/api/v1/todos/1');
```

### Todo API Methods (`lib/api/todos.ts`)

```typescript
// Fetch all todos
const todos = await fetchTodos();

// Create todo
const todo = await createTodo({ title: 'Buy groceries', description: 'Milk, eggs' });

// Update todo
const updated = await updateTodo(1, { completed: true });

// Delete todo
await deleteTodo(1);
```

### Authentication Flow

1. User submits login/signup form
2. Better Auth generates JWT token
3. Token stored in localStorage
4. API client attaches token to all requests
5. Backend verifies token and returns user data
6. Protected routes check auth state
7. Unauthenticated users redirected to /login

## Security Features

### JWT Token Management

- Tokens stored in localStorage
- Automatically attached to API requests
- 401 responses trigger redirect to login
- Tokens never logged or displayed
- Logout clears all auth state

### Route Protection

- Protected routes wrapped in auth guards
- Authentication check before page render
- Unauthenticated users redirected to /login
- No protected content rendered without auth

### User Data Isolation

- Frontend never generates or modifies user_id
- User_id logic handled by backend via JWT
- Each user sees only their own tasks
- No cross-user data access possible

### Input Validation

- Client-side validation before API calls
- Required field checks
- Character limits enforced
- Error messages for invalid input

## Styling

### Tailwind CSS

The application uses Tailwind CSS for styling with a custom configuration:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom colors
      }
    }
  }
}
```

### Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly UI elements
- Tested on various screen sizes

## Error Handling

### API Errors

- **401 Unauthorized**: Redirect to login
- **403 Forbidden**: Show "Access denied" message
- **404 Not Found**: Show "Task not found" message
- **500 Server Error**: Show generic error message

### Form Validation

- Required field validation
- Character limit enforcement
- Email format validation
- Password strength requirements

### Network Errors

- Loading states during API calls
- Error messages for failed requests
- Retry mechanisms where appropriate
- Graceful degradation

## Development

### Adding New Pages

1. Create page file in appropriate directory
2. Add authentication guard if protected
3. Implement UI with existing components
4. Add API integration
5. Test error handling

### Adding New Components

1. Create component file in `components/`
2. Define TypeScript interfaces for props
3. Implement component logic
4. Add styling with Tailwind
5. Export from component directory

### State Management

- Use React hooks (useState, useEffect)
- Auth state in AuthProvider context
- Local state for form inputs
- Server state fetched from API

## Testing

### Manual Testing Checklist

1. **Authentication**
   - [ ] Signup with new email
   - [ ] Login with existing account
   - [ ] Logout clears session
   - [ ] Protected routes redirect when not authenticated

2. **Task Management**
   - [ ] Create new task
   - [ ] View task list
   - [ ] View task details
   - [ ] Edit task
   - [ ] Delete task
   - [ ] Toggle task completion

3. **User Isolation**
   - [ ] Create two users
   - [ ] Verify each sees only their own tasks
   - [ ] Attempt to access other user's task by URL

4. **Error Handling**
   - [ ] Invalid login credentials
   - [ ] Network failure during API call
   - [ ] Session expiration
   - [ ] Invalid form input

## Environment Variables

Required variables in `.env.local`:

```bash
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3000

# Database (for Better Auth)
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Environment
NODE_ENV=development
```

## Troubleshooting

### API connection fails
- Verify NEXT_PUBLIC_API_URL is correct
- Ensure backend is running on expected port
- Check CORS configuration in backend

### Authentication not working
- Verify BETTER_AUTH_SECRET matches backend
- Check token is stored in localStorage
- Ensure Authorization header is attached to requests

### Pages not loading
- Check for JavaScript errors in console
- Verify all dependencies are installed
- Run `npm run type-check` for TypeScript errors

### Styling issues
- Ensure Tailwind CSS is configured correctly
- Check `globals.css` is imported in layout
- Verify class names are correct

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deployment Checklist

- [ ] Set NODE_ENV=production
- [ ] Configure production API URL
- [ ] Use strong BETTER_AUTH_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Configure production database
- [ ] Test all features in production
- [ ] Set up monitoring and analytics
- [ ] Configure error tracking (Sentry)

### Recommended Hosting

- **Frontend**: Vercel (optimized for Next.js)
- **Alternative**: Netlify, Railway, or Render

## Contributing

1. Create feature branch
2. Follow existing code style
3. Test all changes manually
4. Update documentation
5. Submit pull request

## License

MIT License - See LICENSE file for details
