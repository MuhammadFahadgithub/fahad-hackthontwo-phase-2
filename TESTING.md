# Smoke Test Checklist

**Purpose**: Manual validation checklist for end-to-end functionality testing

**When to Use**: Before deployment, after major changes, or for regression testing

**Estimated Time**: 15-20 minutes

---

## Prerequisites

- [ ] Backend running on http://localhost:8000
- [ ] Frontend running on http://localhost:3000
- [ ] Database accessible (Neon PostgreSQL)
- [ ] Environment variables configured correctly

---

## 1. Authentication Flow ✅

### Signup
- [ ] Navigate to http://localhost:3000/signup
- [ ] Enter new email (e.g., test@example.com)
- [ ] Enter password (min 8 characters)
- [ ] Enter name (optional)
- [ ] Click "Sign Up"
- [ ] **Expected**: Redirected to /tasks with empty task list
- [ ] **Expected**: User email displayed in navbar

### Login
- [ ] Logout from current session
- [ ] Navigate to http://localhost:3000/login
- [ ] Enter existing email
- [ ] Enter correct password
- [ ] Click "Log In"
- [ ] **Expected**: Redirected to /tasks
- [ ] **Expected**: Previous tasks visible (if any)

### Invalid Login
- [ ] Navigate to /login
- [ ] Enter incorrect password
- [ ] Click "Log In"
- [ ] **Expected**: Error message displayed
- [ ] **Expected**: Remain on login page

### Logout
- [ ] Click "Log Out" button in navbar
- [ ] **Expected**: Redirected to /login
- [ ] **Expected**: Cannot access /tasks without re-authenticating

---

## 2. Task Management (CRUD) ✅

### Create Task (US3)
- [ ] Login as user
- [ ] Navigate to /tasks
- [ ] Click "+ Add New Todo" button
- [ ] Enter title: "Test Task 1"
- [ ] Enter description: "This is a test task"
- [ ] Click "Create"
- [ ] **Expected**: Task appears in list
- [ ] **Expected**: Task shows correct title and description

### View Task List (US2)
- [ ] Navigate to /tasks
- [ ] **Expected**: All user's tasks displayed
- [ ] **Expected**: Task count shown (Total, Completed, Active)
- [ ] **Expected**: Empty state if no tasks

### View Task Detail (US4)
- [ ] Click on a task from the list
- [ ] **Expected**: Redirected to /tasks/[id]
- [ ] **Expected**: Full task details displayed
- [ ] **Expected**: Created and updated timestamps shown
- [ ] **Expected**: Edit and Delete buttons visible

### Update Task (US5)
- [ ] From task detail page, click "Edit"
- [ ] **Expected**: Redirected to /tasks/[id]/edit
- [ ] **Expected**: Form pre-populated with existing data
- [ ] Change title to "Updated Test Task"
- [ ] Change description
- [ ] Click "Save Changes"
- [ ] **Expected**: Redirected to task detail page
- [ ] **Expected**: Changes reflected in task display

### Toggle Completion (US7)
- [ ] From task list, click checkbox on incomplete task
- [ ] **Expected**: Task marked as completed (strikethrough)
- [ ] **Expected**: Completed count incremented
- [ ] Click checkbox again
- [ ] **Expected**: Task marked as incomplete
- [ ] **Expected**: Active count incremented

### Delete Task (US6)
- [ ] From task detail page, click "Delete"
- [ ] **Expected**: Confirmation dialog appears
- [ ] Click "OK" to confirm
- [ ] **Expected**: Redirected to /tasks
- [ ] **Expected**: Task no longer in list
- [ ] **Expected**: Task count updated

---

## 3. User Isolation & Security 🔒

