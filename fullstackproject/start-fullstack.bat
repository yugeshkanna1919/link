@echo off
echo ========================================
echo    Food Delivery Full Stack
echo ========================================
echo.
echo Starting both backend and frontend...
echo.

cd /d "%~dp0"

echo Starting Backend Server...
start "Backend Server" cmd /k "start-backend.bat"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "start-frontend.bat"

echo.
echo ========================================
echo    Both servers are starting...
echo ========================================
echo.
echo Backend:  http://localhost:5000/api
echo Frontend: http://localhost:5173
echo.
echo Press any key to close this window
echo (Servers will continue running in separate windows)
echo.

pause >nul 