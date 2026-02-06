@echo off
REM Start Frontend Server Script

echo ========================================
echo Starting Frontend Server
echo ========================================
echo.

cd frontend

REM Check if node_modules exists
if not exist "node_modules" (
    echo ERROR: node_modules not found!
    echo Please run quick-start.bat first to set up the environment.
    pause
    exit /b 1
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo ERROR: .env.local file not found!
    echo Please create frontend/.env.local with your configuration.
    pause
    exit /b 1
)

echo Starting Next.js development server on http://localhost:3000
echo.
echo Make sure the backend server is running on http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the server
npm run dev
