# Todo Application - Phase 2 Complete

A secure, multi-user full-stack todo application with JWT authentication, built with FastAPI and Next.js.

**Status**: ✅ Phase 2 Complete - All 7 user stories implemented and tested

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Neon PostgreSQL account (free at https://neon.tech)

### Setup (5 minutes)

1. **Get your Neon database:**
   - Sign up at https://neon.tech
   - Create a new project
   - Copy your connection string

2. **Configure environment:**
   ```bash
   # Backend configuration
   cd backend
   copy .env.example .env
   # Edit .env with your DATABASE_URL and BETTER_AUTH_SECRET

   # Frontend configuration
   cd ../frontend
   copy .env.local.example .env.local
   # Edit .env.local with same values
   ```

3. **Run automated setup:**
   ```bash
   # From project root
   quick-start.bat
   ```

4. **Start servers:**
   ```bash
   # Terminal 1 - Backend
   start-backend.bat

   # Terminal 2 - Frontend
   start-frontend.bat
   ```

5. **Open browser:**
   - http://localhost:3000

## 📖 Documentation

- **Setup Guide:** See [SETUP.md](SETUP.md) for detailed instructions
- **Backend Documentation:** [backend/README.md](backend/README.md)
- **Frontend Documentation:** [frontend/README.md](frontend/README.md)
- **API Docs:** http://localhost:8000/docs (when backend is running)
- **Specification:** [specs/001-frontend-phase2/spec.md](specs/001-frontend-phase2/spec.md)
- **Implementation Plan:** [specs/001-frontend-phase2/plan.md](specs/001-frontend-phase2/plan.md)
- **Tasks Breakdown:** [specs/001-frontend-phase2/tasks.md](specs/001-frontend-phase2/tasks.md)

## ✅ Features

**Authentication:**
- ✅ User signup with email/password
- ✅ User login with JWT tokens
- ✅ User logout
- ✅ Password hashing with bcrypt
- ✅ 7-day token expiration

**Todo Management:**
- ✅ Create todos
- ✅ List todos (user-specific)
- ✅ Update todos (title, description, completed)
- ✅ Delete todos
- ✅ Real-time updates

**Security:**
- ✅ JWT authentication on all protected endpoints
- ✅ User identity from JWT only
- ✅ Query-level authorization
- ✅ Zero cross-user data access
- ✅ Ownership verification on all operations

## 🧪 Testing

```bash
# Run all backend tests (55 tests)
run-tests.bat

# Or manually:
cd backend
venv\Scripts\activate
pytest tests/ -v
```

**Test Coverage:**
- 13 security tests
- 12 signup tests
- 12 login tests
- 18 todo CRUD tests

## 🏗️ Architecture

**Backend (FastAPI):**
- Port: 8000
- Database: Neon PostgreSQL
- ORM: SQLModel
- Auth: JWT tokens
- Tests: pytest (55 tests passing)

**Frontend (Next.js):**
- Port: 3000
- Framework: Next.js 14 (App Router)
- Auth: Better Auth + JWT
- Styling: Tailwind CSS
- State: React hooks
- Routes: /tasks, /tasks/new, /tasks/[id], /tasks/[id]/edit

## 📁 Project Structure

```
todophs2/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/v1/          # API endpoints (auth, todos)
│   │   ├── core/            # Security & auth (JWT, bcrypt)
│   │   ├── models/          # Database models (User, Todo)
│   │   └── schemas/         # Pydantic schemas
│   ├── tests/               # 55 passing tests
│   ├── alembic/             # Database migrations
│   ├── requirements.txt     # Python dependencies
│   └── README.md            # Backend documentation
├── frontend/                # Next.js frontend
│   ├── app/
│   │   ├── (auth)/          # Public routes (login, signup)
│   │   ├── (protected)/     # Protected routes (tasks)
│   │   └── api/             # Better Auth API routes
│   ├── components/          # React components
│   │   ├── auth/            # Auth components
│   │   ├── todos/           # Task components
│   │   └── ui/              # UI components
│   ├── lib/                 # API client & auth
│   ├── package.json         # Node dependencies
│   └── README.md            # Frontend documentation
├── specs/                   # Specification documents
│   └── 001-frontend-phase2/
│       ├── spec.md          # Feature specification
│       ├── plan.md          # Implementation plan
│       └── tasks.md         # Task breakdown
├── history/                 # Prompt history records
├── SETUP.md                 # Detailed setup guide
├── quick-start.bat          # Automated setup
├── start-backend.bat        # Start backend server
├── start-frontend.bat       # Start frontend server
└── run-tests.bat            # Run tests
```

## 🔒 Security

Built following strict security principles:
- Bcrypt password hashing (cost factor 12)
- JWT authentication with 7-day expiration
- User identity from JWT only (never from request body)
- Query-level authorization with user_id filtering
- Zero cross-user data access
- Ownership verification on all operations

## 🛠️ Development

**Backend changes:**
```bash
cd backend
venv\Scripts\activate
# Edit code in app/
# Server auto-reloads
pytest tests/ -v  # Run tests
```

**Frontend changes:**
```bash
cd frontend
# Edit code in app/ or components/
# Next.js auto-reloads
```

**Database changes:**
```bash
cd backend
venv\Scripts\activate
alembic revision -m "description"
# Edit migration file
alembic upgrade head
```

## 📝 API Endpoints

**Authentication:**
- `POST /api/v1/auth/signup` - Create account
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/logout` - Logout

**Todos (Auth Required):**
- `POST /api/v1/todos` - Create todo
- `GET /api/v1/todos` - List todos
- `GET /api/v1/todos/{id}` - Get todo
- `PUT /api/v1/todos/{id}` - Update todo
- `DELETE /api/v1/todos/{id}` - Delete todo

**Health:**
- `GET /api/v1/health` - Health check

## 🐛 Troubleshooting

See [SETUP.md](SETUP.md) for detailed troubleshooting guide.

**Common issues:**
- Database connection: Check DATABASE_URL in .env
- Auth not working: Ensure BETTER_AUTH_SECRET matches in both .env files
- Module not found: Run `pip install -r requirements.txt` or `npm install`

## 📊 Status

**Phase 2 Complete** - All user stories implemented:
- ✅ US1: User Authentication (signup, signin, logout)
- ✅ US2: View Personal Task List
- ✅ US3: Create New Task
- ✅ US4: View Single Task Details
- ✅ US5: Update Existing Task
- ✅ US6: Delete Task
- ✅ US7: Toggle Task Completion

**Quality Metrics**:
- ✅ Backend: 55/55 tests passing
- ✅ Security: Constitution compliant
- ✅ User Isolation: 100% enforced
- ✅ Documentation: Complete (root, backend, frontend)
- ✅ Git Tags: phase-1-setup, phase-5-frontend-complete

## 🚀 Next Steps

1. **Run the application** (follow Quick Start above)
2. **Test all features** in the browser
3. **Optional enhancements:**
   - Add todo filtering (all/active/completed)
   - Add todo sorting
   - Add todo search
   - Add due dates and priorities
   - Deploy to production

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

This is a learning project. Feel free to fork and experiment!

---

Built with ❤️ using FastAPI, Next.js, and Test-Driven Development
