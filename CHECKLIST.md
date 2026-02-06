# Environment Setup Checklist

Use this checklist to ensure your environment is properly configured.

## ✅ Prerequisites

- [ ] Python 3.11+ installed
  ```bash
  python --version
  ```

- [ ] Node.js 18+ installed
  ```bash
  node --version
  ```

- [ ] Neon PostgreSQL account created
  - Sign up at: https://neon.tech
  - Create a new project
  - Copy connection string

## ✅ Backend Configuration

- [ ] Navigate to backend directory
  ```bash
  cd backend
  ```

- [ ] Create virtual environment
  ```bash
  python -m venv venv
  ```

- [ ] Activate virtual environment
  ```bash
  # Windows:
  venv\Scripts\activate

  # Mac/Linux:
  source venv/bin/activate
  ```

- [ ] Install dependencies
  ```bash
  pip install -r requirements.txt
  ```

- [ ] Create `.env` file from example
  ```bash
  copy .env.example .env
  ```

- [ ] Edit `backend/.env` with your values:
  - [ ] `DATABASE_URL` - Your Neon connection string
  - [ ] `BETTER_AUTH_SECRET` - Generate a secure random string (min 32 chars)

  **Generate secret:**
  ```bash
  python -c "import secrets; print(secrets.token_urlsafe(32))"
  ```

- [ ] Run database migrations
  ```bash
  alembic upgrade head
  ```

- [ ] Verify migrations succeeded
  ```bash
  # Should show: Running upgrade -> 004
  ```

## ✅ Frontend Configuration

- [ ] Navigate to frontend directory
  ```bash
  cd ../frontend
  ```

- [ ] Install dependencies
  ```bash
  npm install
  ```

- [ ] Create `.env.local` file from example
  ```bash
  copy .env.local.example .env.local
  ```

- [ ] Edit `frontend/.env.local` with your values:
  - [ ] `NEXT_PUBLIC_API_URL=http://localhost:8000`
  - [ ] `BETTER_AUTH_SECRET` - **MUST match backend/.env exactly**
  - [ ] `DATABASE_URL` - Same as backend

## ✅ Verification

- [ ] Run backend tests
  ```bash
  cd backend
  venv\Scripts\activate
  pytest tests/ -v
  ```
  **Expected:** 55 tests passing

- [ ] Check backend health
  ```bash
  # Start backend first, then visit:
  http://localhost:8000/api/v1/health
  ```
  **Expected:** `{"status": "healthy"}`

## ✅ Running the Application

### Option 1: Using Scripts (Recommended)

- [ ] **Terminal 1 - Backend:**
  ```bash
  start-backend.bat
  ```
  Wait for: "Application startup complete"

- [ ] **Terminal 2 - Frontend:**
  ```bash
  start-frontend.bat
  ```
  Wait for: "Ready in X ms"

- [ ] **Browser:**
  ```
  http://localhost:3000
  ```

### Option 2: Manual Start

- [ ] **Terminal 1 - Backend:**
  ```bash
  cd backend
  venv\Scripts\activate
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  ```

- [ ] **Terminal 2 - Frontend:**
  ```bash
  cd frontend
  npm run dev
  ```

## ✅ Testing the Application

- [ ] Open http://localhost:3000
- [ ] Click "Sign Up"
- [ ] Create account with:
  - Email: test@example.com
  - Name: Test User
  - Password: password123
- [ ] Verify redirect to dashboard
- [ ] Create a new todo
- [ ] Mark todo as complete
- [ ] Edit todo
- [ ] Delete todo
- [ ] Log out
- [ ] Log back in
- [ ] Verify todos are still there

## ✅ Troubleshooting

If something doesn't work, check:

- [ ] Both servers are running (backend on 8000, frontend on 3000)
- [ ] No port conflicts (close other apps using these ports)
- [ ] `.env` files exist and have correct values
- [ ] `BETTER_AUTH_SECRET` is identical in both .env files
- [ ] Database connection string is correct
- [ ] Virtual environment is activated for backend
- [ ] No errors in terminal windows

## 🎉 Success Criteria

You'll know everything is working when:

✅ Backend server starts without errors
✅ Frontend server starts without errors
✅ You can sign up and create an account
✅ You can create, edit, and delete todos
✅ You can log out and log back in
✅ All 55 backend tests pass

## 📝 Common Issues

**"ModuleNotFoundError"**
- Solution: Activate venv and run `pip install -r requirements.txt`

**"Database connection failed"**
- Solution: Check DATABASE_URL in backend/.env
- Verify Neon database is active

**"Authentication failed"**
- Solution: Ensure BETTER_AUTH_SECRET matches in both .env files
- Clear browser localStorage and try again

**"Port already in use"**
- Solution: Close other apps using ports 8000 or 3000
- Or change ports in configuration

## 🚀 Next Steps After Setup

1. Explore the application features
2. Review the code structure
3. Run the test suite
4. Try adding new features
5. Deploy to production (optional)

---

**Need help?** Check SETUP.md for detailed instructions.
