# Todo Application

A full-stack todo application with JWT authentication, built with FastAPI and Next.js.

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
- **API Docs:** http://localhost:8000/docs (when backend is running)
- **Constitution:** `.specify/memory/constitution.md`

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

## 📁 Project Structure

```
todophs2/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # API endpoints
│   │   ├── core/            # Security & auth
│   │   ├── models/          # Database models
│   │   └── schemas/         # Pydantic schemas
│   ├── tests/               # 55 tests
│   ├── alembic/             # Database migrations
│   └── requirements.txt
├── frontend/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── lib/                 # API client & auth
│   └── package.json
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

- ✅ Backend: 55/55 tests passing
- ✅ Authentication: Complete
- ✅ Todo CRUD: Complete
- ✅ Security: Constitution compliant
- ✅ Documentation: Complete

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
