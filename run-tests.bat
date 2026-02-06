@echo off
REM Run Backend Tests Script

echo ========================================
echo Running Backend Tests
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

REM Activate virtual environment
call venv\Scripts\activate.bat

echo Running all backend tests...
echo.

REM Run tests with verbose output
pytest tests/ -v --tb=short

echo.
echo ========================================
echo Test Summary
echo ========================================
echo Expected: 55 tests passing
echo   - 13 security tests
echo   - 12 signup tests
echo   - 12 login tests
echo   - 18 todo CRUD tests
echo.
pause
