@echo off
REM Quick Start Script for Todo Application
REM This script helps you set up and run the application

echo ========================================
echo Todo Application - Quick Start
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.11+ from https://www.python.org/
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/6] Checking prerequisites...
echo   - Python: OK
echo   - Node.js: OK
echo.

REM Backend Setup
echo [2/6] Setting up backend...
cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo   Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
echo   Installing backend dependencies...
call venv\Scripts\activate.bat
pip install -q -r requirements.txt

REM Check if .env exists
if not exist ".env" (
    echo.
    echo WARNING: backend/.env file not found!
    echo Please create backend/.env file with your configuration.
    echo See backend/.env.example for template.
    echo.
    echo Required variables:
    echo   - DATABASE_URL (your Neon PostgreSQL connection string)
    echo   - BETTER_AUTH_SECRET (min 32 characters)
    echo.
    pause
    exit /b 1
)

echo   Backend setup complete!
echo.

REM Frontend Setup
echo [3/6] Setting up frontend...
cd ..\frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo   Installing frontend dependencies...
    call npm install
) else (
    echo   Frontend dependencies already installed
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo.
    echo WARNING: frontend/.env.local file not found!
    echo Please create frontend/.env.local file with your configuration.
    echo See frontend/.env.local.example for template.
    echo.
    echo Required variables:
    echo   - NEXT_PUBLIC_API_URL=http://localhost:8000
    echo   - BETTER_AUTH_SECRET (MUST match backend/.env)
    echo   - DATABASE_URL (same as backend)
    echo.
    pause
    exit /b 1
)

echo   Frontend setup complete!
echo.

cd ..

echo [4/6] Running database migrations...
cd backend
call venv\Scripts\activate.bat
alembic upgrade head
if errorlevel 1 (
    echo.
    echo ERROR: Database migration failed!
    echo Please check your DATABASE_URL in backend/.env
    echo Make sure your Neon database is accessible.
    echo.
    pause
    exit /b 1
)
echo   Database migrations complete!
echo.

cd ..

echo [5/6] Running backend tests...
cd backend
call venv\Scripts\activate.bat
pytest tests/ -q --tb=no
if errorlevel 1 (
    echo.
    echo WARNING: Some tests failed. Check the output above.
    echo You can still run the application, but there might be issues.
    echo.
    pause
)
echo.

cd ..

echo [6/6] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo.
echo 1. Start the BACKEND server (in this terminal):
echo    cd backend
echo    venv\Scripts\activate
echo    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
echo.
echo 2. Start the FRONTEND server (in a NEW terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open your browser:
echo    http://localhost:3000
echo.
echo 4. Sign up and start using the app!
echo.
echo ========================================
echo.
pause
