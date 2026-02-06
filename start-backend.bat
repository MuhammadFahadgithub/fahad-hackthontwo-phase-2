@echo off
REM Start Backend Server Script

echo ========================================
echo Starting Backend Server
echo ========================================
echo.

cd backend

REM Check if virtual environment exists
if not exist "venv" (
    echo ERROR: Virtual environment not found!
    echo Please run quick-start.bat first to set up the environment.
    pause
    exit /b 1
)

REM Check if .env exists
if not exist ".env" (
    echo ERROR: .env file not found!
    echo Please create backend/.env with your configuration.
    pause
    exit /b 1
)

REM Activate virtual environment
call venv\Scripts\activate.bat

echo Starting FastAPI server on http://localhost:8000
echo API Documentation: http://localhost:8000/docs
echo Health Check: http://localhost:8000/api/v1/health
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
