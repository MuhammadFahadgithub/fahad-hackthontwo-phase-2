# Backend - FastAPI Todo API

FastAPI backend with JWT authentication, SQLModel ORM, and Neon PostgreSQL.

## Tech Stack

- **Framework**: FastAPI 0.109.0
- **ORM**: SQLModel 0.0.14
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: JWT with python-jose
- **Password Hashing**: bcrypt via passlib
- **Migrations**: Alembic 1.13.1
- **Testing**: pytest with 55 passing tests

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   ├── deps.py              # Dependency injection
│   │   └── v1/
│   │       ├── auth.py          # Authentication endpoints
│   │       └── todos.py         # Todo CRUD endpoints
│   ├── core/
│   │   ├── auth.py              # JWT verification
│   │   └── security.py          # Password hashing
│   ├── models/
│   │   ├── user.py              # User database model
│   │   └── todo.py              # Todo database model
│   ├── schemas/
│   │   ├── auth.py              # Auth request/response schemas
│   │   └── todo.py              # Todo request/response schemas
│   ├── config.py                # Settings management
│   ├── database.py              # Database connection
│   └── main.py                  # FastAPI application
├── tests/
│   ├── conftest.py              # Test fixtures
│   ├── test_auth_signup.py      # Signup tests (12 tests)
│   ├── test_auth_login.py       # Login tests (12 tests)
│   ├── test_security.py         # Security tests (13 tests)
│   └── test_todos.py            # Todo CRUD tests (18 tests)
├── alembic/                     # Database migrations
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Environment template
├── requirements.txt             # Python dependencies
└── pyproject.toml               # Project configuration

```

## Setup

### Prerequisites

- Python 3.11+
- Neon PostgreSQL account (free at https://neon.tech)

### Installation

1. **Create virtual environment**:
   ```bash
   cd backend
   python -m venv venv
   ```

2. **Activate virtual environment**:
   ```bash
   # Windows
   venv\Scripts\activate

   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**:
   ```bash
   # Copy example file
   copy .env.example .env  # Windows
   cp .env.example .env    # macOS/Linux

   # Edit .env with your values:
   # - DATABASE_URL: Your Neon connection string
   # - BETTER_AUTH_SECRET: Shared secret with frontend (min 32 chars)
   ```

5. **Run database migrations**:
   ```bash
   alembic upgrade head
   ```

6. **Start development server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

Server will be available at http://localhost:8000

## API Documentation

When the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Authentication

**POST /api/v1/auth/signup**
- Create new user account
- Request: `{ "email": "user@example.com", "password": "password123", "name": "John Doe" }`
- Response: `{ "access_token": "jwt_token", "token_type": "bearer", "user": {...} }`

**POST /api/v1/auth/login**
- Login with existing account
- Request: `{ "email": "user@example.com", "password": "password123" }`
- Response: `{ "access_token": "jwt_token", "token_type": "bearer", "user": {...} }`

**POST /api/v1/auth/logout**
- Logout (client-side token removal)
- Requires: JWT token in Authorization header
- Response: `{ "message": "Logged out successfully" }`

### Todos (All require JWT authentication)

**POST /api/v1/todos**
- Create new todo
- Request: `{ "title": "Buy groceries", "description": "Milk, eggs, bread", "completed": false }`
- Response: Todo object with id, timestamps, user_id

**GET /api/v1/todos**
- List all todos for authenticated user
- Response: Array of todo objects

**GET /api/v1/todos/{id}**
- Get specific todo by ID
- Response: Todo object (404 if not found or not owned)

**PUT /api/v1/todos/{id}**
- Update todo
- Request: `{ "title": "Updated title", "completed": true }`
- Response: Updated todo object

**DELETE /api/v1/todos/{id}**
- Delete todo
- Response: 204 No Content

### Health Check

**GET /api/v1/health**
- Health check endpoint
- Response: `{ "status": "healthy" }`