### Cross-User Data Access
- [ ] Create User A with email userA@example.com
- [ ] Login as User A
- [ ] Create task "User A Task"
- [ ] Note the task ID from URL (e.g., /tasks/123)
- [ ] Logout
- [ ] Create User B with email userB@example.com
- [ ] Login as User B
- [ ] **Expected**: User B sees empty task list (or only their tasks)
- [ ] Manually navigate to /tasks/123 (User A's task)
- [ ] **Expected**: Error message or "Task not found"
- [ ] **Expected**: Cannot view, edit, or delete User A's task

### JWT Token Validation
- [ ] Login as user
- [ ] Open browser DevTools → Application → Local Storage
- [ ] Delete or modify the auth_token
- [ ] Try to access /tasks
- [ ] **Expected**: Redirected to /login
- [ ] **Expected**: 401 Unauthorized error

### Protected Routes
- [ ] Logout (clear session)
- [ ] Try to access /tasks directly
- [ ] **Expected**: Redirected to /login
- [ ] Try to access /tasks/new directly
- [ ] **Expected**: Redirected to /login
- [ ] Try to access /tasks/123 directly
- [ ] **Expected**: Redirected to /login

---

## 4. Form Validation ✅

### Required Fields
- [ ] Navigate to /tasks/new
- [ ] Leave title empty
- [ ] Click "Create Task"
- [ ] **Expected**: Error message "Title is required"
- [ ] **Expected**: Form not submitted

### Character Limits
- [ ] Navigate to /tasks/new
- [ ] Enter title with 256+ characters
- [ ] **Expected**: Input limited to 255 characters
- [ ] Enter description with 1001+ characters
- [ ] **Expected**: Input limited to 1000 characters
- [ ] **Expected**: Character counter displayed

### Email Validation (Signup)
- [ ] Navigate to /signup
- [ ] Enter invalid email (e.g., "notanemail")
- [ ] **Expected**: Validation error
- [ ] Enter valid email format
- [ ] **Expected**: No validation error

---

## 5. Error Handling 🚨

### Network Errors
- [ ] Stop backend server
- [ ] Try to create a task
- [ ] **Expected**: Error message displayed
- [ ] **Expected**: Form data preserved
- [ ] Restart backend server
- [ ] Retry operation
- [ ] **Expected**: Operation succeeds

### Session Expiration
- [ ] Login as user
- [ ] Wait for token expiration (7 days) OR manually expire token
- [ ] Try to perform any operation
- [ ] **Expected**: Redirected to /login
- [ ] **Expected**: Must re-authenticate

### Invalid Task ID
- [ ] Navigate to /tasks/99999 (non-existent ID)
- [ ] **Expected**: "Task not found" error
- [ ] **Expected**: Option to return to task list

### Duplicate Email (Signup)
- [ ] Try to signup with existing email
- [ ] **Expected**: Error message about duplicate email
- [ ] **Expected**: Remain on signup page

---

## 6. UI/UX Validation 🎨

### Responsive Design
- [ ] Resize browser to mobile width (320px)
- [ ] **Expected**: Layout adapts to mobile
- [ ] **Expected**: All buttons accessible
- [ ] **Expected**: Forms usable on mobile
- [ ] Test on tablet width (768px)
- [ ] **Expected**: Layout optimized for tablet

### Loading States
- [ ] Observe loading indicators during:
  - [ ] Login/signup
  - [ ] Task list fetch
  - [ ] Task creation
  - [ ] Task update
  - [ ] Task deletion
- [ ] **Expected**: Loading text or spinner visible
- [ ] **Expected**: Buttons disabled during loading

### Empty States
- [ ] Login with new user (no tasks)
- [ ] **Expected**: Empty state message displayed
- [ ] **Expected**: "Add New Todo" button prominent
- [ ] **Expected**: Helpful message encouraging task creation

### Navigation
- [ ] Test all navigation flows:
  - [ ] Home → Signup → Tasks
  - [ ] Home → Login → Tasks
  - [ ] Tasks → New Task → Tasks
  - [ ] Tasks → Task Detail → Edit → Task Detail
  - [ ] Task Detail → Back to Tasks
- [ ] **Expected**: All navigation works smoothly
- [ ] **Expected**: Browser back button works correctly

---

## 7. Backend API Testing 🔧

### API Documentation
- [ ] Navigate to http://localhost:8000/docs
- [ ] **Expected**: Swagger UI loads
- [ ] **Expected**: All endpoints documented
- [ ] Test an endpoint from Swagger UI
- [ ] **Expected**: Endpoint responds correctly

### Health Check
- [ ] Navigate to http://localhost:8000/api/v1/health
- [ ] **Expected**: `{ "status": "healthy" }` response

### CORS Configuration
- [ ] Check browser console for CORS errors
- [ ] **Expected**: No CORS errors
- [ ] **Expected**: Credentials included in requests

---

## 8. Database Validation 💾

### Data Persistence
- [ ] Create a task
- [ ] Refresh browser
- [ ] **Expected**: Task still visible
- [ ] Logout and login again
- [ ] **Expected**: Task still visible
- [ ] Restart backend server
- [ ] **Expected**: Task still visible (persisted in database)

### User Isolation (Database Level)
- [ ] Check database directly (if accessible)
- [ ] **Expected**: Each task has user_id foreign key
- [ ] **Expected**: Queries filter by user_id
- [ ] **Expected**: No cross-user data visible

---

## 9. Edge Cases 🔍

### Concurrent Operations
- [ ] Open two browser tabs as same user
- [ ] Create task in Tab 1
- [ ] Refresh Tab 2
- [ ] **Expected**: New task visible in Tab 2

### Special Characters
- [ ] Create task with special characters in title: `<script>alert('xss')</script>`
- [ ] **Expected**: Characters escaped/sanitized
- [ ] **Expected**: No XSS vulnerability

### Long Task Lists
- [ ] Create 50+ tasks
- [ ] **Expected**: List renders without performance issues
- [ ] **Expected**: Scrolling smooth
- [ ] **Expected**: All tasks accessible

### Rapid Clicks
- [ ] Rapidly click "Create Task" button multiple times
- [ ] **Expected**: Only one task created
- [ ] **Expected**: Button disabled during submission

---

## 10. Security Audit 🔐

### Password Security
- [ ] Check that passwords are never visible in:
  - [ ] Browser DevTools → Network tab
  - [ ] Browser DevTools → Local Storage
  - [ ] API responses
- [ ] **Expected**: Passwords always hashed/hidden

### JWT Token Security
- [ ] Check that JWT tokens are:
  - [ ] Not logged to console
  - [ ] Not visible in URL
  - [ ] Sent only in Authorization header
- [ ] **Expected**: Tokens handled securely

### SQL Injection Prevention
- [ ] Try SQL injection in task title: `'; DROP TABLE todos; --`
- [ ] **Expected**: Input treated as string, not SQL
- [ ] **Expected**: No database errors

---

## Test Results Summary

**Date**: _______________
**Tester**: _______________
**Environment**: _______________

**Total Tests**: 100+
**Passed**: _____
**Failed**: _____
**Blocked**: _____

**Critical Issues Found**:
1. _______________
2. _______________
3. _______________

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________

**Sign-off**: _______________

---

## Quick Smoke Test (5 minutes)

If time is limited, run this abbreviated version:

1. [ ] Signup new user
2. [ ] Create 3 tasks
3. [ ] Edit one task
4. [ ] Toggle completion on one task
5. [ ] Delete one task
6. [ ] Logout and login again
7. [ ] Verify 2 tasks remain
8. [ ] Create second user
9. [ ] Verify second user sees no tasks from first user
10. [ ] Check API docs at /docs

**All 10 passed?** ✅ Application is likely working correctly
**Any failed?** ⚠️ Investigate and fix before deployment
