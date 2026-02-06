# Development Environment Setup Guide

This guide will help you set up and run the Todo application locally.

## Prerequisites

- **Python 3.11+** installed
- **Node.js 18+** and npm installed
- **Neon PostgreSQL** account (free tier available at https://neon.tech)

## Step 1: Clone and Navigate

```bash
cd D:\fahadhacktodo\todophs2
```

## Step 2: Set Up Neon PostgreSQL Database

1. Go to https://neon.tech and sign up/login
2. Create a new project (e.g., "todo-app")
3. Copy your connection string (it looks like):
   ```
   postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```

## Step 3: Backend Setup

### 3.1 Create Python Virtual Environment

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate
```

### 3.2 Install Dependencies

```bash
pip install -r requirements.txt
```

### 3.3 Configure Environment Variables

Create `backend/.env` file:

```bash
# Copy from example
copy .env.example .env
```

Edit `backend/.env` with your values:

```env
# Database Configuration
DATABASE_URL=postgresql://YOUR_NEON_CONNECTION_STRING_HERE

# Authentication (generate a secure random string, min 32 characters)
BETTER_AUTH_SECRET=your-super-secret-key-change-this-min-32-chars-long

# API Configuration
API_V1_PREFIX=/api/v1
PROJECT_NAME=Todo API
DEBUG=True

# CORS - Frontend URL
ALLOWED_ORIGINS=["http://localhost:3000"]

# Server
HOST=0.0.0.0
PORT=8000
```

**Important:** Generate a secure `BETTER_AUTH_SECRET`:
```bash
# On Windows PowerShell:
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Or use any random string generator (min 32 characters)
```

### 3.4 Run Database Migrations

```bash
# Make sure you're in the backend directory with venv activated
alembic upgrade head
```

This will create all necessary tables (users, sessions, verification_tokens, todos).

### 3.5 Run Backend Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: http://localhost:8000

**Test the backend:**
- Health check: http://localhost:8000/api/v1/health
- API docs: http://localhost:8000/docs

## Step 4: Frontend Setup

Open a **new terminal** (keep backend running).

### 4.1 Navigate to Frontend

```bash
cd D:\fahadhacktodo\todophs2\frontend
```

### 4.2 Install Dependencies

```bash
npm install
```

### 4.3 Configure Environment Variables

Create `frontend/.env.local` file:

```bash
# Copy from example
copy .env.local.example .env.local
```

Edit `frontend/.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000

# Authentication (use the SAME secret as backend)
BETTER_AUTH_SECRET=your-super-secret-key-change-this-min-32-chars-long

# Database URL (same as backend)
DATABASE_URL=postgresql://YOUR_NEON_CONNECTION_STRING_HERE
```

**Important:** Use the **exact same** `BETTER_AUTH_SECRET` as in backend/.env

### 4.4 Run Frontend Server

```bash
npm run dev
```

Frontend will be available at: http://localhost:3000

## Step 5: Test the Application

1. **Open browser:** http://localhost:3000
2. **Sign up:** Click "Sign Up" and create an account
3. **Create todos:** Add some todos on the dashboard
4. **Test features:**
   - Create new todos
   - Mark todos as complete
   - Edit todos
   - Delete todos
   - Log out and log back in

## Troubleshooting

### Backend Issues

**"ModuleNotFoundError: No module named 'app'"**
- Make sure you're in the `backend` directory
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt`

**"ValidationError: DATABASE_URL Field required"**
- Make sure `backend/.env` file exists
- Check that DATABASE_URL is set correctly

**"Connection refused" or database errors**
- Verify your Neon connection string is correct
- Check that your Neon database is active
- Ensure `?sslmode=require` is at the end of the connection string

**"alembic: command not found"**
- Make sure virtual environment is activated
- Run `pip install alembic`

### Frontend Issues

**"Module not found" errors**
- Run `npm install` in the frontend directory
- Delete `node_modules` and `.next` folders, then run `npm install` again

**"Failed to fetch" or API errors**
- Make sure backend is running on port 8000
- Check that `NEXT_PUBLIC_API_URL=http://localhost:8000` in `.env.local`
- Verify CORS is configured correctly in backend

**Authentication not working**
- Ensure `BETTER_AUTH_SECRET` is **identical** in both backend/.env and frontend/.env.local
- Clear browser localStorage and try again
- Check browser console for errors

### Database Migration Issues

**"Target database is not up to date"**
```bash
cd backend
alembic upgrade head
```

**"Can't locate revision identified by 'xxx'"**
```bash
# Reset migrations (WARNING: drops all data)
alembic downgrade base
alembic upgrade head
```

## Running Tests

### Backend Tests

```bash
cd backend
# Make sure venv is activated
pytest tests/ -v
```

All 55 tests should pass.

## Development Workflow

1. **Backend changes:**
   - Edit code in `backend/app/`
   - Server auto-reloads (--reload flag)
   - Run tests: `pytest tests/ -v`

2. **Frontend changes:**
   - Edit code in `frontend/`
   - Next.js auto-reloads
   - Check browser console for errors

3. **Database changes:**
   - Create new migration: `alembic revision -m "description"`
   - Edit migration file in `backend/alembic/versions/`
   - Apply migration: `alembic upgrade head`

## Production Deployment

See `DEPLOYMENT.md` for production deployment instructions.

## Architecture Overview

**Backend (FastAPI):**
- Port: 8000
- API: `/api/v1/`
- Auth: JWT tokens (7-day expiration)
- Database: Neon PostgreSQL

**Frontend (Next.js):**
- Port: 3000
- Framework: Next.js 14 (App Router)
- Auth: Better Auth + JWT
- Styling: Tailwind CSS

**Security:**
- Bcrypt password hashing (cost factor 12)
- JWT authentication on all protected endpoints
- User identity from JWT only
- Query-level authorization
- Zero cross-user data access

## Need Help?

- Check the logs in both terminal windows
- Review the Constitution: `.specify/memory/constitution.md`
- Check API documentation: http://localhost:8000/docs
- All tests passing: `pytest tests/ -v` (should show 55 passed)