## Testing

### Run all tests:
```bash
pytest tests/ -v
```

### Run specific test file:
```bash
pytest tests/test_todos.py -v
```

### Run with coverage:
```bash
pytest tests/ --cov=app --cov-report=html
```

### Test Summary

- **55 total tests** (all passing)
- **13 security tests**: JWT validation, user isolation, ownership checks
- **12 signup tests**: Email validation, password hashing, duplicate prevention
- **12 login tests**: Authentication, token generation, error handling
- **18 todo CRUD tests**: Create, read, update, delete with ownership enforcement

## Security Features

### Constitution Compliance

This backend follows strict security principles:

**Principle II: Authentication & JWT Security**
- JWT tokens required for all protected endpoints
- Tokens expire after 7 days
- HS256 algorithm with shared secret

**Principle III: User Identity & Isolation**
- User identity from JWT only, never from request body
- Each todo belongs to exactly one user
- User_id automatically set from JWT on creation

**Principle IV: Query-Level Authorization**
- All database queries filtered by user_id
- No cross-user data access possible
- Ownership verified on all operations

**Principle V: Ownership Verification**
- Update/delete operations verify ownership
- 404 returned for non-existent or non-owned resources
- No information leakage about other users' data

### Password Security

- Bcrypt hashing with cost factor 12
- Passwords never stored in plain text
- Passwords never returned in API responses

### Error Handling

- 401 Unauthorized: Missing or invalid JWT
- 403 Forbidden: Valid JWT but insufficient permissions
- 404 Not Found: Resource doesn't exist or not owned
- 422 Unprocessable Entity: Validation errors
- 500 Internal Server Error: Server errors (details hidden)

## Database Migrations

### Create new migration:
```bash
alembic revision -m "description of changes"
```

### Apply migrations:
```bash
alembic upgrade head
```

### Rollback migration:
```bash
alembic downgrade -1
```

## Environment Variables

Required variables in `.env`:

```bash
# Database
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require

# Authentication
BETTER_AUTH_SECRET=your-secret-key-min-32-chars

# API Configuration
API_V1_PREFIX=/api/v1
PROJECT_NAME=Todo API
DEBUG=True

# CORS
ALLOWED_ORIGINS=["http://localhost:3000"]

# Server
HOST=0.0.0.0
PORT=8000
```

## Development

### Code Quality

```bash
# Format code
ruff format app/ tests/

# Lint code
ruff check app/ tests/
```

### Database Console

```bash
# Connect to Neon database
psql $DATABASE_URL
```

## Troubleshooting

### Database connection fails
- Verify DATABASE_URL is correct
- Check Neon dashboard for connection string
- Ensure `sslmode=require` is in connection string
- Verify network connectivity

### JWT authentication fails
- Ensure BETTER_AUTH_SECRET matches frontend
- Check token expiration (7 days)
- Verify Authorization header format: `Bearer <token>`

### Tests fail
- Ensure test database is configured
- Run `pytest tests/ -v` for detailed output
- Check test fixtures in conftest.py

### CORS errors
- Verify ALLOWED_ORIGINS includes frontend URL
- Check frontend is running on expected port
- Ensure credentials are included in requests

## Production Deployment

### Checklist

- [ ] Set DEBUG=False in production
- [ ] Use strong BETTER_AUTH_SECRET (32+ random chars)
- [ ] Configure production DATABASE_URL
- [ ] Set appropriate ALLOWED_ORIGINS
- [ ] Run database migrations
- [ ] Configure HTTPS/SSL
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Set up backup strategy

### Recommended Hosting

- **API**: Railway, Render, or Fly.io
- **Database**: Neon (already configured)
- **Monitoring**: Sentry for error tracking

## Contributing

1. Create feature branch
2. Write tests for new features
3. Ensure all tests pass
4. Follow existing code style
5. Update documentation

## License

MIT License - See LICENSE file for details
